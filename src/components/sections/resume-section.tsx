"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  Globe,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { formatDate, type ResumeData } from "@/lib/generate-resume";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/**
 * ResumeSection - Auto-generated resume from portfolio data with PDF export
 * Receives resumeData as prop from the server component
 */
export function ResumeSection({ resumeData }: { resumeData: ResumeData }) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  /**
   * Gera o PDF diretamente com jsPDF, sem html2canvas.
   * Produz um PDF profissional com texto selecionável.
   */
  const handleExportPDF = async () => {
    setIsExporting(true);

    try {
      const jspdfModule = await import("jspdf") as any;
      const jsPDF = jspdfModule.jsPDF || jspdfModule.default;

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      // Cores
      const darkBg: [number, number, number] = [24, 24, 27]; // zinc-900
      const emerald: [number, number, number] = [52, 211, 153]; // emerald-400
      const white: [number, number, number] = [255, 255, 255];
      const gray: [number, number, number] = [161, 161, 170]; // zinc-400
      const darkGray: [number, number, number] = [113, 113, 122]; // zinc-500
      const lineColor: [number, number, number] = [39, 39, 42]; // zinc-800

      // Fundo escuro
      pdf.setFillColor(...darkBg);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      // Helper: checar se precisa de nova página
      const checkPage = (needed: number) => {
        if (y + needed > pageHeight - margin) {
          pdf.addPage();
          pdf.setFillColor(...darkBg);
          pdf.rect(0, 0, pageWidth, pageHeight, "F");
          y = margin;
        }
      };

      // Helper: quebra de texto multi-linha com retorno da altura usada
      const writeMultiline = (
        text: string,
        x: number,
        maxWidth: number,
        fontSize: number,
        color: [number, number, number],
        fontStyle: string = "normal"
      ): number => {
        pdf.setFontSize(fontSize);
        pdf.setTextColor(...color);
        pdf.setFont("helvetica", fontStyle);
        const lines = pdf.splitTextToSize(text, maxWidth);
        const lineHeight = fontSize * 0.45;
        for (const line of lines) {
          checkPage(lineHeight);
          pdf.text(line, x, y);
          y += lineHeight;
        }
        return lines.length * lineHeight;
      };

      // Helper: linha separadora
      const drawSeparator = () => {
        checkPage(8);
        y += 4;
        pdf.setDrawColor(...lineColor);
        pdf.setLineWidth(0.3);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 4;
      };

      // Helper: título de seção
      const drawSectionTitle = (title: string) => {
        checkPage(12);
        // Bolinha emerald
        pdf.setFillColor(...emerald);
        pdf.circle(margin + 2, y - 1.5, 1.5, "F");
        // Título
        pdf.setFontSize(13);
        pdf.setTextColor(...white);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, margin + 7, y);
        y += 7;
      };

      // ===== HEADER =====
      pdf.setFontSize(24);
      pdf.setTextColor(...white);
      pdf.setFont("helvetica", "bold");
      pdf.text(resumeData.profile.name, pageWidth / 2, y, { align: "center" });
      y += 8;

      pdf.setFontSize(12);
      pdf.setTextColor(...emerald);
      pdf.setFont("helvetica", "normal");
      pdf.text(resumeData.profile.title, pageWidth / 2, y, { align: "center" });
      y += 7;

      // Contato (centralizado com separadores)
      pdf.setFontSize(9);
      pdf.setTextColor(...gray);
      const contactParts = [
        resumeData.profile.email,
        resumeData.profile.location,
        resumeData.profile.phone,
      ].filter(Boolean);
      const contactLine = contactParts.join("  •  ");
      pdf.text(contactLine, pageWidth / 2, y, { align: "center" });
      y += 5;

      // LinkedIn / GitHub
      const linkParts = [
        resumeData.profile.linkedin,
        resumeData.profile.github,
      ].filter(Boolean);
      if (linkParts.length > 0) {
        pdf.setTextColor(...emerald);
        pdf.setFontSize(8);
        pdf.text(linkParts.join("  |  "), pageWidth / 2, y, { align: "center" });
        y += 4;
      }

      // ===== RESUMO PROFISSIONAL =====
      drawSeparator();
      drawSectionTitle("Resumo Profissional");
      if (resumeData.profile.summary) {
        writeMultiline(resumeData.profile.summary, margin, contentWidth, 10, gray);
      }

      // ===== EXPERIÊNCIA =====
      if (resumeData.profile.experience.length > 0) {
        drawSeparator();
        drawSectionTitle("Experiência Profissional");
        for (const exp of resumeData.profile.experience) {
          checkPage(16);
          // Cargo
          pdf.setFontSize(11);
          pdf.setTextColor(...white);
          pdf.setFont("helvetica", "bold");
          pdf.text(exp.role, margin, y);
          y += 5;
          // Empresa + Período
          pdf.setFontSize(9);
          pdf.setTextColor(...emerald);
          pdf.setFont("helvetica", "normal");
          pdf.text(`${exp.company}  •  ${exp.period}`, margin, y);
          y += 5;
          // Descrição
          if (exp.description) {
            writeMultiline(exp.description, margin, contentWidth, 9, gray);
          }
          y += 3;
        }
      }

      // ===== EDUCAÇÃO =====
      if (resumeData.profile.education.length > 0) {
        drawSeparator();
        drawSectionTitle("Educação");
        for (const edu of resumeData.profile.education) {
          checkPage(12);
          pdf.setFontSize(11);
          pdf.setTextColor(...white);
          pdf.setFont("helvetica", "bold");
          pdf.text(edu.degree, margin, y);
          y += 5;
          pdf.setFontSize(9);
          pdf.setTextColor(...emerald);
          pdf.setFont("helvetica", "normal");
          pdf.text(`${edu.institution}  •  ${edu.period}`, margin, y);
          y += 7;
        }
      }

      // ===== PROJETOS RELEVANTES =====
      if (resumeData.featuredProjects.length > 0) {
        drawSeparator();
        drawSectionTitle("Projetos Relevantes");
        for (const project of resumeData.featuredProjects) {
          checkPage(14);
          pdf.setFontSize(10);
          pdf.setTextColor(...white);
          pdf.setFont("helvetica", "bold");
          pdf.text(project.name || project.title, margin, y);
          y += 4.5;
          if (project.description) {
            writeMultiline(project.description, margin, contentWidth, 9, gray);
          }
          // Tecnologias em linha
          if (project.technologies?.length) {
            pdf.setFontSize(8);
            pdf.setTextColor(...emerald);
            pdf.setFont("helvetica", "normal");
            checkPage(5);
            pdf.text(project.technologies.join("  •  "), margin, y);
            y += 5;
          }
          y += 2;
        }
      }

      // ===== CERTIFICAÇÕES =====
      if (resumeData.certifications.length > 0) {
        drawSeparator();
        drawSectionTitle("Certificações");
        for (const cert of resumeData.certifications) {
          checkPage(8);
          // Bullet
          pdf.setFillColor(...emerald);
          pdf.circle(margin + 1.5, y - 1, 0.8, "F");
          // Nome
          pdf.setFontSize(10);
          pdf.setTextColor(...white);
          pdf.setFont("helvetica", "normal");
          pdf.text(cert.name, margin + 5, y);
          y += 4;
          // Instituição + Data
          pdf.setFontSize(8);
          pdf.setTextColor(...darkGray);
          pdf.text(`${cert.institution}  •  ${formatDate(cert.date)}`, margin + 5, y);
          y += 5;
        }
      }

      // ===== TECNOLOGIAS & HABILIDADES =====
      if (resumeData.profile.skills.length > 0) {
        drawSeparator();
        drawSectionTitle("Tecnologias & Habilidades");
        checkPage(8);
        pdf.setFontSize(9);
        pdf.setTextColor(...gray);
        pdf.setFont("helvetica", "normal");
        const skillsText = resumeData.profile.skills.join("  •  ");
        writeMultiline(skillsText, margin, contentWidth, 9, gray);
      }

      // ===== IDIOMAS =====
      if (resumeData.profile.languages.length > 0) {
        drawSeparator();
        drawSectionTitle("Idiomas");
        checkPage(8);
        const langParts = resumeData.profile.languages
          .map((l) => `${l.name} — ${l.level}`)
          .join("    |    ");
        pdf.setFontSize(10);
        pdf.setTextColor(...gray);
        pdf.setFont("helvetica", "normal");
        pdf.text(langParts, margin, y);
        y += 6;
      }

      // ===== RODAPÉ =====
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(7);
        pdf.setTextColor(...darkGray);
        pdf.text(
          `${resumeData.profile.name} — Currículo Profissional`,
          margin,
          pageHeight - 8
        );
        pdf.text(
          `Página ${i} de ${totalPages}`,
          pageWidth - margin,
          pageHeight - 8,
          { align: "right" }
        );
      }

      const fileName = `curriculo-${resumeData.profile.name.toLowerCase().replace(/\s+/g, "-")}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Houve um erro ao gerar o PDF. Verifique o console.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="resume" className="relative py-24 md:py-32 bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.03)_0%,_transparent_50%)]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Currículo"
          title="Currículo Profissional"
          description="Gerado automaticamente com base nos projetos e certificações do portfólio."
        />

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {isExporting ? "Exportando..." : "Exportar como PDF"}
          </button>
        </motion.div>

        {/* Resume Content (visual preview on the page) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            ref={resumeRef}
            className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 md:p-10 space-y-8"
          >
            {/* Header */}
            <div className="text-center pb-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {resumeData.profile.name}
              </h3>
              <p className="text-lg text-emerald-400 font-medium mb-4">
                {resumeData.profile.title}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {resumeData.profile.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {resumeData.profile.location}
                </span>
                {resumeData.profile.website && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    {resumeData.profile.website}
                  </span>
                )}
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Professional Summary */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h4 className="text-lg font-semibold text-white">Resumo Profissional</h4>
              </div>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {resumeData.profile.summary}
              </p>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Experience */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <h4 className="text-lg font-semibold text-white">Experiência Profissional</h4>
              </div>
              <div className="space-y-5">
                {resumeData.profile.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-zinc-800">
                    <div className="absolute left-[-5px] top-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
                    <h5 className="text-base font-semibold text-white">{exp.role}</h5>
                    <p className="text-sm text-emerald-400/80 mb-1">
                      {exp.company} • {exp.period}
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <h4 className="text-lg font-semibold text-white">Educação</h4>
              </div>
              {resumeData.profile.education.map((edu, i) => (
                <div key={i} className="pl-6 border-l-2 border-zinc-800 relative">
                  <div className="absolute left-[-5px] top-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
                  <h5 className="text-base font-semibold text-white">{edu.degree}</h5>
                  <p className="text-sm text-emerald-400/80">
                    {edu.institution} • {edu.period}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="bg-zinc-800" />

            {/* Featured Projects */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <h4 className="text-lg font-semibold text-white">Projetos Relevantes</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeData.featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30"
                  >
                    <h5 className="text-sm font-semibold text-white mb-1">{project.name}</h5>
                    <p className="text-xs text-zinc-400 mb-2 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-[10px] bg-zinc-700/50 text-zinc-300 border-zinc-600/50 px-1.5 py-0"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-emerald-400" />
                <h4 className="text-lg font-semibold text-white">Certificações</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">{cert.name}</p>
                      <p className="text-xs text-zinc-500">
                        {cert.institution} • {formatDate(cert.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Technologies */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <h4 className="text-lg font-semibold text-white">Tecnologias & Habilidades</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.profile.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Languages */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-emerald-400" />
                <h4 className="text-lg font-semibold text-white">Idiomas</h4>
              </div>
              <div className="flex flex-wrap gap-4">
                {resumeData.profile.languages.map((lang) => (
                  <div key={lang.name} className="text-sm">
                    <span className="text-white font-medium">{lang.name}</span>
                    <span className="text-zinc-500"> — {lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
