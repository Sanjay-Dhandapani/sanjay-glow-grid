export type PersonalInfo = {
  name: string;
  title: string;
  location: string;
  email?: string;
  phone?: string;
  summary: string;
};

export const personal: PersonalInfo = {
  name: "Sanjay Dhandapani",
  title: "Full‑Stack Web Developer",
  location: "Coimbatore, Tamil Nadu, India",
  email: "sanjaydhandapani0@gmail.com",
  phone: "+91 95977 26066",
  summary:
    "Full‑stack developer focused on building immersive, performant web experiences with React, TypeScript, Java/Spring Boot, and modern tooling. Passionate about scalable architectures, clean APIs, and delightful UI motion.",
};