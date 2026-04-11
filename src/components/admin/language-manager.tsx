"use client";

import React, { useRef } from "react";
import { Language } from "@prisma/client";
import { createLanguage, deleteLanguage } from "@/lib/profile-actions";
import { Plus, Trash2 } from "lucide-react";

export function LanguageManager({ languages }: { languages: Language[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await createLanguage(formData);
    formRef.current?.reset();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar este idioma?")) {
      await deleteLanguage(id);
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-emerald-400 mb-6">Idiomas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {languages.map((lang) => (
          <div key={lang.id} className="p-4 bg-zinc-800/30 border border-zinc-700/30 rounded-xl flex justify-between items-center group">
            <div>
              <h3 className="text-white font-medium text-sm">{lang.name}</h3>
              <p className="text-zinc-400 text-xs">{lang.level}</p>
            </div>

            <button
              onClick={() => handleDelete(lang.id)}
              className="p-1.5 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              title="Excluir"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        {languages.length === 0 && <p className="text-zinc-500 text-sm col-span-full">Nenhum idioma cadastrado.</p>}
      </div>

      <div className="border-t border-zinc-800/50 pt-6">
        <h3 className="text-sm font-medium text-white mb-4">Adicionar Idioma</h3>
        <form ref={formRef} action={handleSubmit} className="flex gap-4 max-w-lg">
          <input
            type="text"
            name="name"
            placeholder="Ex: Inglês"
            required
            className="flex-1 px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm focus:border-emerald-400/50 outline-none"
          />
          <input
            type="text"
            name="level"
            placeholder="Ex: Fluente"
            required
            className="flex-1 px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm focus:border-emerald-400/50 outline-none"
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
