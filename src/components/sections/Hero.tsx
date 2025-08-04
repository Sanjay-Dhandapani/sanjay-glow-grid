import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { ChevronDown, Download, Sparkles, Code, Zap, Cpu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import AnimatedTitle from '../AnimatedTitle';
import TypewriterText from '@/components/ui/typewriter-text';
import { FadeInUp, StaggeredReveal } from '../animations/ScrollReveal';
import OptimizedButton from '@/components/ui/optimized-button';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    // Orchestrate entrance animations
    const loadSequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoaded(true);
      
      if (isInView) {
        await controls.start('visible');
      }
    };

    loadSequence();
  }, [isInView, controls]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Enhanced floating tech elements with more sophisticated animations
  const techElements = [
    {
      text: "React",
      delay: 0.3,
      x: -320,
      y: -120,
      icon: "⚛️",
      color: "primary",
      size: "lg"
    },
    {
      text: "TypeScript",
      delay: 0.5,
      x: 320,
      y: -180,
      icon: "🔷",
      color: "secondary",
      size: "md"
    },
    {
      text: "Spring Boot",
      delay: 0.7,
      x: -380,
      y: 80,
      icon: "🍃",
      color: "tertiary",
      size: "lg"
    },
    {
      text: "AWS",
      delay: 0.9,
      x: 380,
      y: 30,
      icon: "☁️",
      color: "accent",
      size: "md"
    },
    {
      text: "Java",
      delay: 1.1,
      x: -280,
      y: 220,
      icon: "☕",
      color: "primary",
      size: "sm"
    },
    {
      text: "Node.js",
      delay: 1.3,
      x: 280,
      y: -80,
      icon: "🟢",
      color: "secondary",
      size: "md"
    },
    {
      text: "Docker",
      delay: 1.5,
      x: -200,
      y: -200,
      icon: "🐳",
      color: "accent",
      size: "sm"
    },
    {
      text: "MongoDB",
      delay: 1.7,
      x: 200,
      y: 150,
      icon: "🍃",
      color: "tertiary",
      size: "sm"
    }
  ];

  // Entrance orchestration variants
  const orchestrationVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const elementVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Simplified Background System */}
      <div className="absolute inset-0">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-hero opacity-40" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
        
        {/* Simplified floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Simplified Tech Elements */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {techElements.slice(0, 4).map((element, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isLoaded ? 0.6 : 0,
              scale: isLoaded ? 1 : 0,
              x: element.x * 0.5, // Reduce movement range
              y: element.y * 0.5,
            }}
            transition={{
              duration: 0.8,
              delay: element.delay,
              ease: "easeOut"
            }}
            whileHover={{
              scale: 1.1,
              opacity: 0.8,
            }}
          >
            <div className="glass-card px-4 py-2 text-sm font-medium backdrop-blur-sm border border-primary/20 text-primary">
              <div className="flex items-center gap-2">
                <span className="text-base">{element.icon}</span>
                <span>{element.text}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Main Content with Orchestrated Animations */}
      <motion.div
        className="relative z-30 text-center max-w-5xl mx-auto px-6"
        variants={orchestrationVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Hero Icon with Advanced Animation */}
        <FadeInUp delay={0.2} variants="quantum">
          <motion.div
            className="inline-block mb-8 relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative"
            >
              {/* Multiple layered icons for depth */}
              <Sparkles className="w-12 h-12 text-accent absolute" />
              <Code className="w-8 h-8 text-primary absolute top-2 left-2" />
              <Zap className="w-6 h-6 text-secondary absolute top-3 right-1" />
              <Cpu className="w-4 h-4 text-tertiary absolute bottom-1 right-2" />
            </motion.div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl scale-150 animate-pulse" />
          </motion.div>
        </FadeInUp>
        
        {/* Main Heading with Character Animation */}
        <StaggeredReveal staggerDelay={0.03} variants="dramatic">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight"
            variants={elementVariants}
          >
            <span className="holographic">Hi, I'm </span>
            <span className="signature-heading block mt-4">
              Sanjay Dhandapani
            </span>
          </motion.h1>
        </StaggeredReveal>
        
        {/* Subtitle with Typewriter */}
        <FadeInUp delay={0.8} variants="elastic">
          <motion.div
            className="mb-8 space-y-4"
            variants={elementVariants}
          >
            <div className="text-2xl md:text-3xl text-muted-foreground">
              <TypewriterText
                text="Passionate Full-Stack Developer crafting digital experiences that inspire"
                delay={1.2}
                speed={0.04}
                className="inline"
              />
            </div>
            
            {/* Enhanced Animated Title */}
            <div className="mt-6">
              <AnimatedTitle />
            </div>
          </motion.div>
        </FadeInUp>
        
        {/* Optimized Action Buttons */}
        <FadeInUp delay={1.4}>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={elementVariants}
          >
            <OptimizedButton
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              icon={
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              }
            >
              View My Work
            </OptimizedButton>
            
            <OptimizedButton
              variant="outline"
              size="lg"
              onClick={() => window.open('/resume.pdf', '_blank')}
              icon={<Download className="w-5 h-5" />}
            >
              Download CV
            </OptimizedButton>
          </motion.div>
        </FadeInUp>
      </motion.div>

      {/* Simplified Scroll Indicator */}
      <FadeInUp delay={2} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.button
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          onClick={scrollToNext}
          whileHover={{ scale: 1.05 }}
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-sm font-medium">Explore More</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </FadeInUp>

      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 bg-background/90 p-2 rounded text-xs">
          <div>Loaded: {isLoaded ? '✅' : '⏳'}</div>
          <div>In View: {isInView ? '✅' : '❌'}</div>
        </div>
      )}
    </section>
  );
};

export default Hero;
