import React from "react";
import { prisma } from "@/lib/prisma";
import { CategoryManager } from "@/components/admin/category-manager";

/**
 * Admin Categories Page - Inline CRUD
 */
export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          projects: true,
          certifications: true,
        },
      },
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Categorias</h1>
        <p className="text-zinc-400 mt-1">Gerencie as categorias de projetos e certificações</p>
      </div>
      <CategoryManager
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          projectCount: c._count.projects,
          certCount: c._count.certifications,
        }))}
      />
    </div>
  );
}
