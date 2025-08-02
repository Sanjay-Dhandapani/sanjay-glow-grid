import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import FloatingCard from '@/components/ui/floating-card';
import AnimatedCounter from '@/components/ui/animated-counter';
import TypewriterText from '@/components/ui/typewriter-text';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const programmingLanguages = [
    { name: 'C', level: 85, icon: '🔧', color: 'from-blue-500 to-blue-600' },
    { name: 'C++', level: 90, icon: '⚡', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Java', level: 88, icon: '☕', color: 'from-orange-500 to-red-500' },
    { name: 'JavaScript', level: 92, icon: '🚀', color: 'from-yellow-400 to-yellow-500' },
    { name: 'TypeScript', level: 87, icon: '📘', color: 'from-blue-600 to-blue-700' },
    { name: 'Python', level: 80, icon: '🐍', color: 'from-green-500 to-green-600' }
  ];

  const technologies = [
    { name: 'React.js', level: 95, icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
    { name: 'Spring Boot', level: 88, icon: '🍃', color: 'from-green-400 to-green-600' },
    { name: 'AWS', level: 85, icon: '☁️', color: 'from-orange-400 to-orange-600' },
    { name: 'n8n', level: 82, icon: '🔗', color: 'from-purple-500 to-purple-600' },
    { name: 'Node.js', level: 87, icon: '🟢', color: 'from-green-600 to-green-700' },
    { name: 'Docker', level: 80, icon: '🐳', color: 'from-blue-400 to-blue-600' }
  ];

  const SkillCard = ({ skill, index, category }: { skill: any, index: number, category: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <FloatingCard
        className="h-40"
        rotationIntensity={8}
        levitationHeight={15}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 120,
            damping: 15
          }}
          className="skill-card glass-card p-6 h-full cursor-pointer relative overflow-hidden group"
          data-cursor-hover
          data-grid-blur
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            y: -10 
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Background gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 transition-opacity duration-500`}
            animate={{ opacity: isHovered ? 0.1 : 0 }}
          />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-3">
            {/* Icon */}
            <motion.div
              className="text-4xl mb-2"
              animate={{ 
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 10 : 0
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              role="img" 
              aria-hidden="true"
            >
              {skill.icon}
            </motion.div>

            {/* Skill Name */}
            <motion.h3 
              className="text-lg font-semibold text-center group-hover:text-primary transition-colors duration-300"
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {skill.name}
            </motion.h3>

            {/* Skill Level - Only show on hover */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <div className="text-2xl font-bold text-primary mb-2">
                <AnimatedCounter 
                  value={skill.level} 
                  suffix="%" 
                  duration={1.2}
                />
              </div>
              
              {/* Progress Bar */}
              <div className="w-16 bg-muted rounded-full h-1.5 overflow-hidden mx-auto">
                <motion.div
                  className={`bg-gradient-to-r ${skill.color} rounded-full h-full`}
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? `${skill.level}%` : 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.2,
                    ease: "easeOut" 
                  }}
                />
              </div>
              
              <motion.p 
                className="text-xs text-muted-foreground mt-2 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.4 }}
              >
                {category}
              </motion.p>
            </motion.div>

            {/* Hover hint - Only show when not hovered */}
            <motion.p 
              className="text-xs text-muted-foreground/60 absolute bottom-2"
              animate={{ opacity: isHovered ? 0 : 0.7 }}
              transition={{ duration: 0.2 }}
            >
              Hover to view details
            </motion.p>
          </div>
        </motion.div>
      </FloatingCard>
    );
  };

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          Technical <span className="gradient-text glow-text">Expertise</span>
        </motion.h2>
        <motion.div 
          className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        <TypewriterText
          text="Mastering cutting-edge technologies to build exceptional digital solutions"
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          delay={0.6}
          speed={0.02}
        />
      </motion.div>

      <div className="space-y-20">
        {/* Programming Languages */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-2xl font-bold mb-10 text-center text-foreground"
          >
            <span className="relative">
              Programming Languages
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: 48 } : {}}
                transition={{ delay: 1, duration: 0.6 }}
              />
            </span>
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {programmingLanguages.map((skill, index) => (
              <SkillCard 
                key={skill.name} 
                skill={skill} 
                index={index} 
                category="Language"
              />
            ))}
          </div>
        </div>

        {/* Technologies & Frameworks */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-2xl font-bold mb-10 text-center text-foreground"
          >
            <span className="relative">
              Technologies & Frameworks
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: 48 } : {}}
                transition={{ delay: 1.4, duration: 0.6 }}
              />
            </span>
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((skill, index) => (
              <SkillCard 
                key={skill.name} 
                skill={skill} 
                index={index + 6} 
                category="Technology"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
