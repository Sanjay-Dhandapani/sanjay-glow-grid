import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useScroll } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import MagneticButton from './ui/magnetic-button';
import { useLenis } from '@/hooks/useLenis';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll();

  // Section ids to observe
  const sectionIds = useMemo(() => ['home', 'about', 'skills', 'projects', 'experience', 'contact'], []);

  // Lenis context
  const { scrollTo } = useLenis();

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target && (e.target as HTMLElement).id) {
            setActiveSection((e.target as HTMLElement).id);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  // Lightweight scroll listener to toggle "scrolled" nav style (doesn't manage active section)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  // Lenis-based smooth scroll navigation
  const handleNavClick = useCallback(
    (targetHref: string) => {
      // targetHref is like "#about"
      const id = targetHref.startsWith('#') ? targetHref.slice(1) : targetHref;
      const el = document.getElementById(id);
      if (el) {
        scrollTo(el);
      }
    },
    [scrollTo]
  );

  return (
    <>
      {/* Scroll progress track and bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-surface/30 z-[100]" />
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-primary origin-left z-[101] right-0"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-lg'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
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
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <motion.button
                      onClick={() => handleNavClick(item.href)}
                      className={`relative text-sm font-medium transition-all duration-300 py-2 px-4 rounded-lg ${
                        isActive
                          ? 'text-primary bg-primary/10 shadow-soft'
                          : 'text-muted-foreground hover:text-primary'
                      } hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                      data-cursor-hover
                      data-grid-blur
                      role="link"
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={item.name}
                      tabIndex={0}
                      whileHover={{
                        scale: 1.05,
                        y: -2
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full"
                          layoutId="activeIndicator"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ x: '-50%' }}
                          aria-hidden="true"
                        />
                      )}
                      
                      {/* Hover background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-primary rounded-lg opacity-0"
                        whileHover={{ opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      />
                    </motion.button>
                  </motion.li>
                );
              })}
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
    </>
  );
};

export default Navigation;