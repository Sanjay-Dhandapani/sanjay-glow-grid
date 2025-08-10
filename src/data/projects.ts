export type ProjectLink = {
  label: "Live" | "GitHub" | "Case Study";
  url: string;
};

export type ProjectMeta = {
  title: string;
  slug: string;
  description: string;
  category: "frontend" | "backend" | "fullstack" | "mobile";
  techStack: string[];
  featured?: boolean;
  year?: string;
  duration?: string;
  coverImage?: string;
  links?: ProjectLink[];
  order?: number;
};

export const featuredProjectSlugs: string[] = [
  "portfolio-website",
  "digital-marketing-app",
  "expense-tracker",
  "house-interior-website",
];

/**
 * Optional curated metadata for non-content driven lists.
 * Source of truth for detailed content remains the content collection (MD/MDX).
 */
export const curatedProjects: Partial<Record<string, Partial<ProjectMeta>>> = {
  "portfolio-website": {
    title: "Developer Portfolio",
    category: "frontend",
    techStack: ["Astro", "React", "TypeScript", "Tailwind"],
    featured: true,
    order: 1,
  },
  "digital-marketing-app": {
    title: "Digital Marketing App",
    category: "fullstack",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    featured: true,
    order: 2,
  },
  "expense-tracker": {
    title: "Expense Tracker",
    category: "fullstack",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    featured: true,
    order: 3,
  },
  "house-interior-website": {
    title: "House Interior Website",
    category: "frontend",
    techStack: ["HTML/CSS", "JavaScript", "Bootstrap"],
    featured: true,
    order: 4,
  },
};