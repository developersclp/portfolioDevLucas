import { prisma } from "./prisma";

import { Project, Certification } from "@/types";

// Date formatter for consistent usage
export function formatDate(dateString: string) {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length < 2) return dateString;
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const month = parseInt(parts[1], 10) - 1;
  return `${months[month]} ${parts[0]}`;
}

export interface ResumeData {
  profile: {
    name: string;
    title: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    skills: string[];
    experience: Array<{
      id: string;
      role: string;
      company: string;
      period: string;
      description: string;
    }>;
    education: Array<{
      id: string;
      degree: string;
      institution: string;
      period: string;
    }>;
    languages: Array<{
      id: string;
      name: string;
      level: string;
    }>;
  };
  featuredProjects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    demoUrl: string | null;
    name?: string; // the template uses project.name so we better support title mapped to name if we map it
  }>;
  allProjects: Project[];
  certifications: Certification[];
  allTechnologies: string[];
}

export async function generateResume(): Promise<ResumeData> {
  const [profileData, experiences, education, languages, projects, certifications] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.language.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.certification.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  const profileSkills = profileData?.skills || [];
  
  const allTechnologies = Array.from(
    new Set([
      ...projects.flatMap((p) => p.technologies),
      ...certifications.flatMap((c) => c.technologies),
      ...profileSkills,
    ])
  ).sort();

  return {
    profile: {
      name: profileData?.name || "Developer",
      title: profileData?.title || "Software Engineer",
      summary: profileData?.summary || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
      location: profileData?.location || "",
      linkedin: profileData?.linkedin || "",
      github: profileData?.github || "",
      website: profileData?.website || "",
      skills: profileSkills,
      experience: experiences,
      education: education,
      languages: languages,
    },
    featuredProjects: featuredProjects.map((p: any) => ({ ...p, name: p.title })),
    allProjects: projects.map((p: any) => ({
      id: p.id,
      name: p.title,
      description: p.description,
      longDescription: p.longDescription,
      technologies: p.technologies,
      image: p.imageUrl,
      githubUrl: p.githubUrl,
      demoUrl: p.demoUrl,
      featured: p.featured,
      category: p.category?.name || "Geral",
      date: p.date,
    })),
    certifications: certifications.map((c: any) => ({
      id: c.id,
      name: c.name,
      institution: c.institution,
      date: c.date,
      credentialId: c.credentialId,
      credentialUrl: c.credentialUrl,
      image: c.imageUrl,
      technologies: c.technologies,
      category: c.category?.name || "Geral",
    })),
    allTechnologies,
  };
}
