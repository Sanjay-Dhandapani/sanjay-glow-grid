import React, { useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

interface GestureState {
  isGesturing: boolean;
  gestureType: 'none' | 'pan' | 'pinch' | 'swipe' | 'tap' | 'longPress' | 'rotate';
  startTime: number;
  startPosition: { x: number; y: number };
  currentPosition: { x: number; y: number };
  velocity: { x: number; y: number };
  distance: number;
  angle: number;
  scale: number;
  rotation: number;
  fingers: number;
}

interface GestureHandlerProps {
  children: ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinchIn?: (scale: number) => void;
  onPinchOut?: (scale: number) => void;
  onRotate?: (angle: number) => void;
  onTap?: (position: { x: number; y: number }) => void;
  onDoubleTap?: (position: { x: number; y: number }) => void;
  onLongPress?: (position: { x: number; y: number }) => void;
  onPanStart?: (info: PanInfo) => void;
  onPan?: (info: PanInfo) => void;
  onPanEnd?: (info: PanInfo) => void;
  swipeThreshold?: number;
  longPressDelay?: number;
  doubleTapDelay?: number;
  pinchThreshold?: number;
  rotationThreshold?: number;
  enableVisualFeedback?: boolean;
  enableHapticFeedback?: boolean;
  enableRippleEffect?: boolean;
  constrainToBounds?: boolean;
  elastic?: boolean;
  elasticStrength?: number;
}

const GestureHandler = ({
  children,
  className = '',
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinchIn,
  onPinchOut,
  onRotate,
  onTap,
  onDoubleTap,
  onLongPress,
  onPanStart,
  onPan,
  onPanEnd,
  swipeThreshold = 50,
  longPressDelay = 500,
  doubleTapDelay = 300,
  pinchThreshold = 0.1,
  rotationThreshold = 10,
  enableVisualFeedback = true,
  enableHapticFeedback = false,
  enableRippleEffect = true,
  constrainToBounds = false,
  elastic = true,
  elasticStrength = 0.2
}: GestureHandlerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gestureState, setGestureState] = useState<GestureState>({
    isGesturing: false,
    gestureType: 'none',
    startTime: 0,
    startPosition: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    distance: 0,
    angle: 0,
    scale: 1,
    rotation: 0,
    fingers: 0
  });

  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; intensity: number }[]>([]);
  const [lastTap, setLastTap] = useState<{ time: number; position: { x: number; y: number } } | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();

  // Motion values for smooth animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);

  // Spring animations for elastic effects
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });
  const springScale = useSpring(scale, { stiffness: 300, damping: 20 });
  const springRotate = useSpring(rotate, { stiffness: 250, damping: 18 });

  // Visual feedback transforms
  const shadowIntensity = useTransform(scale, [0.8, 1.2], [0, 0.5]);
  const glowIntensity = useTransform(scale, [0.9, 1.1], [0, 0.3]);

  // Haptic feedback
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!enableHapticFeedback) return;
    
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[type]);
    }
  };

  // Create ripple effect
  const createRipple = (x: number, y: number, intensity: number = 1) => {
    if (!enableRippleEffect) return;

    const newRipple = { id: Date.now(), x, y, intensity };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 800);
  };

  // Handle touch start
  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const position = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };

    setGestureState(prev => ({
      ...prev,
      isGesturing: true,
      startTime: Date.now(),
      startPosition: position,
      currentPosition: position,
      fingers: e.touches.length
    }));

    // Start long press timer
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress(position);
        triggerHaptic('heavy');
        createRipple(position.x, position.y, 1.5);
      }, longPressDelay);
    }

    triggerHaptic('light');
  };

  // Handle touch move
  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    
    if (!gestureState.isGesturing) return;

    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const position = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };

    const deltaX = position.x - gestureState.startPosition.x;
    const deltaY = position.y - gestureState.startPosition.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Clear long press timer on movement
    if (longPressTimer.current && distance > 10) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = undefined;
    }

    // Handle multi-touch gestures
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      // Pinch gesture
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      if (gestureState.gestureType === 'none' || gestureState.gestureType === 'pinch') {
        const initialDistance = gestureState.distance || currentDistance;
        const scaleChange = currentDistance / initialDistance;
        
        if (Math.abs(scaleChange - 1) > pinchThreshold) {
          setGestureState(prev => ({
            ...prev,
            gestureType: 'pinch',
            scale: scaleChange,
            distance: initialDistance
          }));

          scale.set(scaleChange);
          
          if (scaleChange > 1 && onPinchOut) {
            onPinchOut(scaleChange);
          } else if (scaleChange < 1 && onPinchIn) {
            onPinchIn(scaleChange);
          }
        }
      }

      // Rotation gesture
      const currentAngle = Math.atan2(
        touch2.clientY - touch1.clientY,
        touch2.clientX - touch1.clientX
      ) * (180 / Math.PI);
      
      if (gestureState.rotation !== 0) {
        const rotationDelta = currentAngle - gestureState.rotation;
        if (Math.abs(rotationDelta) > rotationThreshold && onRotate) {
          onRotate(rotationDelta);
          rotate.set(rotationDelta);
        }
      }
      
      setGestureState(prev => ({
        ...prev,
        rotation: currentAngle
      }));
    } else {
      // Single touch pan
      if (distance > 10) {
        setGestureState(prev => ({
          ...prev,
          gestureType: 'pan',
          currentPosition: position,
          distance,
          angle
        }));

        if (elastic) {
          x.set(deltaX * elasticStrength);
          y.set(deltaY * elasticStrength);
        }
      }
    }

    setGestureState(prev => ({
      ...prev,
      currentPosition: position,
      velocity: {
        x: position.x - prev.currentPosition.x,
        y: position.y - prev.currentPosition.y
      }
    }));
  };

  // Handle touch end
  const handleTouchEnd = (e: TouchEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = undefined;
    }

    const { gestureType, startPosition, currentPosition, velocity, distance, angle } = gestureState;
    const deltaX = currentPosition.x - startPosition.x;
    const deltaY = currentPosition.y - startPosition.y;
    const duration = Date.now() - gestureState.startTime;

    // Reset transforms with spring animation
    x.set(0);
    y.set(0);
    scale.set(1);
    rotate.set(0);

    // Detect swipe gestures
    if (gestureType === 'pan' && distance > swipeThreshold && duration < 500) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX > absY) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
          triggerHaptic('medium');
          createRipple(currentPosition.x, currentPosition.y, 1.2);
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
          triggerHaptic('medium');
          createRipple(currentPosition.x, currentPosition.y, 1.2);
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
          triggerHaptic('medium');
          createRipple(currentPosition.x, currentPosition.y, 1.2);
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
          triggerHaptic('medium');
          createRipple(currentPosition.x, currentPosition.y, 1.2);
        }
      }
    }

    // Detect tap gestures
    if (gestureType === 'none' || (gestureType === 'pan' && distance < 10)) {
      const now = Date.now();
      
      if (lastTap && 
          now - lastTap.time < doubleTapDelay && 
          Math.abs(currentPosition.x - lastTap.position.x) < 20 &&
          Math.abs(currentPosition.y - lastTap.position.y) < 20) {
        // Double tap
        if (onDoubleTap) {
          onDoubleTap(currentPosition);
          triggerHaptic('medium');
          createRipple(currentPosition.x, currentPosition.y, 1.5);
        }
        setLastTap(null);
      } else {
        // Single tap
        if (onTap) {
          onTap(currentPosition);
          triggerHaptic('light');
          createRipple(currentPosition.x, currentPosition.y);
        }
        setLastTap({ time: now, position: currentPosition });
      }
    }

    setGestureState({
      isGesturing: false,
      gestureType: 'none',
      startTime: 0,
      startPosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      distance: 0,
      angle: 0,
      scale: 1,
      rotation: 0,
      fingers: 0
    });
  };

  // Touch event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = { passive: false };

    container.addEventListener('touchstart', handleTouchStart, options);
    container.addEventListener('touchmove', handleTouchMove, options);
    container.addEventListener('touchend', handleTouchEnd, options);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gestureState]);

  // Mouse events for desktop testing
  const handlePanStart = (event: any, info: PanInfo) => {
    if (onPanStart) onPanStart(info);
    triggerHaptic('light');
  };

  const handlePan = (event: any, info: PanInfo) => {
    if (onPan) onPan(info);
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    if (onPanEnd) onPanEnd(info);
    
    // Detect swipes from pan info
    const { velocity, offset } = info;
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    
    if (speed > 500) { // Velocity threshold for swipe
      const absX = Math.abs(velocity.x);
      const absY = Math.abs(velocity.y);
      
      if (absX > absY) {
        if (velocity.x > 0 && onSwipeRight) onSwipeRight();
        else if (velocity.x < 0 && onSwipeLeft) onSwipeLeft();
      } else {
        if (velocity.y > 0 && onSwipeDown) onSwipeDown();
        else if (velocity.y < 0 && onSwipeUp) onSwipeUp();
      }
      triggerHaptic('medium');
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative touch-none select-none ${className}`}
      style={{
        x: elastic ? springX : 0,
        y: elastic ? springY : 0,
        scale: springScale,
        rotate: springRotate,
        filter: enableVisualFeedback ?
          useTransform([shadowIntensity, glowIntensity],
            ([shadow, glow]) => `drop-shadow(0 4px 20px hsl(var(--primary) / ${shadow})) brightness(${1 + (glow as number)})`
          ) : undefined
      }}
      drag={constrainToBounds ? false : true}
      dragElastic={elastic ? elasticStrength : 0}
      dragConstraints={constrainToBounds ? containerRef : undefined}
      onPanStart={handlePanStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      whileTap={enableVisualFeedback ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-primary/30 pointer-events-none"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: 50,
            height: 50
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ 
            scale: ripple.intensity * 4, 
            opacity: 0 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Gesture state indicator (development only) */}
      {process.env.NODE_ENV === 'development' && gestureState.isGesturing && (
        <div className="absolute top-2 right-2 bg-background/90 p-2 rounded text-xs text-foreground">
          <div>Type: {gestureState.gestureType}</div>
          <div>Fingers: {gestureState.fingers}</div>
          <div>Distance: {Math.round(gestureState.distance)}</div>
          <div>Angle: {Math.round(gestureState.angle)}°</div>
          {gestureState.scale !== 1 && <div>Scale: {gestureState.scale.toFixed(2)}</div>}
        </div>
      )}
    </motion.div>
  );
};

// Preset gesture handlers for common use cases
export const SwipeableCard = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  ...props 
}: Omit<GestureHandlerProps, 'children'> & { children: ReactNode }) => (
  <GestureHandler 
    onSwipeLeft={onSwipeLeft}
    onSwipeRight={onSwipeRight}
    swipeThreshold={100}
    elastic={true}
    enableVisualFeedback={true}
    {...props}
  >
    {children}
  </GestureHandler>
);

export const PinchZoomContainer = ({ 
  children, 
  onPinchIn, 
  onPinchOut, 
  ...props 
}: Omit<GestureHandlerProps, 'children'> & { children: ReactNode }) => (
  <GestureHandler 
    onPinchIn={onPinchIn}
    onPinchOut={onPinchOut}
    pinchThreshold={0.05}
    enableVisualFeedback={false}
    {...props}
  >
    {children}
  </GestureHandler>
);

export const InteractiveButton = ({ 
  children, 
  onTap, 
  onDoubleTap, 
  onLongPress, 
  ...props 
}: Omit<GestureHandlerProps, 'children'> & { children: ReactNode }) => (
  <GestureHandler 
    onTap={onTap}
    onDoubleTap={onDoubleTap}
    onLongPress={onLongPress}
    enableHapticFeedback={true}
    enableRippleEffect={true}
    enableVisualFeedback={true}
    {...props}
  >
    {children}
  </GestureHandler>
);

export default GestureHandler;