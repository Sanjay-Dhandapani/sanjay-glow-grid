import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sanjaydhandapani.dev',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap()
  ],
  vite: {
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion']
    }
  },
  output: 'static'
});