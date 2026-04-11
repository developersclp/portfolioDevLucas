import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || "lucgarcbeni@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Pitanga13*";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: {
      email: adminEmail,
      password: hashedPassword,
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // 2. Create categories
  const categoryNames = [
    "Full Stack",
    "Frontend",
    "AI/ML",
    "Mobile",
    "Cloud",
    "Backend",
    "DevOps",
  ];

  const categories: Record<string, { id: string }> = {};
  for (const name of categoryNames) {
    const cat = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    categories[name] = cat;
  }
  console.log(`✅ ${categoryNames.length} categories created`);

  // 3. Create projects (matching existing mock data)
  const projectsData = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce application with payment integration, real-time inventory management, and admin dashboard.",
      longDescription:
        "A complete e-commerce platform built with Next.js and Node.js, featuring Stripe payment integration, real-time inventory tracking with WebSockets, an admin dashboard for product and order management, user authentication with OAuth 2.0, and advanced search powered by Elasticsearch. The application uses server-side rendering for SEO optimization and includes a responsive design that works flawlessly across all devices.",
      technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      githubUrl: "https://github.com/user/ecommerce-platform",
      demoUrl: "https://ecommerce-demo.vercel.app",
      featured: true,
      category: "Full Stack",
      date: "2024-12",
    },
    {
      title: "AI Chat Application",
      description:
        "Real-time chat application powered by AI, with streaming responses, conversation history, and multi-model support.",
      longDescription:
        "An intelligent chat application that integrates multiple AI models including GPT-4 and Claude. Features include streaming response rendering, persistent conversation history, markdown rendering, code syntax highlighting, file attachment support, and an intuitive dark/light mode interface. Built with a focus on performance and user experience.",
      technologies: ["React", "TypeScript", "Python", "FastAPI", "OpenAI", "WebSocket"],
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      githubUrl: "https://github.com/user/ai-chat-app",
      demoUrl: "https://ai-chat-demo.vercel.app",
      featured: true,
      category: "AI/ML",
      date: "2025-01",
    },
    {
      title: "Task Management Dashboard",
      description:
        "Kanban-style project management tool with drag-and-drop, team collaboration, and real-time updates.",
      longDescription:
        "A comprehensive project management dashboard inspired by Trello and Notion. Features drag-and-drop task management with smooth animations, real-time collaboration via WebSockets, deadline tracking with notifications, team workspaces, file attachments, and detailed analytics charts. Implements optimistic UI updates for a seamless experience.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
      githubUrl: "https://github.com/user/task-dashboard",
      demoUrl: "https://tasks-demo.vercel.app",
      featured: true,
      category: "Full Stack",
      date: "2024-10",
    },
    {
      title: "Weather Forecast App",
      description:
        "Beautiful weather application with animated visualizations, 7-day forecast, and location-based services.",
      longDescription:
        "A visually stunning weather application featuring animated weather conditions, interactive maps, detailed forecasts with hourly and weekly views, air quality index, UV index tracking, and customizable alerts. Uses geolocation APIs for automatic location detection and supports multiple cities tracking.",
      technologies: ["React", "TypeScript", "REST API", "Chart.js", "Tailwind CSS"],
      imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
      githubUrl: "https://github.com/user/weather-app",
      demoUrl: "https://weather-demo.vercel.app",
      featured: false,
      category: "Frontend",
      date: "2024-08",
    },
    {
      title: "Portfolio CMS",
      description:
        "Headless CMS for managing portfolio content with a visual editor and API-first architecture.",
      longDescription:
        "A custom-built headless CMS designed for portfolio websites. Features a visual drag-and-drop page builder, image optimization pipeline, SEO metadata management, webhook integrations, and a RESTful API for content delivery. Includes a rich text editor with markdown support and media library management.",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS S3", "Tailwind CSS"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      githubUrl: "https://github.com/user/portfolio-cms",
      featured: false,
      category: "Full Stack",
      date: "2024-06",
    },
    {
      title: "Fitness Tracker Mobile App",
      description:
        "Cross-platform fitness tracking application with workout plans, progress charts, and social features.",
      longDescription:
        "A cross-platform mobile application for fitness tracking built with React Native. Includes workout plan creation and scheduling, exercise library with animated demonstrations, progress tracking with interactive charts, social features for sharing achievements, integration with health APIs, and offline support with local data sync.",
      technologies: ["React Native", "TypeScript", "Firebase", "Node.js", "Chart.js"],
      imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
      githubUrl: "https://github.com/user/fitness-tracker",
      featured: false,
      category: "Mobile",
      date: "2024-04",
    },
  ];

  for (const proj of projectsData) {
    await prisma.project.create({
      data: {
        title: proj.title,
        description: proj.description,
        longDescription: proj.longDescription,
        technologies: proj.technologies,
        imageUrl: proj.imageUrl,
        githubUrl: proj.githubUrl,
        demoUrl: proj.demoUrl,
        featured: proj.featured,
        date: proj.date,
        categoryId: categories[proj.category].id,
      },
    });
  }
  console.log(`✅ ${projectsData.length} projects created`);

  // 4. Create certifications (matching existing mock data)
  const certsData = [
    {
      name: "AWS Solutions Architect – Associate",
      institution: "Amazon Web Services",
      date: "2025-01",
      credentialId: "AWS-SAA-2025-001",
      credentialUrl: "https://www.credly.com/badges/example-1",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
      technologies: ["AWS", "Cloud", "DevOps"],
      category: "Cloud",
    },
    {
      name: "Google Professional Cloud Developer",
      institution: "Google Cloud",
      date: "2024-11",
      credentialId: "GCP-PCD-2024-042",
      credentialUrl: "https://www.credly.com/badges/example-2",
      imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&q=80",
      technologies: ["GCP", "Cloud", "Kubernetes"],
      category: "Cloud",
    },
    {
      name: "Meta Front-End Developer Professional Certificate",
      institution: "Meta (Coursera)",
      date: "2024-08",
      credentialId: "META-FED-2024-789",
      credentialUrl: "https://www.coursera.org/verify/example-3",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
      technologies: ["React", "JavaScript", "CSS", "TypeScript"],
      category: "Frontend",
    },
    {
      name: "MongoDB Associate Developer",
      institution: "MongoDB University",
      date: "2024-05",
      credentialId: "MDB-DEV-2024-333",
      credentialUrl: "https://university.mongodb.com/verify/example-4",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
      technologies: ["MongoDB", "Node.js", "Database"],
      category: "Backend",
    },
    {
      name: "TypeScript Advanced Patterns",
      institution: "Frontend Masters",
      date: "2024-03",
      credentialId: "FEM-TS-2024-101",
      credentialUrl: "https://frontendmasters.com/verify/example-5",
      imageUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=400&q=80",
      technologies: ["TypeScript", "JavaScript"],
      category: "Frontend",
    },
    {
      name: "Docker & Kubernetes Fundamentals",
      institution: "Linux Foundation",
      date: "2024-01",
      credentialId: "LF-DK-2024-567",
      credentialUrl: "https://training.linuxfoundation.org/verify/example-6",
      imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&q=80",
      technologies: ["Docker", "Kubernetes", "DevOps"],
      category: "DevOps",
    },
  ];

  for (const cert of certsData) {
    await prisma.certification.create({
      data: {
        name: cert.name,
        institution: cert.institution,
        date: cert.date,
        credentialId: cert.credentialId,
        credentialUrl: cert.credentialUrl,
        imageUrl: cert.imageUrl,
        technologies: cert.technologies,
        categoryId: categories[cert.category].id,
      },
    });
  }
  console.log(`✅ ${certsData.length} certifications created`);

  // 5. Create Profile
  const profileData = await prisma.profile.create({
    data: {
      name: "Lucas Garcia",
      title: "Full Stack Developer",
      summary:
        "Desenvolvedor Full Stack apaixonado por construir aplicações web e mobile modernas, escaláveis e de alta performance. Com experiência em React, Next.js, Node.js e cloud computing, busco sempre entregar soluções elegantes que resolvem problemas reais. Focado em clean code, boas práticas de engenharia e experiência do usuário.",
      email: "lucas@example.com",
      phone: "+55 (11) 99999-9999",
      location: "São Paulo, SP - Brasil",
      linkedin: "https://linkedin.com/in/lucas-garcia",
      github: "https://github.com/lucas-garcia",
      website: "https://lucasgarcia.dev",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "AWS",
        "Docker",
        "Tailwind CSS",
        "Git",
        "REST APIs",
        "GraphQL",
        "CI/CD",
      ],
    },
  });
  console.log(`✅ Profile created`);

  // 6. Create Experience
  const experiences = [
    {
      role: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2023 - Presente",
      description:
        "Liderança técnica de equipe de 5 desenvolvedores. Arquitetura e desenvolvimento de aplicações web escaláveis com React e Node.js.",
      order: 1,
    },
    {
      role: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2021 - 2023",
      description:
        "Desenvolvimento de plataforma SaaS com Next.js, implementação de microserviços e integração com APIs de terceiros.",
      order: 2,
    },
    {
      role: "Frontend Developer",
      company: "AgênciaWeb",
      period: "2019 - 2021",
      description:
        "Criação de interfaces responsivas e interativas para clientes corporativos usando React e Vue.js.",
      order: 3,
    },
  ];
  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`✅ ${experiences.length} experiences created`);

  // 7. Create Education
  const education = [
    {
      degree: "Bacharelado em Ciência da Computação",
      institution: "Universidade de São Paulo (USP)",
      period: "2015 - 2019",
      order: 1,
    },
  ];
  for (const edu of education) {
    await prisma.education.create({ data: edu });
  }
  console.log(`✅ ${education.length} education records created`);

  // 8. Create Languages
  const languages = [
    { name: "Português", level: "Nativo", order: 1 },
    { name: "Inglês", level: "Fluente", order: 2 },
    { name: "Espanhol", level: "Intermediário", order: 3 },
  ];
  for (const lang of languages) {
    await prisma.language.create({ data: lang });
  }
  console.log(`✅ ${languages.length} languages created`);

  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
