import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Code, Coffee, Heart, Zap, Award, Users, Clock, Target } from 'lucide-react';
import FloatingCard from '@/components/ui/floating-card';
import AnimatedCounter from '@/components/ui/animated-counter';
import { FadeInUp, FadeInLeft, StaggeredReveal } from '../animations/ScrollReveal';
import OptimizedButton from '@/components/ui/optimized-button';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [imageHovered, setImageHovered] = useState(false);
  
  // Simplified mouse tracking for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const stats = [
    { icon: Code, label: "Projects Built", value: 50, suffix: "+", color: "primary" },
    { icon: Coffee, label: "Cups of Coffee", value: 1000, suffix: "+", color: "secondary" },
    { icon: Heart, label: "Happy Clients", value: 25, suffix: "+", color: "accent" },
    { icon: Zap, label: "Lines of Code", value: 100000, suffix: "+", color: "tertiary" }
  ];

  const achievements = [
    { icon: Award, label: "Years Experience", value: 3, suffix: "+", color: "primary" },
    { icon: Users, label: "Team Projects", value: 15, suffix: "+", color: "secondary" },
    { icon: Clock, label: "Hours Coded", value: 5000, suffix: "+", color: "accent" },
    { icon: Target, label: "Goals Achieved", value: 100, suffix: "%", color: "tertiary" }
  ];

  // Simplified mouse tracking with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        if (ref.current) {
          const rect = (ref.current as HTMLElement).getBoundingClientRect();
          mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.5);
          mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.5);
        }
      }, 16); // ~60fps throttling
    };

    const section = ref.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        clearTimeout(timeoutId);
        section.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [mouseX, mouseY]);

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden" ref={ref}>
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-mesh opacity-5" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/3 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/3 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Optimized Image Section */}
        <FadeInLeft delay={0.2}>
          <motion.div
            className="relative"
            data-grid-blur
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            <FloatingCard
              className="w-full max-w-md mx-auto"
              rotationIntensity={10}
              levitationHeight={15}
            >
              <div
                className="relative group cursor-pointer"
                onClick={() => setImageHovered(!imageHovered)}
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
              >
                {/* Simplified Portrait Shadow */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse 60% 80% at center bottom, hsl(var(--primary) / 0.2) 0%, transparent 80%)`,
                    filter: 'blur(15px)',
                  }}
                  animate={{ 
                    opacity: imageHovered ? 0.6 : 0.3,
                    scale: imageHovered ? 1.1 : 1.05,
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Enhanced Portrait Image */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Reveal Mask Animation */}
                  <motion.div
                    className="absolute inset-0 bg-background rounded-2xl z-10"
                    initial={{ scaleX: 1 }}
                    animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                    style={{ transformOrigin: "right center" }}
                  />
                  
                  <motion.img
                    src="/portfolio_headshot.png"
                    alt="Sanjay Dhandapani - Full-Stack Web Developer"
                    className="relative w-full h-auto rounded-2xl shadow-xl"
                    initial={{ scale: 1.05 }}
                    animate={isInView ? { scale: 1 } : { scale: 1.05 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                      filter: imageHovered 
                        ? 'brightness(1.03) contrast(1.01) saturate(1.05)' 
                        : 'brightness(1) contrast(1) saturate(1)',
                    }}
                  />
                  
                  {/* Simplified Border Animation */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2"
                    initial={{ borderColor: "transparent" }}
                    animate={isInView ? { 
                      borderColor: ["transparent", "hsl(var(--primary))", "transparent"],
                    } : {}}
                    transition={{ 
                      duration: 4, 
                      delay: 1.5, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </motion.div>
                
                {/* Simplified Floating Tech Icons */}
                {[
                  { icon: '⚛️', color: 'text-blue-400', name: 'React' },
                  { icon: '☕', color: 'text-orange-400', name: 'Java' },
                  { icon: '🚀', color: 'text-purple-400', name: 'Deploy' },
                  { icon: '☁️', color: 'text-cyan-400', name: 'AWS' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`absolute text-2xl ${item.color} drop-shadow-md cursor-pointer`}
                    style={{
                      top: `${15 + index * 20}%`,
                      right: index % 2 === 0 ? '-8%' : 'auto',
                      left: index % 2 === 1 ? '-8%' : 'auto',
                    }}
                    animate={{
                      y: imageHovered ? 0 : 20,
                      opacity: imageHovered ? 0.8 : 0,
                      scale: imageHovered ? 1 : 0.8,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => console.log(`Clicked ${item.name}`)}
                  >
                    {item.icon}
                  </motion.div>
                ))}
              </div>
            </FloatingCard>
          </motion.div>
        </FadeInLeft>

        {/* Enhanced Content Section */}
        <FadeInUp delay={0.4} className="space-y-8">
          <StaggeredReveal staggerDelay={0.1}>
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="holographic">Me</span>
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-primary rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </StaggeredReveal>

          <StaggeredReveal staggerDelay={0.2} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <motion.p className="shimmer hover-lift">
              A <strong className="signature-heading">2k-born kiddo</strong> passionate about building scalable web applications using cutting-edge technologies.
            </motion.p>
            <motion.p className="shimmer hover-lift">
              I specialize in creating robust solutions with <span className="holographic font-semibold">C, C++, Java, React.js, Spring Boot, AWS, and n8n</span>, always pushing the boundaries of what's possible in web development.
            </motion.p>
            <motion.p className="shimmer hover-lift">
              My journey as a developer is driven by curiosity and the desire to solve real-world problems through elegant, efficient code.
            </motion.p>
          </StaggeredReveal>

          {/* Simplified Skills Preview */}
          <FadeInUp delay={0.6} className="pt-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Core Technologies</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {['React.js', 'Spring Boot', 'AWS', 'Java', 'TypeScript', 'Node.js'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <button
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-primary hover:text-primary/80 underline transition-colors"
              >
                View detailed skills and expertise →
              </button>
            </motion.p>
          </FadeInUp>

          {/* Call to Action */}
          <FadeInUp delay={0.8}>
            <OptimizedButton
              variant="primary"
              size="md"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Work Together
            </OptimizedButton>
          </FadeInUp>
        </FadeInUp>
      </div>

      {/* Optimized Stats Section */}
      <FadeInUp delay={1} className="mt-24">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">
            <span className="holographic">By the Numbers</span>
          </h3>
          <p className="text-muted-foreground">A glimpse into my development journey</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <FloatingCard
              key={stat.label}
              className="text-center"
              rotationIntensity={8}
              levitationHeight={12}
            >
              <motion.div
                className="glass-card-premium p-6 h-full flex flex-col items-center justify-center space-y-3 group cursor-pointer"
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  delay: 1.2 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.03, y: -3 }}
                onClick={() => console.log(`Stat: ${stat.label}`)}
              >
                <motion.div
                  className={`w-12 h-12 bg-${stat.color}/20 rounded-xl flex items-center justify-center mb-3`}
                  whileHover={{ rotate: 180, scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </motion.div>
                
                <div className={`text-3xl md:text-4xl font-bold text-${stat.color}`}>
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    duration={2.5}
                  />
                </div>
                
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </FloatingCard>
          ))}
        </div>

        {/* Additional Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              className="glass-card p-4 text-center group hover-lift cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => console.log(`Achievement: ${achievement.label}`)}
            >
              <motion.div
                className={`w-10 h-10 bg-${achievement.color}/20 rounded-lg flex items-center justify-center mb-2 mx-auto`}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <achievement.icon className={`w-5 h-5 text-${achievement.color}`} />
              </motion.div>
              
              <div className={`text-xl font-bold text-${achievement.color} mb-1`}>
                <AnimatedCounter 
                  value={achievement.value} 
                  suffix={achievement.suffix} 
                  duration={2}
                />
              </div>
              
              <div className="text-xs text-muted-foreground">
                {achievement.label}
              </div>
            </motion.div>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
};

export default About;