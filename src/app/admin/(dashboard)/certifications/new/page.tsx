import React from "react";
import { prisma } from "@/lib/prisma";
import { createCertification } from "@/lib/admin-actions";
import { CertificationForm } from "@/components/admin/certification-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * New Certification Page
 */
export default async function NewCertificationPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/certifications" className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <h1 className="text-3xl font-bold text-white">Nova Certificação</h1>
      </div>
      <CertificationForm categories={categories} action={createCertification} />
    </div>
  );
}
