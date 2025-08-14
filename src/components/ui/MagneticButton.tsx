import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({ 
  children, 
  className = '', 
  href, 
  onClick, 
  strength = 0.3 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const magnetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const magnet = magnetRef.current;
    
    if (!button || !magnet) return;

    const handleMouseEnter = () => {
      gsap.to(button, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(magnet, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(magnet, { x: deltaX, y: deltaY, duration: 0.3, ease: "power2.out" });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousemove', handleMouseMove);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength]);

  const baseClasses = `cursor-target relative inline-block transition-all duration-300 ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        ref={buttonRef as React.RefObject<HTMLAnchorElement>} 
        className={baseClasses}
      >
        <span ref={magnetRef as React.RefObject<HTMLSpanElement>} className="block">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button 
      ref={buttonRef as React.RefObject<HTMLButtonElement>} 
      onClick={onClick} 
      className={baseClasses}
    >
      <span ref={magnetRef as React.RefObject<HTMLSpanElement>} className="block">
        {children}
      </span>
    </button>
  );
}