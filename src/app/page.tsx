import { Navbar } from "@/components/sections/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { HeroScrollDemo } from "@/components/ui/demo";
import { ProjectsSection } from "@/components/sections/projects-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/sections/footer";
import { generateResume } from "@/lib/generate-resume";

/**
 * Home Page - Server Component that fetches data from DB
 * and passes it as props to client components
 */
export default async function Home() {
  const resumeData = await generateResume();

  return (
    <main className="relative">
      <Navbar />
      <HeroSection profile={resumeData.profile} />
      <HeroScrollDemo />
      <ProjectsSection
        projects={resumeData.allProjects}
        allTechnologies={resumeData.allTechnologies}
      />
      <CertificationsSection
        certifications={resumeData.certifications}
        allTechnologies={resumeData.allTechnologies}
      />
      <ResumeSection resumeData={resumeData} />
      <ContactSection profile={resumeData.profile} />
      <Footer profile={resumeData.profile} />
    </main>
  );
}
