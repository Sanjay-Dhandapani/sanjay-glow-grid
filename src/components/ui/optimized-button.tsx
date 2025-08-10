import React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptimizedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  ariaLabel?: string;
  ariaLive?: 'off' | 'polite' | 'assertive';
  role?: string;
}

const OptimizedButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  ariaLabel,
  ariaLive,
  role = "button"
}: OptimizedButtonProps) => {
  
  // Base styles with consistent design
  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg";
  
  // Size variants
  const sizeStyles = {
    sm: "px-4 py-2 text-sm h-9",
    md: "px-6 py-3 text-base h-11",
    lg: "px-8 py-4 text-lg h-13"
  };
  
  // Variant styles - reduced glow effects for better visibility
  const variantStyles = {
    primary: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md hover:shadow-lg",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    ghost: "text-primary hover:bg-primary/10"
  };
  
  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";
  
  const combinedClassName = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    widthStyles,
    className
  );

  return (
    <motion.button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role={role}
      whileHover={{
        scale: disabled ? 1 : 1.02,
        y: disabled ? 0 : -1
      }}
      whileTap={{
        scale: disabled ? 1 : 0.98,
        y: disabled ? 0 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
    >
      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {/* Icon */}
      {icon && !loading && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
      
      {/* Content */}
      <span className={loading ? "opacity-70" : ""}>
        {children}
      </span>
      
      {/* Subtle hover effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white/10 opacity-0"
        whileHover={{ opacity: variant === 'primary' ? 0.1 : 0.05 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

// Preset button variants for common use cases
export const PrimaryButton = (props: Omit<OptimizedButtonProps, 'variant'>) => (
  <OptimizedButton variant="primary" {...props} />
);

export const SecondaryButton = (props: Omit<OptimizedButtonProps, 'variant'>) => (
  <OptimizedButton variant="secondary" {...props} />
);

export const OutlineButton = (props: Omit<OptimizedButtonProps, 'variant'>) => (
  <OptimizedButton variant="outline" {...props} />
);

export const GhostButton = (props: Omit<OptimizedButtonProps, 'variant'>) => (
  <OptimizedButton variant="ghost" {...props} />
);

export default OptimizedButton;