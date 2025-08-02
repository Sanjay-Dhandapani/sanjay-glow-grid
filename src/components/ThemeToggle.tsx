import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-2 rounded-lg bg-card hover:bg-card-hover border border-border transition-colors duration-300"
      data-cursor-hover
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <motion.div
        className="relative w-6 h-6"
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          <Moon className="w-6 h-6 text-primary" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Sun className="w-6 h-6 text-accent" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;