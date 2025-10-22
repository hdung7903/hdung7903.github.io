'use client';

import { useEffect, useRef } from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotation?: number;
  animationDelay?: number;
  animationType?: 'slideInUp' | 'slideInLeft' | 'slideInRight' | 'fadeIn' | 'scaleIn';
}

export default function AnimatedCard({ 
  children, 
  className = '',
  hoverScale = 1.05,
  hoverRotation = 5,
  animationDelay = 0,
  animationType = 'slideInUp'
}: AnimatedCardProps) {
  // Suppress unused parameter warnings for props that might be used in future
  void hoverScale;
  void hoverRotation;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    // Add initial animation classes
    const animationClasses = {
      slideInUp: 'translate-y-full opacity-0',
      slideInLeft: '-translate-x-full opacity-0',
      slideInRight: 'translate-x-full opacity-0',
      fadeIn: 'opacity-0',
      scaleIn: 'scale-75 opacity-0'
    };

    const initialClass = animationClasses[animationType];
    card.classList.add(...initialClass.split(' '));

    // Trigger animation after delay
    const timer = setTimeout(() => {
      card.classList.remove(...initialClass.split(' '));
      card.classList.add('translate-y-0', 'translate-x-0', 'opacity-100', 'scale-100');
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay, animationType]);

  return (
    <div 
      ref={cardRef}
      className={`transform-gpu ${className}`}
      style={{ 
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
}
