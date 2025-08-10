import React, { useEffect, useState, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  mass: number;
  lifespan: number;
  maxLifespan: number;
  type: 'circle' | 'square' | 'triangle' | 'star' | 'hexagon';
  glowIntensity: number;
  rotationSpeed: number;
  pulsePhase: number;
}

interface FloatingElementsProps {
  count?: number;
  className?: string;
  containerWidth?: number;
  containerHeight?: number;
  colors?: string[];
  physics?: {
    gravity?: number;
    friction?: number;
    bounce?: number;
    attraction?: number;
    repulsion?: number;
  };
  interactionMode?: 'none' | 'attract' | 'repel' | 'orbit' | 'magnetic';
  mouseIntensity?: number;
  spawnRate?: number;
  maxElements?: number;
  elementTypes?: FloatingElement['type'][];
  sizeRange?: [number, number];
  velocityRange?: [number, number];
  lifespanRange?: [number, number];
  enableCollisions?: boolean;
  enableTrails?: boolean;
  enableGlow?: boolean;
  enableParticleConnections?: boolean;
  connectionDistance?: number;
}

const FloatingElements = ({
  count = 15,
  className = '',
  containerWidth = 800,
  containerHeight = 600,
  colors = ['primary', 'secondary', 'accent', 'tertiary'],
  physics = {
    gravity: 0.01,
    friction: 0.98,
    bounce: 0.8,
    attraction: 0.02,
    repulsion: 0.05
  },
  interactionMode = 'attract',
  mouseIntensity = 0.5,
  spawnRate = 500,
  maxElements = 25,
  elementTypes = ['circle', 'square', 'triangle', 'star'],
  sizeRange = [8, 24],
  velocityRange = [-2, 2],
  lifespanRange = [5000, 15000],
  enableCollisions = true,
  enableTrails = false,
  enableGlow = true,
  enableParticleConnections = false,
  connectionDistance = 100
}: FloatingElementsProps) => {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Generate a random floating element
  const generateElement = (id: number, x?: number, y?: number): FloatingElement => {
    const [minSize, maxSize] = sizeRange;
    const [minVel, maxVel] = velocityRange;
    const [minLife, maxLife] = lifespanRange;
    const lifespan = minLife + Math.random() * (maxLife - minLife);

    return {
      id,
      x: x ?? Math.random() * containerWidth,
      y: y ?? Math.random() * containerHeight,
      vx: minVel + Math.random() * (maxVel - minVel),
      vy: minVel + Math.random() * (maxVel - minVel),
      size: minSize + Math.random() * (maxSize - minSize),
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.3 + Math.random() * 0.4,
      mass: 0.5 + Math.random() * 1.5,
      lifespan,
      maxLifespan: lifespan,
      type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
      glowIntensity: 0.2 + Math.random() * 0.3,
      rotationSpeed: (Math.random() - 0.5) * 2,
      pulsePhase: Math.random() * Math.PI * 2
    };
  };

  // Initialize elements
  useEffect(() => {
    const initialElements = Array.from({ length: count }, (_, i) => generateElement(i));
    setElements(initialElements);
  }, [count]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseEnter = () => setIsMouseInside(true);
    const handleMouseLeave = () => setIsMouseInside(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Physics simulation
  useEffect(() => {
    const animate = () => {
      setElements(prevElements => {
        return prevElements.map((element, index) => {
          let { x, y, vx, vy } = element;

          // Mouse interaction
          if (isMouseInside && interactionMode !== 'none') {
            const dx = mousePosition.x - x;
            const dy = mousePosition.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
              const force = mouseIntensity / (distance * distance + 1);
              const fx = (dx / distance) * force;
              const fy = (dy / distance) * force;

              switch (interactionMode) {
                case 'attract':
                  vx += fx * physics.attraction!;
                  vy += fy * physics.attraction!;
                  break;
                case 'repel':
                  vx -= fx * physics.repulsion!;
                  vy -= fy * physics.repulsion!;
                  break;
                case 'orbit':
                  const perpX = -dy / distance;
                  const perpY = dx / distance;
                  vx += perpX * force * 0.1 + fx * physics.attraction! * 0.3;
                  vy += perpY * force * 0.1 + fy * physics.attraction! * 0.3;
                  break;
                case 'magnetic':
                  if (distance < 100) {
                    vx += fx * physics.attraction!;
                    vy += fy * physics.attraction!;
                  } else if (distance < 200) {
                    vx -= fx * physics.repulsion! * 0.5;
                    vy -= fy * physics.repulsion! * 0.5;
                  }
                  break;
              }
            }
          }

          // Element-to-element interactions
          if (enableCollisions) {
            prevElements.forEach((other, otherIndex) => {
              if (index !== otherIndex) {
                const dx = other.x - x;
                const dy = other.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = (element.size + other.size) / 2;

                if (distance < minDistance && distance > 0) {
                  // Collision response
                  const nx = dx / distance;
                  const ny = dy / distance;
                  
                  // Separate elements
                  const overlap = minDistance - distance;
                  x -= nx * overlap * 0.5;
                  y -= ny * overlap * 0.5;
                  
                  // Elastic collision
                  const dvx = other.vx - vx;
                  const dvy = other.vy - vy;
                  const dvn = dvx * nx + dvy * ny;
                  
                  if (dvn > 0) {
                    const impulse = 2 * dvn / (element.mass + other.mass);
                    vx += impulse * other.mass * nx * physics.bounce!;
                    vy += impulse * other.mass * ny * physics.bounce!;
                  }
                }
              }
            });
          }

          // Gravity and environmental forces
          vy += physics.gravity!;
          
          // Apply friction
          vx *= physics.friction!;
          vy *= physics.friction!;

          // Update position
          x += vx;
          y += vy;

          // Boundary collisions
          if (x <= element.size / 2) {
            x = element.size / 2;
            vx *= -physics.bounce!;
          } else if (x >= containerWidth - element.size / 2) {
            x = containerWidth - element.size / 2;
            vx *= -physics.bounce!;
          }

          if (y <= element.size / 2) {
            y = element.size / 2;
            vy *= -physics.bounce!;
          } else if (y >= containerHeight - element.size / 2) {
            y = containerHeight - element.size / 2;
            vy *= -physics.bounce! * 0.8; // More energy loss on ground
          }

          // Update lifespan
          const newLifespan = element.lifespan - 16; // Assume 60fps
          const lifespanRatio = newLifespan / element.maxLifespan;
          const opacity = element.opacity * lifespanRatio;

          return {
            ...element,
            x,
            y,
            vx,
            vy,
            opacity: Math.max(0, opacity),
            lifespan: newLifespan,
            pulsePhase: element.pulsePhase + 0.05
          };
        }).filter(element => element.lifespan > 0);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, isMouseInside, interactionMode, physics, containerWidth, containerHeight]);

  // Spawn new elements periodically
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      setElements(prev => {
        if (prev.length < maxElements) {
          const newElement = generateElement(Date.now());
          return [...prev, newElement];
        }
        return prev;
      });
    }, spawnRate);

    return () => clearInterval(spawnInterval);
  }, [maxElements, spawnRate]);

  // Render different element shapes
  const renderElement = (element: FloatingElement) => {
    const pulseScale = 1 + Math.sin(element.pulsePhase) * 0.1;
    const rotation = element.rotationSpeed * (Date.now() / 1000);

    const shapeProps = {
      width: element.size * pulseScale,
      height: element.size * pulseScale,
      style: {
        backgroundColor: `hsl(var(--${element.color}))`,
        opacity: element.opacity,
        filter: enableGlow ? `blur(0.5px) drop-shadow(0 0 ${element.glowIntensity * 10}px hsl(var(--${element.color})))` : undefined,
        transform: `rotate(${rotation}rad)`
      }
    };

    switch (element.type) {
      case 'circle':
        return <div className="rounded-full" {...shapeProps} />;
      case 'square':
        return <div className="rounded-sm" {...shapeProps} />;
      case 'triangle':
        return (
          <div 
            className="relative"
            style={{ 
              width: element.size * pulseScale, 
              height: element.size * pulseScale,
              transform: `rotate(${rotation}rad)`
            }}
          >
            <div
              className="absolute"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${element.size * pulseScale / 2}px solid transparent`,
                borderRight: `${element.size * pulseScale / 2}px solid transparent`,
                borderBottom: `${element.size * pulseScale}px solid hsl(var(--${element.color}))`,
                opacity: element.opacity,
                filter: enableGlow ? `drop-shadow(0 0 ${element.glowIntensity * 10}px hsl(var(--${element.color})))` : undefined
              }}
            />
          </div>
        );
      case 'star':
        return (
          <div 
            className="relative"
            style={{ 
              width: element.size * pulseScale, 
              height: element.size * pulseScale 
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              style={{
                fill: `hsl(var(--${element.color}))`,
                opacity: element.opacity,
                filter: enableGlow ? `drop-shadow(0 0 ${element.glowIntensity * 10}px hsl(var(--${element.color})))` : undefined,
                transform: `rotate(${rotation}rad)`
              }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        );
      case 'hexagon':
        return (
          <div 
            className="relative"
            style={{ 
              width: element.size * pulseScale, 
              height: element.size * pulseScale 
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              style={{
                fill: `hsl(var(--${element.color}))`,
                opacity: element.opacity,
                filter: enableGlow ? `drop-shadow(0 0 ${element.glowIntensity * 10}px hsl(var(--${element.color})))` : undefined,
                transform: `rotate(${rotation}rad)`
              }}
            >
              <path d="M17.5 3.5L22 12l-4.5 8.5h-11L2 12l4.5-8.5h11z" />
            </svg>
          </div>
        );
      default:
        return <div className="rounded-full" {...shapeProps} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight
      }}
    >
      {/* Particle connections */}
      {enableParticleConnections && (
        <svg className="absolute inset-0 pointer-events-none">
          {elements.map((element, i) =>
            elements.slice(i + 1).map((other, j) => {
              const distance = Math.sqrt(
                Math.pow(element.x - other.x, 2) + Math.pow(element.y - other.y, 2)
              );
              
              if (distance < connectionDistance) {
                const opacity = (connectionDistance - distance) / connectionDistance * 0.3;
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={element.x}
                    y1={element.y}
                    x2={other.x}
                    y2={other.y}
                    stroke={`hsl(var(--${element.color}))`}
                    strokeWidth="1"
                    opacity={opacity}
                    strokeDasharray="2,2"
                  />
                );
              }
              return null;
            })
          )}
        </svg>
      )}

      {/* Floating elements */}
      <AnimatePresence>
        {elements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute pointer-events-none"
            style={{
              left: element.x - element.size / 2,
              top: element.y - element.size / 2,
              zIndex: Math.floor(element.size)
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: element.opacity }}
            exit={{ 
              scale: 0, 
              opacity: 0,
              transition: { duration: 0.5 }
            }}
            transition={{ duration: 0.3 }}
          >
            {renderElement(element)}
            
            {/* Trail effect */}
            {enableTrails && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, hsl(var(--${element.color})) 0%, transparent 70%)`,
                  opacity: element.opacity * 0.3,
                  filter: 'blur(2px)'
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [element.opacity * 0.3, 0, element.opacity * 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Debug info (optional) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 text-xs text-muted-foreground bg-background/80 p-2 rounded">
          Elements: {elements.length} | Mouse: {isMouseInside ? 'Inside' : 'Outside'}
        </div>
      )}
    </div>
  );
};

export default FloatingElements;