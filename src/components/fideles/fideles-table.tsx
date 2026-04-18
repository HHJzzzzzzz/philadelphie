"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GRADES, JOURS_PERMANENCE } from "@/lib/constants";
import { downloadFidelesPdf } from "@/lib/pdf";
import {
  FileDown,
  Loader2,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Fidele = {
  id: string;
  nom: string;
  prenom: string;
  grade: string;
  jourPermanence: string;
  poste: string;
  sexe: string;
  dateNaissance: string | null;
  imageUrl: string | null;
  observation: string | null;
  membreChorale: boolean;
};

export function FidelesTable() {
  const [items, setItems] = useState<Fidele[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Fidele | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSearchDebounced(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: searchDebounced,
      });
      const res = await fetch(`/api/fideles?${q}`);
      const data = await res.json();
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchDebounced]);

  useEffect(() => {
    void Promise.resolve().then(() => loadItems());
  }, [loadItems]);

  async function remove(id: string) {
    if (!confirm("Supprimer ce fidèle ?")) return;
    const res = await fetch(`/api/fideles/${id}`, { method: "DELETE" });
    if (res.ok) void loadItems();
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const d = editing.dateNaissance
        ? new Date(editing.dateNaissance).toISOString().slice(0, 10)
        : null;
      const res = await fetch(`/api/fideles/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: editing.nom,
          prenom: editing.prenom,
          dateNaissance: d,
          sexe: editing.sexe,
          grade: editing.grade,
          jourPermanence: editing.jourPermanence,
          poste: editing.poste,
          observation: editing.observation,
          membreChorale: editing.membreChorale,
          imageUrl: editing.imageUrl,
        }),
      });
      if (res.ok) {
        setEditing(null);
        void loadItems();
      }
    } finally {
      setSaving(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  function exportAllPdf() {
    const rows = items.map((f) => ({
      nom: f.nom,
      prenom: f.prenom,
      grade: f.grade,
      jourPermanence: f.jourPermanence,
      poste: f.poste,
    }));
    downloadFidelesPdf(rows);
  }

  return (
    <>
      <Card className="mb-6 border-white/80 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Rechercher par nom, prénom ou poste..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-slate-200/90 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm outline-none transition focus:border-[#0d9488]/50 focus:ring-2 focus:ring-[#0d9488]/20"
            />
          </div>
          <Button type="button" variant="gold" onClick={exportAllPdf}>
            <FileDown className="h-4 w-4" />
            Télécharger en PDF
          </Button>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Le PDF inclut les lignes de la page courante. Ajustez la recherche ou
          la pagination si besoin.
        </p>
      </Card>

      <Card className="overflow-hidden border-white/80 p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/90 bg-gradient-to-r from-slate-50 to-indigo-50/30">
                <th className="px-4 py-3 font-semibold text-slate-700">Photo</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Nom</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Prénom</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Grade</th>
                <th className="px-4 py-3 font-semibold text-slate-700">
                  Permanence
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700">Poste</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#0f766e]" />
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    Aucun résultat.
                  </td>
                </tr>
              ) : (
                items.map((f, i) => (
                  <tr
                    key={f.id}
                    className={
                      i % 2 === 1
                        ? "border-b border-slate-100 bg-slate-50/50"
                        : "border-b border-slate-100"
                    }
                  >
                    <td className="px-4 py-3">
                      {f.imageUrl ? (
                        <Image
                          src={f.imageUrl}
                          alt={`Photo de ${f.prenom} ${f.nom}`}
                          width={40}
                          height={40}
                          className="rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {f.nom}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{f.prenom}</td>
                    <td className="px-4 py-3 text-slate-600">{f.grade}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {f.jourPermanence}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{f.poste}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setEditing({ ...f })}
                          className="rounded-lg p-2 text-[#0f766e] transition hover:bg-emerald-50"
                          title="Modifier"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => void remove(f.id)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 px-4 py-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            {total} fidèle(s) — page {page} / {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Précédent
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Suivant
            </Button>
          </div>
        </div>
      </Card>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center">
          <Card className="max-h-[90vh] w-full max-w-lg overflow-y-auto border-white/90 p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900">
              Modifier le fidèle
            </h3>
            {editing.imageUrl && (
              <div className="mt-4 flex justify-center">
                <Image
                  src={editing.imageUrl}
                  alt={`Photo actuelle de ${editing.prenom} ${editing.nom}`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover border border-slate-200"
                />
              </div>
            )}
            <form onSubmit={saveEdit} className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Nom
                  </label>
                  <Input
                    value={editing.nom}
                    onChange={(e) =>
                      setEditing({ ...editing, nom: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Prénom
                  </label>
                  <Input
                    value={editing.prenom}
                    onChange={(e) =>
                      setEditing({ ...editing, prenom: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Date de naissance
                  </label>
                  <Input
                    type="date"
                    value={
                      editing.dateNaissance
                        ? editing.dateNaissance.slice(0, 10)
                        : ""
                    }
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        dateNaissance: e.target.value
                          ? new Date(e.target.value).toISOString()
                          : null,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Sexe
                  </label>
                  <select
                    value={editing.sexe}
                    onChange={(e) =>
                      setEditing({ ...editing, sexe: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200/90 py-2.5 text-sm"
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Grade
                  </label>
                  <select
                    value={editing.grade}
                    onChange={(e) =>
                      setEditing({ ...editing, grade: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200/90 py-2.5 text-sm"
                  >
                    {GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Permanence
                  </label>
                  <select
                    value={editing.jourPermanence}
                    onChange={(e) =>
                      setEditing({ ...editing, jourPermanence: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200/90 py-2.5 text-sm"
                  >
                    {JOURS_PERMANENCE.map((j) => (
                      <option key={j} value={j}>
                        {j}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Poste
                  </label>
                  <Input
                    value={editing.poste}
                    onChange={(e) =>
                      setEditing({ ...editing, poste: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chorale"
                    checked={editing.membreChorale}
                    onChange={(e) =>
                      setEditing({ ...editing, membreChorale: e.target.checked })
                    }
                    className="rounded border-slate-300"
                  />
                  <label htmlFor="chorale" className="text-sm text-slate-700">
                    Membre chorale
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Observation
                  </label>
                  <textarea
                    value={editing.observation ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, observation: e.target.value })
                    }
                    rows={3}
                    className="w-full rounded-xl border border-slate-200/90 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditing(null)}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Enregistrer"
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
