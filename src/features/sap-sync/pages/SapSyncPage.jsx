import { useState, useCallback, useRef } from "react";
import {
  Clock, Database, Link2, RefreshCw,
  Settings as SettingsIcon, Wifi, WifiOff, Zap,
  Package, ChevronDown, ChevronUp,
  AlertTriangle, BoxSelect, CheckCircle,
  Trash2, Activity, X, Layers,
} from "lucide-react";
import {
  Btn, Card, CardHead, Chip, FieldGridSkeleton,
  PageHead, SearchBox, Select, KPI, useToast,
} from "@/shared/ui";
import { fetchSapBatches } from "../api/sapApi.js";
import { useSapStatus } from "@/shared/lib/SapStatusProvider";



const STYLES = `
.sap-sync-page { --table-text: color-mix(in srgb, var(--slate) 82%, var(--ink)); --table-muted: color-mix(in srgb, var(--slate-2) 75%, var(--ink)); }
.sn .sap-sync-page :is(table.tbl, table.md-mini) { --slate: var(--table-text); --slate-2: var(--table-muted); }
.sn .sap-sync-page :is(table.tbl, table.md-mini) tbody td { font-weight: 500; }
.sn .sap-sync-page .table-controls { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 320px); align-items: center; gap: 10px; width: 610px; max-width: 100%; min-width: 0; }
.sn .sap-sync-page .table-controls .searchbox { display: flex; }
.sn .sap-sync-page .table-controls > * { max-width: 100%; min-width: 0; }
.sn .sap-sync-page .table-controls select { width: 100%; }
@media (max-width: 600px) { .sn .sap-sync-page .table-controls { width: 100%; grid-template-columns: minmax(0, 1fr); } }

@keyframes mdFadeIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
.md-row { transition: background .15s ease; cursor: pointer; }
.md-row:hover { background: var(--mist); }
.md-row.md-active { background: var(--nova-soft); }
.md-row.md-active td:first-child { box-shadow: inset 3px 0 0 var(--nova, #4F46E5); }
.md-expand { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .28s ease; }
.md-expand.md-open { grid-template-rows: 1fr; }
.md-expand > div { overflow: hidden; }
.md-card { background: var(--surface, #fff); border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 6px 20px rgba(15,23,42,.07), 0 1px 3px rgba(15,23,42,.05); }
.md-inline { margin: 4px 16px 16px 16px; animation: mdFadeIn .28s ease; }
.md-section-title { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:var(--slate-2); margin-bottom:10px; display:flex; align-items:center; gap:6px; }
.md-mini { width:100%; border-collapse:collapse; font-size:12px; }
.md-mini th { text-align:left; font-size:10.5px; font-weight:600; color:var(--slate-2); padding:8px 10px; background:var(--mist); border-bottom:1px solid var(--line); }
.md-mini th:first-child { border-top-left-radius:8px; }
.md-mini th:last-child { border-top-right-radius:8px; }
.md-mini td { padding:8px 10px; border-bottom:1px solid var(--line); color:var(--slate); }
.md-mini tr:last-child td { border-bottom:none; }
.md-box { border:1px solid var(--line); border-radius:10px; overflow:hidden; }
`;



const pill = (bg, color, border) => ({
  fontSize: 10, fontWeight: 700, padding: "1px 7px",
  background: bg, color, borderRadius: 20, border: `1px solid ${border}`,
  display: "inline-flex", alignItems: "center", gap: 3, whiteSpace: "nowrap",
});

const isExpiredBatch = (b) => b.expiryDate && new Date(b.expiryDate) < new Date();

function DeletedPill() {
  return <span style={pill("#fef2f2", "#dc2626", "#fca5a5")}><AlertTriangle size={9} /> deleted</span>;
}

function BatchStatus({ b }) {
  const expired = isExpiredBatch(b);
  return (
    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
      {!b.isRestricted && !b.isMarkedForDeletion && !expired && (
        <span style={pill("var(--mint-soft)", "#08744F", "var(--mint)")}>OK</span>
      )}
      {expired && <span style={pill("#fef2f2", "#dc2626", "#fca5a5")}><AlertTriangle size={9} /> expired</span>}
      {b.isRestricted && <span style={pill("#fffbeb", "#92400e", "#fcd34d")}>restricted</span>}
      {b.isMarkedForDeletion && <DeletedPill />}
    </div>
  );
}

