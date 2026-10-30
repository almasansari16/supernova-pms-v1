import { useState, useCallback } from "react";
import {
  Clock, Database, Link2, Lock, RefreshCw,
  Settings as SettingsIcon, Wifi, WifiOff, Zap,
} from "lucide-react";
import { PRODUCTS, prodByPid } from "@/entities/product";
import { SerialText, unitSerial } from "@/entities/serial";
import { useProduction } from "@/entities/production";
import { useRegister } from "@/entities/register";
import {
  Btn, Card, CardHead, Chip, FieldGridSkeleton,
  PageHead, SapField, Select, useToast,
} from "@/shared/ui";
import { demoTimestamp } from "@/shared/lib";
import { sapFieldsFor, TEXT_FIELDS } from "../lib/sapFields.js";
import { fetchSapPlants } from "../api/sapApi.js";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

/**
 * Given the live SAP plants payload and the current product, return the
 * best-matching plant object (or null when the list is empty / not loaded yet).
 *
 * Matching order:
 *   1. plant whose plantCode matches the numeric prefix of p.plant  ("7000" in "7000 · Main…")
 *   2. first item as a fallback
 */
function resolvePlant(plants, p) {
  if (!plants?.length) return null;
  const code = p?.plant?.split("·")[0]?.trim() ?? "";
  return plants.find((pl) => pl.plantCode === code) ?? plants[0];
}

/**
 * Build the [label, value] pairs for the "Fields received from SAP" card.
 * Non-plant fields come from the product master; Plant and Storage Location
 * are overridden with live SAP data when available.
 */
function buildFieldRows(p, plants, selectedPlantCode, selectedSlocCode) {
  const base = sapFieldsFor(p); // original 10 rows from static data

  if (!plants?.length) return base; // no live data yet → show static

  const plant =
    plants.find((pl) => pl.plantCode === selectedPlantCode) ??
    resolvePlant(plants, p);

  if (!plant) return base;

  const sloc =
    plant.storageLocations?.find((s) => s.code === selectedSlocCode) ??
    plant.storageLocations?.[0];

  // Replace Plant and Storage Location rows with live values
  return base.map(([k, v]) => {
    if (k === "Plant")
      return [k, `${plant.plantCode} · ${plant.name}`];
    if (k === "Storage Location")
      return [k, sloc ? `${sloc.code} · ${sloc.name}` : v];
    return [k, v];
  });
}

/* ─── component ───────────────────────────────────────────────────────────── */

