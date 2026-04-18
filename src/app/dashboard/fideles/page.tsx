import { DashboardTopBar } from "@/components/dashboard/top-bar";
import { FidelesTable } from "@/components/fideles/fideles-table";

export default function FidelesPage() {
  return (
    <div className="animate-fade-in">
      <DashboardTopBar title="Gestion des fidèles" />
      <FidelesTable />
    </div>
  );
}
