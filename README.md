<h1 align="center"><a href="https://marketplace.epilot.cloud/en/apps"><img src="https://cdn.prod.website-files.com/66e6f7faa5f4d85bc99991f6/67e2bdec0c57abbe0b3a89a9_svg60480.svg" alt="schufa logo" width="100"><br>Schufa App for epilot</a></h1>

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

## Secrets
1. Create base64 encoded version of certificate:
```bash
base64 -i /path/to/your/cert.crt | tr -d '\n' > cert.b64
```

2. Set the secret to your local sst environment:
```bash
pnpm run sst secret set TestSchufaCert "$(cat TEST_cert.b64)"
```

3. After you've set the local secret you need to deploy once
```bash
pnpm run sst deploy --stage <stage>
```

## Manual Processing

Most of the API credit checks are automatic. However, sometimes the API returns a status code 202, which means a manual intervention by a Schufa employee is necessary. This can take a couple of hours and sometimes days.
They work from Monday to Friday from 8 AM to 5 PM. In the test environment, manual processing is done more sporadically.

Around 0.03% of all requests require manual processing.

A StepFunction is excuted asynchronously when the API returns a 202 status code. It is a simple lambda which calls the Schufa API with the reportId (the async id for the procesing). If the request returns 202, it waits for 15 minutes up to 8h. 