'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ProjectFilterProps {
  technologies: string[];
  selectedTech: string[];
  onTechToggle: (tech: string) => void;
  onClear: () => void;
  translations: {
    filterByTech: string;
    clearFilters: string;
    allTechnologies: string;
  };
}

export default function ProjectFilter({
  technologies,
  selectedTech,
  onTechToggle,
  onClear,
  translations,
}: ProjectFilterProps) {
  if (technologies.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 sm:mb-8 px-4"
    >
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
        <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
          {translations.filterByTech}:
        </span>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => {
            const isSelected = selectedTech.includes(tech);
            return (
              <motion.button
                key={tech}
                onClick={() => onTechToggle(tech)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 touch-manipulation min-h-[36px] sm:min-h-[40px] ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:border-blue-500/50'
                }`}
              >
                {tech}
              </motion.button>
            );
          })}
        </div>
        {selectedTech.length > 0 && (
          <motion.button
            onClick={onClear}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors touch-manipulation min-h-[36px] sm:min-h-[40px] self-start sm:self-auto"
          >
            <X size={14} className="sm:w-4 sm:h-4" />
            {translations.clearFilters}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

