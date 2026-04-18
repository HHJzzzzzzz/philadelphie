import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-indigo-50/40">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
    </div>
  );
}
