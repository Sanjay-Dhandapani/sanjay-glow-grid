import CustomCursor from '@/components/CustomCursor';
import AnimatedGrid from '@/components/AnimatedGrid';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from 'next-themes';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Animated Grid Background */}
        <AnimatedGrid />
        
        {/* Main Content */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        
        {/* Footer */}
        <footer className="py-8 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto text-center text-muted-foreground">
            <p>&copy; 2024 Sanjay Dhandapani. All rights reserved.</p>
            <p className="text-sm mt-2">Built with React.js, TypeScript, and Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
