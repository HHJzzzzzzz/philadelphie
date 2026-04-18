import { DashboardTopBar } from "@/components/dashboard/top-bar";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { ClipboardCheck, UserPlus, Users } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const [totalFideles, chorale, derniers] = await Promise.all([
    prisma.fidele.count(),
    prisma.fidele.count({ where: { membreChorale: true } }),
    prisma.fidele.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, nom: true, prenom: true, grade: true },
    }),
  ]);

  const stats = [
    {
      label: "Fidèles enregistrés",
      value: totalFideles,
      icon: Users,
      href: "/dashboard/fideles",
      accent: "from-[#1e3a5f] to-[#0f766e]",
    },
    {
      label: "Membres chorale",
      value: chorale,
      icon: ClipboardCheck,
      href: "/dashboard/presences",
      accent: "from-[#0d9488] to-[#14b8a6]",
    },
    {
      label: "Inscription rapide",
      value: "—",
      icon: UserPlus,
      href: "/dashboard/inscription",
      accent: "from-[#5b4d94] to-[#6366f1]",
    },
  ];

  return (
    <div className="animate-fade-in">
      <DashboardTopBar title="Tableau de bord" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group block">
            <Card className="h-full border-white/80 p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">{s.label}</p>
                  <p className="mt-2 text-3xl font-bold tabular-nums text-slate-900">
                    {s.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-md`}
                >
                  <s.icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-8 border-white/80 p-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Derniers inscrits
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Aperçu des derniers fidèles ajoutés à la base.
        </p>
        <ul className="mt-4 divide-y divide-slate-100">
          {derniers.length === 0 ? (
            <li className="py-6 text-center text-sm text-slate-500">
              Aucun fidèle pour le moment.{" "}
              <Link
                href="/dashboard/inscription"
                className="font-medium text-[#0f766e] underline-offset-2 hover:underline"
              >
                Ajouter un fidèle
              </Link>
            </li>
          ) : (
            derniers.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between py-3 text-sm transition-colors hover:bg-slate-50/80"
              >
                <span className="font-medium text-slate-800">
                  {f.nom} {f.prenom}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs text-slate-600">
                  {f.grade}
                </span>
              </li>
            ))
          )}
        </ul>
      </Card>
    </div>
  );
}
