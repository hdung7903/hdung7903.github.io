'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  startOnView?: boolean;
}

export default function AnimatedCounter({ 
  end, 
  duration = 2000, 
  delay = 0,
  suffix = '',
  prefix = '',
  className = '',
  startOnView = true
}: AnimatedCounterProps) {
  // Suppress unused parameter warning
  void duration;
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!counterRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && startOnView) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(counterRef.current);

    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!isVisible && startOnView) return;

    // Use CSS transition instead of Anime.js
    const timer = setTimeout(() => {
      setCurrentValue(end);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, delay, startOnView]);

  return (
    <span 
      ref={counterRef}
      className={className}
    >
      {prefix}{currentValue}{suffix}
    </span>
  );
}
