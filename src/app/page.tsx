import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Church,
  Heart,
  Sparkles,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const annonces = [
  {
    titre: "Culte dominical",
    detail: "Rendez-vous chaque dimanche pour la célébration communautaire.",
  },
  {
    titre: "Réunion de prière",
    detail: "Moments de partage et d’intercession pour la paroisse et les familles.",
  },
];

const evenements = [
  { titre: "Retraite spirituelle", lieu: "En paroisse" },
  { titre: "Réunion de louange", lieu: "Salle paroissiale" },
  { titre: "Concert de chorale", lieu: "Temple" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/40">
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#0f766e] text-white shadow-lg shadow-slate-900/10">
              <Church className="h-5 w-5" />
            </span>
            <div className="text-sm font-semibold text-slate-900">
              Ste Philadelphie
              <span className="block text-xs font-normal text-slate-500">Godomey Kangloe</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-4 md:flex">
            <Link href="#presentation" className="text-sm font-medium text-slate-600 transition hover:text-[#0f766e]">
              Présentation
            </Link>
            <Link href="#annonces" className="text-sm font-medium text-slate-600 transition hover:text-[#0f766e]">
              Annonces
            </Link>
            <Link href="#evenements" className="text-sm font-medium text-slate-600 transition hover:text-[#0f766e]">
              Événements
            </Link>
          </nav>

          <Link href="/login">
            <Button className="rounded-full bg-[#c9a227] px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-200/40 transition hover:bg-[#b48f1e]">
              Espace gestion
            </Button>
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 bg-gradient-to-br from-slate-100 via-emerald-50/70 to-indigo-100/50">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(13,148,136,0.18), transparent 35%), radial-gradient(circle at 85% 80%, rgba(194,162,39,0.15), transparent 40%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0f766e]/20 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e] shadow-sm">
              <Sparkles className="h-4 w-4 text-[#c9a227]" />
              Gestion paroissiale moderne
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Une page d’accueil qui inspire confiance, clarté et engagement.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Découvrez une solution dédiée à la vie de la paroisse : présences, inscriptions, suivi des fidèles et communication, dans un design clair et professionnel.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
              <Link href="/login">
                <Button className="inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-7 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-amber-200/30 transition hover:-translate-y-0.5 hover:bg-[#b48f1e]">
                  Accéder au tableau de bord
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#presentation" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition hover:bg-slate-50">
                En savoir plus
              </Link>
            </div>
          </div>

          <div className="relative rounded-[2rem] bg-[#0f172a]/5 p-8 shadow-2xl shadow-slate-950/5 ring-1 ring-white/70">
            <div className="grid gap-5 rounded-[1.75rem] bg-white p-8 shadow-sm ring-1 ring-slate-200/80">
              <div className="rounded-3xl bg-gradient-to-r from-[#0f766e] via-[#155e75] to-[#0f172a] px-6 py-6 text-white shadow-lg shadow-slate-900/10">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Engagement</p>
                <p className="mt-3 text-3xl font-semibold">Pilotez votre paroisse</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200/90 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#0f766e]">Présences</p>
                  <p className="mt-3 text-sm text-slate-700">Enregistrez rapidement la participation des fidèles.</p>
                </div>
                <div className="rounded-3xl border border-slate-200/90 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#0f766e]">Inscription</p>
                  <p className="mt-3 text-sm text-slate-700">Gérez les délais et les listes avec simplicité.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-[1.5rem] bg-[#0f766e]/10 p-6 text-slate-900">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f766e]">Bénéfices</p>
              <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-[#c9a227]/20 text-[#b48f1e]">
                    <Heart className="h-4 w-4" />
                  </span>
                  Suivi humain, simple et organisé.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-[#0f766e]/15 text-[#0f766e]">
                    <Users className="h-4 w-4" />
                  </span>
                  Une communauté mieux reliée à ses événements.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="presentation" className="border-y border-slate-200/80 bg-white/95 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                Une structure claire
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Une page d’accueil pensée pour rassurer et engager.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Une architecture visuelle qui met en avant les informations essentielles sans surcharge, avec des boutons d’action visibles et un parcours utilisateur fluide.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200/90 bg-[#f8fafc] p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f766e]/10 text-[#0f766e]">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">Suivi des fidèles</h3>
                  <p className="mt-2 text-sm text-slate-600">Regroupez toutes les informations de votre communauté au même endroit.</p>
                </div>
                <div className="rounded-3xl border border-slate-200/90 bg-[#f8fafc] p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c9a227]/10 text-[#b48f1e]">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">Organisation des événements</h3>
                  <p className="mt-2 text-sm text-slate-600">Planifiez les rencontres, cultes et temps forts en toute simplicité.</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#0f766e]/10 bg-gradient-to-br from-[#0f766e]/10 via-white to-[#c9a227]/10 p-8 shadow-xl">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#c9a227]/20 blur-2xl" />
              <blockquote className="relative text-lg font-medium leading-relaxed text-slate-700">
                « Ensemble, bâtissons une Église vivante, tournée vers Dieu et vers nos frères et sœurs. »
              </blockquote>
              <p className="mt-6 text-sm font-medium text-[#0f766e]">— Communauté paroissiale</p>
            </div>
          </div>
        </div>
      </section>

      <section id="annonces" className="px-4 py-20 sm:px-6 bg-gradient-to-br from-slate-50 via-white to-emerald-50/60">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f766e]">Annonces</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Les temps forts de la paroisse</h2>
            </div>
            <Link href="/login" className="inline-flex items-center rounded-full border border-[#0f766e] bg-white/90 px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ecfdf5]">
              Voir l’espace gestion
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {annonces.map((a) => (
              <div key={a.titre} className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3 text-[#0f766e]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f766e]/10">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900">{a.titre}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="evenements" className="border-t border-slate-200/80 bg-white/90 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f766e]">Événements</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">À venir cette saison</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-600">
              Une vision claire des prochaines rencontres et services pour renforcer la vie de la communauté.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {evenements.map((ev) => (
              <div key={ev.titre} className="rounded-3xl border border-slate-200/90 bg-[#f8fafc] p-6 shadow-sm">
                <div className="flex items-center gap-3 text-sm font-semibold text-[#0f766e]">
                  <CalendarDays className="h-4 w-4" />
                  <span>{ev.lieu}</span>
                </div>
                <p className="mt-4 text-xl font-semibold text-slate-900">{ev.titre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/90 bg-[#0f172a] px-4 py-12 text-slate-300 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <Church className="h-8 w-8 text-[#c9a227]" />
            <div>
              <p className="font-semibold text-white">Paroisse Sainte Philadelphie</p>
              <p className="text-sm text-slate-400">Godomey Kangloe</p>
            </div>
          </div>
          <p className="text-center text-sm text-slate-400 sm:text-right">
            © {new Date().getFullYear()} Tous droits réservés. Une initiative au service de la communauté.
          </p>
        </div>
      </footer>
    </div>
  );
}
