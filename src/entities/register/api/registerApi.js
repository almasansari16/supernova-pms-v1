import { buildMockRegister } from "./mockRegister.js";

/* Data source for the serialization register (unit serials, cartons, counters).
   Today it is the in-browser mock. When the backend lands, fetch through
   `httpClient` from "@/shared/api" here — pages and providers stay unchanged. */
export function loadInitialRegister() {
  return buildMockRegister();
}
