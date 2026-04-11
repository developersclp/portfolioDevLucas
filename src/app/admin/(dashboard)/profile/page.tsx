import React from "react";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/admin/profile-form";
import { ExperienceManager } from "@/components/admin/experience-manager";
import { EducationManager } from "@/components/admin/education-manager";
import { LanguageManager } from "@/components/admin/language-manager";

export default async function AdminProfilePage() {
  const [profile, experiences, education, languages] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.language.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Perfil & Currículo</h1>
        <p className="text-zinc-400">Personalize os dados globais que aparecem no seu site e no currículo gerado.</p>
      </div>

      <div className="space-y-8">
        {/* Section: Basic Info */}
        <section className="p-6 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl">
          <h2 className="text-xl font-semibold text-emerald-400 mb-6">Informações Gerais e Contato</h2>
          <ProfileForm profile={profile} />
        </section>

        {/* Section: Experience Manager */}
        <section>
          <ExperienceManager experiences={experiences} />
        </section>

        {/* Section: Education Manager */}
        <section>
          <EducationManager education={education} />
        </section>

        {/* Section: Languages Manager */}
        <section>
          <LanguageManager languages={languages} />
        </section>
      </div>
    </div>
  );
}
