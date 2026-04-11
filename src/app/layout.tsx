import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucas Garcia | Full Stack Developer - Portfólio",
  description:
    "Portfólio profissional de Lucas Garcia, desenvolvedor Full Stack especializado em React, Next.js, TypeScript e Node.js. Confira projetos, certificações e currículo.",
  keywords: [
    "desenvolvedor",
    "full stack",
    "react",
    "next.js",
    "typescript",
    "portfolio",
    "lucas garcia",
  ],
  authors: [{ name: "Lucas Garcia" }],
  openGraph: {
    title: "Lucas Garcia | Full Stack Developer",
    description:
      "Portfólio profissional com projetos, certificações e currículo gerado automaticamente.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-zinc-950 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
