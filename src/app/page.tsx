'use client';

import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Download,
  ExternalLink,
  Code,
  Globe,
  Server,
  GitBranch,
  Star,
  GitFork,
  Eye,
  Calendar,
  Sparkles,
  Zap,
  Rocket,
  Menu,
  Filter,
  Database,
  Cloud,
  Box,
  Layers,
  Terminal,
  Cpu,
  FileCode
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { getTranslation, availableLanguages, getDefaultLanguage } from './i18n';
import { 
  AnimatedBackground, 
  ThreeScene, 
  AnimatedText, 
  AnimatedCounter, 
  AnimatedCard,
  ScrollToTop,
  MobileMenu,
  ContactForm,
  ScrollProgress,
  ThemeToggle,
  TypingEffect,
  ProjectFilter
} from '../components';

// Repository interface for both GitHub and GitLab
interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  source: 'github' | 'gitlab';
  visibility?: string;
}

// Type for API responses
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface GitLabRepo {
  id: number;
  name: string;
  description: string | null;
  web_url: string;
  homepage: string | null;
  tag_list: string[];
  star_count?: number;
  forks_count?: number;
  last_activity_at: string;
  visibility: string;
}

export default function Portfolio() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [githubUsername, setGithubUsername] = useState('hdung7903');
  const [gitlabUsername, setGitlabUsername] = useState('hdung7903');
  const [currentLanguage, setCurrentLanguage] = useState(getDefaultLanguage());
  const [currentYear] = useState(new Date().getFullYear());
  const [activeTab, setActiveTab] = useState<'all' | 'github' | 'gitlab'>('all');
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  // Get translation function
  const t = (key: string) => getTranslation(currentLanguage, key);

  // Handle language change with loading animation
  const handleLanguageChange = (newLanguage: string) => {
    if (newLanguage === currentLanguage) {
      setIsLanguageMenuOpen(false);
      return;
    }
    
    setIsChangingLanguage(true);
    
    // Simulate a brief loading period for smooth transition
    setTimeout(() => {
      setCurrentLanguage(newLanguage);
      setIsChangingLanguage(false);
      setIsLanguageMenuOpen(false);
    }, 500);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };


  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Enhanced skills with more visual appeal
  const skills = [
    // Programming Languages
    { id: 'javascript', name: 'JavaScript', icon: Code, level: 95, color: 'from-yellow-400 via-orange-400 to-red-500', glow: 'shadow-yellow-500/25' },
    { id: 'typescript', name: 'TypeScript', icon: Code, level: 90, color: 'from-blue-400 via-indigo-500 to-purple-600', glow: 'shadow-blue-500/25' },
    { id: 'java', name: 'Java', icon: Code, level: 85, color: 'from-red-400 via-pink-500 to-purple-600', glow: 'shadow-red-500/25' },
    { id: 'python', name: 'Python', icon: Code, level: 80, color: 'from-blue-500 via-cyan-500 to-teal-600', glow: 'shadow-blue-500/25' },
    { id: 'html', name: 'HTML/CSS', icon: FileCode, level: 95, color: 'from-orange-400 via-red-500 to-pink-600', glow: 'shadow-orange-500/25' },
    
    // Frontend Frameworks
    { id: 'react', name: 'React', icon: Globe, level: 95, color: 'from-cyan-400 via-blue-500 to-indigo-600', glow: 'shadow-cyan-500/25' },
    { id: 'nextjs', name: 'Next.js', icon: Globe, level: 90, color: 'from-gray-600 via-gray-800 to-black', glow: 'shadow-gray-500/25' },
    { id: 'vue', name: 'Vue.js', icon: Globe, level: 75, color: 'from-green-400 via-emerald-500 to-teal-600', glow: 'shadow-green-500/25' },
    { id: 'angular', name: 'Angular', icon: Globe, level: 70, color: 'from-red-500 via-pink-600 to-rose-700', glow: 'shadow-red-500/25' },
    
    // Backend & Runtime
    { id: 'nodejs', name: 'Node.js', icon: Server, level: 90, color: 'from-green-400 via-emerald-500 to-teal-600', glow: 'shadow-green-500/25' },
    { id: 'nestjs', name: 'NestJS', icon: Server, level: 85, color: 'from-red-500 via-pink-600 to-rose-700', glow: 'shadow-red-500/25' },
    { id: 'express', name: 'Express.js', icon: Server, level: 88, color: 'from-gray-500 via-gray-600 to-gray-700', glow: 'shadow-gray-500/25' },
    { id: 'spring', name: 'Spring Boot', icon: Server, level: 80, color: 'from-green-500 via-emerald-600 to-teal-700', glow: 'shadow-green-500/25' },
    
    // Databases
    { id: 'mongodb', name: 'MongoDB', icon: Database, level: 85, color: 'from-green-400 via-emerald-500 to-teal-600', glow: 'shadow-green-500/25' },
    { id: 'postgresql', name: 'PostgreSQL', icon: Database, level: 82, color: 'from-blue-400 via-indigo-500 to-purple-600', glow: 'shadow-blue-500/25' },
    { id: 'mysql', name: 'MySQL', icon: Database, level: 80, color: 'from-blue-500 via-cyan-500 to-teal-600', glow: 'shadow-blue-500/25' },
    { id: 'redis', name: 'Redis', icon: Database, level: 75, color: 'from-red-400 via-pink-500 to-rose-600', glow: 'shadow-red-500/25' },
    
    // DevOps & Tools
    { id: 'docker', name: 'Docker', icon: Box, level: 85, color: 'from-blue-400 via-cyan-500 to-teal-600', glow: 'shadow-blue-500/25' },
    { id: 'kubernetes', name: 'Kubernetes', icon: Box, level: 70, color: 'from-blue-500 via-indigo-600 to-purple-700', glow: 'shadow-blue-500/25' },
    { id: 'git', name: 'Git', icon: GitBranch, level: 90, color: 'from-orange-500 via-red-600 to-pink-700', glow: 'shadow-orange-500/25' },
    { id: 'aws', name: 'AWS', icon: Cloud, level: 75, color: 'from-orange-400 via-yellow-500 to-amber-600', glow: 'shadow-orange-500/25' },
    { id: 'linux', name: 'Linux', icon: Terminal, level: 85, color: 'from-yellow-400 via-orange-500 to-red-600', glow: 'shadow-yellow-500/25' },
    
    // Additional Technologies
    { id: 'graphql', name: 'GraphQL', icon: Layers, level: 80, color: 'from-pink-400 via-purple-500 to-indigo-600', glow: 'shadow-pink-500/25' },
    { id: 'restapi', name: 'REST API', icon: Server, level: 92, color: 'from-blue-400 via-indigo-500 to-purple-600', glow: 'shadow-blue-500/25' },
    { id: 'websocket', name: 'WebSocket', icon: Zap, level: 80, color: 'from-yellow-400 via-orange-500 to-red-600', glow: 'shadow-yellow-500/25' },
    { id: 'tailwind', name: 'Tailwind CSS', icon: Layers, level: 90, color: 'from-cyan-400 via-blue-500 to-indigo-600', glow: 'shadow-cyan-500/25' },
    { id: 'redux', name: 'Redux', icon: Layers, level: 85, color: 'from-purple-400 via-pink-500 to-rose-600', glow: 'shadow-purple-500/25' },
    { id: 'jest', name: 'Jest/Testing', icon: Cpu, level: 80, color: 'from-red-400 via-pink-500 to-purple-600', glow: 'shadow-red-500/25' },
  ];

  // Calculate dynamic statistics
  const totalProjects = repos.length;
  const yearsOfExperience = Math.max(currentYear - 2024, 1); // At least 1 year

  // Function to fetch GitHub repositories
  const fetchGitHubRepos = async (username: string): Promise<Repository[]> => {
    if (!username) return [];
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      if (!response.ok) throw new Error('Failed to fetch GitHub repositories');
      
      const data: GitHubRepo[] = await response.json();
      return data.map((repo: GitHubRepo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        topics: repo.topics || [],
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        source: 'github' as const
      }));
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      // Return empty array on error - fallback projects will be shown
      return [];
    }
  };

  // Function to fetch GitLab repositories
  const fetchGitLabRepos = async (username: string): Promise<Repository[]> => {
    if (!username) return [];
    
    try {
      const response = await fetch(`https://gitlab.com/api/v4/users/${username}/projects?simple=true&per_page=10&order_by=updated_at`);
      if (!response.ok) throw new Error('Failed to fetch GitLab repositories');
      
      const data: GitLabRepo[] = await response.json();
      return data.map((repo: GitLabRepo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.web_url,
        homepage: repo.homepage,
        topics: repo.tag_list || [],
        language: null, // GitLab API doesn't provide language in simple format
        stargazers_count: repo.star_count || 0,
        forks_count: repo.forks_count || 0,
        updated_at: repo.last_activity_at,
        source: 'gitlab' as const,
        visibility: repo.visibility
      }));
    } catch (error) {
      console.error('Error fetching GitLab repos:', error);
      // Return empty array on error - fallback projects will be shown
      return [];
    }
  };

  // Fetch repositories from both sources
  const fetchAllRepos = useCallback(async () => {
    setIsLoading(true);
    try {
      const [githubRepos, gitlabRepos] = await Promise.all([
        fetchGitHubRepos(githubUsername),
        fetchGitLabRepos(gitlabUsername)
      ]);
      
      const allRepos = [...githubRepos, ...gitlabRepos]
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      
      setRepos(allRepos);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      // Set empty repos - fallback projects will be displayed
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  }, [githubUsername, gitlabUsername]);

  // Fetch repos when component mounts or usernames change
  useEffect(() => {
    fetchAllRepos();
  }, [fetchAllRepos]);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLanguageMenuOpen && !target.closest('.language-selector')) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageMenuOpen]);

  // Fallback projects if no repos available
  const fallbackProjects: Repository[] = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and TypeScript. Features include user authentication, payment processing, and admin dashboard.',
      topics: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Redux', 'REST API'],
      html_url: '#',
      homepage: '#',
      language: 'TypeScript',
      stargazers_count: 15,
      forks_count: 3,
      updated_at: new Date().toISOString(),
      source: 'github'
    },
    {
      id: 2,
      name: 'Task Management API',
      description: 'RESTful API built with NestJS and TypeScript for task management with real-time updates and user authentication.',
      topics: ['NestJS', 'TypeScript', 'MongoDB', 'WebSocket', 'Redis', 'Docker', 'GraphQL'],
      html_url: '#',
      homepage: '#',
      language: 'TypeScript',
      stargazers_count: 8,
      forks_count: 2,
      updated_at: new Date().toISOString(),
      source: 'gitlab'
    },
    {
      id: 3,
      name: 'Java Microservices',
      description: 'Microservices architecture using Java Spring Boot with Docker containerization and message queuing.',
      topics: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'MySQL', 'Redis', 'AWS'],
      html_url: '#',
      homepage: '#',
      language: 'Java',
      stargazers_count: 12,
      forks_count: 5,
      updated_at: new Date().toISOString(),
      source: 'github'
    },
    {
      id: 4,
      name: 'Real-time Chat Application',
      description: 'Modern chat application built with Vue.js, Node.js, and WebSocket for real-time messaging.',
      topics: ['Vue.js', 'Node.js', 'Express.js', 'WebSocket', 'MongoDB', 'Docker'],
      html_url: '#',
      homepage: '#',
      language: 'JavaScript',
      stargazers_count: 20,
      forks_count: 7,
      updated_at: new Date().toISOString(),
      source: 'github'
    },
    {
      id: 5,
      name: 'Python Data Analytics Dashboard',
      description: 'Data analytics dashboard with Python backend and React frontend for visualizing complex datasets.',
      topics: ['Python', 'React', 'PostgreSQL', 'GraphQL', 'Docker', 'AWS'],
      html_url: '#',
      homepage: '#',
      language: 'Python',
      stargazers_count: 18,
      forks_count: 4,
      updated_at: new Date().toISOString(),
      source: 'gitlab'
    },
    {
      id: 6,
      name: 'Angular Admin Panel',
      description: 'Comprehensive admin panel built with Angular, featuring role-based access control and real-time updates.',
      topics: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST API', 'Docker'],
      html_url: '#',
      homepage: '#',
      language: 'TypeScript',
      stargazers_count: 14,
      forks_count: 6,
      updated_at: new Date().toISOString(),
      source: 'github'
    }
  ];

  const displayProjects = repos.length > 0 ? repos : fallbackProjects;
  
  // Get all unique technologies from projects
  const allTechnologies = Array.from(
    new Set(
      displayProjects.flatMap(project => [
        ...project.topics,
        ...(project.language ? [project.language] : [])
      ])
    )
  ).sort();
  
  // Filter projects based on active tab and selected technologies
  const filteredProjects = displayProjects
    .filter(project => {
      // Filter by source tab
      if (activeTab !== 'all' && project.source !== activeTab) return false;
      
      // Filter by selected technologies
      if (selectedTech.length > 0) {
        const projectTechs = [
          ...project.topics,
          ...(project.language ? [project.language] : [])
        ];
        return selectedTech.some(tech => 
          projectTechs.some(pt => pt.toLowerCase().includes(tech.toLowerCase()))
        );
      }
      
      return true;
    });
  
  const handleTechToggle = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };
  
  const handleClearFilters = () => {
    setSelectedTech([]);
  };


  const getSourceIcon = (source: 'github' | 'gitlab') => {
    return source === 'github' ? Github : GitBranch;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 relative overflow-x-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Enhanced animated background with Anime.js */}
      <AnimatedBackground />
      
      {/* Three.js 3D Scene */}
      <ThreeScene />

      {/* Loading overlay during language change */}
      {isChangingLanguage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-40 pointer-events-none"
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={[
          { key: 'about', href: '#about', label: t('about') },
          { key: 'skills', href: '#skills', label: t('skills') },
          { key: 'projects', href: '#projects', label: t('projects') },
          { key: 'contact', href: '#contact', label: t('contact') }
        ]}
        onItemClick={() => {}}
      />

      {/* Enhanced Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl z-50 border-b border-gray-200/30 dark:border-gray-700/30 shadow-xl shadow-gray-900/5"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4 lg:py-5">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <motion.div
                animate={pulseAnimation}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl mr-2 sm:mr-3 flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </motion.div>
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-8">
              <div className="hidden md:flex space-x-6 lg:space-x-8">
                {[
                  { key: 'about', href: '#about' },
                  { key: 'skills', href: '#skills' },
                  { key: 'projects', href: '#projects' },
                  { key: 'contact', href: '#contact' }
                ].map((item) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="relative text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 font-semibold text-sm tracking-wide uppercase before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-600 before:to-purple-600 before:transition-all before:duration-300 hover:before:w-full"
                  >
                    {t(item.key)}
                  </motion.a>
                ))}
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation"
                aria-label="Open menu"
              >
                <Menu size={22} className="text-gray-700 dark:text-gray-300" />
              </button>
              
              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              
              {/* Enhanced Language Selector with Dropdown */}
              <div className="relative language-selector">
                <motion.button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isChangingLanguage}
                  className="relative flex items-center gap-1.5 sm:gap-2 bg-white/90 dark:bg-gray-800/90 border border-gray-300/50 dark:border-gray-600/50 rounded-xl sm:rounded-2xl px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent cursor-pointer backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[44px]"
                >
                  {isChangingLanguage ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full"
                      />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg sm:text-xl">
                        {availableLanguages.find(lang => lang.code === currentLanguage)?.flag}
                      </span>
                      <span className="font-semibold hidden sm:inline">
                        {currentLanguage.toUpperCase()}
                      </span>
                      <motion.svg
                        animate={{ rotate: isLanguageMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </>
                  )}
                </motion.button>

                {/* Dropdown Menu */}
                {isLanguageMenuOpen && !isChangingLanguage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-2 z-50"
                  >
                    {availableLanguages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ${
                          currentLanguage === lang.code
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <div className="flex-1">
                          <div className="font-semibold">{lang.name}</div>
                          <div className="text-xs opacity-60">{lang.code.toUpperCase()}</div>
                        </div>
                        {currentLanguage === lang.code && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <main id="main-content">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pt-20 sm:pt-24 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)] sm:min-h-screen">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4 sm:space-y-6 lg:space-y-8">
              <motion.div variants={fadeInUp}>
                <motion.span 
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-block text-xs sm:text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4 relative"
                >
                  ✨ Welcome to my digital world
                </motion.span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black text-gray-900 dark:text-white leading-tight"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight"
                >
                  {t('fullName')}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block relative"
                >
                  <span className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    {t('heroTitlePart1')}{' '}
                    <TypingEffect
                      words={[
                        t('heroTitlePart2'),
                        'Developer',
                        'Creator',
                        'Innovator',
                        'Problem Solver'
                      ]}
                      className="inline-block"
                    />
                  </span>
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-1 sm:bottom-2 left-0 h-2 sm:h-3 lg:h-4 bg-gradient-to-r from-blue-400/30 to-purple-400/30 -z-10"
                  />
                </motion.span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl font-light"
              >
                {t('heroDescription')}
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                <motion.a
                  href="/cv.pdf"
                  download
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-4.5 lg:py-5 rounded-xl sm:rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden touch-manipulation min-h-[48px] text-sm sm:text-base"
                  aria-label={t('downloadCV')}
                  onClick={(e) => {
                    // If CV doesn't exist, prevent default and show message
                    e.preventDefault();
                    alert('CV download will be available soon!');
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <Download size={18} className="sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10">{t('downloadCV')}</span>
                </motion.a>
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)",
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-4.5 lg:py-5 rounded-xl sm:rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden touch-manipulation min-h-[48px] text-sm sm:text-base"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  aria-label={t('viewProjects')}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <Rocket size={18} className="sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10">{t('viewProjects')}</span>
                </motion.button>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex gap-3 sm:gap-4 lg:gap-6 pt-6 sm:pt-8"
              >
                {[
                  { id: 'github', icon: Github, href: 'https://github.com/hdung7903', color: 'hover:text-gray-900', bg: 'hover:bg-gray-100 dark:hover:bg-gray-800' },
                  { id: 'gitlab', icon: GitBranch, href: 'https://gitlab.com/hdung7903', color: 'hover:text-orange-500', bg: 'hover:bg-orange-50 dark:hover:bg-orange-900/20' },
                  { id: 'linkedin', icon: Linkedin, href: '#', color: 'hover:text-blue-600', bg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' },
                  { id: 'email', icon: Mail, href: 'mailto:work@hdung7903.me', color: 'hover:text-red-500', bg: 'hover:bg-red-50 dark:hover:bg-red-900/20' }
                ].map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 360, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`p-3 sm:p-4 lg:p-5 bg-white/90 dark:bg-gray-800/90 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl text-gray-700 dark:text-gray-300 ${social.color} ${social.bg} transition-all duration-500 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center`}
                    aria-label={`Visit my ${social.id} profile`}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <social.icon size={20} className="sm:w-6 sm:h-6 relative z-10" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex justify-center items-center mt-8 lg:mt-0"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Rotating rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-blue-400/30 via-purple-500/30 to-pink-500/30 border-dashed"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 rounded-full border-2 border-gradient-to-r from-cyan-400/40 via-blue-500/40 to-purple-600/40"
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-12 rounded-full border border-gradient-to-r from-purple-400/50 via-pink-500/50 to-red-500/50 border-dotted"
                />
                
                {/* Central avatar */}
                <motion.div 
                  animate={{
                    y: [0, -20, 0],
                    rotateY: [0, 10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-16 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/50 dark:border-gray-700/50 backdrop-blur-xl"
                >
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-7xl transform-gpu"
                  >
                    👨‍💻
                  </motion.div>
                </motion.div>

                {/* Floating particles with fixed positions to avoid hydration mismatch */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const positions = [
                    { top: '25%', left: '30%', x: 20, y: -15 },
                    { top: '60%', left: '70%', x: -30, y: 25 },
                    { top: '40%', left: '20%', x: 35, y: -20 },
                    { top: '80%', left: '50%', x: -25, y: 30 },
                    { top: '15%', left: '80%', x: 15, y: -25 },
                    { top: '75%', left: '10%', x: -20, y: 20 }
                  ];
                  const pos = positions[i];
                  
                  return (
                    <motion.div
                      key={`particle-${i}`}
                      animate={{
                        x: [0, pos.x, -pos.x/2, 0],
                        y: [0, pos.y, pos.y/2, 0],
                        opacity: [0.4, 0.8, 0.3, 0.4],
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-60"
                      style={{
                        top: pos.top,
                        left: pos.left,
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced About Section */}
      <motion.section 
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-900/50 backdrop-blur-xl relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6 lg:mb-8 tracking-tight px-4"
            >
              {t('aboutTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light px-4"
            >
              {t('aboutDescription')}
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
            {[
              { title: totalProjects, subtitle: t('projectsCompleted'), icon: Code, color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' },
              { title: yearsOfExperience, subtitle: t('yearsExperience'), icon: Globe, color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' }
            ].map((stat, index) => (
              <AnimatedCard
                key={stat.title}
                animationType="scaleIn"
                animationDelay={index * 200}
                className={`relative text-center p-6 sm:p-8 lg:p-10 bg-gradient-to-br ${stat.bg} rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl overflow-hidden group`}
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${stat.color} rounded-xl sm:rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg relative z-10`}
                >
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </motion.div>
                <motion.h3 
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 relative z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  <AnimatedCounter 
                    end={stat.title}
                    suffix="+"
                    duration={2000}
                    delay={index * 300}
                    className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white"
                  />
                </motion.h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium relative z-10">{stat.subtitle}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Skills Section */}
      <motion.section 
        id="skills"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900/50 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-10 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          />
          <motion.div 
            animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4 sm:mb-6 lg:mb-8 tracking-tight px-4"
            >
              {t('skillsTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light px-4"
            >
              {t('skillsDescription')}
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            {skills.map((skill, index) => (
              <AnimatedCard
                key={skill.id}
                animationType="slideInUp"
                animationDelay={index * 150}
                hoverScale={1.05}
                hoverRotation={5}
                className="bg-white/90 dark:bg-gray-800/90 p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl relative overflow-hidden group"
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                <div className="flex items-center mb-4 sm:mb-6 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${skill.color} rounded-xl sm:rounded-2xl mr-3 sm:mr-4 flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    <AnimatedText 
                      text={skill.name}
                      animationType="fadeInUp"
                      delay={index * 200 + 500}
                      duration={800}
                    />
                  </h3>
                </div>
                
                <div className="relative mb-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`bg-gradient-to-r ${skill.color} h-full rounded-full shadow-lg relative overflow-hidden`}
                    >
                      <motion.div 
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute right-0 -top-8 text-sm font-bold text-gray-600 dark:text-gray-400"
                  >
                    <AnimatedCounter 
                      end={skill.level}
                      suffix="%"
                      duration={1500}
                      delay={index * 200 + 800}
                    />
                  </motion.span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium relative z-10">
                  <AnimatedCounter 
                    end={skill.level}
                    suffix={`% ${t('proficiency')}`}
                    duration={1500}
                    delay={index * 200 + 1000}
                  />
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Projects Section */}
      <motion.section 
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-gray-800 dark:via-purple-900/10 dark:to-pink-900/10 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"
          />
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {t('portfolioShowcase')}
              </span>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4"
            >
              {t('myWorkTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{t('featuredWorkTitle')}</span> {t('workTitle')}
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 px-4"
            >
              {t('projectsShowcaseDescription')}
            </motion.p>
            
            {/* Project Filter */}
            {allTechnologies.length > 0 && (
              <ProjectFilter
                technologies={allTechnologies}
                selectedTech={selectedTech}
                onTechToggle={handleTechToggle}
                onClear={handleClearFilters}
                translations={{
                  filterByTech: t('filterByTech'),
                  clearFilters: t('clearFilters'),
                  allTechnologies: t('allTechnologies'),
                }}
              />
            )}
            
            {/* Enhanced Source Tabs */}
            <motion.div 
              variants={fadeInUp}
              className="flex justify-center mb-8 sm:mb-12 lg:mb-16 px-4"
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-lg w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                  {[
                    { key: 'all', label: t('allProjects'), icon: Eye, color: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md' },
                    { key: 'github', label: t('githubProjects'), icon: Github, color: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white' },
                    { key: 'gitlab', label: t('gitlabProjects'), icon: GitBranch, color: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white' }
                  ].map((tab) => (
                    <motion.button
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(tab.key as 'all' | 'github' | 'gitlab');
                        fetchAllRepos(); // Refresh repositories when tab is clicked
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation min-h-[44px] ${
                        activeTab === tab.key
                          ? tab.color
                          : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <tab.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Repository Input Section */}
            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Github size={16} />
                    {t('githubUsername')}
                  </label>
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder={t('enterGithubUsername')}
                    readOnly
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm touch-manipulation min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <GitBranch size={16} />
                    {t('gitlabUsername')}
                  </label>
                  <input
                    type="text"
                    value={gitlabUsername}
                    onChange={(e) => setGitlabUsername(e.target.value)}
                    placeholder={t('enterGitlabUsername')}
                    readOnly
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm touch-manipulation min-h-[44px]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <>
            {/* Project Grid */}
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Filter size={64} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <p className="text-xl text-gray-600 dark:text-gray-400">{t('noProjectsFound')}</p>
              </motion.div>
            ) : (
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4"
            >
              {filteredProjects.map((project, index) => {
                const SourceIcon = getSourceIcon(project.source);
                return (
                  <motion.div
                    key={`${project.source}-${project.id}`}
                    variants={fadeInUp}
                    whileHover={{ 
                      y: -12, 
                      scale: 1.03,
                      boxShadow: "0 25px 50px rgba(59, 130, 246, 0.2)"
                    }}
                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"
                    />
                    {/* Project Header */}
                    <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                      {/* Animated gradient overlay */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${
                          index % 4 === 0 ? 'from-blue-500/20 to-purple-600/20' :
                          index % 4 === 1 ? 'from-green-500/20 to-teal-600/20' :
                          index % 4 === 2 ? 'from-orange-500/20 to-red-600/20' :
                          'from-purple-500/20 to-pink-600/20'
                        }`}
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: 'reverse'
                        }}
                      />
                      {/* Pattern overlay */}
                      <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }} />
                      
                      {/* Source icon */}
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-lg flex items-center justify-center shadow-sm backdrop-blur-sm">
                          <SourceIcon size={18} className="text-gray-600 dark:text-gray-400" />
                        </div>
                      </div>
                      
                      {/* Language badge */}
                      {project.language && (
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium backdrop-blur-sm">
                            {project.language}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Project Content */}
                    <div className="p-6 relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={12} />
                          <span>{new Date(project.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-2">
                        {project.description || 'A well-crafted project showcasing modern development practices.'}
                      </p>
                      
                      {/* Topics */}
                      {project.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.topics.slice(0, 3).map((topic) => (
                            <span 
                              key={topic}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                          {project.topics.length > 3 && (
                            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-500 rounded-md text-xs">
                              +{project.topics.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-500" />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {project.stargazers_count}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork size={14} className="text-blue-500" />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {project.forks_count}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.a
                          href={project.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 text-xs sm:text-sm font-medium flex-1 justify-center group/btn touch-manipulation min-h-[44px]"
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <SourceIcon size={14} className="sm:w-4 sm:h-4 group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 transition-colors" />
                        </motion.div>
                        <span className="whitespace-nowrap">{t('code')}</span>
                      </motion.a>
                      {project.homepage && (
                        <motion.a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-xs sm:text-sm font-medium flex-1 justify-center shadow-lg hover:shadow-xl group/btn touch-manipulation min-h-[44px]"
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                          </motion.div>
                          <span className="whitespace-nowrap">{t('liveDemo')}</span>
                        </motion.a>
                      )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            )}
            </>
          )}
        </div>
      </motion.section>

      {/* Experience Section - COMMENTED OUT */}
      {/* <motion.section 
        id="experience"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight"
            >
              {t('experienceTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light"
            >
              {t('experienceDescription')}
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                title: 'Software Engineer',
                company: 'Tech Company',
                period: '2024 - ' + t('current'),
                description: 'Building scalable web applications with modern technologies. Leading frontend development initiatives and collaborating with cross-functional teams.',
                technologies: ['React', 'TypeScript', 'Node.js', 'Next.js'],
                icon: Briefcase,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Full Stack Developer',
                company: 'Startup',
                period: '2023 - 2024',
                description: 'Developed and maintained multiple web applications. Implemented RESTful APIs and optimized database performance.',
                technologies: ['JavaScript', 'Java', 'NestJS', 'PostgreSQL'],
                icon: Code,
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Junior Developer',
                company: 'Software Agency',
                period: '2022 - 2023',
                description: 'Started my professional journey. Learned best practices, worked on various projects, and gained experience in modern web development.',
                technologies: ['React', 'JavaScript', 'CSS', 'HTML'],
                icon: Award,
                color: 'from-green-500 to-teal-500'
              }
            ].map((exp, index) => (
              <AnimatedCard
                key={index}
                animationType="slideInLeft"
                animationDelay={index * 200}
                className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl relative overflow-hidden group"
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-r ${exp.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <exp.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full mt-2 md:mt-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </motion.section> */}

      {/* Education Section - COMMENTED OUT */}
      {/* <motion.section
      <motion.section 
        id="education"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 dark:from-gray-800 dark:via-blue-900/10 dark:to-cyan-900/10 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-8 tracking-tight"
            >
              {t('educationTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light"
            >
              {t('educationDescription')}
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                degree: 'Bachelor of Science in Computer Science',
                university: 'University Name',
                year: '2020 - 2024',
                description: 'Focused on software engineering, algorithms, and web technologies. Graduated with honors.',
                icon: GraduationCap,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                degree: 'High School Diploma',
                university: 'High School Name',
                year: '2016 - 2020',
                description: 'Completed with focus on mathematics and science.',
                icon: BookOpen,
                color: 'from-cyan-500 to-teal-500'
              }
            ].map((edu, index) => (
              <AnimatedCard
                key={index}
                animationType="slideInRight"
                animationDelay={index * 200}
                className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl relative overflow-hidden group"
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-r ${edu.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <edu.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-2">
                      {edu.university}
                    </p>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full inline-block mb-4">
                      {edu.year}
                    </span>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </motion.section> */}

      {/* Certifications Section - COMMENTED OUT */}
      {/* <motion.section
      <motion.section 
        id="certifications"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-pink-900/10 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-8 tracking-tight"
            >
              {t('certificationsTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light"
            >
              {t('certificationsDescription')}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'AWS Certified Developer',
                issuer: 'Amazon Web Services',
                date: '2024',
                description: 'Cloud development and deployment expertise',
                icon: Certificate,
                color: 'from-orange-500 to-yellow-500'
              },
              {
                name: 'React Developer Certification',
                issuer: 'Meta',
                date: '2023',
                description: 'Advanced React and modern frontend development',
                icon: Certificate,
                color: 'from-cyan-500 to-blue-500'
              },
              {
                name: 'Node.js Certification',
                issuer: 'OpenJS Foundation',
                date: '2023',
                description: 'Backend development with Node.js and Express',
                icon: Certificate,
                color: 'from-green-500 to-emerald-500'
              }
            ].map((cert, index) => (
              <AnimatedCard
                key={index}
                animationType="scaleIn"
                animationDelay={index * 150}
                className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl relative overflow-hidden group"
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-r ${cert.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 relative z-10`}
                >
                  <cert.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 relative z-10">
                  {t('issuedBy')}: {cert.issuer}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 relative z-10">
                  {t('issuedDate')}: {cert.date}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed relative z-10">
                  {cert.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </motion.section> */}

      {/* Blog Preview Section - COMMENTED OUT */}
      {/* <motion.section 
        id="blog"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 dark:from-gray-800 dark:via-indigo-900/10 dark:to-purple-900/10 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight"
            >
              {t('blogTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light"
            >
              {t('blogDescription')}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Building Modern Web Applications with Next.js',
                excerpt: 'Learn how to build scalable and performant web applications using Next.js 15 and React 19.',
                readTime: 5,
                date: '2024-01-15',
                category: 'Web Development'
              },
              {
                title: 'Mastering TypeScript for Better Code Quality',
                excerpt: 'Discover advanced TypeScript patterns and best practices for writing maintainable code.',
                readTime: 8,
                date: '2024-01-10',
                category: 'Programming'
              },
              {
                title: 'The Future of Full-Stack Development',
                excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
                readTime: 6,
                date: '2024-01-05',
                category: 'Technology'
              }
            ].map((post, index) => (
              <AnimatedCard
                key={index}
                animationType="slideInUp"
                animationDelay={index * 150}
                className="bg-white/90 dark:bg-gray-800/90 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 group-hover:from-blue-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500" />
                <div className="p-6">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{post.readTime} {t('readTime')}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        id="newsletter"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-black text-white mb-6"
            >
              {t('newsletterTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-white/90 mb-8"
            >
              {t('newsletterDescription')}
            </motion.p>
            <motion.form
              variants={fadeInUp}
              onSubmit={(e) => {
                e.preventDefault();
                alert(t('subscribeSuccess'));
              }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                required
                className="flex-1 px-6 py-4 rounded-2xl bg-white/90 backdrop-blur-xl border-0 focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-500"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {t('subscribe')}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section - COMMENTED OUT */}
      {/* <motion.section 
        id="testimonials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-gray-800 dark:via-purple-900/10 dark:to-pink-900/10 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-8 tracking-tight"
            >
              {t('testimonialsTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light"
            >
              {t('testimonialsDescription')}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'John Doe',
                role: 'Project Manager',
                company: 'Tech Corp',
                content: 'Working with Le Duy Hoang Dung was an absolute pleasure. His attention to detail and technical expertise helped us deliver an outstanding product on time.',
                rating: 5
              },
              {
                name: 'Jane Smith',
                role: 'CTO',
                company: 'StartupXYZ',
                content: 'Exceptional developer with a deep understanding of modern web technologies. Highly recommend for any complex project.',
                rating: 5
              },
              {
                name: 'Mike Johnson',
                role: 'Lead Developer',
                company: 'Dev Agency',
                content: 'Professional, reliable, and always willing to go the extra mile. The code quality is excellent and the communication is top-notch.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <AnimatedCard
                key={index}
                animationType="scaleIn"
                animationDelay={index * 150}
                className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl relative overflow-hidden group"
              >
                <motion.div 
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <Quote className="w-12 h-12 text-purple-400/30 dark:text-purple-500/30 mb-4 relative z-10" />
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed relative z-10">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="relative z-10">
                  <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </motion.section> */}

      {/* Enhanced Contact Section */}
      <motion.section 
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50/50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ scale: [1.3, 1, 1.3], opacity: [0.2, 0.1, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6 lg:mb-8 tracking-tight px-4"
            >
              {t('contactTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light px-4"
            >
              {t('contactDescription')}
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 px-4">
            {/* Enhanced contact info */}
            <motion.div variants={fadeInUp} className="space-y-8">
              {[
                { icon: Mail, label: t('email'), value: 'work@hdung7903.me', href: 'mailto:work@hdung7903.me', color: 'from-red-500 to-pink-600' },
                { icon: MapPin, label: t('location'), value: 'Hanoi, Vietnam', href: '#', color: 'from-blue-500 to-cyan-600' }
              ].map((contact) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  whileHover={{ scale: 1.02, y: -5 }}
                  variants={fadeInUp}
                  className="flex items-center p-5 sm:p-6 lg:p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl group touch-manipulation"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${contact.color} rounded-xl sm:rounded-2xl mr-4 sm:mr-6 flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <contact.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">{contact.label}</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 break-words">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
            
            {/* Enhanced contact form */}
            <motion.div variants={fadeInUp}>
              <ContactForm
                translations={{
                  yourName: t('yourName'),
                  yourEmail: t('yourEmail'),
                  yourMessage: t('yourMessage'),
                  sendMessage: t('sendMessage'),
                  sending: t('sending'),
                  success: t('success'),
                  error: t('error'),
                  nameRequired: t('nameRequired'),
                  emailRequired: t('emailRequired'),
                  emailInvalid: t('emailInvalid'),
                  messageRequired: t('messageRequired'),
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-2xl"
          />
          <motion.div 
            animate={{ scale: [1.1, 1, 1.1], rotate: [360, 270, 180, 90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-10 w-28 h-28 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center md:justify-start mb-4"
              >
                <motion.div
                  animate={pulseAnimation}
                  className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl mr-4 flex items-center justify-center shadow-xl"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </motion.div>
              <p className="text-gray-400 font-light max-w-md">
                © {currentYear} {t('footerCopyright')}
              </p>
            </div>
            
            <div className="flex gap-6">
              {[
                { id: 'footer-github', icon: Github, href: 'https://github.com/hdung7903', color: 'hover:bg-gray-700', label: 'GitHub' },
                { id: 'footer-gitlab', icon: GitBranch, href: 'https://gitlab.com/hdung7903', color: 'hover:bg-orange-600', label: 'GitLab' },
                { id: 'footer-linkedin', icon: Linkedin, href: '#', color: 'hover:bg-blue-600', label: 'LinkedIn' },
                { id: 'footer-email', icon: Mail, href: 'mailto:work@hdung7903.me', color: 'hover:bg-red-600', label: 'Email' }
              ].map((social) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 360, y: -5 }}
                  transition={{ duration: 0.4 }}
                  className={`p-4 bg-gray-800/80 rounded-2xl ${social.color} transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-xl border border-gray-700/50 group relative overflow-hidden`}
                  aria-label={social.label}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <social.icon size={24} className="relative z-10" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
      </main>
    </div>
  );
}
