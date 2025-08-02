import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

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
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Let's discuss your next project or just say hello!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="glass-card p-8" data-grid-blur>
            <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-muted-foreground">India</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <a 
                    href="mailto:sanjaydhandapani0@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-cursor-hover
                  >
                    sanjaydhandapani0@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <a 
                    href="tel:+919597726066"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-cursor-hover
                  >
                    +91 95977 26066
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-card p-8" data-grid-blur>
            <h3 className="text-xl font-bold mb-6">Follow Me</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-muted rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg`}
                  data-cursor-hover
                  aria-label={`Follow Sanjay on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6" data-grid-blur>
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            <div className="floating-label">
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                required
                className="bg-background/50 border-border focus:border-primary"
                aria-describedby="name-label"
              />
              <label htmlFor="name" id="name-label">Your Name</label>
            </div>

            <div className="floating-label">
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
                className="bg-background/50 border-border focus:border-primary"
                aria-describedby="email-label"
              />
              <label htmlFor="email" id="email-label">Your Email</label>
            </div>

            <div className="floating-label">
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                required
                rows={5}
                className="bg-background/50 border-border focus:border-primary resize-none"
                aria-describedby="message-label"
              />
              <label htmlFor="message" id="message-label">Your Message</label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-glow text-primary-foreground font-semibold py-3 glow-primary"
              data-cursor-hover
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
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;