"use client";

import React from "react";
import type { Project, Category } from "@prisma/client";

/**
 * Reusable form for creating/editing projects
 */
export function ProjectForm({
  project,
  categories,
  action,
}: {
  project?: Project;
  categories: Category[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} encType="multipart/form-data" className="space-y-6 max-w-2xl">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-zinc-400 mb-2">
          Título *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={project?.title}
          required
          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-zinc-400 mb-2">
          Descrição curta *
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          defaultValue={project?.description}
          required
          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm resize-none"
        />
      </div>

      <div>
        <label htmlFor="longDescription" className="block text-sm font-medium text-zinc-400 mb-2">
          Descrição completa
        </label>
        <textarea
          id="longDescription"
          name="longDescription"
          rows={4}
          defaultValue={project?.longDescription}
          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-zinc-400 mb-2">
            Categoria *
          </label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={project?.categoryId}
            required
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
          >
            <option value="">Selecione...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-zinc-400 mb-2">
            Data (AAAA-MM) *
          </label>
          <input
            type="text"
            id="date"
            name="date"
            placeholder="2025-01"
            defaultValue={project?.date}
            required
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium text-zinc-400 mb-2">
          Tecnologias (separadas por vírgula) *
        </label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          placeholder="Next.js, TypeScript, PostgreSQL"
          defaultValue={project?.technologies.join(", ")}
          required
          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
        />
      </div>

      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
        <h3 className="text-sm font-medium text-emerald-400 mb-2">Imagem do Projeto</h3>
        
        <div>
          <label htmlFor="imageFile" className="block text-sm font-medium text-zinc-400 mb-2">
            Upload do Computador (Opção 1)
          </label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-zinc-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-400/10 file:text-emerald-400 hover:file:bg-emerald-400/20"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-zinc-400 mb-2">
            Ou cole uma URL (Opção 2)
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            defaultValue={project?.imageUrl}
            placeholder="https://exemplo.com/imagem.png"
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="githubUrl" className="block text-sm font-medium text-zinc-400 mb-2">
            GitHub URL *
          </label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            defaultValue={project?.githubUrl}
            required
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
          />
        </div>
        <div>
          <label htmlFor="demoUrl" className="block text-sm font-medium text-zinc-400 mb-2">
            Demo URL
          </label>
          <input
            type="url"
            id="demoUrl"
            name="demoUrl"
            defaultValue={project?.demoUrl || ""}
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={project?.featured}
          className="w-4 h-4 bg-zinc-800 border-zinc-700 rounded text-emerald-400 focus:ring-emerald-400/20"
        />
        <label htmlFor="featured" className="text-sm text-zinc-400">
          Marcar como projeto destaque
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="px-6 py-3 text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300"
        >
          {project ? "Salvar Alterações" : "Criar Projeto"}
        </button>
        <a
          href="/admin/projects"
          className="px-6 py-3 text-sm font-medium text-zinc-400 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
