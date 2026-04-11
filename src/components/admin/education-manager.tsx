"use client";

import React, { useRef } from "react";
import { Education } from "@prisma/client";
import { createEducation, deleteEducation } from "@/lib/profile-actions";
import { Plus, Trash2 } from "lucide-react";

export function EducationManager({ education }: { education: Education[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await createEducation(formData);
    formRef.current?.reset();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta formação?")) {
      await deleteEducation(id);
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-emerald-400 mb-6">Formação Acadêmica</h2>

      <div className="space-y-4 mb-8">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 bg-zinc-800/30 border border-zinc-700/30 rounded-xl flex justify-between items-center group">
            <div>
              <h3 className="text-white font-medium">{edu.degree}</h3>
              <p className="text-zinc-400 text-sm">{edu.institution} • {edu.period}</p>
            </div>

            <button
              onClick={() => handleDelete(edu.id)}
              className="p-2 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              title="Excluir"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {education.length === 0 && <p className="text-zinc-500 text-sm">Nenhuma formação cadastrada.</p>}
      </div>

      <div className="border-t border-zinc-800/50 pt-6">
        <h3 className="text-sm font-medium text-white mb-4">Adicionar Nova Formação</h3>
        <form ref={formRef} action={handleSubmit} className="flex gap-4">
          <input
            type="text"
            name="degree"
            placeholder="Grau/Curso"
            required
            className="flex-1 px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm focus:border-emerald-400/50 outline-none"
          />
          <input
            type="text"
            name="institution"
            placeholder="Instituição"
            required
            className="flex-1 px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm focus:border-emerald-400/50 outline-none"
          />
          <input
            type="text"
            name="period"
            placeholder="Ex: 2018-2022"
            required
            className="w-32 px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm focus:border-emerald-400/50 outline-none"
          />
          <button
            type="submit"
            className="px-4 bg-emerald-400/10 text-emerald-400 rounded-xl hover:bg-emerald-400/20 transition-colors flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
