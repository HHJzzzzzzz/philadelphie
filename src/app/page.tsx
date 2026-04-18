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
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1e3a5f] to-[#0f766e] text-white shadow-md">
              <Church className="h-5 w-5" />
            </span>
            <span className="hidden text-sm font-semibold leading-tight text-slate-900 sm:block">
              Ste Philadelphie
              <span className="block text-xs font-normal text-slate-500">
                Godomey Kangloe
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#presentation"
              className="hidden text-sm font-medium text-slate-600 transition hover:text-[#0f766e] md:inline"
            >
              Présentation
            </Link>
            <Link
              href="#annonces"
              className="hidden text-sm font-medium text-slate-600 transition hover:text-[#0f766e] md:inline"
            >
              Annonces
            </Link>
            <Link href="/login">
              <Button variant="primary" className="px-4 py-2 text-sm">
                Espace gestion
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 bg-gradient-to-br from-slate-100 via-emerald-50/50 to-indigo-100/60">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(13,148,136,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(30,58,95,0.12), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#0f766e] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#c9a227]" />
            Bienvenue
          </p>
          <h1 className="bg-gradient-to-r from-[#1e3a5f] via-[#0f766e] to-[#5b4d94] bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Paroisse Sainte Philadelphie
            <span className="mt-2 block text-2xl font-semibold text-slate-700 sm:text-3xl">
              de Godomey Kangloe
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Une communauté de foi, de partage et d’espérance — au service des
            familles et du témoignage évangélique, dans un esprit de paix et
            d’unité.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button className="min-w-[200px] px-8 py-3 text-base bg-[#0f766e] text-white shadow-md shadow-slate-950/5">
                Accéder à l’espace gestion
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#evenements">
              <Button variant="secondary" className="min-w-[200px] px-8 py-3 text-base text-[#0f766e]">
                Voir les événements
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="presentation"
        className="border-y border-slate-200/80 bg-white/60 px-4 py-20 sm:px-6"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Notre paroisse
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              La paroisse Sainte Philadelphie rassemble les fidèles autour de la
              Parole, de la louange et de la solidarité. Nous accueillons chacun
              avec bienveillance et cherchons à grandir ensemble dans la foi
              chrétienne, au rythme de la vie locale et des besoins de notre
              communauté.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[#0f766e]">
                  <Heart className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-slate-800">Accueil & écoute</p>
                  <p className="text-sm text-slate-600">
                    Un lieu où chaque personne trouve sa place.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-[#5b4d94]">
                  <Users className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-slate-800">Vie communautaire</p>
                  <p className="text-sm text-slate-600">
                    Chorale et services partagés.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative rounded-3xl border border-white/80 bg-gradient-to-br from-[#1e3a5f]/5 via-white to-[#0d9488]/10 p-8 shadow-xl">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#c9a227]/20 blur-2xl" />
            <blockquote className="relative text-lg font-medium leading-relaxed text-slate-700">
              « Ensemble, bâtissons une Église vivante, tournée vers Dieu et vers
              nos frères et sœurs. »
            </blockquote>
            <p className="mt-6 text-sm font-medium text-[#0f766e]">
              — Communauté paroissiale
            </p>
          </div>
        </div>
      </section>

      <section id="annonces" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Annonces
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            Restez informé des temps forts et des rendez-vous de la paroisse.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {annonces.map((a) => (
              <div
                key={a.titre}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{a.titre}</h3>
                <p className="mt-2 text-sm text-slate-600">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="evenements"
        className="border-t border-slate-200/80 bg-gradient-to-b from-slate-50/80 to-white px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Événements à venir
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {evenements.map((ev) => (
              <div
                key={ev.titre}
                className="flex flex-col rounded-2xl border border-white/80 bg-white p-5 shadow-md transition hover:shadow-lg"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                  <CalendarDays className="h-4 w-4" />
                  {ev.lieu}
                </div>
                <p className="mt-3 font-semibold text-slate-900">{ev.titre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/90 bg-[#0f172a] px-4 py-12 text-slate-300 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <Church className="h-8 w-8 text-[#d4af37]" />
            <div>
              <p className="font-semibold text-white">
                Paroisse Sainte Philadelphie
              </p>
              <p className="text-sm text-slate-400">Godomey Kangloe</p>
            </div>
          </div>
          <p className="text-center text-sm text-slate-400 sm:text-right">
            © {new Date().getFullYear()} Tous droits réservés. Une initiative au
            service de la communauté.
          </p>
        </div>
      </footer>
    </div>
  );
}
