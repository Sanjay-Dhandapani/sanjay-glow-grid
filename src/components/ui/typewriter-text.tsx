import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = '',
  delay = 0,
  speed = 0.03,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isComplete, setIsComplete] = useState(false);

  const characters = text.split('');

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, delay + (characters.length * speed * 1000) + 500);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, delay, characters.length, speed]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: speed,
        when: "beforeChildren",
      },
    },
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween" as const,
        duration: 0.1,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={childVariants}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      
      {/* Blinking cursor */}
      <motion.span
        className="inline-block w-0.5 h-6 bg-primary ml-1 rounded-sm"
        animate={{
          opacity: isComplete ? [1, 0] : [1, 1, 0, 0],
        }}
        transition={{
          duration: isComplete ? 0.8 : 1.2,
          repeat: Infinity,
          repeatType: "loop",
          delay: delay + (characters.length * speed),
        }}
      />
    </motion.div>
  );
};

export default TypewriterText;
