"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * SectionHeader - Reusable section header with animated entrance
 */
export function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-16"
    >
      <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase border border-emerald-400/20 rounded-full bg-emerald-400/5">
        {label}
      </span>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
