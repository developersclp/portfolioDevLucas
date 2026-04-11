import React from "react";
import { prisma } from "@/lib/prisma";
import { FolderKanban, Award, Tags } from "lucide-react";

/**
 * Admin Dashboard - Overview with stats
 */
export default async function AdminDashboard() {
  const [projectCount, certCount, categoryCount] = await Promise.all([
    prisma.project.count(),
    prisma.certification.count(),
    prisma.category.count(),
  ]);

  const stats = [
    { label: "Projetos", value: projectCount, icon: FolderKanban, color: "emerald" },
    { label: "Certificações", value: certCount, icon: Award, color: "cyan" },
    { label: "Categorias", value: categoryCount, icon: Tags, color: "violet" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-1">Visão geral do seu portfólio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl hover:border-zinc-700/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  stat.color === "emerald" ? "bg-emerald-400/10 text-emerald-400" :
                  stat.color === "cyan" ? "bg-cyan-400/10 text-cyan-400" :
                  "bg-violet-400/10 text-violet-400"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-zinc-400">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
