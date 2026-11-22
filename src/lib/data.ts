export const profile = {
  name: "Nikhil Kumar Tiwari",
  brand: "Nikhil.dev",
  prompt: "nikhil@dev:~$",
  email: "nikhilkumar.0112358@gmail.com",
  resume: "/NIKHILRESUME.pdf",
  photo: "/profile.jpeg",
};

export const socials = [
  { label: "Email", href: "mailto:nikhilkumar.0112358@gmail.com", handle: "nikhilkumar.0112358@gmail.com", icon: "mail" },
  { label: "GitHub", href: "https://github.com/nikhilkumar011", handle: "@nikhilkumar011", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nikhil-kumar-tiwari-8b16b0376/", handle: "in/nikhil-kumar-tiwari", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com/nikhil73kumar", handle: "@nikhil73kumar", icon: "instagram" },
] as const;

export const navLinks = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export const roles = ["Java & Spring Boot", "REST APIs", "RAG & LLM apps", "Next.js products"];

export const stats = [
  { value: 7, suffix: "+", label: "Projects shipped" },
  { text: "Java", label: "Backend focus" },
  { text: "AI", label: "LLMs + RAG" },
  { text: "CS", label: "Engineering student" },
];

export type SkillGroup = {
  title: string;
  tag: string;
  accent: "spring" | "java" | "ai" | "web" | "neutral";
  items: { name: string; learning?: boolean }[];
  span?: string;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    tag: "primary focus",
    accent: "spring",
    span: "md:col-span-2 md:row-span-2",
    items: [
      { name: "Java", learning: true },
      { name: "Spring Boot", learning: true },
      { name: "Spring Data JPA", learning: true },
      { name: "Spring Security", learning: true },
      { name: "Hibernate", learning: true },
      { name: "Maven", learning: true },
      { name: "RESTful APIs" },
      { name: "Microservices" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "FastAPI" },
    ],
  },
  {
    title: "Applied AI",
    tag: "LLMs · RAG",
    accent: "ai",
    span: "md:col-span-2",
    items: [
      { name: "LLMs" },
      { name: "RAG" },
      { name: "Vector Embeddings" },
      { name: "LangChain" },
      { name: "AI Agents" },
      { name: "PyTorch" },
      { name: "Scikit-learn" },
    ],
  },
  {
    title: "Frontend",
    tag: "secondary",
    accent: "web",
    items: [{ name: "React.js" }, { name: "Next.js" }, { name: "Tailwind CSS" }, { name: "TypeScript" }],
  },
  {
    title: "Databases",
    tag: "persistence",
    accent: "java",
    items: [{ name: "PostgreSQL" }, { name: "MongoDB" }, { name: "Redis" }, { name: "Prisma ORM" }, { name: "SQL" }],
  },
  {
    title: "Languages",
    tag: "polyglot",
    accent: "neutral",
    items: [
      { name: "Java", learning: true },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "C++" },
      { name: "C" },
      { name: "SQL" },
    ],
  },
  {
    title: "Tools",
    tag: "shipping",
    accent: "neutral",
    items: [{ name: "Git" }, { name: "GitHub" }, { name: "Docker" }],
  },
  {
    title: "Concepts",
    tag: "fundamentals",
    accent: "neutral",
    span: "md:col-span-2",
    items: [
      { name: "OOP" },
      { name: "DSA" },
      { name: "DBMS" },
      { name: "Operating Systems" },
      { name: "Computer Networks" },
      { name: "System Design" },
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  kind: string;
  hue: number;
};

export const projects: Project[] = [
  {
    title: "CommonPlace – Multi-Agent AI Platform",
    description:
      "A multi-agent AI platform built with Next.js, Node.js, and TypeScript, featuring 5 specialized AI agents and 4 backend microservices. Implements agent orchestration, intelligent task execution, and scalable service communication to power AI-driven workflows through an interactive web interface.",
    tech: ["Next.js", "TypeScript", "Node.js", "AI Agents", "Microservices", "Docker"],
    github: "https://github.com/nikhilkumar011/CommonPlace-MultiagentAiPlatform",
    kind: "AI · Microservices",
    hue: 152,
  },
  {
    title: "LeetCode Clone",
    description:
      "A full-stack coding platform inspired by LeetCode, built with Next.js, Prisma, PostgreSQL, Judge0, and Better Auth. It supports problem management, secure auth, code execution, submissions, and admin workflows for a polished developer experience.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Docker", "Judge0", "BetterAuth"],
    github: "https://github.com/nikhilkumar011/Leetcode-Clone",
    kind: "Full-stack platform",
    hue: 32,
  },
  {
    title: "Visitor Pass Management System",
    description:
      "MERN-based workflow system for managing visitor requests, approvals, QR-based entry, and automated notifications for organizations.",
    tech: ["MongoDB", "Express", "React", "Node.js", "QR Code"],
    github: "https://github.com/nikhilkumar011/VISITOR-PASS-MANAGEMENT-SYSTEM",
    kind: "Workflow system",
    hue: 200,
  },
  {
    title: "unmuteX",
    description:
      "Website for a communication community for interview preparation — group discussions, debates, extempore, mock interviews and mentorship. Includes a team page, reviews saved to MongoDB, call booking via EmailJS, and downloadable certificates with QR-code verification.",
    tech: ["React", "Vite", "Motion", "Node.js", "MongoDB", "EmailJS"],
    github: "https://github.com/nikhilkumar011/unmuteXNew",
    live: "https://unmute-x-k3z1.vercel.app",
    kind: "Community platform",
    hue: 280,
  },
  {
    title: "Chat App",
    description: "A real-time chat application built with the MERN stack for instant messaging and live conversations.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Real-time"],
    github: "https://github.com/nikhilkumar011/Fullstack-Chat-Application",
    kind: "Real-time",
    hue: 175,
  },
  {
    title: "Blog Application (MERN)",
    description:
      "Full-stack blog platform where users create and manage posts, interact with others, and explore content through filtering and discovery flows.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/nikhilkumar011/Blog-Application-MERN",
    kind: "Content platform",
    hue: 12,
  },
  {
    title: "Movie Review Predictor",
    description:
      "ML-powered web app that predicts whether a movie review is positive or negative using a Logistic Regression model.",
    tech: ["Python", "Machine Learning", "Logistic Regression"],
    github: "https://github.com/nikhilkumar011/Movie-review-predictor",
    kind: "Machine learning",
    hue: 330,
  },
  {
    title: "The Laundry Service Website",
    description:
      "Frontend experience for a service business — booking flow, service selection, and confirmation messaging for a clean digital experience.",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "EmailJS"],
    github: "https://github.com/nikhilkumar011/The-laundry-service-website",
    kind: "Business frontend",
    hue: 220,
  },
  {
    title: "To-Do List App",
    description: "A clean, functional task manager for creating, tracking, and completing day-to-day work with a straightforward interface.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/nikhilkumar011/To-do-list-app",
    kind: "Productivity",
    hue: 95,
  },
];

