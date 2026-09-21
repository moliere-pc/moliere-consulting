"use client";

import { useActionState } from "react";
import { Loader2, Lock, Mail } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {}
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      {state.error && (
        <div
          role="alert"
          className="rounded-xl border border-brand-300 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700"
        >
          {state.error}
        </div>
      )}

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-white/80">Adresse e-mail</span>
        <div className="relative">
          <Mail size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35" />
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="admin@moliereservice.com"
            className="w-full rounded-xl border border-white/15 bg-white/8 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-gold-300/60 focus:bg-white/12"
          />
        </div>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-white/80">Mot de passe</span>
        <div className="relative">
          <Lock size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35" />
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-xl border border-white/15 bg-white/8 py-3 pl-11 pr-4 text-sm text-white outline-none transition-all focus:border-gold-300/60 focus:bg-white/12"
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12.5 w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient text-base font-bold text-ink-950 shadow-gold transition-all hover:brightness-105 disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Connexion…
          </>
        ) : (
          "Se connecter"
        )}
      </button>
    </form>
  );
}
