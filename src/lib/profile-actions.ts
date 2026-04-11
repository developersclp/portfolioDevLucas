"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

/**
 * Verify admin session before any mutation
 */
async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

// ===================== PROFILE =====================

export async function updateProfileInfo(formData: FormData) {
  await requireAuth();

  const skillsStr = formData.get("skills") as string;
  const skills = skillsStr
    ? skillsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const profile = await prisma.profile.findFirst();

  const data = {
    name: formData.get("name") as string,
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    location: formData.get("location") as string,
    linkedin: formData.get("linkedin") as string,
    github: formData.get("github") as string,
    website: formData.get("website") as string,
    skills,
  };

  if (profile) {
    await prisma.profile.update({
      where: { id: profile.id },
      data,
    });
  } else {
    await prisma.profile.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/profile");
}

// ===================== EXPERIENCE =====================

export async function createExperience(formData: FormData) {
  await requireAuth();

  await prisma.experience.create({
    data: {
      role: formData.get("role") as string,
      company: formData.get("company") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
      order: parseInt((formData.get("order") as string) || "0"),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/profile");
}

export async function deleteExperience(id: string) {
  await requireAuth();
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/profile");
}

// ===================== EDUCATION =====================

export async function createEducation(formData: FormData) {
  await requireAuth();

  await prisma.education.create({
    data: {
      degree: formData.get("degree") as string,
      institution: formData.get("institution") as string,
      period: formData.get("period") as string,
      order: parseInt((formData.get("order") as string) || "0"),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/profile");
}

export async function deleteEducation(id: string) {
  await requireAuth();
  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/profile");
}

// ===================== LANGUAGES =====================

export async function createLanguage(formData: FormData) {
  await requireAuth();

  await prisma.language.create({
    data: {
      name: formData.get("name") as string,
      level: formData.get("level") as string,
      order: parseInt((formData.get("order") as string) || "0"),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/profile");
}

export async function deleteLanguage(id: string) {
  await requireAuth();
  await prisma.language.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/profile");
}
