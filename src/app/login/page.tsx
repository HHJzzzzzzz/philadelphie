import { LoginForm } from "@/components/auth/login-form";
import { Church } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-emerald-50/50 to-indigo-100/60 px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(13,148,136,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(30,58,95,0.12), transparent 45%)",
        }}
      />
      <div className="animate-fade-in-up relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0f766e] transition hover:text-[#0d9488]"
          >
            <Church className="h-5 w-5 text-[#c9a227]" />
            Retour à l&apos;accueil
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Connexion
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Paroisse Sainte Philadelphie de Godomey Kangloe
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
