import React from "react";
import { prisma } from "@/lib/prisma";
import { updateProject } from "@/lib/admin-actions";
import { ProjectForm } from "@/components/admin/project-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Edit Project Page
 */
export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [project, categories] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!project) notFound();

  const updateWithId = updateProject.bind(null, id);

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/projects" className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <h1 className="text-3xl font-bold text-white">Editar Projeto</h1>
        <p className="text-zinc-400 mt-1">{project.title}</p>
      </div>
      <ProjectForm project={project} categories={categories} action={updateWithId} />
    </div>
  );
}
