<h1 align="center"><a href="https://marketplace.epilot.cloud/en/apps"><img src="./schufa.png" alt="schufa logo" width="100"><br>Schufa App for epilot</a></h1>

<p align="center">
  <a href="https://marketplace.epilot.cloud/en/apps">epilot Marketplace</a> •
  <a href="https://docs.epilot.io/apps/">Apps Developer Docs</a>
</p>

## Prerequisites
Simple API to check a schufa report for a given person.

This app is built by epilot.

All non-prod environments solely use the TEST certificate. Only prod contains the PROD certificate.

## TODO

- Translations for the error/skip messages: send a language flag to the API
- Temp access token by epilot is only valid for 30 minutes. How can we handle long running manual processing?

## Development

```
npm install
npm run dev
```

## Renew certificate

SCHUFA's certificate portal ships an `schufa-offline-openssl.zip` containing the OpenSSL config files you need — `Testumgebung_SCHUFA.cnf` for TEST, `Produktionsumgebung_SCHUFA.cnf` for PROD. Use these as-is; do not hand-write the CSR subject, the portal validates it byte-for-byte against the registered profile (whatever is in the cnf is overwritten with the portal's registered values, so the company name etc. comes from SCHUFA, not your cnf).

> **⚠️ A freshly issued cert is NOT live immediately — it activates overnight.** SCHUFA authorizes a client by the cert's **serial number**, and a new cert is only bound to your client in an **overnight batch** on their side. Until that runs, the token endpoint returns **HTTP 403** even though the cert is valid and TLS-trusted. So **do not deploy a new cert the same day you generate it** — wait a day and confirm with the token probe in step 8 first. The old cert keeps working until its expiry date, so there is no rush. (This bit us on the PROD G2→L3 CA migration; TEST renewals on the unchanged CA appeared to activate immediately.)

The TEST and PROD profiles each have their own cert + key, mapped to separate SST secrets:

| Environment | Cert secret      | Key secret      |
| ----------- | ---------------- | --------------- |
| TEST        | `TestSchufaCert` | `TestEpilotKey` |
| PROD        | `ProdSchufaCert` | `ProdEpilotKey` |

The steps below show the TEST flow. For PROD, swap the cnf, filenames, and SST secret names accordingly.

### 1. Set up a local cert folder

Extract the SCHUFA zip and put the `.cnf` files into a gitignored folder, e.g. `.certificates-<date>/`. Work from inside that folder for the rest of the flow:

```bash
cd .certificates-<date>
```

### 2. Generate the private key + CSR

The cnf has `encrypt_key = yes`, so you'll be prompted for a passphrase. Store the passphrase in 1Password.

```bash
openssl req -new -config Testumgebung_SCHUFA.cnf \
  -keyout PrivKey-Test.pem -out schufa-test.csr
```

### 3. Upload the CSR to SCHUFA

Upload `schufa-test.csr` to the TEST profile in SCHUFA's certificate portal. The portal pre-fills the contact email registered for that profile — that's expected and does not come from the CSR. SCHUFA returns a signed `.crt` (e.g. `SCHUFA-Test.crt`).

### 4. Verify the cert pairs with your key

The MD5s must match:

```bash
openssl x509 -in SCHUFA-Test.crt  -noout -modulus | openssl md5
openssl rsa  -in PrivKey-Test.pem -noout -modulus | openssl md5
```

If they don't match, stop — the cert won't work and you have the wrong key.

### 5. Strip the passphrase from the key

The Node `https` client in `api/schufa/auth.ts` does not pass a passphrase, so the key loaded into SST must be unencrypted. Keep `PrivKey-Test.pem` (the encrypted master) in 1Password as backup.

```bash
openssl rsa -in PrivKey-Test.pem -out PrivKey-Test-unencrypted.pem
```

Verify — the first line should be `-----BEGIN PRIVATE KEY-----` or `-----BEGIN RSA PRIVATE KEY-----`, not `-----BEGIN ENCRYPTED PRIVATE KEY-----`:

```bash
head -1 PrivKey-Test-unencrypted.pem
```

### 6. Base64-encode the cert and the unencrypted key

```bash
base64 -i SCHUFA-Test.crt              | tr -d '\n' > TEST_cert.b64
base64 -i PrivKey-Test-unencrypted.pem | tr -d '\n' > TEST_key.b64
```

### 7. Load the secrets into SST

Run from the repo root (not the cert folder), so the relative paths in `$(cat …)` resolve:

```bash
cd /path/to/epilot-app-schufa

pnpm run sst secret set TestSchufaCert "$(cat .certificates-<date>/TEST_cert.b64)" --stage <stage>
pnpm run sst secret set TestEpilotKey  "$(cat .certificates-<date>/TEST_key.b64)"  --stage <stage>
```

If `cat` fails (wrong path), SST still runs the command with an empty string — always check the files exist with `ls` first.

### 8. Confirm SCHUFA has activated the cert (esp. PROD)

A new cert is bound to your client in an overnight batch (see the warning above) — a same-day cert returns HTTP 403. Before deploying, confirm activation with a direct token request. This uses the cert/key locally, so it tests the real cert without touching the deployed secret:

```bash
curl -sS -m 25 -o /dev/null -w "%{http_code}\n" \
  --cert SCHUFA-Test.crt --key PrivKey-Test-unencrypted.pem \
  -d "grant_type=client_credentials&scope=hub-api-products&client_id=<CLIENT_ID>" \
  https://auth.api.sandbox.schufa.de/token/auth/realms/hub/protocol/openid-connect/token
# PROD: swap the cert/key, use the prod client_id, and host https://auth.hub.schufa.de
```

- `200` → activated and bound to this client. Proceed to deploy.
- `403` → valid cert, but not yet bound to this client — wait for the overnight run, or contact SCHUFA to activate the new serial.
- `401` → the `client_id` is wrong (the cert itself reached the backend fine).

The `client_id` is not a secret — the mTLS cert is the credential. To double-check which cert the backend actually accepted, base64-decode the JWT payload from a `200` and look at the `"cert"` claim; it should be the new cert's serial.

### 9. Deploy

```bash
pnpm run sst deploy --stage <stage>
```

### 10. Smoke test

Hit a SCHUFA endpoint against the deployed stage to confirm the new cert works end-to-end before considering the rotation done.



## Manual Processing

Most of the API credit checks are automatic. However, sometimes the API returns a status code 202, which means a manual intervention by a Schufa employee is necessary. This can take a couple of hours and sometimes days.
They work from Monday to Friday from 8 AM to 5 PM. In the test environment, manual processing is done more sporadically.

Around 0.03% of all requests require manual processing.

A StepFunction is excuted asynchronously when the API returns a 202 status code. It is a simple lambda which calls the Schufa API with the reportId (the async id for the procesing). If the request returns 202, it waits for 15 minutes up to 8h. 