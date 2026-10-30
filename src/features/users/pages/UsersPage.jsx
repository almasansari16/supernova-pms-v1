import { Plus } from "lucide-react";
import { Btn, PageHead, useToast } from "@/shared/ui";
import { UsersTable } from "../components/UsersTable.jsx";
import { PermissionMatrix } from "../components/PermissionMatrix.jsx";
import { RoleLandingGrid } from "../components/RoleLandingGrid.jsx";

export default function UsersPage() {
  const toast = useToast();
  return (
    <div>
      <PageHead crumbs={["Home","Users"]} title="Users, roles and permissions"
        sub="Five roles cover the plant floor. What a person can do follows the role, and the dashboard they land on changes with it."
        actions={<Btn kind="p" icon={Plus} onClick={() => toast("Invitation sent")}>Add user</Btn>} />

      <div className="grid" style={{ gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)", marginBottom:14 }}>
        <UsersTable />
        <PermissionMatrix />
      </div>

      <RoleLandingGrid />
    </div>
  );
}
