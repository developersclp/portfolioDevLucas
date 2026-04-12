"use client";

import React, { useState, useMemo } from "react";
import { Project } from "@/types";
import { SectionHeader } from "@/components/ui/section-header";
import { FilterBar } from "@/components/ui/filter-bar";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectDetailModal } from "@/components/ui/project-detail-modal";

export function ProjectsSection({
  projects,
}: {
  projects: Project[];
  allTechnologies?: string[]; // Kept for prop signature compat if needed, but unused
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Extrair apenas as categorias dos projetos registrados no array
  const availableCategories = useMemo(() => {
    return Array.from(new Set(projects.map((p) => p.category))).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, projects]);

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.03)_0%,_transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Portfólio"
          title="Meus Projetos"
          description="Uma seleção dos projetos mais relevantes que construí."
        />

        <FilterBar
          technologies={availableCategories}
          selectedTech={selectedCategory}
          onSelectTech={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenDetail={setSelectedProject}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">
              Nenhum projeto encontrado nessa categoria.
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

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
