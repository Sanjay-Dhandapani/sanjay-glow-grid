import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import FloatingCard from '@/components/ui/floating-card';
import AnimatedCounter from '@/components/ui/animated-counter';
import GlowingBorder from '@/components/ui/glowing-border';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const programmingLanguages = [
    { name: 'C', level: 85, icon: '🔧' },
    { name: 'C++', level: 90, icon: '⚡' },
    { name: 'Java', level: 88, icon: '☕' },
    { name: 'JavaScript', level: 92, icon: '🚀' },
    { name: 'TypeScript', level: 87, icon: '📘' },
    { name: 'Python', level: 80, icon: '🐍' }
  ];

  const technologies = [
    { name: 'React.js', level: 95, icon: '⚛️' },
    { name: 'Spring Boot', level: 88, icon: '🍃' },
    { name: 'AWS', level: 85, icon: '☁️' },
    { name: 'n8n', level: 82, icon: '🔗' },
    { name: 'Node.js', level: 87, icon: '🟢' },
    { name: 'Docker', level: 80, icon: '🐳' }
  ];

  const SkillCard = ({ skill, index, category }: { skill: any, index: number, category: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <FloatingCard
        className="h-40"
        rotationIntensity={12}
        levitationHeight={20}
      >
        <motion.figure
          initial={{ opacity: 0, y: 50, rotateY: -30 }}
          animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          className="skill-card glass-card p-6 h-full cursor-pointer relative"
          data-tech={skill.name}
          data-cursor-hover
          data-grid-blur
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
        >
          <GlowingBorder 
            className="h-full w-full"
            glowColor={skill.level >= 90 ? 'accent' : 'primary'}
          >
            <div className="skill-card-inner h-full relative">
              {/* Front */}
              <motion.div 
                className="skill-card-front absolute inset-0 flex flex-col items-center justify-center space-y-3"
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ 
                  backfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d'
                }}
              >
                <motion.span 
                  className="text-4xl"
                  animate={{ 
                    scale: isHovered ? 1.2 : 1,
                    rotate: isHovered ? 360 : 0
                  }}
                  transition={{ duration: 0.6 }}
                  role="img" 
                  aria-hidden="true"
                >
                  {skill.icon}
                </motion.span>
                <h3 className="text-lg font-semibold text-center">{skill.name}</h3>
                <motion.div 
                  className="text-xs text-muted-foreground opacity-0"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Hover for details
                </motion.div>
              </motion.div>
              
              {/* Back */}
              <motion.div 
                className="skill-card-back absolute inset-0 flex flex-col items-center justify-center space-y-4 text-primary-foreground bg-gradient-to-br from-primary to-accent rounded-lg"
                initial={{ rotateY: -180 }}
                animate={{ rotateY: isHovered ? 0 : -180 }}
                transition={{ duration: 0.6 }}
                style={{ 
                  backfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d'
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <AnimatedCounter 
                    value={skill.level} 
                    suffix="%" 
                    className="text-3xl font-bold"
                    duration={1.5}
                  />
                </motion.div>
                
                <motion.div 
                  className="w-4/5 bg-white/20 rounded-full h-2 overflow-hidden"
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    className="bg-white rounded-full h-full"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? `${skill.level}%` : 0 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </motion.div>
                
                <motion.span 
                  className="text-sm font-medium opacity-90"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                  transition={{ delay: 0.6 }}
                >
                  {category}
                </motion.span>
              </motion.div>
            </div>
          </GlowingBorder>
        </motion.figure>
      </FloatingCard>
    );
  };

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Technical <span className="gradient-text">Expertise</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Mastering cutting-edge technologies to build exceptional digital solutions
        </p>
      </motion.div>

      <div className="space-y-16">
        {/* Programming Languages */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Programming Languages
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Technologies & Frameworks
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((skill, index) => (
              <SkillCard 
                key={skill.name} 
                skill={skill} 
                index={index} 
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
