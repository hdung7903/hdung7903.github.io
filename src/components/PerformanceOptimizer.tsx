'use client';

import { useEffect, useRef } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PerformanceOptimizer({ children, className = '' }: PerformanceOptimizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Intersection Observer for performance optimization
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Enable animations when in view
            entry.target.classList.add('animate-enabled');
          } else {
            // Disable animations when out of view
            entry.target.classList.remove('animate-enabled');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(containerRef.current);

    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure' && entry.duration > 16) {
          console.warn(`Slow animation detected: ${entry.name} took ${entry.duration}ms`);
        }
      }
    });

    performanceObserver.observe({ entryTypes: ['measure'] });

    // Cleanup
    return () => {
      observer.disconnect();
      performanceObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`transform-gpu will-change-auto ${className}`}
      style={{
        // Optimize for animations
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
}
