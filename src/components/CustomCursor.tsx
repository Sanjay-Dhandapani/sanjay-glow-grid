import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorState {
  isHovering: boolean;
  cursorType: 'default' | 'text' | 'button' | 'link';
}

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    cursorType: 'default'
  });

  // Simplified motion values with optimized spring configs
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Optimized spring configuration
  const springConfig = { stiffness: 150, damping: 15, mass: 0.2 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Throttled mouse tracking for better performance
  const updateMousePosition = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  // Simplified hover detection
  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    
    let cursorType: CursorState['cursorType'] = 'default';
    
    if (target.matches('button, [role="button"]')) {
      cursorType = 'button';
    } else if (target.matches('a, [role="link"]')) {
      cursorType = 'link';
    } else if (target.matches('input, textarea, select')) {
      cursorType = 'text';
    }

    setCursorState({
      isHovering: true,
      cursorType
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorState({
      isHovering: false,
      cursorType: 'default'
    });
  }, []);

  useEffect(() => {
    // Throttled mouse tracking
    let rafId: number;
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateMousePosition(e);
        rafId = 0;
      });
    };

    // Add optimized event listeners
    document.addEventListener('mousemove', throttledMouseMove, { passive: true });

    // Use delegation for better performance and to avoid conflicts
    const handleGlobalMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [data-cursor-hover], input, textarea, select')) {
        handleMouseEnter(e);
      }
    };

    const handleGlobalMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [data-cursor-hover], input, textarea, select')) {
        handleMouseLeave();
      }
    };

    document.addEventListener('mouseover', handleGlobalMouseEnter, { passive: true });
    document.addEventListener('mouseout', handleGlobalMouseLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', throttledMouseMove);
      document.removeEventListener('mouseover', handleGlobalMouseEnter);
      document.removeEventListener('mouseout', handleGlobalMouseLeave);
    };
  }, [updateMousePosition, handleMouseEnter, handleMouseLeave]);

  // Simplified cursor styling
  const getCursorScale = () => {
    switch (cursorState.cursorType) {
      case 'text': return 1.8;
      case 'button': return 1.5;
      case 'link': return 1.3;
      default: return 1.0;
    }
  };

  const getCursorColor = () => {
    switch (cursorState.cursorType) {
      case 'text': return 'hsl(var(--accent))';
      case 'button': return 'hsl(var(--primary))';
      case 'link': return 'hsl(var(--secondary))';
      default: return 'hsl(var(--primary))';
    }
  };

  // Hide cursor on mobile devices to save performance
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 12,
          height: 12,
          backgroundColor: getCursorColor(),
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: getCursorScale(),
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 }
        }}
      />

      {/* Outer Ring - simplified */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border"
        style={{
          width: 32,
          height: 32,
          borderColor: `${getCursorColor()}60`,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: getCursorScale() * 0.8,
          opacity: cursorState.isHovering ? 0.8 : 0.4
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      />
    </>
  );
};

export default CustomCursor;