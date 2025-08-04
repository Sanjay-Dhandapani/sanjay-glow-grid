import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimationConfig {
  reducedMotion: boolean;
  performanceMode: 'high' | 'medium' | 'low';
  enableParticles: boolean;
  enableParallax: boolean;
  enableComplexAnimations: boolean;
  frameRate: number;
  animationQuality: 'high' | 'medium' | 'low';
}

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage: number;
  animationCount: number;
  isThrottled: boolean;
}

interface AnimationOrchestratorContextType {
  config: AnimationConfig;
  metrics: PerformanceMetrics;
  updateConfig: (updates: Partial<AnimationConfig>) => void;
  registerAnimation: (id: string) => void;
  unregisterAnimation: (id: string) => void;
  shouldAnimate: (complexity: 'low' | 'medium' | 'high') => boolean;
  getOptimizedDuration: (baseDuration: number) => number;
  getOptimizedDelay: (baseDelay: number) => number;
}

const AnimationOrchestratorContext = createContext<AnimationOrchestratorContextType | null>(null);

export const useAnimationOrchestrator = () => {
  const context = useContext(AnimationOrchestratorContext);
  if (!context) {
    throw new Error('useAnimationOrchestrator must be used within AnimationOrchestratorProvider');
  }
  return context;
};

interface AnimationOrchestratorProviderProps {
  children: React.ReactNode;
}

