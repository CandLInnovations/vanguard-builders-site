import { useState, useEffect, useRef, useCallback } from 'react';

export interface BehaviorMetrics {
  mouseMovements: number;
  scrollEvents: number;
  clickEvents: number;
  keyboardEvents: number;
  focusEvents: number;
  timeSpent: number;
  startTime: number;
  humanScore: number;
}

export function useBehaviorTracking() {
  const [metrics, setMetrics] = useState<BehaviorMetrics>({
    mouseMovements: 0,
    scrollEvents: 0,
    clickEvents: 0,
    keyboardEvents: 0,
    focusEvents: 0,
    timeSpent: 0,
    startTime: 0, // Will be set in useEffect to avoid hydration issues
    humanScore: 0
  });
  
  // Initialize start time after hydration to avoid SSR mismatch
  useEffect(() => {
    setMetrics(prev => ({
      ...prev,
      startTime: Date.now()
    }));
  }, []);

  const metricsRef = useRef(metrics);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const lastScrollPosRef = useRef(0);
  const scoreIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    metricsRef.current = metrics;
  }, [metrics]);

  const updateMetrics = useCallback((updates: Partial<BehaviorMetrics>) => {
    setMetrics(prev => {
      const newMetrics = { ...prev, ...updates };
      newMetrics.timeSpent = Date.now() - newMetrics.startTime;
      return newMetrics;
    });
  }, []);

  const calculateHumanScore = useCallback(() => {
    const current = metricsRef.current;
    const timeInSeconds = current.timeSpent / 1000;
    
    if (timeInSeconds < 5) return 0; // Not enough time to calculate
    
    let score = 0;
    
    // Mouse movement patterns (30 points max)
    const mouseMovementRate = current.mouseMovements / timeInSeconds;
    if (mouseMovementRate > 0.5 && mouseMovementRate < 50) {
      score += Math.min(30, mouseMovementRate * 2);
    }
    
    // Scroll behavior (25 points max)
    const scrollRate = current.scrollEvents / timeInSeconds;
    if (scrollRate > 0.1 && scrollRate < 10) {
      score += Math.min(25, scrollRate * 5);
    }
    
    // Click patterns (20 points max)
    const clickRate = current.clickEvents / timeInSeconds;
    if (clickRate > 0.01 && clickRate < 5) {
      score += Math.min(20, clickRate * 10);
    }
    
    // Keyboard events (15 points max) 
    if (current.keyboardEvents > 0) {
      score += Math.min(15, current.keyboardEvents * 2);
    }
    
    // Focus events (10 points max)
    if (current.focusEvents > 0) {
      score += Math.min(10, current.focusEvents * 3);
    }
    
    return Math.min(100, Math.max(0, score));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastMousePosRef.current.x, 2) +
        Math.pow(e.clientY - lastMousePosRef.current.y, 2)
      );
      
      if (distance > 5) { // Only count significant movements
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
        updateMetrics({ 
          mouseMovements: metricsRef.current.mouseMovements + 1 
        });
      }
    };

    const handleScroll = () => {
      const scrollDistance = Math.abs(window.scrollY - lastScrollPosRef.current);
      if (scrollDistance > 10) { // Only count significant scrolls
        lastScrollPosRef.current = window.scrollY;
        updateMetrics({ 
          scrollEvents: metricsRef.current.scrollEvents + 1 
        });
      }
    };

    const handleClick = () => {
      updateMetrics({ 
        clickEvents: metricsRef.current.clickEvents + 1 
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only count actual key presses, not programmatic events
      if (e.isTrusted) {
        updateMetrics({ 
          keyboardEvents: metricsRef.current.keyboardEvents + 1 
        });
      }
    };

    const handleFocus = () => {
      updateMetrics({ 
        focusEvents: metricsRef.current.focusEvents + 1 
      });
    };

    // Attach event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('keydown', handleKeyDown, { passive: true });
    document.addEventListener('focusin', handleFocus, { passive: true });

    // Calculate score periodically
    scoreIntervalRef.current = setInterval(() => {
      const humanScore = calculateHumanScore();
      updateMetrics({ humanScore });
    }, 2000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocus);
      if (scoreIntervalRef.current) {
        clearInterval(scoreIntervalRef.current);
      }
    };
  }, [updateMetrics, calculateHumanScore]);

  return {
    metrics,
    isHuman: metrics.humanScore > 30,
    isHighlyTrusted: metrics.humanScore > 70
  };
}