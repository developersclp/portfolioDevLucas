"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

/**
 * HeroScrollDemo - Scroll animation section placed right after the hero
 * Shows a featured portfolio preview with 3D scroll effect
 */
export function HeroScrollDemo() {
  return (
    <section className="bg-zinc-950 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-950" />

      <div className="relative">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">
                Conheça meu trabalho <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Portfólio
                </span>
              </h2>
            </>
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80"
            alt="Portfolio preview"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  );
}
