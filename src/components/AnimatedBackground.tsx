'use client';

import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements: HTMLElement[] = [];
    
    // Developer/Programming themed symbols and code snippets
    const codeSymbols = [
      // Programming symbols
      '{ }', '</ >', '< >', '( )', '[ ]', '=> ', 
      // Code keywords
      'const', 'let', 'var', 'function', 'class', 'import',
      'if', 'else', 'for', 'while', 'return', 'export',
      // Tech symbols
      '< />', '${...}', '...', '===', '!==', '&&', '||',
      // Version control
      'git', 'npm', 'API', 'JSON', 'HTTP', 'CSS',
      // Languages
      'JS', 'TS', 'JSX', 'HTML', 'SQL', 'Vue',
      // Symbols
      '#', '@', '$', '&', '*', '+', '=', '~',
      // Binary
      '0101', '1010', '1100', '0011',
      // Comments
      '//', '/* */', '<!--', '-->',
    ];

    const positions = [
      { left: '5%', top: '10%' }, { left: '15%', top: '25%' }, { left: '8%', top: '40%' },
      { left: '12%', top: '55%' }, { left: '7%', top: '70%' }, { left: '10%', top: '85%' },
      { left: '25%', top: '15%' }, { left: '22%', top: '35%' }, { left: '28%', top: '50%' },
      { left: '30%', top: '65%' }, { left: '26%', top: '80%' }, { left: '35%', top: '20%' },
      { left: '40%', top: '8%' }, { left: '38%', top: '45%' }, { left: '42%', top: '75%' },
      { left: '50%', top: '12%' }, { left: '48%', top: '30%' }, { left: '52%', top: '60%' },
      { left: '55%', top: '25%' }, { left: '58%', top: '48%' }, { left: '60%', top: '70%' },
      { left: '65%', top: '18%' }, { left: '62%', top: '38%' }, { left: '68%', top: '55%' },
      { left: '70%', top: '85%' }, { left: '75%', top: '22%' }, { left: '72%', top: '42%' },
      { left: '78%', top: '65%' }, { left: '82%', top: '15%' }, { left: '80%', top: '35%' },
      { left: '85%', top: '52%' }, { left: '88%', top: '78%' }, { left: '90%', top: '28%' },
      { left: '92%', top: '62%' }, { left: '95%', top: '45%' }, { left: '93%', top: '88%' },
    ];

    // Create floating code symbols
    positions.forEach((position, i) => {
      const element = document.createElement('div');
      const symbol = codeSymbols[i % codeSymbols.length];
      
      element.textContent = symbol;
      
      // Random colors for variety
      const colors = [
        'text-blue-400/20 dark:text-blue-400/10',
        'text-purple-400/20 dark:text-purple-400/10',
        'text-pink-400/20 dark:text-pink-400/10',
        'text-cyan-400/20 dark:text-cyan-400/10',
        'text-indigo-400/20 dark:text-indigo-400/10',
        'text-violet-400/20 dark:text-violet-400/10',
      ];
      
      // Set all classes at once using className
      element.className = `absolute text-xs md:text-sm font-mono font-bold select-none ${colors[i % colors.length]}`;
      element.style.left = position.left;
      element.style.top = position.top;
      
      // Add CSS animation with variation
      const duration = 8 + (i % 5);
      const delay = i * 0.15;
      element.style.animation = `codeFloat ${duration}s ease-in-out infinite`;
      element.style.animationDelay = `${delay}s`;
      
      if (containerRef.current) {
        containerRef.current.appendChild(element);
      }
      elements.push(element);
    });

    // Add some larger code blocks in the background
    const codeBlocks = [
      'function()',
      'const app',
      '<Component />',
      'npm install',
      'git commit',
      'import { }',
    ];

    const blockPositions = [
      { left: '20%', top: '60%' },
      { left: '75%', top: '25%' },
      { left: '60%', top: '80%' },
      { left: '10%', top: '45%' },
      { left: '85%', top: '65%' },
      { left: '45%', top: '18%' },
    ];

    blockPositions.forEach((position, i) => {
      const block = document.createElement('div');
      block.textContent = codeBlocks[i];
      block.className = 'absolute text-base md:text-lg font-mono font-bold text-gray-300/10 dark:text-gray-600/10 select-none';
      block.style.left = position.left;
      block.style.top = position.top;
      block.style.animation = `slowFloat ${15 + i * 2}s ease-in-out infinite`;
      block.style.animationDelay = `${i * 0.5}s`;
      
      if (containerRef.current) {
        containerRef.current.appendChild(block);
      }
      elements.push(block);
    });

    // Cleanup
    return () => {
      elements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes codeFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.3; 
          }
          25% { 
            transform: translateY(-30px) translateX(15px) rotate(5deg); 
            opacity: 0.6; 
          }
          50% { 
            transform: translateY(-15px) translateX(-10px) rotate(-3deg); 
            opacity: 0.2; 
          }
          75% { 
            transform: translateY(-40px) translateX(20px) rotate(7deg); 
            opacity: 0.5; 
          }
        }

        @keyframes slowFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.15; 
          }
          50% { 
            transform: translateY(-50px) translateX(30px) scale(1.1); 
            opacity: 0.25; 
          }
        }
      `}</style>
      <div 
        ref={containerRef}
        className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      />
    </>
  );
}