function PackagingTable({ m }) {
  if (!m.packagingUnits?.length) {
    return <div style={{ fontSize: 12, color: "var(--slate-2)" }}>No packaging units.</div>;
  }
  return (
    <div className="md-box">
      <table className="md-mini">
        <thead>
          <tr>{["Level", "UoM", "GTIN", "Qty in base"].map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {m.packagingUnits.map((u) => (
            <tr key={u.level}>
              <td>
                <span style={{
                  fontWeight: 700, fontSize: 11, background: "var(--nova-soft)",
                  color: "var(--nova, #4F46E5)", padding: "2px 8px", borderRadius: 4,
                }}>
                  {u.level}
                </span>
              </td>
              <td className="num">{u.unitOfMeasure}</td>
              <td className="num" style={{ color: u.gtin ? "var(--slate)" : "var(--slate-2)" }}>
                {u.gtin ?? "—"}
              </td>
              <td className="num">{u.quantityInBaseUnit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BatchContent({ state }) {
  if (!state || state.loading) {
    return <div style={{ fontSize: 12, color: "var(--slate-2)", padding: "8px 0" }}>Loading batches…</div>;
  }
  if (state.error) {
    return (
      <div style={{
        fontSize: 12, padding: "8px 12px", borderRadius: 8,
        background: "var(--red-soft, #fef2f2)", color: "var(--red, #dc2626)",
        border: "1px solid var(--red-2, #fca5a5)",
      }}>
        ⚠ {state.error}
      </div>
    );
  }
  if (!state.items?.length) {
    return <div style={{ fontSize: 12, color: "var(--slate-2)", padding: "8px 0" }}>No batches found.</div>;
  }
  return (
    <div className="md-box">
      <table className="md-mini">
        <thead>
          <tr>
            {["Batch", "Manufactured", "Expiry", "Status", "Last changed"].map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.items.map((b) => {
            const expired = isExpiredBatch(b);
            return (
              <tr key={b.batchNumber} style={{ background: b.isMarkedForDeletion ? "#fef9f9" : "transparent" }}>
                <td className="num" style={{ fontWeight: 700 }}>{b.batchNumber}</td>
                <td className="num">{b.manufactureDate ?? "—"}</td>
                <td className="num" style={{
                  color: expired ? "var(--red, #dc2626)" : "var(--slate)",
                  fontWeight: expired ? 700 : 400,
                }}>
                  {b.expiryDate ?? "—"}
                </td>
                <td><BatchStatus b={b} /></td>
                <td className="num" style={{ color: "var(--slate-2)", fontSize: 11 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={10} />
                    {new Date(b.lastChangedAtUtc).toLocaleDateString()}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}



function useBatchCache() {
  const [cache, setCache] = useState({});
  const inflight = useRef({});

  const load = useCallback(async (code) => {
    if (cache[code] || inflight.current[code]) return;
    inflight.current[code] = true;
    setCache((c) => ({ ...c, [code]: { loading: true, error: null, items: null } }));
    try {
      const data = await fetchSapBatches(code);
      setCache((c) => ({ ...c, [code]: { loading: false, error: null, items: data.items ?? [] } }));
    } catch (err) {
      setCache((c) => ({ ...c, [code]: { loading: false, error: err?.message ?? "Failed", items: [] } }));
    } finally {
      delete inflight.current[code];
    }
  }, [cache]);

  const reset = useCallback(() => setCache({}), []);
  return { cache, load, reset };
}



function MaterialRow({ m, open, onToggle, batchState }) {
  return (
    <>
      <tr
        className={`md-row${open ? " md-active" : ""}`}
        onClick={onToggle}
        style={{ borderBottom: open ? "none" : "1px solid var(--line)" }}
      >
        <td className="num" style={{ fontWeight: 700, color: "var(--ink)" }}>{m.materialCode}</td>
        <td>
          <div style={{ fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: 6 }}>
            {m.description}
            {m.isMarkedForDeletion && <DeletedPill />}
          </div>
          <div style={{ fontSize: 11, color: "var(--slate-2)" }} className="mono">
            Plants: {m.plants?.join(", ")}
          </div>
        </td>
        <td className="num" style={{ color: "var(--ink)" }}>{m.baseUnit}</td>
        <td style={{ color: "var(--ink)" }}>{m.isFinishedGood ? "Finished Good" : "Raw Material"}</td>
        <td className="num" style={{ color: "var(--slate-2)" }}>
          {m.packagingUnits?.length ?? 0} level{m.packagingUnits?.length !== 1 ? "s" : ""}
        </td>
        <td className="num" style={{ color: "var(--slate)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={11} />
            {new Date(m.lastChangedAtUtc).toLocaleDateString()}
          </div>
        </td>
        <td onClick={(e) => e.stopPropagation()}>
          <Btn kind="g" sm icon={open ? ChevronUp : ChevronDown} onClick={onToggle}>
            {open ? "Hide" : "Details"}
          </Btn>
        </td>
      </tr>

      <tr style={{ borderBottom: open ? "1px solid var(--line)" : "none" }}>
        <td colSpan={7} style={{ padding: 0, border: "none", background: open ? "var(--nova-soft)" : "transparent" }}>
          <div className={`md-expand${open ? " md-open" : ""}`}>
            <div>
              {open && (
                <div className="md-card md-inline">
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 16px", borderBottom: "1px solid var(--line)",
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{m.description}</div>
                      <div className="mono" style={{ fontSize: 11, color: "var(--slate-2)" }}>
                        {m.materialCode} · {m.baseUnit} · {m.isFinishedGood ? "Finished Good" : "Raw Material"}
                      </div>
                    </div>
                    <Btn kind="g" sm icon={X} onClick={onToggle}>Close</Btn>
                  </div>
                  <div style={{
                    padding: 16, display: "grid", gap: 18,
                    gridTemplateColumns: "minmax(260px, 1fr) minmax(0, 2fr)",
                  }}>
                    <div>
                      <div className="md-section-title"><Layers size={12} /> Packaging units</div>
                      <PackagingTable m={m} />
                    </div>
                    <div>
                      <div className="md-section-title">
                        <Package size={12} /> Batches
                        {batchState?.items?.length > 0 && (
                          <span style={{ fontWeight: 600, color: "var(--slate)" }}>
                            · {batchState.items.length}
                          </span>
                        )}
                      </div>
                      <BatchContent state={batchState} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}



const MAT_COLUMNS = ["Material code", "Description", "Base unit", "Type", "Pkg levels", "Last changed", ""];

export default function SapSyncPage() {
  const toast = useToast();

  const {
    status: sapStatus,
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
  } = useSapStatus();

  const { cache, load } = useBatchCache();
  const [openCode, setOpenCode] = useState(null);
  const [matSearch, setMatSearch] = useState("");

  const toggle = (code) => {
    if (openCode === code) {
      setOpenCode(null);
    } else {
      load(code);
      setOpenCode(code);
    }
  };

  
  const connected = sapStatus?.isConnected ?? false;
  const isMock    = sapStatus?.source === "Mock";

  const lastPullLabel = sapStatus?.checkedAtUtc
    ? new Date(sapStatus.checkedAtUtc).toLocaleString()
    : lastSync ?? "—";

  const roundTripLabel = sapStatus?.responseTimeMilliseconds != null
    ? `${sapStatus.responseTimeMilliseconds} ms` : "—";

  const fieldsMappedLabel = sapStatus?.fieldsMapped != null
    ? `${sapStatus.fieldsMapped} mapped` : "—";

  const connectionLabel = syncing      ? "Handshaking…"
    : !sapStatus                       ? "Loading…"
    : connected ? (isMock              ? "Mock (connected)" : "Connected")
    : error                            ? "Error" : "Disconnected";

  const connectionTone = syncing       ? "c-warn"
    : !sapStatus                       ? "c-mut"
    : connected ? (isMock              ? "c-warn" : "c-ok")
    : "c-err";

  const statusChips = [
    ["Connection",        connectionLabel,   connectionTone,                                syncing ? RefreshCw : connected ? Wifi : WifiOff],
    ["Last checked",      lastPullLabel,      lastPullLabel  !== "—" ? "c-info" : "c-mut",  Clock],
    ["SAP response time", roundTripLabel,     roundTripLabel !== "—" ? "c-ok"   : "c-mut",  Zap],
    ["Fields mapped",     fieldsMappedLabel,  fieldsMappedLabel !== "—" ? "c-ok" : "c-mut", Link2],
  ];

  const runInfo = syncMeta
    ? ` · Run #${syncMeta.syncRunId} (${syncMeta.source})`
    : sapStatus?.lastReadStatus ? ` · Last read: ${sapStatus.lastReadStatus}` : "";

  
  const totalMaterials   = materials.length;
  const finishedGoods    = materials.filter((m) => m.isFinishedGood).length;
  const rawMaterials     = materials.filter((m) => !m.isFinishedGood).length;
  const flaggedMaterials = materials.filter((m) => m.isMarkedForDeletion).length;
  const totalPlants      = plants.length;

  
  const filteredMaterials = materials.filter((m) =>
    (m.materialCode + m.description).toLowerCase().includes(matSearch.toLowerCase())
  );

  return (
    <div className="sap-sync-page">
      <style>{STYLES}</style>

      <PageHead
        crumbs={["Home", "SAP Sync"]}
        title="SAP S/4HANA master data"
        sub="Master data is read-only — owned by SAP and pulled on demand."
        actions={
          <>
           
            <Btn kind="p" icon={RefreshCw} onClick={() => refresh(toast)} disabled={syncing}>
              {syncing ? "Pulling…" : "Refresh from SAP"}
            </Btn>
          </>
        }
      />

      
      <div className="grid g-kpi" style={{ marginBottom: 14 }}>
        <KPI
          label="Total materials"
          value={totalMaterials > 0 ? String(totalMaterials) : "—"}
          delta={totalMaterials > 0 ? `Plant ${selectedPlantCode}` : "Refresh to load"}
          icon={BoxSelect} tone="nova" trend={false}
        />
        <KPI
          label="Finished goods"
          value={totalMaterials > 0 ? String(finishedGoods) : "—"}
          delta={totalMaterials > 0 ? `${Math.round(finishedGoods / totalMaterials * 100)}% of materials` : "Refresh to load"}
          icon={CheckCircle} tone="mint" trend={false}
        />
        <KPI
          label="Raw materials"
          value={totalMaterials > 0 ? String(rawMaterials) : "—"}
          delta={totalMaterials > 0 ? `${Math.round(rawMaterials / totalMaterials * 100)}% of materials` : "Refresh to load"}
          icon={Layers} tone="spark" trend={false}
        />
        <KPI
          label="Flagged for deletion"
          value={totalMaterials > 0 ? String(flaggedMaterials) : "—"}
          delta={flaggedMaterials > 0 ? "Review recommended" : totalMaterials > 0 ? "None flagged" : "Refresh to load"}
          icon={Trash2} tone={flaggedMaterials > 0 ? "spark" : "mint"} trend={false}
        />
        <KPI
          label="Active plants"
          value={totalPlants > 0 ? String(totalPlants) : "—"}
          delta={totalPlants > 0 ? plants.map((pl) => pl.plantCode).join(", ") : "Refresh to load"}
          icon={Activity} tone="violet" trend={false}
        />
      </div>

      
      <Card style={{ marginBottom: 14 }}>
        <CardHead
          title="Interface status"
          icon={Database}
        />
        <div style={{
          padding: 18, display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14,
        }}>
          {statusChips.map(([k, v, tone, Ic]) => (
            <div key={k}>
              <div className="lbl" style={{
                fontSize: 10.5, textTransform: "uppercase",
                letterSpacing: ".08em", color: "var(--slate-2)", fontWeight: 600,
              }}>
                {k}
              </div>
              <div style={{ marginTop: 7 }}>
                <Chip tone={tone} icon={Ic}>{v}</Chip>
              </div>
            </div>
          ))}
        </div>
        {error && (
          <div style={{
            margin: "0 18px 16px", padding: "10px 14px",
            background: "var(--red-soft, #fef2f2)",
            border: "1px solid var(--red-2, #fca5a5)",
            borderRadius: 8, fontSize: 12, color: "var(--red, #dc2626)",
          }}>
            ⚠ {error}
          </div>
        )}
      </Card>

      
      {(materials.length > 0 || materialsLoading || plants.length > 0) && (
        <Card>
          <CardHead
            title="Fields received from SAP"
            icon={Database}
            sub={
              materialsLoading ? "Loading SAP fields…"
              : materials.length > 0 ? `${materials.length} material(s) · plant ${selectedPlantCode}`
              : "Select a plant to load SAP fields"
            }
            right={
              <div className="table-controls">
                {plants.length > 0 && (
                  <Select
                    value={selectedPlantCode ?? ""}
                    onChange={(e) => handlePlantChange(e.target.value)}
                    options={plants.map((pl) => pl.plantCode)}
                    labels={plants.map((pl) => `${pl.plantCode} · ${pl.name}`)}
                  />
                )}
                {!materialsLoading && materials.length > 0 && (
                  <SearchBox
                    width={320}
                    placeholder="Search SAP fields"
                    value={matSearch}
                    onChange={(e) => setMatSearch(e.target.value)}
                  />
                )}
              </div>
            }
          />
          <div className="tblwrap">
            {materialsLoading ? (
              <div style={{ padding: 18 }}><FieldGridSkeleton /></div>
            ) : (
              <table className="tbl">
                <thead>
                  <tr>{MAT_COLUMNS.map((h) => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filteredMaterials.map((m) => (
                    <MaterialRow
                      key={m.materialCode}
                      m={m}
                      open={openCode === m.materialCode}
                      onToggle={() => toggle(m.materialCode)}
                      batchState={cache[m.materialCode]}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {!materialsLoading && filteredMaterials.length === 0 && materials.length > 0 && (
            <div style={{
              padding: "24px 18px", textAlign: "center",
              fontSize: 13, color: "var(--slate-2)",
            }}>
              No SAP fields match that search.
            </div>
          )}
        </Card>
      )}
    </div>
  );
}