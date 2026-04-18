import { DashboardTopBar } from "@/components/dashboard/top-bar";
import { InscriptionForm } from "@/components/fideles/inscription-form";

export default function InscriptionPage() {
  return (
    <div className="animate-fade-in">
      <DashboardTopBar title="Inscription d’un fidèle" />
      <InscriptionForm />
    </div>
  );
}
