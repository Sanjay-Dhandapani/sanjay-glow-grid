import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { initTheme, setTheme, getTheme, type Theme } from '@/lib/theme';

export default function PremiumThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initTheme();
    setCurrentTheme(getTheme());
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'system'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    setCurrentTheme(nextTheme);
  };

  const getIcon = () => {
    switch (currentTheme) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'system':
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="cursor-target relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-accent transition-all duration-200 group"
      aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : currentTheme === 'light' ? 'system' : 'dark'} theme`}
    >
      <div className="relative">
        {getIcon()}
      </div>
    </button>
  );
}