import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface GridParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: 'primary' | 'secondary' | 'accent' | 'tertiary';
  opacity: number;
  delay: number;
}

const AnimatedGrid = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [particles, setParticles] = useState<GridParticle[]>([]);

  // Generate simplified particles for better performance
  const generateParticle = useCallback((id: number): GridParticle => {
    const colors: GridParticle['color'][] = ['primary', 'secondary', 'accent', 'tertiary'];
    
    return {
      id,
      x: Math.random() * 100, // Use percentage for responsive design
      y: Math.random() * 100,
      size: 2 + Math.random() * 2, // Smaller particles for better performance
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.2 + Math.random() * 0.3, // Reduced opacity for subtlety
      delay: Math.random() * 2, // Animation delay
    };
  }, []);

  // Initialize fewer particles (6 instead of 15)
  useEffect(() => {
    const initialParticles = Array.from({ length: 6 }, (_, i) => generateParticle(i));
    setParticles(initialParticles);
  }, [generateParticle]);

  // Simplified mouse tracking with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
      clearTimeout(timeoutId);
      setIsBlurred(true);
    };
    
    const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
        setIsBlurred(false);
      }, 300); // Debounced for better performance
    };

    // Add listeners to cards and interactive elements
    const cards = document.querySelectorAll('[data-grid-blur]');
    cards.forEach(card => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      clearTimeout(timeoutId);
      cards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Memoized particle colors for performance
  const particleColors = useMemo(() => ({
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    accent: 'hsl(var(--accent))',
    tertiary: 'hsl(var(--tertiary))'
  }), []);

  // Check global motion setting
  const motionAttr = typeof document !== 'undefined' ? document.documentElement.getAttribute('data-motion') : null;
  const motionOff = motionAttr === 'off';
  const motionReduced = motionAttr === 'reduced';

  return (
    <>
      {/* Optimized Grid Background with subtle pattern */}
      <div
        className={`fixed inset-0 pointer-events-none z-[-10] ${!motionOff ? 'transition-all duration-700' : ''} ${
          isBlurred ? 'opacity-5 blur-sm scale-102' : 'opacity-20'
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.06) 1px, transparent 0),
            linear-gradient(hsl(var(--primary) / 0.02) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 100px 100px, 100px 100px',
        }}
      />

      {/* Subtle gradient overlay */}
      {!motionOff ? (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[-9]"
          animate={{
            background: isBlurred
              ? 'radial-gradient(800px circle at 50% 50%, hsl(var(--primary) / 0.08), transparent 70%)'
              : 'radial-gradient(600px circle at 50% 50%, hsl(var(--primary) / 0.04), transparent 70%)'
          }}
          transition={{ duration: motionReduced ? 0.4 : 0.7, ease: "easeOut" }}
        />
      ) : null}

      {/* Optimized Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-[-8] overflow-hidden">
        {particles.map(particle => (
          !motionOff ? (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particleColors[particle.color],
              }}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, particle.opacity, particle.opacity * 0.5, particle.opacity],
                scale: [0, 1, 1.2, 1],
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: motionReduced ? 5 : 8,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            />
          ) : (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particleColors[particle.color],
                opacity: particle.opacity,
              }}
            />
          )
        ))}
      </div>

      {/* Subtle pulsing accent */}
      {!motionOff ? (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[-7]"
          style={{
            background: 'radial-gradient(circle at 20% 80%, hsl(var(--accent) / 0.03), transparent 50%)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: motionReduced ? 4 : 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ) : null}
    </>
  );
};

export default AnimatedGrid;