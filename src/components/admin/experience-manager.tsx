"use client";

import React, { useRef } from "react";
import { Experience } from "@prisma/client";
import { createExperience, deleteExperience } from "@/lib/profile-actions";
import { Plus, Trash2 } from "lucide-react";

export function ExperienceManager({ experiences }: { experiences: Experience[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await createExperience(formData);
    formRef.current?.reset();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta experiência?")) {
      await deleteExperience(id);
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-emerald-400 mb-6">Experiência Profissional</h2>

      <div className="space-y-4 mb-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="p-4 bg-zinc-800/30 border border-zinc-700/30 rounded-xl relative group">
            <h3 className="text-white font-medium">{exp.role}</h3>
            <p className="text-emerald-400/80 text-sm">{exp.company} • {exp.period}</p>
            <p className="text-zinc-400 text-sm mt-2">{exp.description}</p>

            <button
              onClick={() => handleDelete(exp.id)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              title="Excluir"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {experiences.length === 0 && <p className="text-zinc-500 text-sm">Nenhuma experiência cadastrada.</p>}
      </div>

      <div className="border-t border-zinc-800/50 pt-6">
        <h3 className="text-sm font-medium text-white mb-4">Adicionar Nova Experiência</h3>
        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="role"
              placeholder="Cargo (ex: Frontend Developer)"
              required
              className="px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm focus:border-emerald-400/50 outline-none"
            />
            <input
              type="text"
              name="company"
              placeholder="Empresa (ex: TechCorp)"
              required
              className="px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm focus:border-emerald-400/50 outline-none"
            />
            <input
              type="text"
              name="period"
              placeholder="Período (ex: 2021 - Atual)"
              required
              className="px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm focus:border-emerald-400/50 outline-none"
            />
          </div>
          <div className="flex gap-4">
            <textarea
              name="description"
              placeholder="Descrição das atividades..."
              required
              rows={2}
              className="flex-1 px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white flex text-sm focus:border-emerald-400/50 outline-none resize-none"
            />
            <button
              type="submit"
              className="px-4 bg-emerald-400/10 text-emerald-400 rounded-xl hover:bg-emerald-400/20 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
