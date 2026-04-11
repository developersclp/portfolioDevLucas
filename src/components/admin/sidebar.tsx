"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth-actions";
import {
  LayoutDashboard,
  FolderKanban,
  Award,
  Tags,
  LogOut,
  ExternalLink,
  User,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Perfil & Currículo", href: "/admin/profile", icon: User },
  { label: "Projetos", href: "/admin/projects", icon: FolderKanban },
  { label: "Certificações", href: "/admin/certifications", icon: Award },
  { label: "Categorias", href: "/admin/categories", icon: Tags },
];

/**
 * Admin Sidebar - Navigation for admin panel
 */
export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-zinc-900/50 border-r border-zinc-800/50 flex flex-col z-40">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800/50">
        <Link href="/admin/dashboard" className="text-xl font-bold text-white tracking-tight">
          LG<span className="text-emerald-400">.</span>
          <span className="text-sm font-normal text-zinc-400 ml-2">Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}

        {/* View Site Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all duration-200"
        >
          <ExternalLink className="w-4 h-4" />
          Ver Site
        </a>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800/50">
        <p className="text-xs text-zinc-500 mb-3 truncate px-2">{email}</p>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </form>
      </div>
    </aside>
  );
}
