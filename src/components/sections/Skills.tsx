import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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

  const SkillCard = ({ skill, index, category }: { skill: any, index: number, category: string }) => (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="skill-card glass-card p-6 h-32"
      data-tech={skill.name}
      data-cursor-hover
      data-grid-blur
    >
      <div className="skill-card-inner">
        {/* Front */}
        <div className="skill-card-front flex flex-col items-center justify-center space-y-2">
          <span className="text-3xl" role="img" aria-hidden="true">{skill.icon}</span>
          <h3 className="text-lg font-semibold text-center">{skill.name}</h3>
        </div>
        
        {/* Back */}
        <div className="skill-card-back flex flex-col items-center justify-center space-y-3 text-primary-foreground">
          <span className="text-2xl font-bold">{skill.level}%</span>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-white rounded-full h-2"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : {}}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
            />
          </div>
          <span className="text-sm font-medium">{category}</span>
        </div>
      </div>
    </motion.figure>
  );

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          My <span className="gradient-text">Skills</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive toolkit of technologies I use to bring ideas to life
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