'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{ key: string; href: string; label: string }>;
  onItemClick: () => void;
}

export default function MobileMenu({ isOpen, onClose, menuItems, onItemClick }: MobileMenuProps) {
  const handleItemClick = (href: string) => {
    onItemClick();
    onClose();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85vw] sm:w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Menu
                  </span>
                  <button
                    onClick={onClose}
                    className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <X size={22} className="sm:w-6 sm:h-6" />
                  </button>
                </div>
                <nav className="flex-1 p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.key}
                      href={item.href}
                    onClick={() => handleItemClick(item.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block py-3.5 px-4 text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 rounded-xl transition-all duration-300 relative group touch-manipulation min-h-[48px] flex items-center"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    />
                  </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