export const journey = [
  {
    phase: "01",
    title: "Foundations",
    period: "C · C++ · DSA",
    body: "Started with C and C++ — pointers, memory, data structures and the problem-solving habits that everything else is built on.",
  },
  {
    phase: "02",
    title: "Full-stack with MERN",
    period: "MongoDB · Express · React · Node",
    body: "Shipped end-to-end apps — a real-time chat, a blog platform and a visitor management system with JWT auth, RBAC and QR-based entry.",
  },
  {
    phase: "03",
    title: "Next.js & production patterns",
    period: "Next.js · TypeScript · PostgreSQL · Docker",
    body: "Built a LeetCode-style judge with Judge0, Prisma and BetterAuth, and learned to containerise and deploy real services.",
  },
  {
    phase: "04",
    title: "Applied AI",
    period: "LLMs · RAG · Agents",
    body: "Moved into retrieval-augmented generation, vector embeddings and multi-agent systems — CommonPlace runs 5 agents across 4 microservices.",
  },
  {
    phase: "05",
    title: "Java & Spring Boot",
    period: "Now — deepening",
    body: "Going deep on the JVM backend: Spring Boot, Spring Data JPA, Spring Security and clean layered architecture — building robust APIs that can power AI products at scale.",
    current: true,
  },
];

export const education = {
  school: "VIT Bhopal University",
  degree: "B.Tech in Computer Science & Engineering (AI/ML)",
  period: "Expected Aug. 2029",
  detail: "CGPA 8.37 / 10",
};

export const certifications = [
  "Tutedude – MERN Stack Development Course",
  "Complete React and Next.js Course with AI-Powered Projects",
];

export const marquee = [
  "Java",
  "Spring Boot",
  "Spring Data JPA",
  "REST APIs",
  "PostgreSQL",
  "LLMs",
  "RAG",
  "LangChain",
  "Microservices",
  "Docker",
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Redis",
  "MongoDB",
];
