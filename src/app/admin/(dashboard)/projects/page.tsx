import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import { DeleteProjectButton } from "@/components/admin/delete-project-button";

/**
 * Admin Projects List - Table with edit/delete actions
 */
export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Projetos</h1>
          <p className="text-zinc-400 mt-1">{projects.length} projetos cadastrados</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Novo Projeto
        </Link>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800/50">
              <th className="text-left py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Título</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Categoria</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Data</th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Destaque</th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                <td className="py-4 px-6">
                  <p className="text-sm font-medium text-white">{project.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{project.description}</p>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 text-xs font-medium text-zinc-300 bg-zinc-800/50 rounded-md border border-zinc-700/50">
                    {project.category.name}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-zinc-400">{project.date}</td>
                <td className="py-4 px-6">
                  {project.featured ? (
                    <span className="px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-md">Sim</span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium text-zinc-500 bg-zinc-800/30 rounded-md">Não</span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                    >
                      Editar
                    </Link>
                    <DeleteProjectButton id={project.id} title={project.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-500">Nenhum projeto cadastrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
