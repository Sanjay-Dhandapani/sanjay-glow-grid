import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import MagneticButton from './ui/magnetic-button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/85 backdrop-blur-xl border-b border-border/30 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl font-bold"
            data-cursor-hover
          >
            <motion.span 
              className="gradient-text glow-text text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              SD
            </motion.span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <motion.ul
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center space-x-2"
            >
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <motion.button
                  onClick={() => scrollToSection(item.href)}
                  className={`relative text-sm font-medium transition-all duration-300 py-2 px-4 rounded-lg ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary bg-primary/10 shadow-soft'
                      : 'text-muted-foreground hover:text-primary'
                  } hover:bg-primary/5`}
                  data-cursor-hover
                  data-grid-blur
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Active indicator */}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full"
                      layoutId="activeIndicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ x: '-50%' }}
                    />
                  )}
                  
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-primary rounded-lg opacity-0"
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.li>
            ))}
            </motion.ul>
            
            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="ml-4"
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors duration-300"
            data-cursor-hover
            data-grid-blur
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <motion.span
                className="w-4 h-0.5 bg-primary rounded-full"
                whileHover={{ width: "1.5rem" }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-4 h-0.5 bg-primary rounded-full"
                whileHover={{ width: "1.5rem" }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
              <motion.span
                className="w-4 h-0.5 bg-primary rounded-full"
                whileHover={{ width: "1.5rem" }}
                transition={{ duration: 0.2, delay: 0.2 }}
              />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;