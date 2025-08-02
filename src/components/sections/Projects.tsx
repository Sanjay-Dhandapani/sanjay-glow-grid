import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card overflow-hidden group"
            data-cursor-hover
            data-grid-blur
          >
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} - Screenshot of the project`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  size="sm"
                  className="flex-1 bg-primary hover:bg-primary-glow"
                  data-cursor-hover
                  asChild
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  data-cursor-hover
                  asChild
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View source code for ${project.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Projects;