'use client';

import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
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
  Rocket
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { getTranslation, availableLanguages, getDefaultLanguage } from './i18n';

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

  // Get translation function
  const t = (key: string) => getTranslation(currentLanguage, key);

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

  const floatingAnimation = {
    y: [0, -30, 0],
    x: [0, 15, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
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
    { name: 'JavaScript', icon: Code, level: 95, color: 'from-yellow-400 via-orange-400 to-red-500', glow: 'shadow-yellow-500/25' },
    { name: 'TypeScript', icon: Code, level: 90, color: 'from-blue-400 via-indigo-500 to-purple-600', glow: 'shadow-blue-500/25' },
    { name: 'Java', icon: Code, level: 85, color: 'from-red-400 via-pink-500 to-purple-600', glow: 'shadow-red-500/25' },
    { name: 'React', icon: Globe, level: 95, color: 'from-cyan-400 via-blue-500 to-indigo-600', glow: 'shadow-cyan-500/25' },
    { name: 'Node.js', icon: Server, level: 90, color: 'from-green-400 via-emerald-500 to-teal-600', glow: 'shadow-green-500/25' },
    { name: 'Next.js', icon: Globe, level: 90, color: 'from-gray-600 via-gray-800 to-black', glow: 'shadow-gray-500/25' },
    { name: 'NestJS', icon: Server, level: 85, color: 'from-red-500 via-pink-600 to-rose-700', glow: 'shadow-red-500/25' },
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
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  }, [githubUsername, gitlabUsername]);

  // Fetch repos when component mounts or usernames change
  useEffect(() => {
    fetchAllRepos();
  }, [fetchAllRepos]);

  // Fallback projects if no repos available
  const fallbackProjects: Repository[] = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and TypeScript. Features include user authentication, payment processing, and admin dashboard.',
      topics: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
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
      topics: ['NestJS', 'TypeScript', 'MongoDB', 'WebSocket'],
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
      topics: ['Java', 'Spring Boot', 'Docker', 'RabbitMQ'],
      html_url: '#',
      homepage: '#',
      language: 'Java',
      stargazers_count: 12,
      forks_count: 5,
      updated_at: new Date().toISOString(),
      source: 'github'
    }
  ];

  const displayProjects = repos.length > 0 ? repos : fallbackProjects;
  
  // Filter projects based on active tab
  const filteredProjects = activeTab === 'all' 
    ? displayProjects 
    : displayProjects.filter(project => project.source === activeTab);

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'JavaScript': 'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500',
      'TypeScript': 'bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600',
      'Java': 'bg-gradient-to-r from-red-400 via-pink-500 to-purple-600',
      'Python': 'bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600',
      'React': 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600',
      'HTML': 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-600',
      'CSS': 'bg-gradient-to-r from-purple-400 via-pink-500 to-rose-600',
    };
    return colors[language || ''] || 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600';
  };

  const getSourceIcon = (source: 'github' | 'gitlab') => {
    return source === 'github' ? Github : GitBranch;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 relative overflow-x-hidden">
      {/* Enhanced animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, duration: 8 }
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-400/30 via-purple-400/20 to-pink-400/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2, duration: 10 }
          }}
          className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-r from-cyan-400/25 via-blue-400/30 to-indigo-400/25 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 4, duration: 12 }
          }}
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 via-pink-400/25 to-rose-400/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 6, duration: 14 }
          }}
          className="absolute bottom-10 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/20 via-teal-400/25 to-cyan-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Enhanced Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl z-50 border-b border-gray-200/30 dark:border-gray-700/30 shadow-xl shadow-gray-900/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <motion.div
                animate={pulseAnimation}
                className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl mr-3 flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </motion.div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-8">
                {[
                  { key: 'about', href: '#about' },
                  { key: 'skills', href: '#skills' },
                  { key: 'projects', href: '#projects' },
                  { key: 'contact', href: '#contact' }
                ].map((item) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="relative text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 font-semibold text-sm tracking-wide uppercase before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-600 before:to-purple-600 before:transition-all before:duration-300 hover:before:w-full"
                  >
                    {t(item.key)}
                  </motion.a>
                ))}
              </div>
              
              {/* Enhanced Language Selector */}
              <div className="relative">
                <motion.select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  whileHover={{ scale: 1.05 }}
                  className="appearance-none bg-white/90 dark:bg-gray-800/90 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent cursor-pointer backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.code.toUpperCase()}
                    </option>
                  ))}
                </motion.select>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
              <motion.div variants={fadeInUp}>
                <motion.span 
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-block text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 relative"
                >
                  ✨ Welcome to my digital world
                </motion.span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white leading-tight"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 tracking-tight"
                >
                  {t('fullName')}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block relative"
                >
                  <span className="relative z-10">{t('heroTitle').split(' ')[0]}</span>
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-2 left-0 h-4 bg-gradient-to-r from-blue-400/30 to-purple-400/30 -z-10"
                  />
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ delay: 1.2, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent transform-gpu"
                >
                  {t('heroTitle').split(' ')[1]}
                </motion.span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl font-light"
              >
                {t('heroDescription')}
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-6"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center gap-3 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <Download size={22} className="relative z-10" />
                  <span className="relative z-10">{t('downloadCV')}</span>
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group border-2 border-transparent bg-gradient-to-r from-blue-600 to-purple-600 p-[2px] rounded-2xl transition-all duration-500"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="bg-white dark:bg-gray-900 px-10 py-[18px] rounded-2xl font-bold text-gray-900 dark:text-white group-hover:bg-transparent group-hover:text-white transition-all duration-500 flex items-center gap-3">
                    <Rocket size={22} />
                    {t('viewProjects')}
                  </div>
                </motion.button>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex gap-6 pt-8"
              >
                {[
                  { icon: Github, href: 'https://github.com/hdung7903', color: 'hover:text-gray-900', bg: 'hover:bg-gray-100 dark:hover:bg-gray-800' },
                  { icon: GitBranch, href: 'https://gitlab.com/hdung7903', color: 'hover:text-orange-500', bg: 'hover:bg-orange-50 dark:hover:bg-orange-900/20' },
                  { icon: Linkedin, href: '#', color: 'hover:text-blue-600', bg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' },
                  { icon: Mail, href: 'mailto:work@hdung7903.me', color: 'hover:text-red-500', bg: 'hover:bg-red-50 dark:hover:bg-red-900/20' }
                ].map((social) => (
                  <motion.a
                    key={social.icon.toString()}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 360, y: -5 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`p-5 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl hover:shadow-2xl text-gray-700 dark:text-gray-300 ${social.color} ${social.bg} transition-all duration-500 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group`}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <social.icon size={24} className="relative z-10" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex justify-center items-center"
            >
              <div className="relative w-96 h-96">
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

                {/* Floating particles */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 100 - 50],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                    className={`absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-60`}
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                  />
                ))}
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
        className="py-32 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-900/50 backdrop-blur-xl relative overflow-hidden"
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
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight"
            >
              {t('aboutTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            >
              {t('aboutDescription')}
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: `${totalProjects}+`, subtitle: t('projectsCompleted'), icon: Code, color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' },
              { title: `${yearsOfExperience}+`, subtitle: t('yearsExperience'), icon: Globe, color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' }
            ].map((stat) => (
              <motion.div
                key={stat.title}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                }}
                className={`relative text-center p-10 bg-gradient-to-br ${stat.bg} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl overflow-hidden group`}
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg relative z-10`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h3 
                  className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 relative z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.title}
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium relative z-10">{stat.subtitle}</p>
              </motion.div>
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
        className="py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900/50 relative overflow-hidden"
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
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-8 tracking-tight"
            >
              {t('skillsTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light"
            >
              {t('skillsDescription')}
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: `0 25px 50px ${skill.glow}`
                }}
                className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl relative overflow-hidden group"
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                <div className="flex items-center mb-6 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-2xl mr-4 flex items-center justify-center shadow-lg`}
                  >
                    <skill.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{skill.name}</h3>
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
                    {skill.level}%
                  </motion.span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium relative z-10">
                  {skill.level}% {t('proficiency')}
                </p>
              </motion.div>
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
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight"
            >
              {t('projectsTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 font-light"
            >
              {repos.length > 0 ? t('projectsDescriptionWithRepos') : t('projectsDescriptionFallback')}
            </motion.p>
            
            {/* Enhanced Source Tabs */}
            <motion.div 
              variants={fadeInUp}
              className="flex justify-center mb-12"
            >
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-3 backdrop-blur-xl shadow-2xl border border-white/50 dark:border-gray-700/50">
                {[
                  { key: 'all', label: 'All', icon: Eye, color: 'from-gray-600 to-gray-800' },
                  { key: 'github', label: 'GitHub', icon: Github, color: 'from-gray-700 to-gray-900' },
                  { key: 'gitlab', label: 'GitLab', icon: GitBranch, color: 'from-orange-500 to-red-600' }
                ].map((tab) => (
                  <motion.button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as 'all' | 'github' | 'gitlab')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 rounded-2xl font-bold transition-all duration-500 flex items-center gap-3 mx-1 relative overflow-hidden ${
                      activeTab === tab.key
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-xl`
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80'
                    }`}
                  >
                    {activeTab === tab.key && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl"
                      />
                    )}
                    <tab.icon size={20} className="relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Repository Input Section */}
            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 uppercase tracking-wide">
                    <Github size={16} />
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    readOnly
                    className="w-full px-6 py-4 bg-white/90 dark:bg-gray-800/90 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium cursor-default"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 uppercase tracking-wide">
                    <GitBranch size={16} />
                    GitLab Username
                  </label>
                  <input
                    type="text"
                    value={gitlabUsername}
                    onChange={(e) => setGitlabUsername(e.target.value)}
                    placeholder="Enter GitLab username"
                    readOnly
                    className="w-full px-6 py-4 bg-white/90 dark:bg-gray-800/90 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium cursor-default"
                  />
                </div>
              </div>
              <motion.button
                onClick={fetchAllRepos}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-500 flex items-center gap-3 mx-auto font-bold shadow-xl"
              >
                <Zap size={20} />
                Refresh Repositories
              </motion.button>
            </motion.div>
          </motion.div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-32">
              <motion.div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-2 border-purple-600/30 border-b-purple-600 rounded-full"
                />
              </motion.div>
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              {filteredProjects.slice(0, 9).map((project) => {
                const SourceIcon = getSourceIcon(project.source);
                return (
                  <motion.div
                    key={`${project.source}-${project.id}`}
                    variants={fadeInUp}
                    whileHover={{ 
                      y: -15, 
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                    }}
                    className="bg-white/90 dark:bg-gray-800/90 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 group"
                  >
                    {/* Enhanced project header */}
                    <div className="h-56 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-purple-600/30"
                      />
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="text-white text-7xl drop-shadow-2xl"
                        >
                          🚀
                        </motion.div>
                      </div>
                      
                      {/* Enhanced badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className={`p-3 rounded-2xl backdrop-blur-xl ${
                            project.source === 'github' 
                              ? 'bg-gray-900/30 border border-gray-700/30' 
                              : 'bg-orange-500/30 border border-orange-400/30'
                          }`}
                        >
                          <SourceIcon size={18} className="text-white" />
                        </motion.div>
                      </div>
                      
                      {project.language && (
                        <div className="absolute top-4 right-4">
                          <motion.span 
                            whileHover={{ scale: 1.05 }}
                            className={`px-4 py-2 rounded-xl text-sm font-bold text-white backdrop-blur-xl ${getLanguageColor(project.language)} shadow-lg border border-white/20`}
                          >
                            {project.language}
                          </motion.span>
                        </div>
                      )}
                    </div>
                    
                    {/* Enhanced project content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3 font-light">
                        {project.description || t('noDescription')}
                      </p>
                      
                      {/* Enhanced topics */}
                      {project.topics.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-6">
                          {project.topics.slice(0, 3).map((topic) => (
                            <motion.span 
                              key={topic}
                              whileHover={{ scale: 1.05 }}
                              className="px-4 py-2 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 text-blue-800 dark:text-blue-200 rounded-xl text-sm font-bold border border-blue-200/50 dark:border-blue-700/50"
                            >
                              {topic}
                            </motion.span>
                          ))}
                          {project.topics.length > 3 && (
                            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl text-sm font-medium">
                              +{project.topics.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Enhanced stats */}
                      <div className="flex items-center justify-between mb-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-6">
                          <motion.span 
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center gap-2 font-medium"
                          >
                            <Star size={16} className="text-yellow-500" />
                            {project.stargazers_count}
                          </motion.span>
                          <motion.span 
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center gap-2 font-medium"
                          >
                            <GitFork size={16} className="text-blue-500" />
                            {project.forks_count}
                          </motion.span>
                        </div>
                        <span className="flex items-center gap-2 font-medium">
                          <Calendar size={16} />
                          {new Date(project.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {/* Enhanced action buttons */}
                      <div className="flex gap-4">
                        <motion.a
                          href={project.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white rounded-xl hover:shadow-xl transition-all duration-300 text-sm font-bold flex-1 justify-center"
                        >
                          <SourceIcon size={16} />
                          {t('code')}
                        </motion.a>
                        {project.homepage && (
                          <motion.a
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 text-sm font-bold flex-1 justify-center"
                          >
                            <ExternalLink size={16} />
                            {t('liveDemo')}
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Enhanced Contact Section */}
      <motion.section 
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50/50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden"
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
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight"
            >
              {t('contactTitle')}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light"
            >
              {t('contactDescription')}
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced contact info */}
            <motion.div variants={fadeInUp} className="space-y-8">
              {[
                { icon: Mail, label: t('email'), value: 'contact@hdung7903.me', href: 'mailto:contact@hdung7903.me', color: 'from-red-500 to-pink-600' },
                { icon: Phone, label: t('phone'), value: '+84 (xxx) xxx-xxxx', href: 'tel:+84xxxxxxxxx', color: 'from-green-500 to-emerald-600' },
                { icon: MapPin, label: t('location'), value: 'Vietnam', href: '#', color: 'from-blue-500 to-cyan-600' }
              ].map((contact) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  whileHover={{ scale: 1.02, y: -5 }}
                  variants={fadeInUp}
                  className="flex items-center p-8 bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl group"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl mr-6 flex items-center justify-center shadow-lg`}
                  >
                    <contact.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">{contact.label}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
            
            {/* Enhanced contact form */}
            <motion.div variants={fadeInUp}>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder={t('yourName')}
                      className="w-full px-6 py-4 bg-white/90 dark:bg-gray-800/90 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder={t('yourEmail')}
                      className="w-full px-6 py-4 bg-white/90 dark:bg-gray-800/90 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    rows={6}
                    placeholder={t('yourMessage')}
                    className="w-full px-6 py-4 bg-white/90 dark:bg-gray-800/90 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-5 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Zap size={20} />
                    {t('sendMessage')}
                  </span>
                </motion.button>
              </form>
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
                { icon: Github, href: 'https://github.com/hdung7903', color: 'hover:bg-gray-700', label: 'GitHub' },
                { icon: GitBranch, href: 'https://gitlab.com/hdung7903', color: 'hover:bg-orange-600', label: 'GitLab' },
                { icon: Linkedin, href: '#', color: 'hover:bg-blue-600', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:work@hdung7903.me', color: 'hover:bg-red-600', label: 'Email' }
              ].map((social) => (
                <motion.a
                  key={social.icon.toString()}
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
    </div>
  );
}
