import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, TrendingUp, Award, Target, BookOpen, Zap } from 'lucide-react';
import FloatingCard from '@/components/ui/floating-card';
import AnimatedCounter from '@/components/ui/animated-counter';
import TypewriterText from '@/components/ui/typewriter-text';
import { FadeInUp, StaggeredReveal } from '../animations/ScrollReveal';
import OptimizedButton from '@/components/ui/optimized-button';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [skillFilter, setSkillFilter] = useState<'all' | 'languages' | 'technologies' | 'tools'>('all');

  const programmingLanguages = [
    { 
      name: 'C', 
      level: 85, 
      icon: '🔧', 
      color: 'from-blue-500 to-blue-600',
      category: 'languages',
      yearsExp: 3,
      projects: 8,
      description: 'System programming and performance optimization'
    },
    { 
      name: 'C++', 
      level: 90, 
      icon: '⚡', 
      color: 'from-indigo-500 to-indigo-600',
      category: 'languages',
      yearsExp: 4,
      projects: 12,
      description: 'Object-oriented programming and data structures'
    },
    { 
      name: 'Java', 
      level: 88, 
      icon: '☕', 
      color: 'from-orange-500 to-red-500',
      category: 'languages',
      yearsExp: 3,
      projects: 15,
      description: 'Enterprise applications and Spring ecosystem'
    },
    { 
      name: 'JavaScript', 
      level: 92, 
      icon: '🚀', 
      color: 'from-yellow-400 to-yellow-500',
      category: 'languages',
      yearsExp: 3,
      projects: 20,
      description: 'Modern ES6+ and full-stack development'
    },
    { 
      name: 'TypeScript', 
      level: 87, 
      icon: '📘', 
      color: 'from-blue-600 to-blue-700',
      category: 'languages',
      yearsExp: 2,
      projects: 18,
      description: 'Type-safe JavaScript development'
    },
    { 
      name: 'Python', 
      level: 80, 
      icon: '🐍', 
      color: 'from-green-500 to-green-600',
      category: 'languages',
      yearsExp: 2,
      projects: 6,
      description: 'Data analysis and automation scripts'
    }
  ];

  const technologies = [
    { 
      name: 'React.js', 
      level: 95, 
      icon: '⚛️', 
      color: 'from-cyan-400 to-blue-500',
      category: 'technologies',
      yearsExp: 3,
      projects: 25,
      description: 'Modern UI development with hooks and context'
    },
    { 
      name: 'Spring Boot', 
      level: 88, 
      icon: '🍃', 
      color: 'from-green-400 to-green-600',
      category: 'technologies',
      yearsExp: 2,
      projects: 12,
      description: 'Microservices and REST API development'
    },
    { 
      name: 'AWS', 
      level: 85, 
      icon: '☁️', 
      color: 'from-orange-400 to-orange-600',
      category: 'technologies',
      yearsExp: 2,
      projects: 10,
      description: 'Cloud infrastructure and serverless'
    },
    { 
      name: 'n8n', 
      level: 82, 
      icon: '🔗', 
      color: 'from-purple-500 to-purple-600',
      category: 'tools',
      yearsExp: 1,
      projects: 8,
      description: 'Workflow automation and integrations'
    },
    { 
      name: 'Node.js', 
      level: 87, 
      icon: '🟢', 
      color: 'from-green-600 to-green-700',
      category: 'technologies',
      yearsExp: 3,
      projects: 20,
      description: 'Server-side JavaScript and APIs'
    },
    { 
      name: 'Docker', 
      level: 80, 
      icon: '🐳', 
      color: 'from-blue-400 to-blue-600',
      category: 'tools',
      yearsExp: 2,
      projects: 15,
      description: 'Containerization and deployment'
    }
  ];

  const allSkills = [...programmingLanguages, ...technologies];
  const filteredSkills = skillFilter === 'all' ? allSkills : 
                         skillFilter === 'languages' ? programmingLanguages :
                         skillFilter === 'technologies' ? technologies.filter(tech => tech.category === 'technologies') :
                         technologies.filter(tech => tech.category === 'tools');

  interface Skill {
    name: string;
    level: number;
    icon: string;
    color: string;
    category: string;
    yearsExp: number;
    projects: number;
    description: string;
  }

  const SkillCard = ({ skill, index }: { skill: Skill, index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    
    return (
      <FloatingCard
        className="h-48"
        rotationIntensity={6}
        levitationHeight={10}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.03,
            ease: "easeOut"
          }}
          className="skill-card glass-card-premium p-6 h-full cursor-pointer relative overflow-hidden group"
          data-cursor-hover
          data-grid-blur
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setActiveSkill(activeSkill === skill.name ? null : skill.name);
            setIsActive(!isActive);
          }}
          whileHover={{ 
            scale: 1.02,
            y: -4
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Simplified background gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 transition-opacity duration-200`}
            animate={{ opacity: isHovered || isActive ? 0.05 : 0 }}
          />

          {/* Simplified skill level indicator */}
          <motion.div
            className="absolute inset-0 rounded-lg border border-primary/10"
            animate={{ 
              opacity: isHovered || isActive ? 0.8 : 0.3,
              borderColor: isHovered || isActive ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--primary) / 0.1)'
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-3">
            {/* Simplified icon */}
            <motion.div
              className="text-4xl mb-3 relative"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
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

            {/* Simplified skill name */}
            <motion.h3 
              className="text-lg font-bold text-center transition-all duration-200"
              animate={{ 
                y: isHovered ? -2 : 0
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {skill.name}
            </motion.h3>

            {/* Enhanced Skill Details */}
            <motion.div
              className="text-center absolute inset-0 flex flex-col justify-center items-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: isHovered || isActive ? 1 : 0,
                scale: isHovered || isActive ? 1 : 0.9,
                y: isHovered || isActive ? 0 : 10
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              {/* Simplified progress indicator */}
              <div className="relative w-16 h-16 mb-3">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted/20"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <motion.path
                    className="text-primary"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="100"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ 
                      strokeDashoffset: isHovered || isActive ? 100 - skill.level : 100 
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    <AnimatedCounter 
                      value={skill.level} 
                      suffix="%" 
                      duration={0.8}
                    />
                  </span>
                </div>
              </div>

              {/* Additional stats */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center w-full">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-semibold">{skill.yearsExp} years</span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-muted-foreground">Projects:</span>
                  <span className="font-semibold">{skill.projects}</span>
                </div>
              </div>

              <motion.p 
                className="text-xs text-muted-foreground text-center mt-2 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered || isActive ? 1 : 0 }}
                transition={{ delay: 0.1 }}
              >
                {skill.description}
              </motion.p>
            </motion.div>

            {/* Interaction hint */}
            <motion.p 
              className="text-xs text-muted-foreground/60 absolute bottom-3"
              animate={{ opacity: isHovered || isActive ? 0 : 0.7 }}
              transition={{ duration: 0.2 }}
            >
              Click to explore
            </motion.p>
          </div>

          {/* Skill category badge */}
          <motion.div
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-primary/10 text-primary"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isHovered || isActive ? 1 : 0,
              scale: isHovered || isActive ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            {skill.category}
          </motion.div>
        </motion.div>
      </FloatingCard>
    );
  };

  // Skill summary stats
  const skillStats = {
    totalSkills: allSkills.length,
    avgLevel: Math.round(allSkills.reduce((sum, skill) => sum + skill.level, 0) / allSkills.length),
    totalProjects: allSkills.reduce((sum, skill) => sum + skill.projects, 0),
    totalExperience: Math.max(...allSkills.map(skill => skill.yearsExp))
  };

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden" ref={ref}>
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-mesh opacity-3" />
        <div className="absolute top-10 left-1/4 w-20 h-20 bg-primary/5 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-accent/5 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-secondary/5 rounded-full blur-xl" />
      </div>

      <div className="relative z-10">
        {/* Enhanced Header */}
        <FadeInUp delay={0.1} className="text-center mb-16">
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6">
            Technical <span className="holographic">Expertise</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-primary rounded-full mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <TypewriterText
            text="Mastering cutting-edge technologies to build exceptional digital solutions"
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            delay={0.6}
            speed={0.025}
          />
        </FadeInUp>

        {/* Skills Overview Stats */}
        <FadeInUp delay={0.8} className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Star, label: 'Total Skills', value: skillStats.totalSkills, suffix: '', color: 'primary' },
              { icon: TrendingUp, label: 'Avg Proficiency', value: skillStats.avgLevel, suffix: '%', color: 'secondary' },
              { icon: Award, label: 'Projects Built', value: skillStats.totalProjects, suffix: '+', color: 'accent' },
              { icon: Target, label: 'Years Experience', value: skillStats.totalExperience, suffix: '+', color: 'tertiary' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card p-6 text-center group hover-lift"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.03, y: -3 }}
              >
                <motion.div
                  className={`w-12 h-12 bg-${stat.color}/20 rounded-xl flex items-center justify-center mb-4 mx-auto`}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </motion.div>
                <div className={`text-2xl font-bold text-${stat.color} mb-2`}>
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    duration={1.2}
                  />
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeInUp>

        {/* Enhanced Filter Buttons */}
        <FadeInUp delay={1.4} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { key: 'all', label: 'All Skills', icon: BookOpen },
              { key: 'languages', label: 'Languages', icon: Zap },
              { key: 'technologies', label: 'Frameworks', icon: Star },
              { key: 'tools', label: 'Tools', icon: Target }
            ].map((filter) => (
              <OptimizedButton
                key={filter.key}
                variant={skillFilter === filter.key ? "primary" : "outline"}
                size="md"
                onClick={() => setSkillFilter(filter.key as any)}
                icon={<filter.icon className="w-4 h-4" />}
              >
                {filter.label}
              </OptimizedButton>
            ))}
          </div>
        </FadeInUp>

        {/* Enhanced Skills Grid */}
        <StaggeredReveal staggerDelay={0.03} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSkills.map((skill, index) => (
              <SkillCard 
                key={skill.name} 
                skill={skill} 
                index={index}
              />
            ))}
          </div>
        </StaggeredReveal>

        {/* Call to Action */}
        <FadeInUp delay={2} className="text-center">
          <OptimizedButton
            variant="primary"
            size="lg"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            icon={<Award className="w-5 h-5" />}
          >
            See These Skills In Action
          </OptimizedButton>
        </FadeInUp>
      </div>
    </section>
  );
};

export default Skills;
