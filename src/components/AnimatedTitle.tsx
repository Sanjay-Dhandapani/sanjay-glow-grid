import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface TitleConfig {
  text: string;
  color: string;
  gradient: string;
  effect: 'slide' | 'morph' | 'glitch' | 'particle' | 'wave';
}

const titleConfigs: TitleConfig[] = [
  {
    text: 'Full-Stack Developer',
    color: 'hsl(var(--primary))',
    gradient: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
    effect: 'slide'
  },
  {
    text: 'Code Crafter',
    color: 'hsl(var(--accent))',
    gradient: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--tertiary)))',
    effect: 'morph'
  },
  {
    text: 'Digital Builder',
    color: 'hsl(var(--secondary))',
    gradient: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))',
    effect: 'glitch'
  },
  {
    text: 'Creative Technologist',
    color: 'hsl(var(--tertiary))',
    gradient: 'linear-gradient(135deg, hsl(var(--tertiary)), hsl(var(--accent)))',
    effect: 'wave'
  },
  {
    text: 'Innovation Engineer',
    color: 'hsl(var(--primary))',
    gradient: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
    effect: 'particle'
  }
];

const AnimatedTitle = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const controls = useAnimation();

  const currentTitle = titleConfigs[currentIndex];

  // Character split for advanced animations
  const characters = useMemo(() => {
    return currentTitle.text.split('').map((char, index) => ({
      char: char === ' ' ? '\u00A0' : char, // Non-breaking space
      index
    }));
  }, [currentTitle.text]);

  useEffect(() => {
    const interval = setInterval(async () => {
      setIsTransitioning(true);
      await controls.start("exit");
      setCurrentIndex((prev) => (prev + 1) % titleConfigs.length);
      await controls.start("enter");
      setIsTransitioning(false);
    }, 3500); // 3.5 seconds per title

    return () => clearInterval(interval);
  }, [controls]);

  // Enhanced animation variants for different effects
  const getVariants = (effect: TitleConfig['effect']) => {
    const baseVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    };

    switch (effect) {
      case 'slide':
        return {
          initial: {
            opacity: 0,
            y: 60,
            rotateX: 90,
            filter: 'blur(10px)'
          },
          animate: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              filter: { duration: 0.6 }
            }
          },
          exit: {
            opacity: 0,
            y: -60,
            rotateX: -90,
            filter: 'blur(10px)',
            transition: {
              duration: 0.6,
              ease: [0.55, 0.055, 0.675, 0.19]
            }
          }
        };

      case 'morph':
        return {
          initial: {
            opacity: 0,
            scale: 0.3,
            rotateY: 180,
            filter: 'blur(20px) hue-rotate(180deg)'
          },
          animate: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: 'blur(0px) hue-rotate(0deg)',
            transition: {
              duration: 1.2,
              ease: [0.68, -0.55, 0.265, 1.55],
              scale: { type: "spring", stiffness: 200, damping: 20 }
            }
          },
          exit: {
            opacity: 0,
            scale: 1.5,
            rotateY: -180,
            filter: 'blur(20px) hue-rotate(-180deg)',
            transition: {
              duration: 0.8,
              ease: [0.6, 0.01, 0.05, 0.95]
            }
          }
        };

      case 'glitch':
        return {
          initial: {
            opacity: 0,
            x: -100,
            skewX: 45,
            filter: 'blur(5px) contrast(200%)'
          },
          animate: {
            opacity: 1,
            x: 0,
            skewX: 0,
            filter: 'blur(0px) contrast(100%)',
            transition: {
              duration: 0.7,
              ease: "easeOut",
              x: { type: "spring", stiffness: 300, damping: 30 }
            }
          },
          exit: {
            opacity: 0,
            x: 100,
            skewX: -45,
            filter: 'blur(5px) contrast(200%)',
            transition: {
              duration: 0.5,
              ease: "easeIn"
            }
          }
        };

      case 'wave':
        return {
          initial: {
            opacity: 0,
            y: 40,
            scale: 0.8
          },
          animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          },
          exit: {
            opacity: 0,
            y: -40,
            scale: 1.2,
            transition: {
              duration: 0.6
            }
          }
        };

      case 'particle':
        return {
          initial: {
            opacity: 0,
            scale: 0,
            rotate: 180,
            filter: 'blur(15px) brightness(200%)'
          },
          animate: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: 'blur(0px) brightness(100%)',
            transition: {
              duration: 1,
              ease: [0.34, 1.56, 0.64, 1],
              scale: { type: "spring", stiffness: 200, damping: 15 }
            }
          },
          exit: {
            opacity: 0,
            scale: 0,
            rotate: -180,
            filter: 'blur(15px) brightness(200%)',
            transition: {
              duration: 0.7,
              ease: [0.6, 0.01, 0.05, 0.95]
            }
          }
        };

      default:
        return baseVariants;
    }
  };

  // Character-level animation variants for wave effect
  const characterVariants = {
    initial: {
      opacity: 0,
      y: 20,
      rotateX: -90
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }),
    hover: (index: number) => ({
      y: -5,
      scale: 1.1,
      color: currentTitle.color,
      transition: {
        delay: index * 0.02,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="relative h-20 flex items-center justify-center overflow-hidden perspective-1000">
      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          background: `radial-gradient(ellipse at center, ${currentTitle.color}20, transparent 70%)`
        }}
        transition={{ duration: 0.8 }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentIndex}-${currentTitle.effect}`}
          className="relative flex items-center justify-center"
          variants={getVariants(currentTitle.effect)}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {currentTitle.effect === 'wave' ? (
            // Character-by-character animation for wave effect
            <div className="flex">
              {characters.map(({ char, index }) => (
                <motion.span
                  key={`${currentIndex}-${index}`}
                  variants={characterVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  custom={index}
                  className="text-2xl md:text-3xl font-light inline-block cursor-default"
                  style={{
                    background: currentTitle.gradient,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 300
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          ) : (
            // Single element animation for other effects
            <motion.h2
              className="text-2xl md:text-3xl font-light whitespace-nowrap text-center"
              style={{
                background: currentTitle.gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 300
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              {currentTitle.text}
            </motion.h2>
          )}

          {/* Morphing Border Effect */}
          {currentTitle.effect === 'morph' && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                border: `1px solid ${currentTitle.color}40`,
                background: 'transparent'
              }}
              animate={{
                borderRadius: [
                  "12px",
                  "25px 12px 25px 12px",
                  "12px 25px 12px 25px",
                  "12px"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* Glitch Effect Overlay */}
          {currentTitle.effect === 'glitch' && !isTransitioning && (
            <>
              <motion.div
                className="absolute inset-0 text-2xl md:text-3xl font-light whitespace-nowrap text-center"
                style={{
                  color: 'hsl(var(--destructive))',
                  opacity: 0.3,
                  fontWeight: 300
                }}
                animate={{
                  x: [0, -2, 2, 0],
                  opacity: [0, 0.3, 0, 0.3, 0]
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                {currentTitle.text}
              </motion.div>
              <motion.div
                className="absolute inset-0 text-2xl md:text-3xl font-light whitespace-nowrap text-center"
                style={{
                  color: 'hsl(var(--secondary))',
                  opacity: 0.3,
                  fontWeight: 300
                }}
                animate={{
                  x: [0, 2, -2, 0],
                  opacity: [0, 0.3, 0, 0.3, 0]
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 0.1
                }}
              >
                {currentTitle.text}
              </motion.div>
            </>
          )}

          {/* Particle Effect */}
          {currentTitle.effect === 'particle' && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: currentTitle.color,
                    left: `${20 + (i * 10)}%`,
                    top: '50%'
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {titleConfigs.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: index === currentIndex ? currentTitle.color : 'hsl(var(--muted))'
            }}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
              opacity: index === currentIndex ? 1 : 0.5
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedTitle;