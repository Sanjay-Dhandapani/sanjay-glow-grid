import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useAnimation, useInView, Variants, Transition } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' | 'rotate';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  cascade?: boolean;
  cascadeDelay?: number;
  triggerOnce?: boolean;
  className?: string;
  variants?: 'subtle' | 'dramatic' | 'elastic' | 'magnetic' | 'quantum';
}

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
  threshold = 0.1,
  once = true,
  cascade = false,
  cascadeDelay = 0.1,
  className = '',
  variants = 'subtle'
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, {
    amount: threshold,
    once
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  // Enhanced animation variants for different effects
  const getAnimationVariants = (): Variants => {
    const getTransition = (): Transition => {
      const baseTransition: Transition = {
        duration,
        delay,
        ease: variants === 'elastic' ? [0.68, -0.55, 0.265, 1.55] as const :
              variants === 'dramatic' ? [0.25, 0.46, 0.45, 0.94] as const :
              variants === 'magnetic' ? [0.4, 0, 0.2, 1] as const :
              variants === 'quantum' ? [0.34, 1.56, 0.64, 1] as const :
              [0.22, 1, 0.36, 1] as const // subtle (default)
      };

      if (variants === 'magnetic') {
        return {
          ...baseTransition,
          type: "spring" as const,
          stiffness: 200,
          damping: 20
        };
      }

      return baseTransition;
    };

    const getInitialState = () => {
      switch (direction) {
        case 'up':
          return { opacity: 0, y: distance, rotateX: variants === 'dramatic' ? -15 : 0 };
        case 'down':
          return { opacity: 0, y: -distance, rotateX: variants === 'dramatic' ? 15 : 0 };
        case 'left':
          return { opacity: 0, x: distance, rotateY: variants === 'dramatic' ? -15 : 0 };
        case 'right':
          return { opacity: 0, x: -distance, rotateY: variants === 'dramatic' ? 15 : 0 };
        case 'scale':
          return {
            opacity: 0,
            scale: variants === 'dramatic' ? 0.3 : 0.8,
            filter: variants === 'quantum' ? 'blur(10px)' : 'blur(0px)'
          };
        case 'rotate':
          return {
            opacity: 0,
            rotate: variants === 'dramatic' ? 180 : 45,
            scale: 0.8
          };
        case 'fade':
        default:
          return { opacity: 0 };
      }
    };

    const getAnimateState = () => {
      const baseState = {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        filter: 'blur(0px)'
      };

      const transition = getTransition();

      if (variants === 'quantum') {
        return {
          ...baseState,
          transition: {
            ...transition,
            filter: { duration: duration * 0.6 }
          }
        };
      }

      return {
        ...baseState,
        transition
      };
    };

    return {
      hidden: getInitialState(),
      visible: getAnimateState()
    };
  };

  // Cascade animation for multiple children
  const getCascadeVariants = (): Variants => {
    const baseVariants = getAnimationVariants();
    
    if (!cascade) return baseVariants;

    return {
      hidden: baseVariants.hidden,
      visible: {
        ...baseVariants.visible,
        transition: {
          staggerChildren: cascadeDelay,
          delayChildren: delay
        }
      }
    };
  };

  const childVariants: Variants = cascade ? getAnimationVariants() : {};

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start('visible');
      if (once) setHasAnimated(true);
    } else if (!isInView && !once) {
      controls.start('hidden');
    }
  }, [isInView, controls, hasAnimated, once]);

  // Performance optimization: reduce motion for users who prefer it
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      // Immediate reveal for reduced motion
      controls.start('visible');
    }
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getCascadeVariants()}
      className={className}
      style={{
        perspective: variants === 'dramatic' ? '1000px' : 'none'
      }}
    >
      {cascade ? (
        // Wrap each child for cascade effect
        React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            className="relative"
          >
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
};

// Specialized reveal components for common use cases
export const RevealOnScroll = ScrollReveal;

export const FadeInUp = (props: Omit<ScrollRevealProps, 'direction'>) => (
  <ScrollReveal direction="up" {...props} />
);

export const FadeInDown = (props: Omit<ScrollRevealProps, 'direction'>) => (
  <ScrollReveal direction="down" {...props} />
);

export const FadeInLeft = (props: Omit<ScrollRevealProps, 'direction'>) => (
  <ScrollReveal direction="left" {...props} />
);

export const FadeInRight = (props: Omit<ScrollRevealProps, 'direction'>) => (
  <ScrollReveal direction="right" {...props} />
);

export const ScaleIn = (props: Omit<ScrollRevealProps, 'direction'>) => (
  <ScrollReveal direction="scale" {...props} />
);

export const RotateIn = (props: Omit<ScrollRevealProps, 'direction'>) => (
  <ScrollReveal direction="rotate" {...props} />
);

// Specialized variants
export const QuantumReveal = (props: Omit<ScrollRevealProps, 'variants'>) => (
  <ScrollReveal variants="quantum" {...props} />
);

export const ElasticReveal = (props: Omit<ScrollRevealProps, 'variants'>) => (
  <ScrollReveal variants="elastic" {...props} />
);

export const MagneticReveal = (props: Omit<ScrollRevealProps, 'variants'>) => (
  <ScrollReveal variants="magnetic" {...props} />
);

export const DramaticReveal = (props: Omit<ScrollRevealProps, 'variants'>) => (
  <ScrollReveal variants="dramatic" {...props} />
);

// Staggered reveal for lists and grids
export const StaggeredReveal = ({ 
  children, 
  staggerDelay = 0.1, 
  ...props 
}: ScrollRevealProps & { staggerDelay?: number }) => (
  <ScrollReveal cascade cascadeDelay={staggerDelay} {...props}>
    {children}
  </ScrollReveal>
);

// Progressive text reveal
export const TextReveal = ({ 
  text, 
  delay = 0,
  ...props 
}: Omit<ScrollRevealProps, 'children'> & { text: string }) => {
  const words = text.split(' ');
  
  return (
    <ScrollReveal cascade cascadeDelay={0.05} delay={delay} {...props}>
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block mr-2">
          {word}
        </motion.span>
      ))}
    </ScrollReveal>
  );
};

// Intersection observer hook for advanced use cases
export const useScrollReveal = (
  threshold = 0.1,
  once = true,
  rootMargin = '0px'
) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) setHasBeenVisible(true);
        } else if (!once && !hasBeenVisible) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once, hasBeenVisible, rootMargin]);

  return { ref, isVisible, hasBeenVisible };
};

export default ScrollReveal;