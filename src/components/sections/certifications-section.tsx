"use client";

import React, { useState, useMemo } from "react";
import type { Certification } from "@/types";
import { SectionHeader } from "@/components/ui/section-header";
import { FilterBar } from "@/components/ui/filter-bar";
import { CertificationCard } from "@/components/ui/certification-card";

export function CertificationsSection({
  certifications,
}: {
  certifications: Certification[];
  allTechnologies?: string[]; // Kept for prop signature compat if needed
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const availableCategories = useMemo(() => {
    return Array.from(new Set(certifications.map((c) => c.category))).sort();
  }, [certifications]);

  const filteredCerts = useMemo(() => {
    if (!selectedCategory) return certifications;
    return certifications.filter((c) => c.category === selectedCategory);
  }, [selectedCategory, certifications]);

  return (
    <section id="certifications" className="relative py-24 md:py-32 bg-zinc-950">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/20 to-zinc-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Certificações"
          title="Minhas Certificações"
          description="Certificações profissionais que comprovam meu conhecimento e dedicação ao aprendizado contínuo."
        />

        <FilterBar
          technologies={availableCategories}
          selectedTech={selectedCategory}
          onSelectTech={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, index) => (
            <CertificationCard key={cert.id} certification={cert} index={index} />
          ))}
        </div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">
              Nenhuma certificação encontrada nessa categoria.
            </p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
            >
              Limpar filtro
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
