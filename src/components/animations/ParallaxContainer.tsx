import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: number;
  rotate?: number;
  opacity?: number;
  blur?: number;
  className?: string;
  offset?: number;
}

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
  height?: string | number;
  enableMouseParallax?: boolean;
  mouseIntensity?: number;
  enableGyroscope?: boolean;
  gyroscopeIntensity?: number;
}

// Individual parallax layer component
export const ParallaxLayer = ({
  children,
  speed = 0.5,
  direction = 'up',
  scale = 1,
  rotate = 0,
  opacity = 1,
  blur = 0,
  className = '',
  offset = 0
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to movement values
  const getTransformRange = () => {
    const baseRange = [-100, 100];
    const adjustedRange = baseRange.map(value => value * speed);
    
    switch (direction) {
      case 'down':
        return adjustedRange.reverse();
      case 'left':
        return adjustedRange;
      case 'right':
        return adjustedRange.reverse();
      case 'up':
      default:
        return adjustedRange;
    }
  };

  const transformRange = getTransformRange();
  
  const y = useTransform(scrollYProgress, [0, 1], 
    direction === 'up' || direction === 'down' ? transformRange : [0, 0]
  );
  const x = useTransform(scrollYProgress, [0, 1], 
    direction === 'left' || direction === 'right' ? transformRange : [0, 0]
  );
  
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [scale, scale * 1.1]);
  const rotateTransform = useTransform(scrollYProgress, [0, 1], [rotate, rotate + 10]);
  const opacityTransform = useTransform(scrollYProgress, [0, 1], [opacity * 0.8, opacity]);
  const blurTransform = useTransform(scrollYProgress, [0, 1], [blur, blur + 2]);

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 ${className}`}
      style={{
        x,
        y,
        scale: scaleTransform,
        rotate: rotateTransform,
        opacity: opacityTransform,
        filter: blur > 0 ? useTransform(blurTransform, (value) => `blur(${value}px)`) : undefined,
        transform: `translateZ(${offset}px)`
      }}
    >
      {children}
    </motion.div>
  );
};

// Mouse parallax hook
const useMouseParallax = (intensity: number = 0.1) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const smoothMouseX = useSpring(0, { stiffness: 200, damping: 30 });
  const smoothMouseY = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * intensity;
      const y = (e.clientY - window.innerHeight / 2) * intensity;
      
      smoothMouseX.set(x);
      smoothMouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity, smoothMouseX, smoothMouseY]);

  return { mousePosition, smoothMouseX, smoothMouseY };
};

// Gyroscope parallax hook for mobile devices
const useGyroscopeParallax = (intensity: number = 0.1) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const smoothTiltX = useSpring(0, { stiffness: 150, damping: 25 });
  const smoothTiltY = useSpring(0, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = e.gamma * intensity; // Left-right tilt
        const y = e.beta * intensity; // Front-back tilt
        
        smoothTiltX.set(x);
        smoothTiltY.set(y);
        setTilt({ x, y });
      }
    };

    // Request permission for iOS devices
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        });
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [intensity, smoothTiltX, smoothTiltY]);

  return { tilt, smoothTiltX, smoothTiltY };
};

// Main parallax container
const ParallaxContainer = ({
  children,
  className = '',
  height = '100vh',
  enableMouseParallax = false,
  mouseIntensity = 0.1,
  enableGyroscope = false,
  gyroscopeIntensity = 0.1
}: ParallaxContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { mousePosition, smoothMouseX, smoothMouseY } = useMouseParallax(
    enableMouseParallax ? mouseIntensity : 0
  );
  
  const { tilt, smoothTiltX, smoothTiltY } = useGyroscopeParallax(
    enableGyroscope ? gyroscopeIntensity : 0
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        height: typeof height === 'string' ? height : `${height}px`,
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          x: enableMouseParallax ? smoothMouseX : 0,
          y: enableMouseParallax ? smoothMouseY : 0,
          rotateX: enableGyroscope ? smoothTiltY : 0,
          rotateY: enableGyroscope ? smoothTiltX : 0,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Preset parallax configurations
export const ParallaxBackground = ({ children, ...props }: Omit<ParallaxLayerProps, 'speed'> & { children?: ReactNode }) => (
  <ParallaxLayer speed={0.2} {...props}>
    {children || <div className="absolute inset-0" />}
  </ParallaxLayer>
);

export const ParallaxMidground = ({ children, ...props }: Omit<ParallaxLayerProps, 'speed'> & { children?: ReactNode }) => (
  <ParallaxLayer speed={0.5} {...props}>
    {children || <div className="absolute inset-0" />}
  </ParallaxLayer>
);

export const ParallaxForeground = ({ children, ...props }: Omit<ParallaxLayerProps, 'speed'> & { children?: ReactNode }) => (
  <ParallaxLayer speed={0.8} {...props}>
    {children || <div className="absolute inset-0" />}
  </ParallaxLayer>
);

// Specialized parallax effects
export const FloatingElements = ({ 
  count = 5, 
  className = '',
  size = 20,
  colors = ['primary', 'secondary', 'accent'],
  speed = 0.3
}: {
  count?: number;
  className?: string;
  size?: number;
  colors?: string[];
  speed?: number;
}) => {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    scale: 0.5 + Math.random() * 0.5
  }));

  return (
    <ParallaxLayer speed={speed} className={className}>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute rounded-full opacity-20`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: size * element.scale,
            height: size * element.scale,
            backgroundColor: `hsl(var(--${element.color}))`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [element.scale, element.scale * 1.2, element.scale],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </ParallaxLayer>
  );
};

export const ParallaxText = ({ 
  text, 
  speed = 0.3,
  className = '',
  ...props 
}: Omit<ParallaxLayerProps, 'children'> & { text: string }) => (
  <ParallaxLayer speed={speed} className={className} {...props}>
    <div className="flex items-center justify-center h-full">
      <motion.h2 
        className="text-6xl md:text-8xl font-bold opacity-5 select-none pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
      </motion.h2>
    </div>
  </ParallaxLayer>
);

// Advanced parallax scene composer
export const ParallaxScene = ({ 
  children, 
  ...containerProps 
}: ParallaxContainerProps) => {
  return (
    <ParallaxContainer {...containerProps}>
      {/* Background gradient */}
      <ParallaxBackground className="bg-gradient-radial opacity-30"><div className="absolute inset-0" /></ParallaxBackground>
      
      {/* Floating particles */}
      <FloatingElements count={8} speed={0.2} size={15} />
      
      {/* Custom layers */}
      {children}
      
      {/* Foreground effects */}
      <ParallaxForeground className="pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
      </ParallaxForeground>
    </ParallaxContainer>
  );
};

// Performance-optimized parallax for heavy scenes
export const LazyParallaxContainer = ({
  children,
  ...props
}: ParallaxContainerProps) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isInView ? (
        <ParallaxContainer {...props}>
          {children}
        </ParallaxContainer>
      ) : (
        <div 
          className={props.className} 
          style={{ height: props.height || '100vh' }}
        >
          {/* Placeholder content */}
          <div className="flex items-center justify-center h-full opacity-20">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParallaxContainer;