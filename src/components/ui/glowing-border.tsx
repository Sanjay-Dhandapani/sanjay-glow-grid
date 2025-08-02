import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: string;
}

const GlowingBorder: React.FC<GlowingBorderProps> = ({
  children,
  className,
  glowColor = 'primary',
  borderRadius = '1rem',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn("relative group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ borderRadius }}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, hsl(var(--${glowColor})), hsl(var(--accent)), hsl(var(--${glowColor})))`,
          borderRadius,
          padding: '2px',
        }}
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 3,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
      >
        <div
          className="w-full h-full bg-background rounded-[inherit]"
          style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-${glowColor}/20`}
        style={{ borderRadius }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default GlowingBorder;
