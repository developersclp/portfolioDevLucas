"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";
import Image from "next/image";

/**
 * ProjectCard - Individual project card with hover effects and animated entrance
 */
export function ProjectCard({
  project,
  index,
  onOpenDetail,
}: {
  project: Project;
  index: number;
  onOpenDetail: (project: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => onOpenDetail(project)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-emerald-400/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-400/5">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-emerald-400/90 text-black text-xs font-semibold border-0">
                Destaque
              </Badge>
            </div>
          )}

          {/* Hover overlay with links */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
              {project.name}
            </h3>
            <span className="text-xs text-zinc-500">{project.date}</span>
          </div>

          <p className="text-sm text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium text-zinc-400 bg-zinc-800/50 rounded-md border border-zinc-700/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2.5 py-1 text-xs font-medium text-zinc-500 bg-zinc-800/30 rounded-md">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
