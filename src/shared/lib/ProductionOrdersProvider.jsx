import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchSapPlants } from "@/features/sap-sync/api/sapApi.js";
import { fetchProductionOrders } from "@/features/production-orders/api/productionOrderApi.js";

const ProductionOrdersContext = createContext(null);

export function ProductionOrdersProvider({ children }) {
  const [plants, setPlants]                       = useState([]);
  const [selectedPlantCode, setSelectedPlantCode] = useState(null);
  const [orders, setOrders]                       = useState([]);
  const [ordersLoading, setOrdersLoading]         = useState(false);
  const [syncing, setSyncing]                     = useState(false);
  const [error, setError]                         = useState(null);

  const loadOrders = useCallback(async (plantCode) => {
    if (!plantCode) return;
    setOrdersLoading(true);
    try {
      const oData = await fetchProductionOrders(plantCode);
      setOrders(oData.items ?? []);
    } catch {
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  // ── Auto-load on mount ──
  const boot = useCallback(async () => {
    setSyncing(true);
    setError(null);
    try {
      const pData = await fetchSapPlants();
      const items = pData.items ?? [];
      setPlants(items);

      const bestPlant = items[0] ?? null;
      setSelectedPlantCode(bestPlant?.plantCode ?? null);

      if (bestPlant?.plantCode) {
        setOrdersLoading(true);
        const oData = await fetchProductionOrders(bestPlant.plantCode);
        setOrders(oData.items ?? []);
      }
    } catch (err) {
      setError(err?.message ?? "Failed to reach SAP backend");
    } finally {
      setSyncing(false);
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => { boot(); }, []);  // ← auto-load on mount

  // ── Manual refresh (button click) ──
  const refresh = useCallback(async (toast) => {
    setSyncing(true);
    setError(null);
    setOrders([]);
    try {
      const pData = await fetchSapPlants();
      const items = pData.items ?? [];
      setPlants(items);

      const bestPlant = items[0] ?? null;
      setSelectedPlantCode(bestPlant?.plantCode ?? null);
      toast?.(`Plants synced — ${items.length} plant(s) loaded`);

      if (bestPlant?.plantCode) {
        setOrdersLoading(true);
        const oData = await fetchProductionOrders(bestPlant.plantCode);
        setOrders(oData.items ?? []);
        toast?.(`Orders loaded — ${oData.count ?? oData.items?.length ?? 0} order(s) for plant ${bestPlant.plantCode}`);
      }
    } catch (err) {
      setError(err?.message ?? "Failed to reach SAP backend");
      toast?.(`Sync failed: ${err?.message ?? "network error"}`, "error");
    } finally {
      setSyncing(false);
      setOrdersLoading(false);
    }
  }, []);

  const handlePlantChange = useCallback(async (plantCode) => {
    setSelectedPlantCode(plantCode);
    setOrders([]);
    await loadOrders(plantCode);
  }, [loadOrders]);

  return (
    <ProductionOrdersContext.Provider value={{
      plants, selectedPlantCode, orders,
      ordersLoading, syncing, error,
      refresh, handlePlantChange,
    }}>
      {children}
    </ProductionOrdersContext.Provider>
  );
}

export function useProductionOrders() {
  return useContext(ProductionOrdersContext);
}