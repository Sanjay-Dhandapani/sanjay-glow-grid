import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send, MapPin, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import FloatingCard from '../ui/floating-card';
import MagneticButton from '../ui/magnetic-button';
import TypewriterText from '../ui/typewriter-text';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sanjaydhandapani6066/',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Sanjay-Dhandapani',
      icon: Github,
      color: 'hover:text-purple-400'
    },
    {
      name: 'Email',
      url: 'mailto:sanjaydhandapani0@gmail.com',
      icon: Mail,
      color: 'hover:text-primary'
    },
    {
      name: 'Phone',
      url: 'tel:+919597726066',
      icon: Phone,
      color: 'hover:text-accent'
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
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
          Get In <span className="gradient-text glow-text">Touch</span>
        </motion.h2>
        <motion.div 
          className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        <TypewriterText
          text="Let's discuss your next project or just say hello!"
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          delay={0.6}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <FloatingCard
          rotationIntensity={6}
          levitationHeight={10}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 group hover-lift magnetic-hover" data-grid-blur>
              <motion.h3 
                className="text-2xl font-bold mb-6 flex items-center gap-2 group-hover:glow-text transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <Zap className="w-6 h-6 text-primary" />
                Let's Connect
              </motion.h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4 hover-lift"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center pulse-glow"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <MapPin className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-semibold shimmer">Location</p>
                    <p className="text-muted-foreground">India</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4 hover-lift"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center pulse-glow"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Mail className="w-6 h-6 text-accent" />
                  </motion.div>
                  <div>
                    <p className="font-semibold shimmer">Email</p>
                    <a 
                      href="mailto:sanjaydhandapani0@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-all duration-300 hover:glow-text"
                      data-cursor-hover
                    >
                      sanjaydhandapani0@gmail.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4 hover-lift"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center pulse-glow"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Phone className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-semibold shimmer">Phone</p>
                    <a 
                      href="tel:+919597726066"
                      className="text-muted-foreground hover:text-primary transition-all duration-300 hover:glow-text"
                      data-cursor-hover
                    >
                      +91 95977 26066
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8 group hover-lift magnetic-hover" data-grid-blur>
              <motion.h3 
                className="text-xl font-bold mb-6 flex items-center gap-2 group-hover:glow-text transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <Heart className="w-5 h-5 text-accent" />
                Follow Me
              </motion.h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-muted rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg magnetic-hover pulse-glow`}
                    data-cursor-hover
                    aria-label={`Follow Sanjay on ${social.name}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      scale: 1.15, 
                      boxShadow: "0 10px 30px hsl(var(--primary) / 0.3)",
                      rotate: 360 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </FloatingCard>

        {/* Contact Form */}
        <FloatingCard
          rotationIntensity={6}
          levitationHeight={10}
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6 group hover-lift magnetic-hover" data-grid-blur>
              <motion.h3 
                className="text-2xl font-bold mb-6 flex items-center gap-2 group-hover:glow-text transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <Send className="w-6 h-6 text-primary" />
                Send a Message
              </motion.h3>
              
              <motion.div 
                className="floating-label"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="bg-background/50 border-border focus:border-primary hover:border-accent transition-all duration-300 shimmer"
                  aria-describedby="name-label"
                />
                <label htmlFor="name" id="name-label">Your Name</label>
              </motion.div>

              <motion.div 
                className="floating-label"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
              >
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="bg-background/50 border-border focus:border-primary hover:border-accent transition-all duration-300 shimmer"
                  aria-describedby="email-label"
                />
                <label htmlFor="email" id="email-label">Your Email</label>
              </motion.div>

              <motion.div 
                className="floating-label"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  rows={5}
                  className="bg-background/50 border-border focus:border-primary hover:border-accent transition-all duration-300 resize-none shimmer"
                  aria-describedby="message-label"
                />
                <label htmlFor="message" id="message-label">Your Message</label>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
              >
                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-glow text-primary-foreground font-semibold py-3 glow-primary pulse-glow"
                  data-cursor-hover
                  strength={15}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </MagneticButton>
              </motion.div>
            </form>
          </motion.div>
        </FloatingCard>
      </div>
    </section>
  );
};

export default Contact;