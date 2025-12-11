'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme
    const darkMode = document.documentElement.classList.contains('dark') ||
      (!document.documentElement.classList.contains('light') &&
       window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-300/50 dark:border-gray-600/50 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-xl touch-manipulation"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        {isDark ? (
          <Moon size={18} className="sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
        ) : (
          <Sun size={18} className="sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
        )}
      </motion.div>
    </motion.button>
  );
}

