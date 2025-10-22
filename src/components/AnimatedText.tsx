'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animationType?: 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'typewriter';
}

export default function AnimatedText({ 
  text, 
  className = '', 
  delay = 0,
  duration = 1000,
  animationType = 'fadeInUp'
}: AnimatedTextProps) {
  // Suppress unused parameter warning
  void duration;
  
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Simple fade in animation for now to avoid React key issues
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // For typewriter effect, we'll use a simpler approach
  useEffect(() => {
    if (animationType === 'typewriter') {
      let currentIndex = 0;
      const timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(timer);
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, [text, animationType]);

  if (animationType === 'typewriter') {
    return (
      <span className={`inline-block ${className} ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    );
  }

  return (
    <span 
      ref={textRef}
      className={`inline-block ${className} ${isVisible ? 'opacity-100' : 'opacity-0'} transition-all duration-500 ${
        animationType === 'slideInLeft' ? 'translate-x-0' : 
        animationType === 'slideInRight' ? 'translate-x-0' : 
        animationType === 'fadeInUp' ? 'translate-y-0' : 
        animationType === 'scaleIn' ? 'scale-100' : ''
      } ${
        !isVisible ? (
          animationType === 'slideInLeft' ? '-translate-x-full' : 
          animationType === 'slideInRight' ? 'translate-x-full' : 
          animationType === 'fadeInUp' ? 'translate-y-full' : 
          animationType === 'scaleIn' ? 'scale-0' : ''
        ) : ''
      }`}
    >
      {text}
    </span>
  );
}
