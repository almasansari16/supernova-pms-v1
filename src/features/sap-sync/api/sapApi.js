import { httpClient } from "@/shared/api";

/**
 * Fetch plants (and their storage locations) from the SAP sync endpoint.
 * GET /api/v1/sap/plants
 *
 * Returns the full response shape:
 * {
 *   syncRunId, source, readAtUtc, count,
 *   items: [{ plantCode, name, storageLocations: [{ code, name }] }]
 * }
 */
export async function fetchSapPlants(signal) {
  return httpClient.get("/sap/plants", { signal });
}

