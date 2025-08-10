export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Tools"
  | "Databases"
  | "Cloud";

export type Skill = {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
};

export type SkillsByCategory = Record<SkillCategory, Skill[]>;

export const skills: SkillsByCategory = {
  Languages: [
    { name: "TypeScript", level: "expert" },
    { name: "JavaScript", level: "expert" },
    { name: "Java", level: "advanced" },
    { name: "HTML", level: "expert" },
    { name: "CSS", level: "expert" },
  ],
  Frontend: [
    { name: "React", level: "expert" },
    { name: "Astro", level: "advanced" },
    { name: "Next.js", level: "advanced" },
    { name: "Tailwind CSS", level: "expert" },
    { name: "Framer Motion", level: "advanced" },
  ],
  Backend: [
    { name: "Node.js", level: "advanced" },
    { name: "Express", level: "advanced" },
    { name: "Spring Boot", level: "intermediate" },
    { name: "REST APIs", level: "expert" },
    { name: "GraphQL", level: "intermediate" },
  ],
  Tools: [
    { name: "Git", level: "expert" },
    { name: "Docker", level: "intermediate" },
    { name: "Vite", level: "advanced" },
    { name: "Vitest/Jest", level: "advanced" },
    { name: "Playwright", level: "intermediate" },
  ],
  Databases: [
    { name: "PostgreSQL", level: "advanced" },
    { name: "MySQL", level: "advanced" },
    { name: "MongoDB", level: "intermediate" },
    { name: "Prisma", level: "advanced" },
  ],
  Cloud: [
    { name: "Vercel", level: "advanced" },
    { name: "Netlify", level: "advanced" },
    { name: "AWS (EC2/S3)", level: "intermediate" },
  ],
};