import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  rotationIntensity?: number;
  levitationHeight?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className,
  rotationIntensity = 10,
  levitationHeight = 10,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotX = ((e.clientY - centerY) / rect.height) * rotationIntensity;
    const rotY = ((centerX - e.clientX) / rect.width) * rotationIntensity;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative cursor-pointer transition-all duration-300",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        y: isHovered ? -levitationHeight : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      whileHover={{
        scale: 1.02,
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-xl opacity-0 rounded-2xl"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shadow */}
      <motion.div
        className="absolute inset-0 bg-black/20 blur-2xl rounded-2xl"
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
          y: isHovered ? levitationHeight : 5,
          scale: isHovered ? 0.95 : 0.9,
        }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: -1 }}
      />
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default FloatingCard;
