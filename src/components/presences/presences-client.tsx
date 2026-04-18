"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ATTENDANCE_STATUS,
  STATUS_LABELS,
  type AttendanceScope,
  type AttendanceStatus,
} from "@/lib/constants";
import { downloadPresencePdf } from "@/lib/pdf";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  CircleSlash,
  FileDown,
  Loader2,
  Music,
  Save,
  ShieldOff,
  UserX,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type Fidele = {
  id: string;
  nom: string;
  prenom: string;
};

const statusConfig: {
  key: AttendanceStatus;
  icon: typeof CheckCircle2;
  color: string;
  ring: string;
}[] = [
  {
    key: ATTENDANCE_STATUS.PRESENT,
    icon: CheckCircle2,
    color: "text-emerald-600",
    ring: "ring-emerald-400/60",
  },
  {
    key: ATTENDANCE_STATUS.ABSENT,
    icon: UserX,
    color: "text-slate-600",
    ring: "ring-slate-400/50",
  },
  {
    key: ATTENDANCE_STATUS.PERMISSIONNAIRE,
    icon: ShieldOff,
    color: "text-amber-600",
    ring: "ring-amber-400/60",
  },
  {
    key: ATTENDANCE_STATUS.IMPURE,
    icon: CircleSlash,
    color: "text-violet-600",
    ring: "ring-violet-400/50",
  },
];

export function PresencesClient() {
  const [scope, setScope] = useState<AttendanceScope>("PAROISSE");
  const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [members, setMembers] = useState<Fidele[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, AttendanceStatus>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const [mRes, aRes] = await Promise.all([
        fetch(`/api/fideles/for-presence?scope=${scope}`),
        fetch(
          `/api/attendance?scope=${scope}&date=${encodeURIComponent(date)}`,
        ),
      ]);
      const mData = await mRes.json();
      const aData = await aRes.json();
      const list: Fidele[] = mData.items ?? [];
      setMembers(list);
      const next: Record<string, AttendanceStatus> = {};
      for (const f of list) {
        next[f.id] = ATTENDANCE_STATUS.PRESENT;
      }
      if (aData.rows?.length) {
        for (const r of aData.rows) {
          next[r.fideleId] = r.status as AttendanceStatus;
        }
      }
      setStatusMap(next);
    } finally {
      setLoading(false);
    }
  }, [date, scope]);

  useEffect(() => {
    void Promise.resolve().then(() => load());
  }, [load]);

  function setStatus(id: string, s: AttendanceStatus) {
    setStatusMap((prev) => ({ ...prev, [id]: s }));
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const rows = members.map((m) => ({
        fideleId: m.id,
        status: statusMap[m.id] ?? ATTENDANCE_STATUS.PRESENT,
      }));
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, scope, rows }),
      });
      if (!res.ok) throw new Error();
      setMessage("Présences enregistrées avec succès.");
    } catch {
      setMessage("Erreur lors de l’enregistrement.");
    } finally {
      setSaving(false);
    }
  }

  const pdfRows = useMemo(
    () =>
      members.map((m) => ({
        nom: m.nom,
        prenom: m.prenom,
        status: statusMap[m.id] ?? ATTENDANCE_STATUS.PRESENT,
      })),
    [members, statusMap],
  );

  function exportPdf() {
    downloadPresencePdf(scope, new Date(date + "T12:00:00"), pdfRows);
  }

  return (
    <div className="space-y-6">
      <Card className="border-white/80 p-5 sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-600">Portée</p>
            <div
              className="inline-flex rounded-2xl border border-slate-200/90 bg-slate-50/80 p-1 shadow-inner"
              role="group"
              aria-label="Chorale ou Paroisse"
            >
              <button
                type="button"
                onClick={() => setScope("CHORALE")}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  scope === "CHORALE"
                    ? "bg-white text-[#0f766e] shadow-md ring-1 ring-[#0d9488]/30"
                    : "text-slate-600 hover:text-slate-900",
                )}
              >
                <Music className="h-4 w-4" />
                Chorale
              </button>
              <button
                type="button"
                onClick={() => setScope("PAROISSE")}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  scope === "PAROISSE"
                    ? "bg-white text-[#1e3a5f] shadow-md ring-1 ring-[#1e3a5f]/25"
                    : "text-slate-600 hover:text-slate-900",
                )}
              >
                <CheckCircle2 className="h-4 w-4" />
                Paroisse
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border border-slate-200/90 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-[#0d9488]/50 focus:ring-2 focus:ring-[#0d9488]/20"
              />
            </div>
            <Button type="button" variant="secondary" onClick={() => void load()}>
              Actualiser
            </Button>
            <Button type="button" variant="gold" onClick={exportPdf}>
              <FileDown className="h-4 w-4" />
              Exporter en PDF
            </Button>
          </div>
        </div>
      </Card>

      {message && (
        <p
          className={cn(
            "rounded-xl px-4 py-3 text-sm",
            message.includes("succès")
              ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80"
              : "bg-slate-800 text-white",
          )}
          role="status"
        >
          {message}
        </p>
      )}

      <Card className="overflow-hidden border-white/80 p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/90 bg-gradient-to-r from-slate-50 to-emerald-50/40">
                <th className="px-4 py-4 font-semibold text-slate-700 sm:px-6">
                  Nom
                </th>
                <th className="px-4 py-4 font-semibold text-slate-700 sm:px-6">
                  Prénom
                </th>
                <th className="px-4 py-4 font-semibold text-slate-700 sm:px-6">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-16 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#0f766e]" />
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    {scope === "CHORALE"
                      ? "Aucun membre chorale. Cochez « membre chorale » lors de l’inscription."
                      : "Aucun fidèle enregistré."}
                  </td>
                </tr>
              ) : (
                members.map((m, i) => (
                  <tr
                    key={m.id}
                    className={cn(
                      "border-b border-slate-100 transition-colors hover:bg-slate-50/80",
                      i % 2 === 1 && "bg-slate-50/40",
                    )}
                  >
                    <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">
                      {m.nom}
                    </td>
                    <td className="px-4 py-3 text-slate-700 sm:px-6">
                      {m.prenom}
                    </td>
                    <td className="px-4 py-3 sm:px-6">
                      <div className="flex flex-wrap gap-2">
                        {statusConfig.map(({ key, icon: Icon, color, ring }) => {
                          const active =
                            (statusMap[m.id] ?? ATTENDANCE_STATUS.PRESENT) === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setStatus(m.id, key)}
                              title={STATUS_LABELS[key]}
                              className={cn(
                                "flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
                                active
                                  ? cn(
                                      "border-transparent bg-white shadow-md ring-2",
                                      ring,
                                      color,
                                    )
                                  : "border-slate-200/90 bg-white/60 text-slate-500 hover:border-slate-300 hover:text-slate-700",
                              )}
                            >
                              <Icon className="h-4 w-4 shrink-0" />
                              <span className="hidden sm:inline">
                                {STATUS_LABELS[key]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end border-t border-slate-100 bg-slate-50/50 px-4 py-4 sm:px-6">
          <Button type="button" onClick={() => void save()} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Enregistrer la présence
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
