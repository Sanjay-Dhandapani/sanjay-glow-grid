import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, Eye, Code2, Calendar, Users, Star, ArrowRight, Play, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingCard from '@/components/ui/floating-card';
import MagneticButton from '@/components/ui/magnetic-button';
import GlowingBorder from '@/components/ui/glowing-border';
import { FadeInUp, StaggeredReveal, ScaleIn } from '../animations/ScrollReveal';
import GestureHandler from '../animations/GestureHandler';
import OptimizedButton from '@/components/ui/optimized-button';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'frontend' | 'backend' | 'fullstack' | 'mobile'>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React.js frontend and Spring Boot backend, featuring real-time inventory management and secure payment processing.",
      longDescription: "Built with modern microservices architecture, this platform handles thousands of concurrent users with real-time inventory updates, advanced search capabilities, and seamless payment integration with multiple providers.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
      techStack: ["React.js", "Spring Boot", "AWS", "PostgreSQL", "Redis", "Docker"],
      category: "fullstack",
      liveUrl: "#",
      githubUrl: "#",
      year: "2024",
      duration: "6 months",
      teamSize: 4,
      status: "Live",
      highlights: ["Real-time inventory", "Microservices", "Payment gateway", "Admin dashboard"]
    },
    {
      id: 2,
      title: "Workflow Automation Suite",
      description: "Built with n8n and custom integrations, this platform automates business processes and connects multiple services seamlessly.",
      longDescription: "Enterprise-grade automation platform that reduced manual work by 80% through intelligent workflow design, API integrations, and custom triggers for complex business logic.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center",
      techStack: ["n8n", "Node.js", "Docker", "AWS", "MongoDB", "Webhooks"],
      category: "backend",
      liveUrl: "#",
      githubUrl: "#",
      year: "2024",
      duration: "4 months",
      teamSize: 3,
      status: "Live",
      highlights: ["80% efficiency gain", "Custom integrations", "Enterprise scale", "Real-time monitoring"]
    },
    {
      id: 3,
      title: "Real-time Analytics Dashboard",
      description: "Interactive dashboard displaying real-time data visualizations with WebSocket connections and responsive design.",
      longDescription: "High-performance analytics platform processing millions of data points in real-time with advanced visualization capabilities and predictive analytics features.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
      techStack: ["React.js", "D3.js", "WebSocket", "Java", "Apache Kafka", "InfluxDB"],
      category: "frontend",
      liveUrl: "#",
      githubUrl: "#",
      year: "2023",
      duration: "5 months",
      teamSize: 5,
      status: "Live",
      highlights: ["Real-time data", "Custom charts", "Predictive analytics", "Performance optimized"]
    },
    {
      id: 4,
      title: "Cloud Infrastructure Manager",
      description: "AWS-based infrastructure management tool with automated scaling, monitoring, and cost optimization features.",
      longDescription: "Comprehensive cloud management solution that automated infrastructure provisioning, reduced costs by 40%, and improved system reliability through intelligent monitoring.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=center",
      techStack: ["AWS", "Python", "Terraform", "CloudWatch", "Lambda", "CDK"],
      category: "backend",
      liveUrl: "#",
      githubUrl: "#",
      year: "2023",
      duration: "8 months",
      teamSize: 2,
      status: "Live",
      highlights: ["40% cost reduction", "Auto-scaling", "Infrastructure as Code", "24/7 monitoring"]
    },
    {
      id: 5,
      title: "Mobile-First Web App",
      description: "Progressive Web Application with offline capabilities, push notifications, and responsive design optimized for mobile devices.",
      longDescription: "PWA achieving 98% Lighthouse score with advanced offline capabilities, background sync, and native-like mobile experience across all devices.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center",
      techStack: ["React.js", "PWA", "Service Workers", "TypeScript", "IndexedDB", "WebPush"],
      category: "mobile",
      liveUrl: "#",
      githubUrl: "#",
      year: "2024",
      duration: "3 months",
      teamSize: 1,
      status: "Live",
      highlights: ["98% Lighthouse score", "Offline-first", "Push notifications", "Native feel"]
    },
    {
      id: 6,
      title: "AI-Powered Chatbot Platform",
      description: "Intelligent chatbot platform with natural language processing and machine learning capabilities for automated customer support.",
      longDescription: "Advanced conversational AI platform reducing customer support costs by 60% while maintaining 95% customer satisfaction through intelligent response generation.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&crop=center",
      techStack: ["Python", "TensorFlow", "FastAPI", "Redis", "PostgreSQL", "Docker"],
      category: "backend",
      liveUrl: "#",
      githubUrl: "#",
      year: "2023",
      duration: "7 months",
      teamSize: 6,
      status: "Live",
      highlights: ["60% cost reduction", "95% satisfaction", "ML-powered", "Multi-language support"]
    }
  ];

  const filteredProjects = filterCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === filterCategory);

  const categories = [
    { key: 'all', label: 'All Projects', count: projects.length },
    { key: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { key: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
    { key: 'backend', label: 'Backend', count: projects.filter(p => p.category === 'backend').length },
    { key: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length }
  ];

  // Enhanced 3D Project Card Component
  const ProjectCard = ({ project, index }: { project: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Mouse position for 3D transform
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x.set((event.clientX - centerX) / 5);
      y.set((event.clientY - centerY) / 5);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    };

    return (
      <motion.div
        ref={cardRef}
        className="perspective-1000"
        initial={{ opacity: 0, y: 60, rotateX: -15 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        <motion.div
          className="relative group cursor-pointer"
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: "preserve-3d"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          whileHover={{ z: 50 }}
        >
          <GestureHandler
            onTap={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
            enableRippleEffect={true}
            enableHapticFeedback={true}
          >
            <motion.article
              className="glass-card-premium overflow-hidden h-full relative"
              data-cursor-hover
              data-grid-blur
              style={{
                transformStyle: "preserve-3d"
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
                y: -10
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* 3D Background Layers */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transform: "translateZ(-10px)" }}
              />

              {/* Enhanced Project Image with 3D Effects */}
              <div className="relative overflow-hidden h-64">
                <motion.img
                  src={project.image}
                  alt={`${project.title} - Screenshot`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{
                    transform: isHovered ? "translateZ(20px) scale(1.1)" : "translateZ(0px) scale(1)",
                    filter: isHovered ? "brightness(1.1) contrast(1.1)" : "brightness(1) contrast(1)"
                  }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Project Status Badge */}
                <motion.div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                  style={{
                    background: project.status === 'Live' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                    color: project.status === 'Live' ? '#22c55e' : '#fbbf24',
                    border: `1px solid ${project.status === 'Live' ? '#22c55e' : '#fbbf24'}40`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {project.status}
                </motion.div>

                {/* 3D Floating Action Buttons */}
                <motion.div
                  className="absolute top-4 right-4 flex gap-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : -20
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transform: "translateZ(30px)" }}
                >
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Eye className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-accent-foreground hover:bg-accent transition-colors"
                    whileHover={{ scale: 1.1, rotateY: -10 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Code2 className="w-5 h-5" />
                  </motion.a>
                </motion.div>

                {/* Gradient Overlay with 3D effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent"
                  animate={{ opacity: isHovered ? 0.8 : 1 }}
                  style={{ transform: "translateZ(10px)" }}
                />
              </div>

              {/* Enhanced Project Content */}
              <div className="p-6 space-y-4 relative" style={{ transform: "translateZ(20px)" }}>
                {/* Project Meta Info */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{project.teamSize} member{project.teamSize > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <span className="text-primary font-medium">{project.duration}</span>
                </div>

                {/* Project Title */}
                <motion.h3 
                  className="text-xl font-bold group-hover:holographic transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {project.title}
                </motion.h3>
                
                {/* Project Description */}
                <motion.p 
                  className="text-muted-foreground text-sm leading-relaxed"
                  animate={{ opacity: selectedProject === project.id ? 0 : 1 }}
                >
                  {project.description}
                </motion.p>

                {/* Expanded Content */}
                <AnimatePresence>
                  {selectedProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.longDescription}
                      </p>
                      
                      {/* Project Highlights */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-primary">Key Highlights</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {project.highlights.map((highlight: string, idx: number) => (
                            <motion.div
                              key={idx}
                              className="flex items-center gap-2 text-xs text-muted-foreground"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <Star className="w-3 h-3 text-accent" />
                              <span>{highlight}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech: string, techIndex: number) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-medium bg-muted/30 backdrop-blur-sm rounded-full text-primary border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all cursor-pointer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        delay: index * 0.1 + 0.6 + techIndex * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        y: -2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <OptimizedButton
                    variant="primary"
                    size="md"
                    className="flex-1 bg-gradient-primary text-primary-foreground font-semibold py-3 px-4 text-sm"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      <span>Live Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </OptimizedButton>
                  
                  <OptimizedButton
                    variant="outline"
                    size="md"
                    className="border border-primary/30 bg-transparent hover:bg-primary/10 text-primary py-3 px-4 text-sm backdrop-blur-sm"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4" />
                  </OptimizedButton>
                </div>
              </div>
            </motion.article>
          </GestureHandler>
        </motion.div>
      </motion.div>
    );
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = (ref.current as HTMLElement).getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }
    };

    const section = ref.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden" ref={ref}>
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-5" />
      <div className="absolute top-20 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative z-10">
        {/* Enhanced Header */}
        <FadeInUp delay={0.1} className="text-center mb-16">
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6">
            Featured <span className="holographic">Projects</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-primary rounded-full mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A showcase of innovative solutions and technical expertise that demonstrate my passion for creating exceptional digital experiences
          </p>
        </FadeInUp>

        {/* Enhanced Filter Categories */}
        <FadeInUp delay={0.6} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <OptimizedButton
                key={category.key}
                variant={filterCategory === category.key ? "primary" : "outline"}
                size="md"
                className={`px-6 py-3 ${
                  filterCategory === category.key
                    ? 'bg-gradient-primary text-primary-foreground'
                    : 'border border-primary/30 text-primary hover:bg-primary/10'
                }`}
                onClick={() => setFilterCategory(category.key as any)}
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>{category.label}</span>
                  <span className="text-xs opacity-70">({category.count})</span>
                </div>
              </OptimizedButton>
            ))}
          </div>
        </FadeInUp>

        {/* Enhanced Projects Grid with 3D Cards */}
        <StaggeredReveal staggerDelay={0.1} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>
        </StaggeredReveal>

        {/* Call to Action */}
        <FadeInUp delay={1.5} className="text-center">
          <OptimizedButton
            variant="primary"
            size="lg"
            className="bg-gradient-primary text-primary-foreground px-10 py-4 text-lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5" />
              <span>Let's Build Something Amazing</span>
            </div>
          </OptimizedButton>
        </FadeInUp>
      </div>
    </section>
  );
};

export default Projects;