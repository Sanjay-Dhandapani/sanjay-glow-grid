import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FadeInUpProps = {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
  once?: boolean;
};

/**
 * FadeInUp
 * Minimal React island for entrance animation using transform/opacity only.
 * Respects reduced motion preferences and global [data-motion] attributes.
 */
function FadeInUpBase({
  as: Tag = "div",
  delay = 0,
  duration = 0.6,
  className,
  children,
  once = true,
}: FadeInUpProps) {
  const reduced = useReducedMotion();

  // Also respect explicit global data-motion values
  const motionAttr = typeof document !== "undefined" ? document.documentElement.getAttribute("data-motion") : null;
  const disable = reduced || motionAttr === "off";
  const preferReduced = motionAttr === "reduced";

  if (disable) {
    return <Tag className={className}>{children}</Tag>;
  }

  const effectiveDuration = preferReduced ? Math.max(0.2, duration * 0.5) : duration;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ duration: effectiveDuration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export const FadeInUp = memo(FadeInUpBase);
export default FadeInUpBase;