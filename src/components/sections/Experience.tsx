import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Building2, Calendar } from 'lucide-react';

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
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Professional <span className="gradient-text">Experience</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Building expertise through hands-on experience and continuous learning
        </p>
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
          <motion.article
            key={experience.company}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative pl-20 pb-12"
            itemScope
            itemType="https://schema.org/WorkExperience"
          >
            {/* Timeline Dot */}
            <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-primary" />

            {/* Experience Card */}
            <div className="glass-card p-8" data-cursor-hover data-grid-blur>
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                  <img
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    className="w-16 h-16 rounded-lg object-cover shadow-card"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 
                        className="text-2xl font-bold text-primary"
                        itemProp="name"
                      >
                        {experience.position}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="w-4 h-4" />
                        <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                          <span itemProp="name">{experience.company}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={experience.period} itemProp="datePublished">
                        {experience.period}
                      </time>
                      <span className="text-muted-foreground">({experience.duration})</span>
                    </div>
                  </div>

                  <p 
                    className="text-muted-foreground leading-relaxed"
                    itemProp="description"
                  >
                    {experience.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {experience.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Experience;