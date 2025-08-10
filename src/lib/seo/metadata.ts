export type MetaInput = {
  title?: string;
  description?: string;
  og?: { image?: string; title?: string; description?: string };
};

const SITE = {
  name: "Sanjay — Portfolio",
  titleTemplate: "%s • Sanjay",
  description: "Full‑stack engineer building delightful web experiences.",
  ogImage: "/og-default.png",
};

export function buildMeta(input: MetaInput = {}) {
  const titleBase = input.title ?? SITE.name;
  const title = SITE.titleTemplate.replace("%%", "%").replace("%s", titleBase);
  const description = input.description ?? SITE.description;
  const ogTitle = input.og?.title ?? title;
  const ogDescription = input.og?.description ?? description;
  const ogImage = input.og?.image ?? SITE.ogImage;
  return { title, description, ogTitle, ogDescription, ogImage };
}