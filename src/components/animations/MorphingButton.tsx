import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, Variants, Transition } from 'framer-motion';

interface MorphingButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'liquid' | 'elastic' | 'magnetic' | 'quantum' | 'neural';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  rippleEffect?: boolean;
  magneticStrength?: number;
  morphDuration?: number;
  glowIntensity?: number;
  soundEffect?: boolean;
}

const MorphingButton = ({
  children,
  onClick,
  variant = 'liquid',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  rippleEffect = true,
  magneticStrength = 0.3,
  morphDuration = 0.6,
  glowIntensity = 0.3,
  soundEffect = false
}: MorphingButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const controls = useAnimation();
  
  // Magnetic effect motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  // Size configurations
  const sizeConfig = {
    sm: { padding: 'px-4 py-2', text: 'text-sm', height: 32 },
    md: { padding: 'px-6 py-3', text: 'text-base', height: 40 },
    lg: { padding: 'px-8 py-4', text: 'text-lg', height: 48 },
    xl: { padding: 'px-10 py-5', text: 'text-xl', height: 56 }
  };

  const currentSize = sizeConfig[size];

  // Morphing animation variants based on button variant
  const getMorphVariants = (): Variants => {
    const baseVariants: Variants = {
      initial: { scale: 1, rotateX: 0, rotateY: 0 },
      hover: { scale: 1.05, rotateX: 5, rotateY: 5 },
      pressed: { scale: 0.95 },
      loading: {
        scale: [1, 1.02, 1],
        transition: { duration: 1.5, repeat: Infinity } as Transition
      }
    };

    switch (variant) {
      case 'liquid':
        return {
          initial: {
            scale: 1,
            borderRadius: '12px'
          },
          hover: {
            scale: 1.05,
            borderRadius: ['12px', '20px', '12px', '25px', '12px'],
            transition: {
              borderRadius: { duration: 2, repeat: Infinity } as Transition,
              scale: { duration: 0.2 } as Transition
            } as Transition
          },
          pressed: {
            scale: 0.92,
            borderRadius: '8px'
          }
        };

      case 'elastic':
        return {
          initial: { scale: 1, skewX: 0, skewY: 0 },
          hover: {
            scale: 1.1,
            transition: {
              type: "spring" as const,
              stiffness: 400,
              damping: 10
            } as Transition
          },
          pressed: {
            scale: 0.85,
            skewX: 5,
            transition: {
              type: "spring" as const,
              stiffness: 600,
              damping: 15
            } as Transition
          }
        };

      case 'magnetic':
        return {
          initial: { scale: 1, rotateZ: 0 },
          hover: {
            scale: 1.08,
            rotateZ: [0, 2, -2, 0],
            transition: {
              rotateZ: { duration: 0.5, ease: "easeInOut" } as Transition,
              scale: { duration: 0.2 } as Transition
            } as Transition
          },
          pressed: {
            scale: 0.9,
            rotateZ: 0
          }
        };

      case 'quantum':
        return {
          initial: {
            scale: 1,
            filter: 'blur(0px) hue-rotate(0deg)'
          },
          hover: {
            scale: 1.06,
            filter: 'blur(0.5px) hue-rotate(10deg)',
            transition: { duration: 0.3 } as Transition
          },
          pressed: {
            scale: 0.94,
            filter: 'blur(1px) hue-rotate(-10deg)'
          }
        };

      case 'neural':
        return {
          initial: {
            scale: 1,
            opacity: 1,
            boxShadow: '0 4px 15px hsl(var(--primary) / 0.2)'
          },
          hover: {
            scale: 1.05,
            opacity: 0.9,
            boxShadow: [
              '0 4px 15px hsl(var(--primary) / 0.2)',
              '0 8px 25px hsl(var(--accent) / 0.3)',
              '0 4px 15px hsl(var(--secondary) / 0.2)',
              '0 8px 25px hsl(var(--primary) / 0.3)'
            ],
            transition: {
              boxShadow: { duration: 1.5, repeat: Infinity } as Transition,
              scale: { duration: 0.2 } as Transition
            } as Transition
          },
          pressed: {
            scale: 0.95,
            opacity: 0.8
          }
        };

      default:
        return baseVariants;
    }
  };

  // Magnetic mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Ripple effect
  const createRipple = (e: React.MouseEvent) => {
    if (!rippleEffect || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  // Sound effect (placeholder for actual sound implementation)
  const playSound = () => {
    if (!soundEffect) return;
    // In a real implementation, you would play a sound file here
    console.log('🔊 Button click sound');
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || loading) return;
    
    setIsPressed(true);
    setIsAnimating(true);
    createRipple(e);
    playSound();
    
    onClick?.();
    
    setTimeout(() => {
      setIsPressed(false);
      setIsAnimating(false);
    }, 150);
  };

  const morphVariants = getMorphVariants();

  return (
    <motion.button
      ref={buttonRef}
      className={`
        relative overflow-hidden font-semibold transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${currentSize.padding} ${currentSize.text}
        ${className}
      `}
      style={{
        x: springX,
        y: springY,
        height: currentSize.height
      }}
      variants={morphVariants}
      initial="initial"
      animate={
        loading ? 'loading' : 
        isPressed ? 'pressed' : 
        isHovered ? 'hover' : 
        'initial'
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: morphDuration }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit"
        style={{
          background: variant === 'liquid' 
            ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' 
            : `hsl(var(--primary) / ${glowIntensity})`,
          filter: 'blur(8px)',
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main button background */}
      <motion.div
        className="absolute inset-0 rounded-inherit"
        style={{
          background: variant === 'liquid' 
            ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' 
            : 'hsl(var(--primary))'
        }}
        animate={{
          opacity: isPressed ? 0.8 : 1
        }}
      />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0
          }}
          animate={{
            width: 300,
            height: 300,
            opacity: [0.5, 0]
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Button content */}
      <motion.div
        className="relative z-10 flex items-center justify-center gap-2"
        animate={{
          opacity: loading ? 0 : 1,
          y: loading ? 5 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Quantum particles effect for quantum variant */}
      {variant === 'quantum' && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 2) * 40}%`
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
          ))}
        </div>
      )}

      {/* Neural network effect for neural variant */}
      {variant === 'neural' && isHovered && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          viewBox="0 0 100 40"
        >
          <motion.line
            x1="20" y1="20" x2="80" y2="20"
            stroke="white"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.5 }}
          />
          <motion.line
            x1="30" y1="10" x2="70" y2="30"
            stroke="white"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 0.5 }}
          />
        </svg>
      )}
    </motion.button>
  );
};

// Preset button variants
export const LiquidButton = (props: Omit<MorphingButtonProps, 'variant'>) => (
  <MorphingButton variant="liquid" {...props} />
);

export const ElasticButton = (props: Omit<MorphingButtonProps, 'variant'>) => (
  <MorphingButton variant="elastic" {...props} />
);

export const MagneticButton = (props: Omit<MorphingButtonProps, 'variant'>) => (
  <MorphingButton variant="magnetic" {...props} />
);

export const QuantumButton = (props: Omit<MorphingButtonProps, 'variant'>) => (
  <MorphingButton variant="quantum" {...props} />
);

export const NeuralButton = (props: Omit<MorphingButtonProps, 'variant'>) => (
  <MorphingButton variant="neural" {...props} />
);

export default MorphingButton;