"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * FilterBar - Dynamic client-side filter system
 * Filters by technology and supports toggling
 */
export function FilterBar({
  technologies,
  selectedTech,
  onSelectTech,
}: {
  technologies: string[];
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap justify-center gap-2 mb-12"
    >
      <button
        onClick={() => onSelectTech(null)}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
          selectedTech === null
            ? "bg-emerald-400 text-black shadow-lg shadow-emerald-400/20"
            : "bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 border border-zinc-700/50"
        }`}
      >
        Todos
      </button>
      {technologies.map((tech) => (
        <button
          key={tech}
          onClick={() => onSelectTech(selectedTech === tech ? null : tech)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
            selectedTech === tech
              ? "bg-emerald-400 text-black shadow-lg shadow-emerald-400/20"
              : "bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 border border-zinc-700/50"
          }`}
        >
          {tech}
        </button>
      ))}
    </motion.div>
  );
}
