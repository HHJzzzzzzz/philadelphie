"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <Card className="border-white/80 p-8 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)]">
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Adresse e-mail
          </label>
          <Input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            icon={<Mail className="h-4 w-4" />}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Mot de passe
          </label>
          <Input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
          />
        </div>
        {error && (
          <p
            className="rounded-lg bg-slate-800/90 px-3 py-2 text-sm text-white"
            role="alert"
          >
            {error}
          </p>
        )}
        <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Connexion...
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>
    </Card>
  );
}
