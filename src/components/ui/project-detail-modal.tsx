"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Folder } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";
import Image from "next/image";

/**
 * ProjectDetailModal - Full detail view of a project with overlay backdrop
 */
export function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-[10%] z-50 overflow-y-auto rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-800/80 backdrop-blur-sm text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 -mt-16 relative">
              {project.featured && (
                <Badge className="bg-emerald-400/90 text-black text-xs font-semibold border-0 mb-4">
                  Projeto Destaque
                </Badge>
              )}

              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                {project.name}
              </h2>

              <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {project.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Folder className="w-4 h-4" />
                  {project.category}
                </span>
              </div>

              <p className="text-zinc-300 leading-relaxed mb-8 text-base md:text-lg">
                {project.longDescription}
              </p>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Tecnologias
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-zinc-800 rounded-full border border-zinc-700 hover:bg-zinc-700 transition-all duration-300 hover:scale-105"
                >
                  <GithubIcon className="w-4 h-4" />
                  Ver Código
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
