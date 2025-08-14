import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { initMotion } from '../../lib/motion';

interface MotionContextValue {
  initialized: boolean;
}

const MotionContext = createContext<MotionContextValue>({ initialized: false });

export function useMotion() {
  return useContext(MotionContext);
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initMotion();
    setInitialized(true);
  }, []);

  return (
    <MotionContext.Provider value={{ initialized }}>
      {children}
    </MotionContext.Provider>
  );
}