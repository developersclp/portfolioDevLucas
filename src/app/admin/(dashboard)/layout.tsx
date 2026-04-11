import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";

/**
 * Admin Layout - Wraps all admin pages (except login) with sidebar navigation
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verify session on the server side
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <AdminSidebar email={session.email} />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
