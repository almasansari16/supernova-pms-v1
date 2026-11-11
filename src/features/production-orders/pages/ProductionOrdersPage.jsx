import { useEffect, useId, useRef, useState } from "react";
import {
  RefreshCw,
  Download,
  Factory,
  ClipboardList,
  CheckCircle,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Play,
  X,
  Clock,
  Calendar,
  Package,
  Layers,
  Activity,
} from "lucide-react";
import {
  Btn,
  Card,
  CardHead,
  Empty,
  KPI,
  PageHead,
  SearchBox,
  Select,
  FieldGridSkeleton,
  useToast,
} from "@/shared/ui";
import { nf } from "@/shared/lib";
import { fetchProductionOrderDetail } from "../api/productionOrderApi.js";
import { useProductionOrders } from "@/shared/lib/ProductionOrdersProvider";

const STYLES = `
.production-orders-page { --table-text: color-mix(in srgb, var(--slate) 82%, var(--ink)); --table-muted: color-mix(in srgb, var(--slate-2) 75%, var(--ink)); }
.sn .production-orders-page :is(table.tbl, table.po-mini) { --slate: var(--table-text); --slate-2: var(--table-muted); }
.sn .production-orders-page :is(table.tbl, table.po-mini) tbody td { font-weight: 500; }
.sn .production-orders-page .table-controls { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 320px); align-items: center; gap: 10px; width: 610px; max-width: 100%; min-width: 0; }
.sn .production-orders-page .table-controls .searchbox { display: flex; }
.sn .production-orders-page .table-controls > * { max-width: 100%; min-width: 0; }
.sn .production-orders-page .table-controls select { width: 100%; }
@media (max-width: 600px) { .sn .production-orders-page .table-controls { width: 100%; grid-template-columns: minmax(0, 1fr); } }

@keyframes poFadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
.po-row { transition: background .15s ease; cursor: pointer; }
.po-row:hover { background: var(--mist); }
.po-row.po-active { background: var(--nova-soft); }
.po-row.po-active td:first-child { box-shadow: inset 3px 0 0 var(--nova); }
.po-expand { display: grid; grid-template-rows: 0fr; visibility: hidden; transition: grid-template-rows .28s ease, visibility .28s; }
.po-expand.po-open { grid-template-rows: 1fr; visibility: visible; }
.po-expand > div { overflow: hidden; min-height: 0; }
.po-detail { margin: 4px 16px 16px; background: var(--white, Canvas); color: var(--slate); border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 6px 20px color-mix(in srgb, var(--slate) 7%, transparent), 0 1px 3px color-mix(in srgb, var(--slate) 5%, transparent); }
.po-open .po-detail { animation: poFadeIn .28s ease; }
.po-detail-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--line); }
.po-detail-heading { display: flex; align-items: center; gap: 10px; min-width: 0; }
.po-detail-mark { display: flex; align-items: center; justify-content: center; flex: 0 0 34px; height: 34px; border-radius: 8px; background: var(--nova-soft); color: var(--nova); }
.po-detail-title { font-size: 14px; font-weight: 700; overflow-wrap: anywhere; }
.po-detail-sub { margin-top: 3px; font-size: 11px; color: var(--slate-2); overflow-wrap: anywhere; }
.po-detail-actions { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.po-detail-body { padding: 16px; }
.po-detail-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); gap: 18px; }
.po-detail-group { min-width: 0; }
.po-detail-section { display: flex; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 700; text-transform: uppercase; color: var(--slate-2); margin-bottom: 10px; }
.po-detail-section svg { color: var(--nova); flex-shrink: 0; }
.po-box { border: 1px solid var(--line); border-radius: 10px; overflow-x: auto; }
.po-mini { width: 100%; border-collapse: collapse; font-size: 12px; table-layout: fixed; }
.po-mini th { text-align: left; font-size: 10.5px; font-weight: 600; color: var(--slate-2); padding: 8px 10px; background: var(--mist); border-bottom: 1px solid var(--line); }
.po-mini td { padding: 8px 10px; border-bottom: 1px solid var(--line); color: var(--slate); overflow-wrap: anywhere; vertical-align: top; }
.po-mini tbody tr:last-child td { border-bottom: none; }
.po-mini .po-field-name { color: var(--slate-2); font-size: 11px; }
.po-mini .po-field-value { font-weight: 600; }
.po-mini .po-accent { color: var(--nova); }
.po-mini .po-yield { color: var(--mint-ink, var(--mint)); }
.po-detail-flags { display: flex; align-items: center; flex-wrap: wrap; gap: 10px 18px; padding-top: 14px; margin-top: 16px; border-top: 1px solid var(--line); }
.po-detail-flags .po-detail-section { margin: 0; }
.po-detail-flag { display: inline-flex; align-items: center; gap: 7px; font-size: 11px; color: var(--slate-2); }
.po-pill { display: inline-flex; align-items: center; gap: 3px; white-space: nowrap; font-size: 10px; font-weight: 700; border-radius: 20px; padding: 1px 7px; border: 1px solid var(--line); background: var(--mist); color: var(--slate-2); }
.po-pill.po-released { background: var(--nova-soft); color: var(--nova); border-color: color-mix(in srgb, var(--nova) 25%, var(--line)); }
.po-pill.po-in-progress, .po-pill.po-completed, .po-pill.po-yes { background: var(--mint-soft); color: var(--mint-ink, var(--mint)); border-color: var(--mint); }
.po-pill.po-deleted { background: var(--red-soft, var(--spark-soft)); color: var(--red, var(--spark)); border-color: var(--red-2, var(--spark)); }
.po-detail-message { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; font-size: 12px; color: var(--slate-2); padding: 8px 0; }
.po-detail-error { padding: 8px 12px; border-radius: 8px; background: var(--red-soft, var(--spark-soft)); border: 1px solid var(--red-2, var(--spark)); color: var(--red, var(--spark)); }
.po-spin { animation: poSpin 1s linear infinite; }
@keyframes poSpin { to { transform: rotate(360deg); } }
@media (max-width: 760px) { .po-detail-grid { grid-template-columns: minmax(0, 1fr); } .po-detail { margin: 4px 8px 12px; } .po-detail-head, .po-detail-body { padding: 12px; } .po-detail-head { flex-wrap: wrap; } .po-detail-actions { margin-left: auto; } }
@media (prefers-reduced-motion: reduce) { .po-expand, .po-row { transition: none; } .po-open .po-detail, .po-spin { animation: none; } }
`;