export const AnimationOrchestratorProvider: React.FC<AnimationOrchestratorProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<AnimationConfig>(() => {
    // Check user preferences and device capabilities
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || (navigator as any).deviceMemory <= 4;
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    return {
      reducedMotion,
      performanceMode: isLowEndDevice ? 'low' : isMobile ? 'medium' : 'high',
      enableParticles: !isLowEndDevice && !reducedMotion,
      enableParallax: !isMobile && !reducedMotion,
      enableComplexAnimations: !isLowEndDevice && !reducedMotion,
      frameRate: isLowEndDevice ? 30 : 60,
      animationQuality: isLowEndDevice ? 'low' : isMobile ? 'medium' : 'high'
    };
  });

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    memoryUsage: 0,
    animationCount: 0,
    isThrottled: false
  });

  const activeAnimations = useRef<Set<string>>(new Set());
  const performanceObserver = useRef<PerformanceObserver | null>(null);
  const fpsCounter = useRef({ frames: 0, lastTime: performance.now() });

  // Performance monitoring
  useEffect(() => {
    let frameId: number;
    
    const measurePerformance = () => {
      const now = performance.now();
      fpsCounter.current.frames++;
      
      if (now - fpsCounter.current.lastTime >= 1000) {
        const fps = fpsCounter.current.frames;
        const frameTime = 1000 / fps;
        
        setMetrics(prev => ({
          ...prev,
          fps,
          frameTime,
          animationCount: activeAnimations.current.size,
          isThrottled: fps < config.frameRate * 0.8
        }));
        
        // Auto-adjust performance settings based on FPS
        if (fps < 30 && config.performanceMode !== 'low') {
          setConfig(prev => ({
            ...prev,
            performanceMode: 'low',
            enableParticles: false,
            enableComplexAnimations: false
          }));
        } else if (fps > 55 && config.performanceMode === 'low') {
          setConfig(prev => ({
            ...prev,
            performanceMode: 'medium',
            enableParticles: true
          }));
        }
        
        fpsCounter.current.frames = 0;
        fpsCounter.current.lastTime = now;
      }
      
      frameId = requestAnimationFrame(measurePerformance);
    };
    
    frameId = requestAnimationFrame(measurePerformance);
    
    // Memory usage monitoring
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        if (memory) {
          setMetrics(prev => ({
            ...prev,
            memoryUsage: memory.usedJSHeapSize / memory.jsHeapSizeLimit
          }));
        }
      };
      
      const memoryInterval = setInterval(checkMemory, 5000);
      return () => {
        cancelAnimationFrame(frameId);
        clearInterval(memoryInterval);
      };
    }
    
    return () => cancelAnimationFrame(frameId);
  }, [config.frameRate, config.performanceMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({
        ...prev,
        reducedMotion: e.matches,
        enableParticles: !e.matches && prev.performanceMode !== 'low',
        enableParallax: !e.matches && prev.performanceMode !== 'low',
        enableComplexAnimations: !e.matches && prev.performanceMode !== 'low'
      }));
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const updateConfig = useCallback((updates: Partial<AnimationConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const registerAnimation = useCallback((id: string) => {
    activeAnimations.current.add(id);
  }, []);

  const unregisterAnimation = useCallback((id: string) => {
    activeAnimations.current.delete(id);
  }, []);

  const shouldAnimate = useCallback((complexity: 'low' | 'medium' | 'high') => {
    if (config.reducedMotion) return false;
    
    switch (config.performanceMode) {
      case 'low':
        return complexity === 'low';
      case 'medium':
        return complexity !== 'high';
      case 'high':
        return true;
      default:
        return true;
    }
  }, [config.reducedMotion, config.performanceMode]);

  const getOptimizedDuration = useCallback((baseDuration: number) => {
    if (config.reducedMotion) return 0;
    
    switch (config.performanceMode) {
      case 'low':
        return baseDuration * 0.5;
      case 'medium':
        return baseDuration * 0.75;
      case 'high':
        return baseDuration;
      default:
        return baseDuration;
    }
  }, [config.reducedMotion, config.performanceMode]);

  const getOptimizedDelay = useCallback((baseDelay: number) => {
    if (config.reducedMotion) return 0;
    
    switch (config.performanceMode) {
      case 'low':
        return baseDelay * 0.3;
      case 'medium':
        return baseDelay * 0.6;
      case 'high':
        return baseDelay;
      default:
        return baseDelay;
    }
  }, [config.reducedMotion, config.performanceMode]);

  const contextValue: AnimationOrchestratorContextType = {
    config,
    metrics,
    updateConfig,
    registerAnimation,
    unregisterAnimation,
    shouldAnimate,
    getOptimizedDuration,
    getOptimizedDelay
  };

  return (
    <AnimationOrchestratorContext.Provider value={contextValue}>
      {children}
      
      {/* Performance Debug Panel (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-4 text-xs font-mono">
          <div className="space-y-1">
            <div className="font-semibold text-primary">Performance Metrics</div>
            <div>FPS: {metrics.fps.toFixed(1)}</div>
            <div>Frame Time: {metrics.frameTime.toFixed(2)}ms</div>
            <div>Animations: {metrics.animationCount}</div>
            <div>Mode: {config.performanceMode}</div>
            <div>Memory: {(metrics.memoryUsage * 100).toFixed(1)}%</div>
            {metrics.isThrottled && <div className="text-red-500">⚠ Throttled</div>}
            {config.reducedMotion && <div className="text-yellow-500">🔇 Reduced Motion</div>}
          </div>
        </div>
      )}
    </AnimationOrchestratorContext.Provider>
  );
};

// High-performance animation hook with automatic optimization
export const useOptimizedAnimation = (
  animationId: string,
  complexity: 'low' | 'medium' | 'high' = 'medium'
) => {
  const { registerAnimation, unregisterAnimation, shouldAnimate, getOptimizedDuration, getOptimizedDelay } = useAnimationOrchestrator();
  
  useEffect(() => {
    registerAnimation(animationId);
    return () => unregisterAnimation(animationId);
  }, [animationId, registerAnimation, unregisterAnimation]);
  
  return {
    shouldAnimate: shouldAnimate(complexity),
    getDuration: getOptimizedDuration,
    getDelay: getOptimizedDelay
  };
};

// Optimized intersection observer hook
export const useOptimizedInView = (options?: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}) => {
  const { config } = useAnimationOrchestrator();
  const ref = useRef(null);
  
  const isInView = useInView(ref, {
    once: options?.triggerOnce ?? true,
    amount: options?.threshold ?? (config.performanceMode === 'low' ? 0.1 : 0.2),
    margin: options?.rootMargin ?? (config.performanceMode === 'low' ? '50px' : '100px') as any
  });
  
  return { ref, isInView: config.reducedMotion ? true : isInView };
};

export default AnimationOrchestratorProvider;