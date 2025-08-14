import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { initTheme } from '../../lib/theme';

interface ThemeContextValue {
  initialized: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({ initialized: false });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initTheme();
    setInitialized(true);
  }, []);

  return (
    <ThemeContext.Provider value={{ initialized }}>
      {children}
    </ThemeContext.Provider>
  );
}