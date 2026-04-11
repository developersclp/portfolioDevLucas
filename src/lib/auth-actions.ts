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
  let user = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!user) {
    // Self-healing: Create admin if it doesn't exist but credentials match .env
    const envEmail = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD;

    if (envEmail && envPassword && email === envEmail && password === envPassword) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user = await prisma.adminUser.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    } else {
      return { error: "Credenciais inválidas." };
    }
  } else {
    // Verify password for existing user
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { error: "Credenciais inválidas." };
    }
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
