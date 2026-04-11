"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/upload";

/**
 * Verify admin session before any mutation
 */
async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

// ===================== PROJECTS =====================

export async function createProject(formData: FormData) {
  await requireAuth();

  const technologies = (formData.get("technologies") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const imageFile = formData.get("imageFile") as File | null;
  let imageUrl = formData.get("imageUrl") as string;

  if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
    const uploadedPath = await uploadFile(imageFile, "projects");
    if (uploadedPath) imageUrl = uploadedPath;
  }

  await prisma.project.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      longDescription: (formData.get("longDescription") as string) || "",
      technologies,
      imageUrl,
      githubUrl: formData.get("githubUrl") as string,
      demoUrl: (formData.get("demoUrl") as string) || null,
      featured: formData.get("featured") === "on",
      date: formData.get("date") as string,
      categoryId: formData.get("categoryId") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();

  const technologies = (formData.get("technologies") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const imageFile = formData.get("imageFile") as File | null;
  let imageUrl = formData.get("imageUrl") as string;

  if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
    const uploadedPath = await uploadFile(imageFile, "projects");
    if (uploadedPath) imageUrl = uploadedPath;
  }

  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      longDescription: (formData.get("longDescription") as string) || "",
      technologies,
      imageUrl,
      githubUrl: formData.get("githubUrl") as string,
      demoUrl: (formData.get("demoUrl") as string) || null,
      featured: formData.get("featured") === "on",
      date: formData.get("date") as string,
      categoryId: formData.get("categoryId") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAuth();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// ===================== CERTIFICATIONS =====================

export async function createCertification(formData: FormData) {
  await requireAuth();

  const technologies = (formData.get("technologies") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const imageFile = formData.get("imageFile") as File | null;
  let imageUrl = formData.get("imageUrl") as string;

  if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
    const uploadedPath = await uploadFile(imageFile, "certifications");
    if (uploadedPath) imageUrl = uploadedPath;
  }

  await prisma.certification.create({
    data: {
      name: formData.get("name") as string,
      institution: formData.get("institution") as string,
      date: formData.get("date") as string,
      credentialId: (formData.get("credentialId") as string) || null,
      credentialUrl: (formData.get("credentialUrl") as string) || null,
      imageUrl,
      technologies,
      categoryId: formData.get("categoryId") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/certifications");
  redirect("/admin/certifications");
}

export async function updateCertification(id: string, formData: FormData) {
  await requireAuth();

  const technologies = (formData.get("technologies") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const imageFile = formData.get("imageFile") as File | null;
  let imageUrl = formData.get("imageUrl") as string;

  if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
    const uploadedPath = await uploadFile(imageFile, "certifications");
    if (uploadedPath) imageUrl = uploadedPath;
  }

  await prisma.certification.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      institution: formData.get("institution") as string,
      date: formData.get("date") as string,
      credentialId: (formData.get("credentialId") as string) || null,
      credentialUrl: (formData.get("credentialUrl") as string) || null,
      imageUrl,
      technologies,
      categoryId: formData.get("categoryId") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/certifications");
  redirect("/admin/certifications");
}

export async function deleteCertification(id: string) {
  await requireAuth();
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

// ===================== CATEGORIES =====================

export async function createCategory(formData: FormData) {
  await requireAuth();

  await prisma.category.create({
    data: {
      name: formData.get("name") as string,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/certifications");
}

export async function updateCategory(id: string, formData: FormData) {
  await requireAuth();

  await prisma.category.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  await requireAuth();

  // Check for linked projects/certifications
  const projectCount = await prisma.project.count({ where: { categoryId: id } });
  const certCount = await prisma.certification.count({ where: { categoryId: id } });

  if (projectCount > 0 || certCount > 0) {
    throw new Error("Não é possível deletar uma categoria com projetos ou certificações vinculados.");
  }

  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}
