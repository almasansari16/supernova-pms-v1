import { httpClient } from "@/shared/api";

export async function fetchProductionOrders(plantCode, signal) {
  return httpClient.get(`/sap/production-orders?plant=${plantCode}`, { signal });
}

export async function fetchProductionOrderDetail(orderNumber, signal) {
  return httpClient.get(`/sap/production-orders/${orderNumber}`, { signal });
}