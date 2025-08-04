import { motion } from 'framer-motion';
import { ChevronDown, Download, Sparkles } from 'lucide-react';
import AnimatedTitle from '../AnimatedTitle';
import MagneticButton from '@/components/ui/magnetic-button';
import TypewriterText from '@/components/ui/typewriter-text';

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const floatingElements = [
    { text: "React", delay: 0.5, x: -300, y: -100 },
    { text: "TypeScript", delay: 0.7, x: 300, y: -150 },
    { text: "Spring Boot", delay: 0.9, x: -350, y: 100 },
    { text: "AWS", delay: 1.1, x: 350, y: 50 },
    { text: "Java", delay: 1.3, x: -250, y: 200 },
    { text: "Node.js", delay: 1.5, x: 250, y: -50 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating Tech Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:block"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.6, 
            scale: 1,
            x: element.x,
            y: element.y,
          }}
          transition={{ 
            duration: 0.8, 
            delay: element.delay,
            type: "spring",
            stiffness: 100 
          }}
          whileHover={{ 
            scale: 1.2, 
            opacity: 1,
            transition: { duration: 0.2 }
          }}
        >
          <div className="glass-card px-4 py-2 text-sm font-medium text-primary/80 backdrop-blur-md">
            {element.text}
          </div>
        </motion.div>
      ))}

      {/* Hero Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      
      {/* Animated particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text leading-tight">
            Hi, I'm Sanjay Dhandapani
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <div className="text-xl md:text-2xl text-muted-foreground mb-4">
            <TypewriterText 
              text="Passionate Full-Stack Developer crafting digital experiences"
              delay={1}
              speed={0.03}
              className="inline"
            />
          </div>
          <AnimatedTitle />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <MagneticButton
            className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-primary-foreground font-semibold px-8 py-4 rounded-full text-lg shadow-2xl border-0"
            strength={0.4}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <motion.div className="flex items-center gap-2">
              View My Work
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.div>
          </MagneticButton>
          
          <MagneticButton
            className="border-2 border-primary/30 bg-transparent hover:bg-primary/10 text-primary hover:text-primary px-8 py-4 rounded-full text-lg backdrop-blur-sm"
            strength={0.3}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download CV
            </div>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          data-cursor-hover
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ChevronDown className="w-6 h-6 group-hover:text-primary transition-colors" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
