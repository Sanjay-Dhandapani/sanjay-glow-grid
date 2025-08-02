import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Coffee, Heart, Zap } from 'lucide-react';
import FloatingCard from '@/components/ui/floating-card';
import AnimatedCounter from '@/components/ui/animated-counter';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [imageHovered, setImageHovered] = useState(false);

  const stats = [
    { icon: Code, label: "Projects Built", value: 50, suffix: "+" },
    { icon: Coffee, label: "Cups of Coffee", value: 1000, suffix: "+" },
    { icon: Heart, label: "Happy Clients", value: 25, suffix: "+" },
    { icon: Zap, label: "Lines of Code", value: 100000, suffix: "+" }
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.8 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="relative"
          data-grid-blur
        >
          <FloatingCard
            className="w-full max-w-md mx-auto"
            rotationIntensity={15}
            levitationHeight={25}
          >
            <div 
              className="relative group cursor-pointer"
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            >
              {/* Animated Background Glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-2xl"
                animate={{ 
                  opacity: imageHovered ? 0.6 : 0.3,
                  scale: imageHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Multiple Glow Layers */}
              <motion.div
                className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-40"
                animate={{
                  scale: imageHovered ? 1.2 : 1,
                  rotate: imageHovered ? 180 : 0,
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Image */}
              <motion.img
                src="/lovable-uploads/224479e8-d491-449c-a9f8-ccb0b9c8aedb.png"
                alt="Sanjay Dhandapani - Full-Stack Web Developer"
                className="relative w-full h-auto rounded-2xl shadow-2xl border-2 border-primary/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Floating Tech Icons */}
              {['⚛️', '☕', '🚀', '☁️'].map((icon, index) => (
                <motion.div
                  key={index}
                  className="absolute text-2xl"
                  style={{
                    top: `${20 + index * 15}%`,
                    right: index % 2 === 0 ? '-10%' : 'auto',
                    left: index % 2 === 1 ? '-10%' : 'auto',
                  }}
                  animate={{
                    y: imageHovered ? 0 : 20,
                    opacity: imageHovered ? 1 : 0,
                    rotate: [0, 360],
                  }}
                  transition={{
                    y: { duration: 0.5, delay: index * 0.1 },
                    opacity: { duration: 0.5, delay: index * 0.1 },
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" }
                  }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </FloatingCard>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              About <span className="gradient-text glow-text">Me</span>
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-primary rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>

          <motion.div 
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <p className="shimmer hover-lift">
              A <strong className="text-primary">2k-born kiddo</strong> passionate about building scalable web applications using cutting-edge technologies.
            </p>
            <p className="shimmer hover-lift">
              I specialize in creating robust solutions with <span className="text-accent font-semibold glow-text">C, C++, Java, React.js, Spring Boot, AWS, and n8n</span>, always pushing the boundaries of what's possible in web development.
            </p>
            <p className="shimmer hover-lift">
              My journey as a developer is driven by curiosity and the desire to solve real-world problems through elegant, efficient code.
            </p>
          </motion.div>

          {/* Tech Stack Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6"
          >
            {['React.js', 'Spring Boot', 'AWS', 'Java', 'C++', 'n8n'].map((tech, index) => (
              <motion.div
                key={tech}
                className="glass-card p-4 text-center group hover-lift magnetic-hover"
                data-cursor-hover
                data-grid-blur
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  delay: 0.7 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px hsl(var(--primary) / 0.3)"
                }}
              >
                <span className="text-sm font-semibold text-primary group-hover:glow-text transition-all duration-300">
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FloatingCard
              key={stat.label}
              className="text-center"
              rotationIntensity={10}
              levitationHeight={15}
            >
              <motion.div
                className="glass-card p-6 h-full flex flex-col items-center justify-center space-y-3 group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-2"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    duration={2}
                  />
                </div>
                
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </FloatingCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;