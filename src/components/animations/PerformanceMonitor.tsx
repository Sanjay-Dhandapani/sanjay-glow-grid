import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, AlertTriangle, CheckCircle, Settings } from 'lucide-react';

interface PerformanceData {
  fps: number;
  frameTime: number;
  memoryUsage: number;
  renderTime: number;
  paintTime: number;
  layoutTime: number;
  scriptTime: number;
  isGpuAccelerated: boolean;
  devicePixelRatio: number;
  viewportSize: { width: number; height: number };
  connectionSpeed: string;
  batteryLevel?: number;
  batteryCharging?: boolean;
}

interface PerformanceMonitorProps {
  showDebugPanel?: boolean;
  autoOptimize?: boolean;
  onPerformanceChange?: (data: PerformanceData) => void;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showDebugPanel = false,
  autoOptimize = true,
  onPerformanceChange
}) => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    fps: 60,
    frameTime: 16.67,
    memoryUsage: 0,
    renderTime: 0,
    paintTime: 0,
    layoutTime: 0,
    scriptTime: 0,
    isGpuAccelerated: false,
    devicePixelRatio: window.devicePixelRatio || 1,
    viewportSize: { width: window.innerWidth, height: window.innerHeight },
    connectionSpeed: 'unknown'
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [performanceScore, setPerformanceScore] = useState(100);
  const frameTimeRef = useRef<number[]>([]);
  const lastFrameTime = useRef(performance.now());
  const animationFrameId = useRef<number>();

  // Performance measurement
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measurePerformance = (currentTime: number) => {
      frameCount++;
      const frameTime = currentTime - lastFrameTime.current;
      lastFrameTime.current = currentTime;

      // Collect frame times for FPS calculation
      frameTimeRef.current.push(frameTime);
      if (frameTimeRef.current.length > 60) {
        frameTimeRef.current.shift();
      }

      // Calculate FPS every second
      if (currentTime - lastTime >= 1000) {
        const avgFrameTime = frameTimeRef.current.reduce((a, b) => a + b, 0) / frameTimeRef.current.length;
        const fps = Math.round(1000 / avgFrameTime);

        // Get memory information if available
        let memoryUsage = 0;
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        }

        // Get paint and layout timings
        const paintEntries = performance.getEntriesByType('paint');
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        
        let renderTime = 0;
        let paintTime = 0;
        let layoutTime = 0;
        let scriptTime = 0;

        if (paintEntries.length > 0) {
          paintTime = paintEntries[paintEntries.length - 1].startTime;
        }

        if (navigationEntries.length > 0) {
          const nav = navigationEntries[0];
          renderTime = nav.loadEventEnd - nav.fetchStart;
          layoutTime = nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart;
          scriptTime = nav.domComplete - nav.domContentLoadedEventStart;
        }

        // Check GPU acceleration
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const isGpuAccelerated = !!gl;

        // Get connection information
        let connectionSpeed = 'unknown';
        if ('connection' in navigator) {
          const connection = (navigator as any).connection;
          connectionSpeed = connection.effectiveType || connection.type || 'unknown';
        }

        // Get battery information if available
        let batteryLevel: number | undefined;
        let batteryCharging: boolean | undefined;
        if ('getBattery' in navigator) {
          (navigator as any).getBattery().then((battery: any) => {
            batteryLevel = battery.level;
            batteryCharging = battery.charging;
          }).catch(() => {
            // Battery API not available
          });
        }

        const newData: PerformanceData = {
          fps,
          frameTime: avgFrameTime,
          memoryUsage,
          renderTime,
          paintTime,
          layoutTime,
          scriptTime,
          isGpuAccelerated,
          devicePixelRatio: window.devicePixelRatio || 1,
          viewportSize: { width: window.innerWidth, height: window.innerHeight },
          connectionSpeed,
          batteryLevel,
          batteryCharging
        };

        setPerformanceData(newData);
        
        // Calculate performance score
        let score = 100;
        if (fps < 30) score -= 40;
        else if (fps < 45) score -= 20;
        else if (fps < 55) score -= 10;
        
        if (memoryUsage > 0.8) score -= 20;
        else if (memoryUsage > 0.6) score -= 10;
        
        if (avgFrameTime > 50) score -= 20;
        else if (avgFrameTime > 25) score -= 10;
        
        if (!isGpuAccelerated) score -= 15;
        
        setPerformanceScore(Math.max(0, score));
        
        // Trigger callback
        if (onPerformanceChange) {
          onPerformanceChange(newData);
        }

        lastTime = currentTime;
        frameCount = 0;
      }

      animationFrameId.current = requestAnimationFrame(measurePerformance);
    };

    animationFrameId.current = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [onPerformanceChange]);

  // Auto-optimization based on performance
  useEffect(() => {
    if (!autoOptimize) return;

    const handleOptimization = () => {
      if (performanceData.fps < 30 || performanceData.memoryUsage > 0.8) {
        // Trigger performance optimization
        document.documentElement.style.setProperty('--animation-duration-multiplier', '0.5');
        document.documentElement.style.setProperty('--particle-count-multiplier', '0.3');
        document.documentElement.classList.add('performance-mode');
      } else if (performanceData.fps > 55 && performanceData.memoryUsage < 0.5) {
        // Restore full performance
        document.documentElement.style.removeProperty('--animation-duration-multiplier');
        document.documentElement.style.removeProperty('--particle-count-multiplier');
        document.documentElement.classList.remove('performance-mode');
      }
    };

    const timeoutId = setTimeout(handleOptimization, 1000);
    return () => clearTimeout(timeoutId);
  }, [autoOptimize, performanceData.fps, performanceData.memoryUsage]);

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return AlertTriangle;
    return AlertTriangle;
  };

  if (!showDebugPanel) return null;

  const PerformanceIcon = getPerformanceIcon(performanceScore);

  return (
    <div className="fixed bottom-4 left-4 z-50 font-mono text-xs">
      <motion.div
        className="bg-background/95 backdrop-blur-sm border border-border rounded-lg overflow-hidden"
        initial={{ width: 60, height: 60 }}
        animate={{ 
          width: isExpanded ? 320 : 60, 
          height: isExpanded ? 'auto' : 60 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Compact View */}
        <motion.button
          className="w-full h-15 flex items-center justify-center p-3 hover:bg-muted/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Settings className="w-4 h-4" />
            </motion.div>
            {!isExpanded && (
              <div className={`text-lg font-bold ${getPerformanceColor(performanceScore)}`}>
                {performanceScore}
              </div>
            )}
          </div>
        </motion.button>

        {/* Expanded View */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 border-t border-border"
            >
              <div className="space-y-3">
                {/* Performance Score */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Performance Score</span>
                  <div className="flex items-center gap-2">
                    <PerformanceIcon className={`w-4 h-4 ${getPerformanceColor(performanceScore)}`} />
                    <span className={`font-bold ${getPerformanceColor(performanceScore)}`}>
                      {performanceScore}
                    </span>
                  </div>
                </div>

                {/* FPS */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">FPS</span>
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3" />
                    <span className={performanceData.fps < 30 ? 'text-red-500' : 'text-green-500'}>
                      {performanceData.fps}
                    </span>
                  </div>
                </div>

                {/* Frame Time */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Frame Time</span>
                  <span className={performanceData.frameTime > 25 ? 'text-red-500' : 'text-green-500'}>
                    {performanceData.frameTime.toFixed(1)}ms
                  </span>
                </div>

                {/* Memory Usage */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Memory</span>
                  <span className={performanceData.memoryUsage > 0.7 ? 'text-red-500' : 'text-green-500'}>
                    {(performanceData.memoryUsage * 100).toFixed(1)}%
                  </span>
                </div>

                {/* GPU Acceleration */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">GPU</span>
                  <div className="flex items-center gap-2">
                    <Zap className={`w-3 h-3 ${performanceData.isGpuAccelerated ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={performanceData.isGpuAccelerated ? 'text-green-500' : 'text-red-500'}>
                      {performanceData.isGpuAccelerated ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                {/* Connection Speed */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Connection</span>
                  <span className="text-primary capitalize">
                    {performanceData.connectionSpeed}
                  </span>
                </div>

                {/* Device Info */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Viewport</span>
                  <span className="text-primary">
                    {performanceData.viewportSize.width}x{performanceData.viewportSize.height}
                  </span>
                </div>

                {/* Battery (if available) */}
                {performanceData.batteryLevel !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Battery</span>
                    <span className={`${performanceData.batteryLevel < 0.2 ? 'text-red-500' : 'text-green-500'}`}>
                      {(performanceData.batteryLevel * 100).toFixed(0)}%
                      {performanceData.batteryCharging && ' ⚡'}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PerformanceMonitor;