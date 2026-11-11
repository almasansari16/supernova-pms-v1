import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchSapStatus, fetchSapPlants, fetchSapMaterials } from "@/features/sap-sync/api/sapApi.js";

const SapStatusContext = createContext(null);

export function SapStatusProvider({ children }) {
  const [status, setStatus]                       = useState(null);
  const [plants, setPlants]                       = useState([]);
  const [syncMeta, setSyncMeta]                   = useState(null);
  const [selectedPlantCode, setSelectedPlantCode] = useState(null);
  const [materials, setMaterials]                 = useState([]);
  const [materialsLoading, setMaterialsLoading]   = useState(false);
  const [lastSync, setLastSync]                   = useState(null);
  const [syncing, setSyncing]                     = useState(false);
  const [error, setError]                         = useState(null);

  const loadMaterials = useCallback(async (plantCode) => {
    if (!plantCode) return;
    setMaterialsLoading(true);
    try {
      const mData = await fetchSapMaterials(plantCode);
      setMaterials(mData.items ?? []);
    } catch {
      setMaterials([]);
    } finally {
      setMaterialsLoading(false);
    }
  }, []);

  // ── Auto-load on mount ──
  const boot = useCallback(async () => {
    setSyncing(true);
    setError(null);
    try {
      const [sData, pData] = await Promise.all([
        fetchSapStatus(),
        fetchSapPlants(),
      ]);
      setStatus(sData);

      const items = pData.items ?? [];
      setPlants(items);
      setSyncMeta({
        syncRunId: pData.syncRunId,
        source: pData.source,
        readAtUtc: pData.readAtUtc,
      });

      const bestPlant = items[0] ?? null;
      setSelectedPlantCode(bestPlant?.plantCode ?? null);
      setLastSync(new Date().toLocaleString());

      if (bestPlant?.plantCode) {
        setMaterialsLoading(true);
        const mData = await fetchSapMaterials(bestPlant.plantCode);
        setMaterials(mData.items ?? []);
      }
    } catch (err) {
      setError(err?.message ?? "Failed to reach SAP backend");
      // Still try status alone
      fetchSapStatus().then(setStatus).catch(() => setStatus({ isConnected: false }));
    } finally {
      setSyncing(false);
      setMaterialsLoading(false);
    }
  }, []);

  useEffect(() => { boot(); }, []);  // ← auto-load on mount

  // ── Manual refresh (button click) ──
  const refresh = useCallback(async (toast) => {
    setSyncing(true);
    setError(null);
    setMaterials([]);
    try {
      const [sData, pData] = await Promise.all([
        fetchSapStatus(),
        fetchSapPlants(),
      ]);
      setStatus(sData);

      const items = pData.items ?? [];
      setPlants(items);
      setSyncMeta({
        syncRunId: pData.syncRunId,
        source: pData.source,
        readAtUtc: pData.readAtUtc,
      });

      const bestPlant = items[0] ?? null;
      setSelectedPlantCode(bestPlant?.plantCode ?? null);
      setLastSync(new Date().toLocaleString());
      toast?.(`Plants synced — ${items.length} plant(s) loaded`);

      if (bestPlant?.plantCode) {
        setMaterialsLoading(true);
        const mData = await fetchSapMaterials(bestPlant.plantCode);
        setMaterials(mData.items ?? []);
        toast?.(`SAP fields loaded — ${mData.count ?? mData.items?.length ?? 0} for plant ${bestPlant.plantCode}`);
      }
    } catch (err) {
      setError(err?.message ?? "Failed to reach SAP backend");
      toast?.(`Sync failed: ${err?.message ?? "network error"}`, "error");
    } finally {
      setSyncing(false);
      setMaterialsLoading(false);
    }
  }, []);

  const handlePlantChange = useCallback(async (plantCode) => {
    setSelectedPlantCode(plantCode);
    setMaterials([]);
    await loadMaterials(plantCode);
  }, [loadMaterials]);

  return (
    <SapStatusContext.Provider value={{
      status,
      plants,
      syncMeta,
      selectedPlantCode,
      materials,
      materialsLoading,
      lastSync,
      syncing,
      error,
      refresh,
      handlePlantChange,
    }}>
      {children}
    </SapStatusContext.Provider>
  );
}

export function useSapStatus() {
  return useContext(SapStatusContext);
}