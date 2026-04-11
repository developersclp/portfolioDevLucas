"use client";

import React from "react";
import Link from "next/link";
import { Mail, ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

export function Footer({ profile }: { profile?: { name: string; email: string; github: string; linkedin: string; title: string } }) {
  const currentYear = new Date().getFullYear();

  // Se não vier profile das props, usamos defaults seguros
  const safeProfile = profile || {
    name: "Developer",
    title: "Software Engineer",
    email: "",
    github: "",
    linkedin: ""
  };

  return (
    <footer className="relative bg-zinc-950 pt-20 pb-10 border-t border-zinc-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.03)_0%,_transparent_100%)]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-white tracking-tight">
                {safeProfile.name.split(" ")[0]}
                <span className="text-emerald-400">.</span>
                <span className="text-zinc-500 font-normal">dev</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Construindo experiências digitais excepcionais. {safeProfile.title} focado em código limpo, design moderno e performance.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: GithubIcon, href: safeProfile.github, label: "GitHub" },
                { icon: LinkedinIcon, href: safeProfile.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${safeProfile.email}`, label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8 flex flex-wrap gap-12 lg:gap-24 lg:justify-end">
            <div>
              <h3 className="text-white font-semibold mb-6">Navegação</h3>
              <ul className="space-y-4">
                {[
                  { label: "Projetos", href: "#projects" },
                  { label: "Certificações", href: "#certifications" },
                  { label: "Currículo", href: "#resume" },
                  { label: "Contato", href: "#contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-emerald-400" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Mais</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={safeProfile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    Repositórios
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <Link
                    href="/admin/login"
                    className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2"
                  >
                    Área Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm text-center md:text-left">
            © {currentYear} {safeProfile.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-zinc-500">
            <span>Desenvolvido com</span>
            <span className="text-emerald-400 animate-pulse">Next.js</span>
            <span>&</span>
            <span className="text-cyan-400">Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
