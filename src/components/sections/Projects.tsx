import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Eye, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingCard from '@/components/ui/floating-card';
import MagneticButton from '@/components/ui/magnetic-button';
import GlowingBorder from '@/components/ui/glowing-border';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React.js frontend and Spring Boot backend, featuring real-time inventory management and secure payment processing.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
      techStack: ["React.js", "Spring Boot", "AWS", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Workflow Automation Suite",
      description: "Built with n8n and custom integrations, this platform automates business processes and connects multiple services seamlessly.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center",
      techStack: ["n8n", "Node.js", "Docker", "AWS"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Real-time Analytics Dashboard",
      description: "Interactive dashboard displaying real-time data visualizations with WebSocket connections and responsive design.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
      techStack: ["React.js", "D3.js", "WebSocket", "Java"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Cloud Infrastructure Manager",
      description: "AWS-based infrastructure management tool with automated scaling, monitoring, and cost optimization features.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=center",
      techStack: ["AWS", "Python", "Terraform", "CloudWatch"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Mobile-First Web App",
      description: "Progressive Web Application with offline capabilities, push notifications, and responsive design optimized for mobile devices.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center",
      techStack: ["React.js", "PWA", "Service Workers", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A showcase of innovative solutions and technical expertise
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <FloatingCard
            key={project.id}
            className="group"
            rotationIntensity={8}
            levitationHeight={15}
          >
            <motion.article
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="glass-card overflow-hidden h-full"
              data-cursor-hover
              data-grid-blur
            >
              {/* Project Image with Overlay */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={`${project.title} - Screenshot of the project`}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Gradient Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating Action Buttons */}
                <motion.div
                  className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: -20 }}
                  whileHover={{ y: 0 }}
                >
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center text-accent-foreground hover:bg-accent transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Code2 className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <motion.h3 
                  className="text-xl font-bold group-hover:text-primary transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="text-muted-foreground text-sm leading-relaxed flex-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {project.description}
                </motion.p>

                {/* Tech Stack */}
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {project.techStack.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-muted/50 backdrop-blur-sm rounded-full text-primary border border-primary/20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        delay: index * 0.1 + 0.6 + techIndex * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: "hsl(var(--primary) / 0.1)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex gap-3 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.7 }}
                >
                  <MagneticButton
                    className="flex-1 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold py-2 px-4 rounded-lg text-sm border-0"
                    strength={0.3}
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </div>
                  </MagneticButton>
                  
                  <MagneticButton
                    className="border border-primary/30 bg-transparent hover:bg-primary/10 text-primary py-2 px-4 rounded-lg text-sm backdrop-blur-sm"
                    strength={0.2}
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4" />
                  </MagneticButton>
                </motion.div>
              </div>
            </motion.article>
          </FloatingCard>
        ))}
      </div>
    </section>
  );
};

export default Projects;