import type { Document } from "openapi-client-axios";
import definition from "./openapi.json";

const schufa_oas = definition as unknown as Document;

export { schufa_oas };
