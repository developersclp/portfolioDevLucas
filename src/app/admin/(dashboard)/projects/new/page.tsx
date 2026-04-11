import React from "react";
import { prisma } from "@/lib/prisma";
import { createProject } from "@/lib/admin-actions";
import { ProjectForm } from "@/components/admin/project-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * New Project Page
 */
export default async function NewProjectPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/projects" className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <h1 className="text-3xl font-bold text-white">Novo Projeto</h1>
      </div>
      <ProjectForm categories={categories} action={createProject} />
    </div>
  );
}