export default function SapSyncPage() {
  const production = useProduction();
  const { seq } = useRegister();
  const toast = useToast();

  const [pid, setPid] = useState(production.pid);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);      // null until first pull
  const [ms, setMs] = useState(null);
  const [error, setError] = useState(null);

  // Live data from /api/v1/sap/plants
  const [plants, setPlants] = useState([]);            // items[]
  const [syncMeta, setSyncMeta] = useState(null);       // { syncRunId, source, readAtUtc }

  // User-selected plant / sloc (reset on each Refresh)
  const [selectedPlantCode, setSelectedPlantCode] = useState(null);
  const [selectedSlocCode, setSelectedSlocCode] = useState(null);

  const p = prodByPid(pid);

  /* Active plant derived from state */
  const activePlant =
    plants.find((pl) => pl.plantCode === selectedPlantCode) ??
    resolvePlant(plants, p);

  /* Pull live data from the backend */
  const pull = useCallback(async () => {
    setSyncing(true);
    setError(null);
    const t0 = performance.now();
    try {
      const data = await fetchSapPlants();
      const elapsed = Math.round(performance.now() - t0);

      setPlants(data.items ?? []);
      setSyncMeta({
        syncRunId: data.syncRunId,
        source: data.source,
        readAtUtc: data.readAtUtc,
      });

      // Auto-select the best plant for the current product
      const best = resolvePlant(data.items ?? [], p);
      setSelectedPlantCode(best?.plantCode ?? null);
      setSelectedSlocCode(best?.storageLocations?.[0]?.code ?? null);

      setLastSync(demoTimestamp({ seconds: true }));
      setMs(elapsed);
      production.setPid(pid);
      toast(`Plants synced from SAP — ${data.count ?? (data.items?.length ?? 0)} plant(s) loaded`);
    } catch (err) {
      setError(err?.message ?? "Failed to reach SAP backend");
      toast(`Sync failed: ${err?.message ?? "network error"}`, "error");
    } finally {
      setSyncing(false);
    }
  }, [pid, p, production, toast]);

  /* Status row chips */
  const isConnected = plants.length > 0 && !error;
  const status = [
    [
      "Connection",
      syncing ? "Handshaking…" : isConnected ? "Connected" : error ? "Error" : "Not synced",
      syncing ? "c-warn" : isConnected ? "c-ok" : error ? "c-err" : "c-mut",
      syncing ? RefreshCw : isConnected ? Wifi : WifiOff,
    ],
    [
      "Last successful pull",
      lastSync ?? "—",
      lastSync ? "c-info" : "c-mut",
      Clock,
    ],
    [
      "Round trip",
      ms !== null ? `${ms} ms` : "—",
      ms !== null ? "c-ok" : "c-mut",
      Zap,
    ],
    [
      "Fields mapped",
      plants.length ? "10 of 10" : "—",
      plants.length ? "c-ok" : "c-mut",
      Link2,
    ],
  ];

  /* Field rows for the bottom card */
  const fieldRows = buildFieldRows(p, plants, selectedPlantCode, selectedSlocCode);

  /* Timestamp label for the CardHead subtitle */
  const payloadTs = syncMeta?.readAtUtc
    ? new Date(syncMeta.readAtUtc).toLocaleString()
    : lastSync ?? "not yet synced";

  return (
    <div>
      <PageHead
        crumbs={["Home", "SAP Sync"]}
        title="SAP S/4HANA master data"
        sub="These ten fields are read-only in this application — they are owned by SAP and pulled on demand. Nothing here can be typed over."
        actions={
          <>
            <Btn kind="g" icon={SettingsIcon}>Connection settings</Btn>
            <Btn kind="p" icon={RefreshCw} onClick={pull} disabled={syncing}>
              {syncing ? "Pulling…" : "Refresh from SAP"}
            </Btn>
          </>
        }
      />

      <div
        className="grid"
        style={{ gridTemplateColumns: "minmax(0,1fr) 300px", marginBottom: 14 }}
      >
        {/* ── Interface status ── */}
        <Card>
          <CardHead
            title="Interface status"
            icon={Database}
            sub={`RFC destination S4H_PRD · IDoc + OData dual channel${syncMeta ? ` · Run #${syncMeta.syncRunId} (${syncMeta.source})` : ""}`}
          />
          <div
            style={{
              padding: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
              gap: 14,
            }}
          >
            {status.map(([k, v, tone, Ic]) => (
              <div key={k}>
                <div
                  className="lbl"
                  style={{
                    fontSize: 10.5,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    color: "var(--slate-2)",
                    fontWeight: 600,
                  }}
                >
                  {k}
                </div>
                <div style={{ marginTop: 7 }}>
                  <Chip tone={tone} icon={Ic}>{v}</Chip>
                </div>
              </div>
            ))}
          </div>

          {/* ── Error banner ── */}
          {error && (
            <div
              style={{
                margin: "0 18px 16px",
                padding: "10px 14px",
                background: "var(--red-soft, #fef2f2)",
                border: "1px solid var(--red-2, #fca5a5)",
                borderRadius: 8,
                fontSize: 12,
                color: "var(--red, #dc2626)",
              }}
            >
              ⚠ {error}
            </div>
          )}
        </Card>

        {/* ── Product + plant selectors ── */}
        <Card className="pad">
          <div
            style={{ fontSize: 11.5, fontWeight: 600, color: "var(--slate)", marginBottom: 8 }}
          >
            Select packaging order
          </div>
          <Select
            value={pid}
            onChange={(e) => setPid(e.target.value)}
            options={PRODUCTS.map((x) => x.pid)}
          />
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--slate)" }}>{p.name}</div>
          <div className="hint" style={{ marginTop: 12 }}>
            Product ID drives the serial prefix. Order {p.pkgOrder} maps to product ID {pid}.
          </div>

          {/* Live plant picker (only when plants are loaded) */}
          {plants.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--slate-2)",
                  textTransform: "uppercase",
                  letterSpacing: ".07em",
                  marginBottom: 6,
                }}
              >
                SAP Plant
              </div>
              <Select
                value={selectedPlantCode ?? ""}
                onChange={(e) => {
                  setSelectedPlantCode(e.target.value);
                  const pl = plants.find((x) => x.plantCode === e.target.value);
                  setSelectedSlocCode(pl?.storageLocations?.[0]?.code ?? null);
                }}
                options={plants.map((pl) => pl.plantCode)}
                labels={plants.map((pl) => `${pl.plantCode} · ${pl.name}`)}
              />

              {/* Storage location picker */}
              {activePlant?.storageLocations?.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--slate-2)",
                      textTransform: "uppercase",
                      letterSpacing: ".07em",
                      marginBottom: 6,
                    }}
                  >
                    Storage Location
                  </div>
                  <Select
                    value={selectedSlocCode ?? ""}
                    onChange={(e) => setSelectedSlocCode(e.target.value)}
                    options={activePlant.storageLocations.map((s) => s.code)}
                    labels={activePlant.storageLocations.map((s) => `${s.code} · ${s.name}`)}
                  />
                </div>
              )}
            </div>
          )}

          <div
            style={{
              marginTop: 14,
              padding: 12,
              background: "var(--nova-soft)",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontSize: 10.5,
                textTransform: "uppercase",
                letterSpacing: ".08em",
                color: "#1739A0",
                fontWeight: 700,
              }}
            >
              Next unit serial
            </div>
            <div style={{ marginTop: 6 }}>
              <SerialText value={unitSerial(pid, seq[pid])} pid={pid} size={16} />
            </div>
          </div>
        </Card>
      </div>

      {/* ── Fields received from SAP ── */}
      <Card>
        <CardHead
          title="Fields received from SAP"
          icon={Database}
          sub={syncing ? "Reading…" : `Payload timestamp ${payloadTs}`}
          right={<Chip tone="c-mut" icon={Lock}>Read-only</Chip>}
        />
        <div style={{ padding: 18 }}>
          {syncing ? (
            <FieldGridSkeleton />
          ) : (
            <div className="grid g-3 rise">
              {fieldRows.map(([k, v]) => (
                <SapField key={k} k={k} v={v} mono={!TEXT_FIELDS.includes(k)} />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
