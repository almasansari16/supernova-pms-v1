import { useNavigate } from "react-router-dom";
import { Play, RefreshCw } from "lucide-react";
import { getPersona, useSession } from "@/entities/session";
import { Btn, KPI, PageHead, useToast } from "@/shared/ui";
import { useSimulatedLoading } from "@/shared/hooks";
import { ROUTES } from "@/shared/config";
import { kpisForRole } from "../data/kpis.js";
import { SapStatusTile } from "../components/SapStatusTile.jsx";
import { DailyProductionCard } from "../components/DailyProductionCard.jsx";
import { SerializationProgressCard } from "../components/SerializationProgressCard.jsx";
import { PackagingTrendCard } from "../components/PackagingTrendCard.jsx";
import { TopProductsCard } from "../components/TopProductsCard.jsx";
import { RecentActivityCard } from "../components/RecentActivityCard.jsx";

export default function DashboardPage() {
  const { role } = useSession();
  const toast = useToast();
  const navigate = useNavigate();
  const loading = useSimulatedLoading(520);

  return (
    <div>
      <PageHead
        crumbs={["Home","Dashboard"]}
        title={`Good morning, ${getPersona(role).first}`}
        sub={`Signed in as ${role} · Karachi Plant 1100 · Thursday, 30 July 2026`}
        actions={<>
          <Btn kind="g" icon={RefreshCw} onClick={() => toast("Dashboard refreshed")}>Refresh</Btn>
          <Btn kind="p" icon={Play} onClick={() => navigate(ROUTES.packaging)}>Start packaging run</Btn>
        </>}
      />

      <div className="grid g-kpi rise" style={{ marginBottom:14 }}>
        {kpisForRole(role).map(k => <KPI key={k.label} {...k} />)}
        <SapStatusTile />
      </div>

      <div className="grid" style={{ gridTemplateColumns:"minmax(0,1.55fr) minmax(0,1fr)", marginBottom:14 }}>
        <DailyProductionCard loading={loading} />
        <SerializationProgressCard />
      </div>

      <div className="grid" style={{ gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr) minmax(0,1.15fr)" }}>
        <PackagingTrendCard />
        <TopProductsCard />
        <RecentActivityCard loading={loading} />
      </div>
    </div>
  );
}
