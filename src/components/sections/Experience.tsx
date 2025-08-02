import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Building2, Calendar, Trophy, TrendingUp } from 'lucide-react';
import FloatingCard from '../ui/floating-card';
import TypewriterText from '../ui/typewriter-text';

const Experience = () => {
  const ref = useRef(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [timelineHeight, setTimelineHeight] = useState(0);

  useEffect(() => {
    if (isInView && timelineRef.current) {
      const timer = setTimeout(() => {
        setTimelineHeight(100);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const experiences = [
    {
      company: "Accenture",
      position: "Software Development Intern",
      period: "2023",
      duration: "6 months",
      description: "Collaborated with cross-functional teams to develop scalable web applications using modern technologies. Gained hands-on experience in agile development methodologies and enterprise-level software solutions.",
      logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center",
      achievements: [
        "Contributed to 3 client projects with React.js and Spring Boot",
        "Improved application performance by 25% through optimization",
        "Mentored by senior developers in best practices and code review"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
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
          Professional <span className="gradient-text glow-text">Experience</span>
        </motion.h2>
        <motion.div 
          className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        <TypewriterText
          text="Building expertise through hands-on experience and continuous learning"
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          delay={0.6}
        />
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 w-0.5 h-full bg-border">
          <motion.div
            ref={timelineRef}
            className="w-full bg-gradient-primary origin-top"
            initial={{ height: 0 }}
            animate={{ height: `${timelineHeight}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        {experiences.map((experience, index) => (
          <FloatingCard
            key={experience.company}
            className="relative pl-20 pb-12"
            rotationIntensity={8}
            levitationHeight={12}
          >
            <motion.article
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              itemScope
              itemType="https://schema.org/WorkExperience"
            >
              {/* Timeline Dot */}
              <motion.div 
                className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-primary"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.2, boxShadow: "0 0 20px hsl(var(--primary))" }}
              />

              {/* Experience Card */}
              <div className="glass-card p-8 group hover-lift magnetic-hover" data-cursor-hover data-grid-blur>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Company Logo */}
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={experience.logo}
                      alt={`${experience.company} logo`}
                      className="w-16 h-16 rounded-lg object-cover shadow-card hover:shadow-xl transition-all duration-300"
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <motion.h3 
                          className="text-2xl font-bold text-primary group-hover:glow-text transition-all duration-300"
                          itemProp="name"
                          whileHover={{ scale: 1.02 }}
                        >
                          {experience.position}
                        </motion.h3>
                        <motion.div 
                          className="flex items-center gap-2 text-muted-foreground shimmer"
                          whileHover={{ x: 5 }}
                        >
                          <Building2 className="w-4 h-4" />
                          <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                            <span itemProp="name">{experience.company}</span>
                          </span>
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className="flex items-center gap-2 text-accent font-semibold pulse-glow"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar className="w-4 h-4" />
                        <time dateTime={experience.period} itemProp="datePublished">
                          {experience.period}
                        </time>
                        <span className="text-muted-foreground">({experience.duration})</span>
                      </motion.div>
                    </div>

                    <motion.p 
                      className="text-muted-foreground leading-relaxed shimmer"
                      itemProp="description"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {experience.description}
                    </motion.p>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-accent" />
                        <h4 className="font-semibold text-foreground">Key Achievements:</h4>
                      </div>
                      <ul className="list-none space-y-1 text-muted-foreground">
                        {experience.achievements.map((achievement, i) => (
                          <motion.li 
                            key={i} 
                            className="text-sm flex items-start gap-2 hover-lift"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 1 + index * 0.1 + i * 0.1 }}
                            whileHover={{ x: 5, color: "hsl(var(--accent))" }}
                          >
                            <TrendingUp className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.article>
          </FloatingCard>
        ))}
      </div>
    </section>
  );
};

export default Experience;