import { DashboardTopBar } from "@/components/dashboard/top-bar";
import { PresencesClient } from "@/components/presences/presences-client";

export default function PresencesPage() {
  return (
    <div className="animate-fade-in">
      <DashboardTopBar title="Gestion des présences" />
      <PresencesClient />
    </div>
  );
}
