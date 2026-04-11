export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  demoUrl?: string | null;
  featured: boolean;
  category: string;
  date: string;
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  date: string;
  credentialId?: string | null;
  credentialUrl?: string | null;
  image: string;
  technologies: string[];
  category: string;
}
