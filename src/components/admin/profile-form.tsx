"use client";

import React, { useState } from "react";
import { updateProfileInfo } from "@/lib/profile-actions";
import { CheckCircle2 } from "lucide-react";

export function ProfileForm({ profile }: { profile: any }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (formData: FormData) => {
    setStatus("loading");
    await updateProfileInfo(formData);
    setStatus("success");
    // Voltar para idle após 3 segundos
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Nome Completo</label>
          <input
            type="text"
            name="name"
            defaultValue={profile?.name}
            required
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Título Profissional</label>
          <input
            type="text"
            name="title"
            defaultValue={profile?.title}
            required
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Resumo Profissional</label>
        <textarea
          name="summary"
          rows={4}
          defaultValue={profile?.summary}
          className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none resize-y"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Email Público</label>
          <input
            type="email"
            name="email"
            defaultValue={profile?.email}
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:border-emerald-400/50 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Telefone (opcional)</label>
          <input
            type="text"
            name="phone"
            defaultValue={profile?.phone}
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:border-emerald-400/50 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Localização</label>
          <input
            type="text"
            name="location"
            defaultValue={profile?.location}
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:border-emerald-400/50 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Website (opcional)</label>
          <input
            type="url"
            name="website"
            defaultValue={profile?.website}
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:border-emerald-400/50 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            defaultValue={profile?.linkedin}
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:border-emerald-400/50 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">GitHub URL</label>
          <input
            type="url"
            name="github"
            defaultValue={profile?.github}
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:border-emerald-400/50 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Habilidades / Skills (separadas por vírgula)</label>
        <textarea
          name="skills"
          rows={2}
          defaultValue={profile?.skills.join(", ")}
          placeholder="React, Next.js, Node.js"
          className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:border-emerald-400/50 outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl hover:shadow-[0_0_15px_rgba(52,211,153,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          {status === "loading" ? "Salvando..." : "Salvar Informações"}
        </button>

        {/* Feedback visual de sucesso */}
        <div
          className={`flex items-center gap-2 text-sm text-emerald-400 transition-all duration-500 ease-in-out ${
            status === "success" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Salvo com sucesso!</span>
        </div>
      </div>
    </form>
  );
}
