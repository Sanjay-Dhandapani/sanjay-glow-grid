import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
          data-grid-blur
        >
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-30" />
            <img
              src="/lovable-uploads/224479e8-d491-449c-a9f8-ccb0b9c8aedb.png"
              alt="Sanjay Dhandapani - Full-Stack Web Developer"
              className="relative w-full h-auto rounded-2xl shadow-card"
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-primary rounded-full" />
          </div>

          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              A <strong className="text-primary">2k-born kiddo</strong> passionate about building scalable web applications using cutting-edge technologies.
            </p>
            <p>
              I specialize in creating robust solutions with <span className="text-accent font-semibold">C, C++, Java, React.js, Spring Boot, AWS, and n8n</span>, always pushing the boundaries of what's possible in web development.
            </p>
            <p>
              My journey as a developer is driven by curiosity and the desire to solve real-world problems through elegant, efficient code.
            </p>
          </div>

          {/* Tech Stack Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6"
          >
            {['React.js', 'Spring Boot', 'AWS', 'Java', 'C++', 'n8n'].map((tech, index) => (
              <div
                key={tech}
                className="glass-card p-4 text-center"
                data-cursor-hover
                data-grid-blur
              >
                <span className="text-sm font-semibold text-primary">{tech}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;