import { auth } from "@/auth";

export async function DashboardTopBar({ title }: { title: string }) {
  const session = await auth();
  return (
    <header className="mb-8 flex flex-col gap-2 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Paroisse Sainte Philadelphie de Godomey Kangloe
        </p>
      </div>
      {session?.user?.email && (
        <p className="text-sm text-slate-600">
          Connecté :{" "}
          <span className="font-medium text-[#0f766e]">{session.user.email}</span>
        </p>
      )}
    </header>
  );
}
