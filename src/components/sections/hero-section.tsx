"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Hero Section - Full viewport hero with video background, overlay, and animated text
 * Now dynamic: receives profile data as props
 */
export function HeroSection({ profile }: { profile?: { name: string; title: string } }) {
  const safeProfile = profile || {
    name: "Lucas Garcia Beni",
    title: "Full Stack Developer"
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/fundo.jpg"
      >
        <source
          src="/teste.webm"
          type="video/webm"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-wider text-emerald-400 uppercase border border-emerald-400/30 rounded-full bg-emerald-400/5 backdrop-blur-sm">
            {safeProfile.title}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
        >
          Olá, eu sou <br />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {safeProfile.name}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Construo experiências digitais modernas, escaláveis e de alta performance.
          Transformo ideias em código que faz a diferença.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 hover:scale-105"
          >
            Ver Projetos
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#resume"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            Meu Currículo
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-zinc-400"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