function deriveStatus(order) {
  if (order.isDeleted) return "deleted";
  if (order.isTechnicallyCompleted) return "completed";
  if (order.confirmedYieldQuantity > 0) return "in-progress";
  return "released";
}

const STATUS_LABELS = {
  released: "Released",
  "in-progress": "In progress",
  completed: "Completed",
  deleted: "Deleted",
};

function StatusBadge({ order }) {
  const status = deriveStatus(order);
  const Icon =
    status === "deleted"
      ? AlertTriangle
      : status === "completed"
        ? CheckCircle
        : status === "in-progress"
          ? Play
          : null;
  return (
    <span className={`po-pill po-${status}`}>
      {Icon && <Icon size={9} />}
      {STATUS_LABELS[status]}
    </span>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="po-detail-section">
      {Icon && <Icon size={12} />}
      {children}
    </div>
  );
}

function DetailTable({ rows }) {
  return (
    <div className="po-box">
      <table className="po-mini">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, value, tone]) => (
            <tr key={label}>
              <td className="po-field-name">{label}</td>
              <td className={`mono po-field-value${tone ? ` po-${tone}` : ""}`}>
                {value ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatChangedDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString();
}

function OrderRow({ order, open, onToggle }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const requestPending = useRef(false);
  const mounted = useRef(false);
  const panelId = useId();

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const loadDetail = async () => {
    if (requestPending.current) return;
    requestPending.current = true;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductionOrderDetail(order.orderNumber);
      if (mounted.current) {
        setDetail(data.items?.[0] ?? null);
        setLoaded(true);
      }
    } catch (err) {
      if (mounted.current)
        setError(err?.message ?? "Failed to load order detail");
    } finally {
      requestPending.current = false;
      if (mounted.current) setLoading(false);
    }
  };

  const handleToggle = () => {
    onToggle();
    if (!open && !loaded) void loadDetail();
  };

  const pct =
    order.totalQuantity > 0
      ? Math.round((order.confirmedYieldQuantity / order.totalQuantity) * 100)
      : 0;
  const progressWidth = Math.min(100, Math.max(0, pct));

  return (
    <>
      <tr
        className={`po-row${open ? " po-active" : ""}`}
        style={{ borderBottom: open ? "none" : "1px solid var(--line)" }}
        onClick={handleToggle}
      >
        <td className="num" style={{ fontWeight: 700 }}>
          {order.orderNumber}
        </td>
        <td>
          <div style={{ fontWeight: 600 }}>{order.materialCode}</div>
          <div
            style={{ fontSize: 11, color: "var(--slate-2)" }}
            className="mono"
          >
            Batch: {order.batchNumber}
          </div>
        </td>
        <td>
          <div style={{ fontWeight: 600 }}>{order.plantCode}</div>
          <div
            style={{ fontSize: 11, color: "var(--slate-2)" }}
            className="mono"
          >
            {order.storageLocation}
          </div>
        </td>
        <td className="num">
          {nf(order.totalQuantity)} {order.unit}
        </td>
        <td style={{ minWidth: 140 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                flex: 1,
                height: 6,
                background: "var(--mist)",
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progressWidth}%`,
                  height: "100%",
                  background: pct >= 100 ? "var(--mint)" : "var(--nova)",
                  borderRadius: 20,
                }}
              />
            </div>
            <span
              className="mono"
              style={{ fontSize: 11.5, color: "var(--slate)" }}
            >
              {pct}%
            </span>
          </div>
          <div
            style={{ fontSize: 10.5, color: "var(--slate-2)", marginTop: 3 }}
            className="mono"
          >
            {nf(order.confirmedYieldQuantity)} / {nf(order.totalQuantity)}
          </div>
        </td>
        <td style={{ fontSize: 11, color: "var(--slate)" }}>
          <div
            className="mono"
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <Calendar size={11} />
            {order.plannedStartDate}
          </div>
          <div className="mono" style={{ color: "var(--slate-2)" }}>
            → {order.plannedEndDate}
          </div>
        </td>
        <td>
          <StatusBadge order={order} />
        </td>
        <td onClick={(e) => e.stopPropagation()}>
          <Btn
            kind="g"
            sm
            icon={open ? ChevronUp : ChevronDown}
            onClick={handleToggle}
            aria-expanded={open}
            aria-controls={panelId}
          >
            {open ? "Hide" : "Details"}
          </Btn>
        </td>
      </tr>
      <tr style={{ borderBottom: open ? "1px solid var(--line)" : "none" }}>
        <td
          colSpan={8}
          style={{
            padding: 0,
            border: "none",
            background: open ? "var(--nova-soft)" : "transparent",
          }}
        >
          <div
            className={`po-expand${open ? " po-open" : ""}`}
            inert={!open}
            aria-hidden={!open}
          >
            <div>
              <section
                className="po-detail"
                id={panelId}
                aria-label={`Order ${order.orderNumber} details`}
              >
                <div className="po-detail-head">
                  <div className="po-detail-heading">
                    <span className="po-detail-mark">
                      <ClipboardList size={17} />
                    </span>
                    <div>
                      <div className="po-detail-title">
                        Order {order.orderNumber}
                      </div>
                      <div className="mono po-detail-sub">
                        {order.materialCode} · Batch {order.batchNumber} · Plant{" "}
                        {order.plantCode}
                      </div>
                    </div>
                  </div>
                  <div className="po-detail-actions">
                    <StatusBadge order={detail ?? order} />
                    <Btn kind="g" sm icon={X} onClick={onToggle}>
                      Close
                    </Btn>
                  </div>
                </div>
                <div className="po-detail-body" aria-busy={loading}>
                  {loading && (
                    <div className="po-detail-message" role="status">
                      <RefreshCw size={13} className="po-spin" />
                      Loading order detail…
                    </div>
                  )}
                  {!loading && error && (
                    <div
                      className="po-detail-message po-detail-error"
                      role="alert"
                    >
                      <AlertTriangle size={14} />
                      <span>{error}</span>
                      <Btn kind="g" sm icon={RefreshCw} onClick={loadDetail}>
                        Retry
                      </Btn>
                    </div>
                  )}
                  {!loading && !error && loaded && !detail && (
                    <div className="po-detail-message">
                      No details available for this order.
                    </div>
                  )}
                  {!loading && !error && detail && (
                    <>
                      <div className="po-detail-grid">
                        <div className="po-detail-group">
                          <SectionTitle icon={ClipboardList}>
                            Order info
                          </SectionTitle>
                          <DetailTable
                            rows={[
                              ["Order number", detail.orderNumber, "accent"],
                              ["Order type", detail.orderType],
                              ["Released on", detail.releasedOn],
                              [
                                "Last changed",
                                formatChangedDate(detail.lastChangedAtUtc),
                              ],
                            ]}
                          />
                        </div>
                        <div className="po-detail-group">
                          <SectionTitle icon={Layers}>Quantities</SectionTitle>
                          <div className="po-box">
                            <table className="po-mini">
                              <thead>
                                <tr>
                                  <th>Total quantity</th>
                                  <th>Confirmed yield</th>
                                  <th>Remaining</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="mono po-field-value po-accent">
                                    {nf(detail.totalQuantity)} {detail.unit}
                                  </td>
                                  <td className="mono po-field-value po-yield">
                                    {nf(detail.confirmedYieldQuantity)}{" "}
                                    {detail.unit}
                                  </td>
                                  <td className="mono po-field-value">
                                    {nf(
                                      detail.totalQuantity -
                                        detail.confirmedYieldQuantity,
                                    )}{" "}
                                    {detail.unit}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div style={{ marginTop: 18 }}>
                            <SectionTitle icon={Calendar}>
                              Schedule
                            </SectionTitle>
                            <div className="po-box">
                              <table className="po-mini">
                                <thead>
                                  <tr>
                                    <th>Planned start</th>
                                    <th>Planned end</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="mono">
                                      <div>
                                        {detail.plannedStartDate ?? "—"}
                                      </div>
                                      <div className="po-detail-sub">
                                        {detail.plannedStartTime ?? "—"}
                                      </div>
                                    </td>
                                    <td className="mono">
                                      <div>{detail.plannedEndDate ?? "—"}</div>
                                      <div className="po-detail-sub">
                                        {detail.plannedEndTime ?? "—"}
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div
                          className="po-detail-group"
                          style={{ gridColumn: "1 / -1" }}
                        >
                          <SectionTitle icon={Package}>
                            Material & location
                          </SectionTitle>
                          <div className="po-box">
                            <table className="po-mini">
                              <thead>
                                <tr>
                                  <th>Material code</th>
                                  <th>Batch number</th>
                                  <th>Plant</th>
                                  <th>Storage location</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="mono po-field-value po-accent">
                                    {detail.materialCode ?? "—"}
                                  </td>
                                  <td className="mono po-field-value">
                                    {detail.batchNumber ?? "—"}
                                  </td>
                                  <td className="mono">
                                    {detail.plantCode ?? "—"}
                                  </td>
                                  <td className="mono">
                                    {detail.storageLocation ?? "—"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="po-detail-flags">
                        <SectionTitle icon={Activity}>Flags</SectionTitle>
                        {[
                          ["Released", detail.isReleased],
                          [
                            "Technically completed",
                            detail.isTechnicallyCompleted,
                          ],
                          ["Deleted", detail.isDeleted],
                        ].map(([label, value]) => (
                          <div key={label} className="po-detail-flag">
                            <span>{label}</span>
                            <span
                              className={`po-pill${value ? (label === "Deleted" ? " po-deleted" : " po-yes") : ""}`}
                            >
                              {value ? "Yes" : "No"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

const COLUMNS = [
  "Order number",
  "Material / Batch",
  "Plant / SLoc",
  "Total qty",
  "Progress",
  "Planned dates",
  "Status",
  "",
];

export default function ProductionOrdersPage() {
  const toast = useToast();
  const {
    plants,
    selectedPlantCode,
    orders,
    ordersLoading,
    syncing,
    error,
    refresh,
    handlePlantChange,
  } = useProductionOrders();

  const [openOrder, setOpenOrder] = useState(null);
  const [q, setQ] = useState("");
  const [detailVersion, setDetailVersion] = useState(0);

  useEffect(() => {
    setOpenOrder(null);
  }, [selectedPlantCode]);

  const refreshOrders = () => {
    setOpenOrder(null);
    setDetailVersion((version) => version + 1);
    return refresh(toast);
  };

  const toggle = (orderNumber) => {
    setOpenOrder((prev) => (prev === orderNumber ? null : orderNumber));
  };

  const totalOrders = orders.length;
  const inProgress = orders.filter(
    (o) => o.confirmedYieldQuantity > 0 && !o.isTechnicallyCompleted,
  ).length;
  const completed = orders.filter((o) => o.isTechnicallyCompleted).length;
  const deleted = orders.filter((o) => o.isDeleted).length;

  const filteredOrders = orders.filter((o) =>
    (o.orderNumber + o.materialCode + o.batchNumber + o.plantCode)
      .toLowerCase()
      .includes(q.toLowerCase()),
  );

  return (
    <div className="production-orders-page">
      <style>{STYLES}</style>

      <PageHead
        crumbs={["Home", "Production Orders"]}
        title="Production orders"
        sub="Released orders arriving from SAP S/4HANA — read-only. Refresh to pull the latest from SAP."
        actions={
          <>
            <Btn
              kind="p"
              icon={RefreshCw}
              onClick={refreshOrders}
              disabled={syncing}
            >
              {syncing ? "Pulling…" : "Refresh from SAP"}
            </Btn>
          </>
        }
      />

      <div className="grid g-kpi" style={{ marginBottom: 14 }}>
        <KPI
          label="Total orders"
          value={totalOrders > 0 ? String(totalOrders) : "—"}
          delta={
            totalOrders > 0 ? `Plant ${selectedPlantCode}` : "Refresh to load"
          }
          icon={ClipboardList}
          tone="nova"
          trend={false}
        />
        <KPI
          label="In progress"
          value={totalOrders > 0 ? String(inProgress) : "—"}
          delta={
            inProgress > 0
              ? "Yield confirmed"
              : totalOrders > 0
                ? "None started"
                : "Refresh to load"
          }
          icon={Play}
          tone="mint"
          trend={false}
        />
        <KPI
          label="Completed"
          value={totalOrders > 0 ? String(completed) : "—"}
          delta={
            completed > 0
              ? "Technically complete"
              : totalOrders > 0
                ? "None completed"
                : "Refresh to load"
          }
          icon={CheckCircle}
          tone="violet"
          trend={false}
        />
        <KPI
          label="Flagged / deleted"
          value={totalOrders > 0 ? String(deleted) : "—"}
          delta={
            deleted > 0
              ? "Review recommended"
              : totalOrders > 0
                ? "None flagged"
                : "Refresh to load"
          }
          icon={Trash2}
          tone={deleted > 0 ? "spark" : "mint"}
          trend={false}
        />
      </div>

      <Card>
        <CardHead
          title="Order list"
          icon={Factory}
          sub={
            ordersLoading
              ? "Loading orders…"
              : orders.length > 0
                ? `${orders.length} order(s) · plant ${selectedPlantCode}`
                : "Refresh from SAP to load orders"
          }
          right={
            <div className="table-controls">
              {plants.length > 0 && (
                <Select
                  value={selectedPlantCode ?? ""}
                  onChange={(e) => {
                    setOpenOrder(null);
                    handlePlantChange(e.target.value);
                  }}
                  options={plants.map((pl) => pl.plantCode)}
                  labels={plants.map((pl) => `${pl.plantCode} · ${pl.name}`)}
                />
              )}
              {!ordersLoading && orders.length > 0 && (
                <SearchBox
                  width={320}
                  placeholder="Search orders"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              )}
            </div>
          }
        />

        {error && (
          <div
            style={{
              margin: "0 18px 12px",
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

        <div className="tblwrap">
          {ordersLoading ? (
            <div style={{ padding: 18 }}>
              <FieldGridSkeleton />
            </div>
          ) : (
            <table className="tbl">
              <thead>
                <tr>
                  {COLUMNS.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <OrderRow
                    key={`${selectedPlantCode}:${o.orderNumber}:${detailVersion}`}
                    order={o}
                    open={openOrder === o.orderNumber}
                    onToggle={() => toggle(o.orderNumber)}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!ordersLoading && filteredOrders.length === 0 && orders.length > 0 && (
          <Empty
            icon={ClipboardList}
            title="No orders match that search"
            body="Clear the search box or refresh from SAP to pull newly released orders."
            action={
              <Btn kind="g" icon={RefreshCw} onClick={() => setQ("")}>
                Clear search
              </Btn>
            }
          />
        )}
      </Card>
    </div>
  );
}
