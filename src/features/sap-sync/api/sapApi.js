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
export async function fetchSapStatus(signal) {
  return httpClient.get("/sap/status", { signal });
}

export async function fetchSapPlants(signal) {
  return httpClient.get("/sap/plants", { signal });
}

export async function fetchSapMaterials(plantCode, signal) {
  return httpClient.get(`/sap/materials?plant=${plantCode}`, { signal });
}

export async function fetchSapBatches(materialCode, signal) {
  return httpClient.get(`/sap/batches?materialCode=${materialCode}`, { signal });
}
