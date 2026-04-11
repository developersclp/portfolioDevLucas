"use client";

import React, { useActionState } from "react";
import { login } from "@/lib/auth-actions";
import { Lock, Mail } from "lucide-react";

/**
 * Admin Login Page - Styled form with dark theme matching the portfolio
 */
export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.05)_0%,_transparent_70%)]" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-bold text-white tracking-tight">
            LG<span className="text-emerald-400">.</span>
          </a>
          <p className="text-zinc-400 mt-2 text-sm">Painel Administrativo</p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-400/10 rounded-xl">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <h1 className="text-xl font-semibold text-white">Login</h1>
          </div>

          {/* Error message */}
          {state?.error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="admin@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-400 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          <a href="/" className="hover:text-zinc-400 transition-colors">
            ← Voltar ao site
          </a>
        </p>
      </div>
    </div>
  );
}
