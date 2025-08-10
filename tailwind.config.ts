import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				lg: '2rem',
			},
			screens: {
				'2xl': '1320px',
			}
		},
		extend: {
			// Premium Typography System
			fontFamily: {
				'display': ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
				'sans': ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				'mono': ['var(--font-mono)', 'ui-monospace', 'monospace'],
				'brand': ['var(--font-brand)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				// base Tailwind sizes preserved
				'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
				'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.015em' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.015em' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.01em' }],
				'2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0.01em' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0.005em' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '0' }],
				'5xl': ['3rem', { lineHeight: '3.25rem', letterSpacing: '-0.015em' }],
				'6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.02em' }],
				'7xl': ['4.5rem', { lineHeight: '4.75rem', letterSpacing: '-0.025em' }],
				'8xl': ['6rem', { lineHeight: '6.25rem', letterSpacing: '-0.03em' }],
				'9xl': ['8rem', { lineHeight: '8.25rem', letterSpacing: '-0.035em' }],

				// Cinematic heading/body tokens
				'display': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
				'h1': ['clamp(2.25rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
				'h2': ['clamp(1.875rem, 3vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
				'h3': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.005em', fontWeight: '600' }],
				'h4': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '0', fontWeight: '600' }],
				'body-lg': ['1.125rem', { lineHeight: '1.85', letterSpacing: '0', fontWeight: '400' }],
				'body': ['1rem', { lineHeight: '1.8', letterSpacing: '0', fontWeight: '400' }],
				'body-sm': ['0.9375rem', { lineHeight: '1.7', letterSpacing: '0', fontWeight: '400' }],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Global aliases for consistent usage
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					hover: 'hsl(var(--surface-hover))',
					active: 'hsl(var(--surface-active))',
					subtle: 'hsl(var(--surface-subtle))',
					muted: 'hsl(var(--surface-muted))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				subtle: {
					DEFAULT: 'hsl(var(--surface-subtle))'
				},
				// Premium Brand Colors - Distinctive Sanjay Dhandapani Identity
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					muted: 'hsl(var(--primary-muted))',
					subtle: 'hsl(var(--primary-subtle))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					glow: 'hsl(var(--secondary-glow))',
					muted: 'hsl(var(--secondary-muted))',
				},
				tertiary: {
					DEFAULT: 'hsl(var(--tertiary))',
					foreground: 'hsl(var(--tertiary-foreground))',
					glow: 'hsl(var(--tertiary-glow))',
					muted: 'hsl(var(--tertiary-muted))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					glow: 'hsl(var(--accent-glow))',
					muted: 'hsl(var(--accent-muted))',
					subtle: 'hsl(var(--accent-subtle))',
				},
				// Aliases to ensure presence
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					hover: 'hsl(var(--card-hover))',
					border: 'hsl(var(--card-border))',
					shadow: 'hsl(var(--card-shadow))',
				},
				// Sophisticated neutral palette
				neutral: {
					50: 'hsl(var(--neutral-50))',
					100: 'hsl(var(--neutral-100))',
					200: 'hsl(var(--neutral-200))',
					300: 'hsl(var(--neutral-300))',
					400: 'hsl(var(--neutral-400))',
					500: 'hsl(var(--neutral-500))',
					600: 'hsl(var(--neutral-600))',
					700: 'hsl(var(--neutral-700))',
					800: 'hsl(var(--neutral-800))',
					900: 'hsl(var(--neutral-900))',
					950: 'hsl(var(--neutral-950))',
				},
				// Premium surface colors
			},
			// Enhanced Background Images
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-tertiary': 'var(--gradient-tertiary)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-mesh': 'var(--gradient-mesh)',
				'gradient-radial': 'var(--gradient-radial)',
				'gradient-conic': 'var(--gradient-conic)',
				'noise': 'var(--noise-texture)',
			},
			// Premium Shadow System
			boxShadow: {
				'xs': 'var(--shadow-xs)',
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
				'2xl': 'var(--shadow-2xl)',
				'primary': 'var(--shadow-primary)',
				'primary-lg': 'var(--shadow-primary-lg)',
				'accent': 'var(--shadow-accent)',
				'accent-lg': 'var(--shadow-accent-lg)',
				'card': 'var(--shadow-card)',
				'card-hover': 'var(--shadow-card-hover)',
				'glow': 'var(--shadow-glow)',
				'glow-primary': 'var(--shadow-glow-primary)',
				'glow-accent': 'var(--shadow-glow-accent)',
				'inner-glow': 'var(--shadow-inner-glow)',
				'neon': 'var(--shadow-neon)',
			},
			// Enhanced Border Radius
			borderRadius: {
				'none': '0',
				'xs': '0.125rem',
				'sm': '0.25rem',
				'md': '0.375rem',
				'lg': 'var(--radius)',
				'xl': 'calc(var(--radius) + 0.25rem)',
				'2xl': 'calc(var(--radius) + 0.5rem)',
				'3xl': 'calc(var(--radius) + 0.75rem)',
				'full': '9999px',
			},
			// Advanced Animation System
			keyframes: {
				// Core UI Animations
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				// Premium Brand Animations
				'grid-pulse': {
					'0%': { opacity: '0.3', transform: 'translateX(0) translateY(0)' },
					'100%': { opacity: '0.1', transform: 'translateX(25px) translateY(25px)' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'skill-flip': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(180deg)' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				// Premium Glow Effects
				'pulse-glow': {
					'0%': { boxShadow: 'var(--shadow-glow)' },
					'50%': { boxShadow: 'var(--shadow-glow-primary)' },
					'100%': { boxShadow: 'var(--shadow-glow)' }
				},
				'breathing': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
					'50%': { transform: 'scale(1.05)', opacity: '1' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				// Morphing Effects
				'morph-scale': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' }
				},
				'liquid-morph': {
					'0%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
					'25%': { borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%' },
					'50%': { borderRadius: '50% 50% 33% 67% / 55% 27% 73% 45%' },
					'75%': { borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%' },
					'100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }
				},
				// Text Effects
				'typewriter': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'text-reveal': {
					'0%': { clipPath: 'inset(0 100% 0 0)' },
					'100%': { clipPath: 'inset(0 0 0 0)' }
				},
				// Magnetic Effects
				'magnetic-pull': {
					'0%': { transform: 'translateY(0) scale(1)' },
					'100%': { transform: 'translateY(-8px) scale(1.05)' }
				}
			},
			animation: {
				// Core Animations
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// Premium Entrance Animations
				'fade-in': 'fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
				'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
				'slide-in-left': 'slide-in-left 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
				'slide-in-right': 'slide-in-right 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
				'slide-up': 'slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
				'scale-in': 'scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
				// Continuous Animations
				'grid-pulse': 'grid-pulse 8s ease-in-out infinite alternate',
				'bounce-slow': 'bounce 3s infinite',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'skill-flip': 'skill-flip 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				'float': 'float 3s ease-in-out infinite',
				'breathing': 'breathing 4s ease-in-out infinite',
				// Premium Effects
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'morph-scale': 'morph-scale 4s ease-in-out infinite',
				'liquid-morph': 'liquid-morph 8s ease-in-out infinite',
				// Interactive Animations
				'magnetic-pull': 'magnetic-pull 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
				// Text Animations
				'typewriter': 'typewriter 3s steps(30, end)',
				'text-reveal': 'text-reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
			},
			// Enhanced Transitions
			transitionTimingFunction: {
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
				'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
			},
			transitionDuration: {
				'150': '150ms',
				'200': '200ms',
				'250': '250ms',
				'400': '400ms',
				'600': '600ms',
				'800': '800ms',
				'1200': '1200ms',
			},
			// Advanced Spacing
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
				'144': '36rem',
			},
			// Premium Z-Index Scale
			zIndex: {
				'1': '1',
				'2': '2',
				'3': '3',
				'10': '10',
				'20': '20',
				'30': '30',
				'40': '40',
				'50': '50',
				'60': '60',
				'70': '70',
				'80': '80',
				'90': '90',
				'100': '100',
			},
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
