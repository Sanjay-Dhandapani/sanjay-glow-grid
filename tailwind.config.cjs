/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        ring: 'rgb(var(--color-ring) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
      },
    },
  },
  safelist: [
    'container', 'mx-auto', 'max-w-7xl', 'px-6', 'py-12', 'py-24',
    'grid', 'flex', 'items-center', 'justify-center',
    'gap-2', 'gap-4', 'gap-6', 'gap-8',
    'rounded', 'rounded-md', 'rounded-lg',
    'border', 'shadow', 'shadow-md', 'shadow-lg',
    'text-center', 'text-left', 'text-right',
    'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4',
    'bg-bg', 'bg-card', 'text-fg', 'text-primary', 'text-secondary', 'text-accent',
    'border-border', 'ring-ring'
  ],
  plugins: [],
};