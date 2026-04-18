"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ClipboardCheck,
  LogOut,
  Church,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/presences", label: "Présences", icon: ClipboardCheck },
  { href: "/dashboard/inscription", label: "Inscription", icon: UserPlus },
  { href: "/dashboard/fideles", label: "Fidèles", icon: Users },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-white/40 bg-gradient-to-b from-[#0f172a]/95 via-[#1e3a5f]/90 to-[#0f766e]/85 px-4 py-6 text-white shadow-xl backdrop-blur-md">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
          <Church className="h-6 w-6 text-[#d4af37]" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wider text-white/70">
            Administration
          </p>
          <p className="truncate text-sm font-semibold leading-tight">
            Ste Philadelphie
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-white/15 text-white shadow-inner ring-1 ring-white/20"
                  : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="h-5 w-5 shrink-0 opacity-90" />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <LogOut className="h-5 w-5" />
        Déconnexion
      </button>
    </aside>
  );
}
