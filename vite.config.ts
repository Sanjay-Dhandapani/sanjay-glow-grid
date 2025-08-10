import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), process.env.NODE_ENV === 'development' && componentTagger()].filter(Boolean) as any,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          vendor: ['react', 'react-dom'],
          // Separate animation libraries
          animations: ['framer-motion'],
          // Separate UI components
          ui: ['@radix-ui/react-toast', '@radix-ui/react-tooltip', '@radix-ui/react-slot'],
          // Separate utility libraries
          utils: ['clsx', 'tailwind-merge']
        }
      }
    },
    // Increase chunk size warning limit for animation-heavy app
    chunkSizeWarningLimit: 600,
    // Enable source maps for debugging in production
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: true,
        drop_debugger: true,
        // Optimize for performance
        passes: 2
      }
    }
  }
});
