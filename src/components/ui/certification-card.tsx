"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Certification } from "@/types";
import Image from "next/image";

/**
 * CertificationCard - Individual certification card with hover effects
 */
export function CertificationCard({
  certification,
  index,
}: {
  certification: Certification;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-emerald-400/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-400/5">
        {/* Badge Image */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={certification.image}
            alt={certification.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

          {/* Award Icon */}
          <div className="absolute top-3 right-3">
            <div className="p-2 bg-emerald-400/10 backdrop-blur-sm rounded-full border border-emerald-400/20">
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-base font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
            {certification.name}
          </h3>

          <p className="text-sm text-zinc-400 mb-3">{certification.institution}</p>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-zinc-500">{certification.date}</span>
            {certification.credentialId && (
              <span className="text-xs text-zinc-600 font-mono">
                {certification.credentialId}
              </span>
            )}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {certification.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium text-zinc-400 bg-zinc-800/50 rounded-md border border-zinc-700/50"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Verify Link */}
          {certification.credentialUrl && (
            <a
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Verificar credencial
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
