import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean | string>(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      // Check if hovering over text elements
      const isTextElement = target.tagName.match(/^(H[1-6]|P|SPAN|A|BUTTON)$/) || 
                           target.closest('h1, h2, h3, h4, h5, h6, p, span, a, button');
      setIsHovering(isTextElement ? 'text' : true);
    };
    
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for cursor tracking
    document.addEventListener('mousemove', updateMousePosition);

    // Add hover listeners to interactive elements and text
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover], h1, h2, h3, h4, h5, h6, p, span');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering === 'text' ? 2.5 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.5
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering === 'text' ? 2 : isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
          mass: 0.8
        }}
      />
    </>
  );
};

export default CustomCursor;