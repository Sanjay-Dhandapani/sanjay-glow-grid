import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const titles = [
  'Full-Stack Developer',
  'Code Crafter',
  'Digital Builder',
  'Creative Technologist'
];

const AnimatedTitle = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 2800); // 2.8 seconds per title

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-16 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            y: 50,
            filter: 'blur(10px)'
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            filter: 'blur(0px)'
          }}
          exit={{ 
            opacity: 0, 
            y: -50,
            filter: 'blur(10px)'
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for premium feel
            filter: { duration: 0.6 }
          }}
          className="text-2xl md:text-3xl text-muted-foreground font-light absolute whitespace-nowrap"
        >
          {titles[currentIndex]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedTitle;