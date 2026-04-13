"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * ContactSection - Contact information and form with animated elements
 */
export function ContactSection({ profile }: { profile?: { email: string; location: string; linkedin: string; github: string } }) {
  const safeProfile = profile || { email: "", location: "", linkedin: "", github: "" };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-zinc-950">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950 to-zinc-950" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Contato"
          title="Vamos Conversar"
          description="Tem um projeto em mente ou quer trocar uma ideia? Entre em contato!"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Informações de Contato
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Estou disponível para projetos freelance, oportunidades full-time ou apenas para
                um bate-papo sobre tecnologia. Respondo em até 24h.
              </p>
            </div>

            <div className="space-y-5">
              <a
                href={`mailto:${safeProfile.email}`}
                className="group flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-emerald-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/5"
              >
                <div className="p-3 rounded-xl bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400/20 transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Email</p>
                  <p className="text-sm font-medium text-white">{safeProfile.email}</p>
                </div>
              </a>

              <a
                href={safeProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-emerald-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/5"
              >
                <div className="p-3 rounded-xl bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400/20 transition-colors duration-300">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">LinkedIn</p>
                  <p className="text-sm font-medium text-white">LinkedIn Profile</p>
                </div>
              </a>

              <a
                href={safeProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-emerald-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/5"
              >
                <div className="p-3 rounded-xl bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400/20 transition-colors duration-300">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">GitHub</p>
                  <p className="text-sm font-medium text-white">GitHub Profile</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                <div className="p-3 rounded-xl bg-emerald-400/10 text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Localização</p>
                  <p className="text-sm font-medium text-white">{safeProfile.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Mensagem enviada com sucesso! (Demo)");
              }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-zinc-400 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Sobre o que quer conversar?"
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Sua mensagem..."
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-sm resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                Enviar Mensagem
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
