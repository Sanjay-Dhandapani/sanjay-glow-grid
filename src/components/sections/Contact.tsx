import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Github, Send, MapPin, Zap, Heart, CheckCircle, AlertCircle, Clock, Sparkles, MessageCircle, Calendar, User, AtSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import FloatingCard from '../ui/floating-card';
import MagneticButton from '../ui/magnetic-button';
import TypewriterText from '../ui/typewriter-text';
import { FadeInUp, StaggeredReveal, ScaleIn } from '../animations/ScrollReveal';
import GestureHandler from '../animations/GestureHandler';
import OptimizedButton from '@/components/ui/optimized-button';

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [fieldFocus, setFieldFocus] = useState({
    name: false,
    email: false,
    message: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  // Mouse tracking for enhanced interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Real-time form validation
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  // Calculate form completion progress
  useEffect(() => {
    const filledFields = Object.values(formData).filter(value => value.trim()).length;
    const validFields = Object.values(fieldErrors).filter(error => !error).length;
    const progress = Math.min(100, (filledFields * 33.33) + (validFields > 0 ? 10 : 0));
    setFormProgress(progress);
  }, [formData, fieldErrors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };
    
    setFieldErrors(errors);
    
    if (Object.values(errors).some(error => error)) {
      // Shake animation for form with errors
      if (formRef.current) {
        formRef.current.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.style.animation = '';
          }
        }, 500);
      }
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSuccess(true);
    
    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you within 24 hours.",
    });
    
    // Reset form after success animation
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setIsSuccess(false);
      setFormProgress(0);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Real-time validation
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFocus = (field: string) => {
    setFieldFocus(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFieldFocus(prev => ({ ...prev, [field]: false }));
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sanjaydhandapani6066/',
      icon: Linkedin,
      color: 'hover:text-blue-400',
      bgColor: 'bg-blue-500/10',
      description: 'Professional Network'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Sanjay-Dhandapani',
      icon: Github,
      color: 'hover:text-purple-400',
      bgColor: 'bg-purple-500/10',
      description: 'Code Repository'
    },
    {
      name: 'Email',
      url: 'mailto:sanjaydhandapani0@gmail.com',
      icon: Mail,
      color: 'hover:text-primary',
      bgColor: 'bg-primary/10',
      description: 'Direct Contact'
    },
    {
      name: 'Phone',
      url: 'tel:+919597726066',
      icon: Phone,
      color: 'hover:text-accent',
      bgColor: 'bg-accent/10',
      description: 'Voice Call'
    }
  ];

  // Enhanced Form Field Component
  const FormField = ({ 
    type, 
    name, 
    value, 
    placeholder, 
    icon: Icon, 
    isTextarea = false, 
    delay = 0 
  }: any) => {
    const fieldError = fieldErrors[name as keyof typeof fieldErrors];
    const isFocused = fieldFocus[name as keyof typeof fieldFocus];
    const hasValue = value.trim().length > 0;
    const isValid = hasValue && !fieldError;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: -15 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative group"
      >
        <div className="relative">
          {/* Field Background with animated gradient */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-0"
            animate={{ 
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1.02 : 1
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Input/Textarea */}
          {isTextarea ? (
            <Textarea
              name={name}
              value={value}
              onChange={handleChange}
              onFocus={() => handleFocus(name)}
              onBlur={() => handleBlur(name)}
              placeholder=" "
              required
              rows={5}
              className={`relative z-20 w-full p-4 pl-12 bg-background/80 border-2 rounded-xl transition-all duration-300 resize-none focus:outline-none ${
                fieldError
                  ? 'border-red-500/50 focus:border-red-500'
                  : isValid
                    ? 'border-green-500/50 focus:border-green-500'
                    : 'border-border focus:border-primary'
              }`}
              style={{ pointerEvents: 'auto' }}
            />
          ) : (
            <Input
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              onFocus={() => handleFocus(name)}
              onBlur={() => handleBlur(name)}
              placeholder=" "
              required
              className={`relative z-20 w-full p-4 pl-12 bg-background/80 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                fieldError
                  ? 'border-red-500/50 focus:border-red-500'
                  : isValid
                    ? 'border-green-500/50 focus:border-green-500'
                    : 'border-border focus:border-primary'
              }`}
              style={{ pointerEvents: 'auto' }}
            />
          )}
          
          {/* Animated Icon */}
          <motion.div
            className={`absolute left-4 ${isTextarea ? 'top-4' : 'top-1/2 -translate-y-1/2'} z-10 pointer-events-none`}
            animate={{
              scale: isFocused ? 1.1 : 1,
              color: fieldError ? '#ef4444' : isValid ? '#22c55e' : isFocused ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          
          {/* Floating Label */}
          <motion.label
            className={`absolute left-12 z-10 px-2 pointer-events-none transition-all duration-300 ${
              isFocused || hasValue
                ? `top-0 -translate-y-1/2 text-sm bg-background/90 rounded ${
                    fieldError ? 'text-red-500' : isValid ? 'text-green-500' : 'text-primary'
                  }`
                : `${isTextarea ? 'top-4' : 'top-1/2 -translate-y-1/2'} text-muted-foreground`
            }`}
            animate={{
              scale: isFocused || hasValue ? 0.9 : 1
            }}
          >
            {placeholder}
          </motion.label>
          
          {/* Status Icon */}
          <AnimatePresence>
            {(isValid || fieldError) && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                className={`absolute right-4 ${isTextarea ? 'top-4' : 'top-1/2 -translate-y-1/2'} z-10 pointer-events-none`}
              >
                {isValid ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Error Message */}
        <AnimatePresence>
          {fieldError && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="text-red-500 text-sm mt-2 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              {fieldError}
            </motion.p>
          )}
        </AnimatePresence>
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
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden" ref={ref}>
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-5" />
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
      {/* Simplified floating elements */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-primary/20 rounded-full animate-float" />
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10">
        {/* Enhanced Header */}
        <FadeInUp delay={0.1} className="text-center mb-16">
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6">
            Get In <span className="holographic">Touch</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-primary rounded-full mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <TypewriterText
            text="Let's discuss your next project or just say hello!"
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            delay={0.6}
          />
          
          {/* Contact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Response within 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-accent" />
              <span>Available for projects</span>
            </div>
          </motion.div>
        </FadeInUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Information */}
          <StaggeredReveal staggerDelay={0.1}>
            <motion.div className="space-y-8">
              {/* Contact Details Card */}
              <GestureHandler enableRippleEffect={true}>
                <motion.div
                  className="glass-card-premium p-8 group"
                  data-cursor-hover
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.h3 
                    className="text-2xl font-bold mb-6 flex items-center gap-3 holographic"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-6 h-6 text-primary" />
                    </motion.div>
                    Let's Connect
                  </motion.h3>
                  
                  <div className="space-y-6">
                    {[
                      { icon: MapPin, label: 'Location', value: 'India', color: 'primary' },
                      { icon: Mail, label: 'Email', value: 'sanjaydhandapani0@gmail.com', href: 'mailto:sanjaydhandapani0@gmail.com', color: 'accent' },
                      { icon: Phone, label: 'Phone', value: '+91 95977 26066', href: 'tel:+919597726066', color: 'primary' }
                    ].map((contact, index) => (
                      <motion.div 
                        key={contact.label}
                        className="flex items-center gap-4 group/item"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ x: 10 }}
                      >
                        <motion.div 
                          className={`w-14 h-14 bg-${contact.color}/10 border border-${contact.color}/20 rounded-xl flex items-center justify-center backdrop-blur-sm`}
                          whileHover={{ 
                            scale: 1.1, 
                            rotate: [0, -10, 10, 0],
                            boxShadow: `0 10px 30px hsl(var(--${contact.color}) / 0.3)`
                          }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <contact.icon className={`w-6 h-6 text-${contact.color}`} />
                        </motion.div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground group-hover/item:holographic transition-all duration-300">
                            {contact.label}
                          </p>
                          {contact.href ? (
                            <motion.a 
                              href={contact.href}
                              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:holographic"
                              data-cursor-hover
                              whileHover={{ scale: 1.05 }}
                            >
                              {contact.value}
                            </motion.a>
                          ) : (
                            <p className="text-muted-foreground">{contact.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </GestureHandler>

              {/* Enhanced Social Links */}
              <GestureHandler enableRippleEffect={true}>
                <motion.div
                  className="glass-card-premium p-8 group"
                  data-cursor-hover
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.h3 
                    className="text-xl font-bold mb-6 flex items-center gap-3 holographic"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-5 h-5 text-accent" />
                    </motion.div>
                    Follow Me
                  </motion.h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social relative"
                        data-cursor-hover
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`p-4 ${social.bgColor} border border-primary/20 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover/social:border-primary/40`}>
                          <div className="flex items-center gap-3">
                            <social.icon className="w-6 h-6 text-foreground group-hover/social:text-primary transition-colors" />
                            <div>
                              <p className="font-semibold text-sm">{social.name}</p>
                              <p className="text-xs text-muted-foreground">{social.description}</p>
                            </div>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </GestureHandler>
            </motion.div>
          </StaggeredReveal>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GestureHandler enableRippleEffect={true}>
              <motion.div
                className="glass-card-premium p-8 relative overflow-hidden"
                data-cursor-hover
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Form Progress Bar */}
                <motion.div 
                  className="absolute top-0 left-0 h-1 bg-gradient-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${formProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Success Overlay */}
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                          transition={{ duration: 1 }}
                          className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        </motion.div>
                        <h3 className="text-xl font-bold holographic mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">Thank you for reaching out</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <motion.h3 
                    className="text-2xl font-bold mb-8 flex items-center gap-3 holographic"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Send className="w-6 h-6 text-primary" />
                    </motion.div>
                    Send a Message
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-accent" />
                    </motion.div>
                  </motion.h3>
                  
                  {/* Enhanced Form Fields */}
                  <FormField
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Your Name"
                    icon={User}
                    delay={0.6}
                  />

                  <FormField
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Your Email"
                    icon={AtSign}
                    delay={0.7}
                  />

                  <FormField
                    name="message"
                    value={formData.message}
                    placeholder="Your Message"
                    icon={MessageCircle}
                    isTextarea={true}
                    delay={0.8}
                  />

                  {/* Enhanced Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9 }}
                  >
                    <OptimizedButton
                      onClick={handleSubmit}
                      disabled={isSubmitting || isSuccess}
                      variant="primary"
                      size="lg"
                      className="w-full bg-gradient-primary text-primary-foreground font-semibold py-4 text-lg relative overflow-hidden"
                      loading={isSubmitting}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="submitting"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center justify-center gap-3"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                            />
                            <span>Sending Message...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="send"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center justify-center gap-3"
                          >
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Sparkles className="w-4 h-4" />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </OptimizedButton>
                  </motion.div>
                </form>
              </motion.div>
            </GestureHandler>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;