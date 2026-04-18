"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GRADES, JOURS_PERMANENCE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Church,
  ImagePlus,
  Loader2,
  StickyNote,
  User,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

export function InscriptionForm() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [sexe, setSexe] = useState<"M" | "F">("M");
  const [grade, setGrade] = useState<string>(GRADES[0]);
  const [jourPermanence, setJourPermanence] = useState<string>(
    JOURS_PERMANENCE[0],
  );
  const [poste, setPoste] = useState("");
  const [observation, setObservation] = useState("");
  const [membreChorale, setMembreChorale] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload échoué");
      setImageUrl(data.url);
    } catch {
      setError("Impossible d’envoyer l’image.");
    } finally {
      setFileLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!nom.trim() || !prenom.trim() || !poste.trim()) {
      setError("Nom, prénom et poste sont obligatoires.");
      return;
    }
    setSubmitLoading(true);
    try {
      const res = await fetch("/api/fideles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: nom.trim(),
          prenom: prenom.trim(),
          dateNaissance: dateNaissance || undefined,
          sexe,
          grade,
          jourPermanence,
          poste: poste.trim(),
          imageUrl,
          observation: observation.trim() || null,
          membreChorale,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur serveur");
      setSuccess(true);
      setNom("");
      setPrenom("");
      setDateNaissance("");
      setPoste("");
      setObservation("");
      setImageUrl(null);
      setMembreChorale(false);
    } catch {
      setError("Enregistrement impossible. Vérifiez les champs.");
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <Card className="border-white/80 p-6 sm:p-8">
      <form onSubmit={onSubmit} className="space-y-8">
        {success && (
          <div
            className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900 ring-1 ring-emerald-200/80"
            role="status"
          >
            Fidèle enregistré avec succès.
          </div>
        )}
        {error && (
          <div
            className="rounded-xl bg-slate-800 px-4 py-3 text-sm text-white"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Nom *
            </label>
            <Input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom de famille"
              icon={<User className="h-4 w-4" />}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Prénom *
            </label>
            <Input
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Prénom"
              icon={<User className="h-4 w-4" />}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Date de naissance
            </label>
            <Input
              type="date"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              icon={<Calendar className="h-4 w-4" />}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Sexe
            </label>
            <select
              value={sexe}
              onChange={(e) => setSexe(e.target.value as "M" | "F")}
              className="w-full rounded-xl border border-slate-200/90 bg-white/80 py-2.5 pl-3 pr-8 text-sm shadow-sm outline-none transition focus:border-[#0d9488]/50 focus:ring-2 focus:ring-[#0d9488]/20"
            >
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Grade
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full rounded-xl border border-slate-200/90 bg-white/80 py-2.5 pl-3 pr-8 text-sm shadow-sm outline-none transition focus:border-[#0d9488]/50 focus:ring-2 focus:ring-[#0d9488]/20"
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Jour de permanence
            </label>
            <select
              value={jourPermanence}
              onChange={(e) => setJourPermanence(e.target.value)}
              className="w-full rounded-xl border border-slate-200/90 bg-white/80 py-2.5 pl-3 pr-8 text-sm shadow-sm outline-none transition focus:border-[#0d9488]/50 focus:ring-2 focus:ring-[#0d9488]/20"
            >
              {JOURS_PERMANENCE.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Poste *
            </label>
            <Input
              value={poste}
              onChange={(e) => setPoste(e.target.value)}
              placeholder="Ex. Serviteur, Catéchiste..."
              icon={<Briefcase className="h-4 w-4" />}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Church className="h-4 w-4 text-[#0f766e]" />
              Membre de la chorale
            </label>
            <button
              type="button"
              role="switch"
              aria-checked={membreChorale}
              onClick={() => setMembreChorale(!membreChorale)}
              className={cn(
                "relative inline-flex h-8 w-14 shrink-0 rounded-full border transition-colors duration-200",
                membreChorale
                  ? "border-[#0d9488]/50 bg-[#0d9488]"
                  : "border-slate-200 bg-slate-200",
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-7 w-7 translate-x-0.5 rounded-full bg-white shadow transition duration-200",
                  membreChorale && "translate-x-6",
                )}
              />
            </button>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Photo
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-[#0d9488]/40 hover:bg-white">
                <ImagePlus className="h-5 w-5 text-[#0f766e]" />
                {fileLoading ? "Envoi..." : "Choisir une image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFile}
                  disabled={fileLoading}
                />
              </label>
              {imageUrl && (
                <span className="text-xs text-emerald-700">Image enregistrée</span>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Observation
            </label>
            <div className="relative">
              <StickyNote className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                rows={4}
                placeholder="Notes internes..."
                className="w-full rounded-xl border border-slate-200/90 bg-white/80 px-3 py-2.5 pl-10 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0d9488]/50 focus:ring-2 focus:ring-[#0d9488]/20"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-6">
          <Button type="submit" disabled={submitLoading} className="min-w-[180px]">
            {submitLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              "Enregistrer le fidèle"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
