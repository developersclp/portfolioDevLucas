import React from "react";
import { prisma } from "@/lib/prisma";
import { updateCertification } from "@/lib/admin-actions";
import { CertificationForm } from "@/components/admin/certification-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Edit Certification Page
 */
export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [certification, categories] = await Promise.all([
    prisma.certification.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!certification) notFound();

  const updateWithId = updateCertification.bind(null, id);

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/certifications" className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <h1 className="text-3xl font-bold text-white">Editar Certificação</h1>
        <p className="text-zinc-400 mt-1">{certification.name}</p>
      </div>
      <CertificationForm certification={certification} categories={categories} action={updateWithId} />
    </div>
  );
}
