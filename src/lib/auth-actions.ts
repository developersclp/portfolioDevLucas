"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";

/**
 * Server Action: Login with email and password
 */
export async function login(
  _prevState: { error?: string } | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email e senha são obrigatórios." };
  }

  // Find user in database
  const user = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Credenciais inválidas." };
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { error: "Credenciais inválidas." };
  }

  // Create session and redirect
  await createSession(user.id, user.email);
  redirect("/admin/dashboard");
}

/**
 * Server Action: Logout
 */
export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
