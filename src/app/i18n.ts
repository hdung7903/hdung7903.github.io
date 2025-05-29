// Internationalization interface
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Translation data
export const translations: Translations = {
  en: {
    // Metadata
    metaTitle: 'Le Duy Hoang Dung - Software Engineer Portfolio',
    metaDescription: 'Professional portfolio of Le Duy Hoang Dung, a skilled software engineer specializing in JavaScript, TypeScript, Java, React, Node.js, Next.js, and NestJS',
    
    // Navigation
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    
    // Hero Section
    fullName: 'Le Duy Hoang Dung',
    heroTitle: 'Software Engineer',
    heroDescription: 'Passionate about creating innovative solutions with JavaScript, TypeScript, Java, React, Node.js, Next.js, and NestJS.',
    downloadCV: 'Download CV',
    viewProjects: 'View Projects',
    
    // About Section
    aboutTitle: 'About Me',
    aboutDescription: "I'm Le Duy Hoang Dung, a passionate software engineer specializing in modern web technologies. I excel in building scalable applications using JavaScript, TypeScript, and Java ecosystems. My expertise spans from frontend development with React and Next.js to backend services with Node.js and NestJS.",
    projectsCompleted: 'Projects Completed',
    yearsExperience: 'Years Experience',
    happyClients: 'Happy Clients',
    
    // Skills Section
    skillsTitle: 'Core Technologies',
    skillsDescription: 'My main technology stack for building modern applications',
    proficiency: 'proficiency',
    
    // Projects Section
    projectsTitle: 'Featured Projects',
    projectsDescriptionWithRepos: 'Recent projects from my GitHub and GitLab repositories',
    projectsDescriptionFallback: 'Some of my featured projects',
    enterGithubUsername: 'Enter your GitHub username',
    enterGitlabUsername: 'Enter your GitLab username',
    loadRepos: 'Load Repos',
    refreshRepos: 'Refresh Repositories',
    allProjects: 'All',
    githubProjects: 'GitHub',
    gitlabProjects: 'GitLab',
    noDescription: 'No description available',
    code: 'Code',
    liveDemo: 'Live Demo',
    
    // Contact Section
    contactTitle: "Let's Work Together",
    contactDescription: "I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to collaborate!",
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourMessage: 'Your Message',
    sendMessage: 'Send Message',
    
    // Footer
    footerCopyright: 'Le Duy Hoang Dung - Software Engineer Portfolio. All rights reserved.',
  },
  vi: {
    // Metadata
    metaTitle: 'Lê Duy Hoàng Dũng - Portfolio Kỹ Sư Phần Mềm',
    metaDescription: 'Portfolio chuyên nghiệp của Lê Duy Hoàng Dũng, một kỹ sư phần mềm có kỹ năng chuyên về JavaScript, TypeScript, Java, React, Node.js, Next.js và NestJS',
    
    // Navigation
    about: 'Giới Thiệu',
    skills: 'Kỹ Năng',
    projects: 'Dự Án',
    contact: 'Liên Hệ',
    
    // Hero Section
    fullName: 'Lê Duy Hoàng Dũng',
    heroTitle: 'Kỹ Sư Phần Mềm',
    heroDescription: 'Đam mê tạo ra những giải pháp sáng tạo với JavaScript, TypeScript, Java, React, Node.js, Next.js và NestJS.',
    downloadCV: 'Tải CV',
    viewProjects: 'Xem Dự Án',
    
    // About Section
    aboutTitle: 'Giới Thiệu Về Tôi',
    aboutDescription: 'Tôi là Lê Duy Hoàng Dũng, một kỹ sư phần mềm đam mê chuyên về các công nghệ web hiện đại. Tôi xuất sắc trong việc xây dựng các ứng dụng có thể mở rộng sử dụng hệ sinh thái JavaScript, TypeScript và Java. Chuyên môn của tôi trải dài từ phát triển frontend với React và Next.js đến các dịch vụ backend với Node.js và NestJS.',
    projectsCompleted: 'Dự Án Hoàn Thành',
    yearsExperience: 'Năm Kinh Nghiệm',
    happyClients: 'Khách Hàng Hài Lòng',
    
    // Skills Section
    skillsTitle: 'Công Nghệ Cốt Lõi',
    skillsDescription: 'Bộ công nghệ chính của tôi để xây dựng các ứng dụng hiện đại',
    proficiency: 'thành thạo',
    
    // Projects Section
    projectsTitle: 'Dự Án Nổi Bật',
    projectsDescriptionWithRepos: 'Các dự án gần đây từ kho GitHub của tôi',
    projectsDescriptionFallback: 'Một số dự án nổi bật của tôi',
    enterGithubUsername: 'Nhập tên người dùng GitHub',
    enterGitlabUsername: 'Nhập tên người dùng GitLab',
    loadRepos: 'Tải Repo',
    refreshRepos: 'Làm mới Repositories',
    allProjects: 'Tất cả',
    githubProjects: 'GitHub',
    gitlabProjects: 'GitLab',
    noDescription: 'Không có mô tả',
    code: 'Mã Nguồn',
    liveDemo: 'Demo Trực Tiếp',
    
    // Contact Section
    contactTitle: 'Hãy Cùng Làm Việc',
    contactDescription: 'Tôi luôn quan tâm đến những cơ hội mới và các dự án thú vị. Hãy liên hệ nếu bạn muốn hợp tác!',
    email: 'Email',
    phone: 'Điện Thoại',
    location: 'Vị Trí',
    yourName: 'Tên Của Bạn',
    yourEmail: 'Email Của Bạn',
    yourMessage: 'Tin Nhắn Của Bạn',
    sendMessage: 'Gửi Tin Nhắn',
    
    // Footer
    footerCopyright: 'Lê Duy Hoàng Dũng - Portfolio Kỹ Sư Phần Mềm. Đã đăng ký bản quyền.',
  }
};

// Available languages
export const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
];

// Translation helper function
export const getTranslation = (language: string, key: string): string => {
  return translations[language]?.[key] || translations.en[key] || key;
};

// Check if language is supported
export const isSupportedLanguage = (language: string): boolean => {
  return availableLanguages.some(lang => lang.code === language);
};

// Get default language
export const getDefaultLanguage = (): string => {
  return 'en';
};

// Get metadata by language
export const getMetadata = (language: string = 'en') => {
  const lang = isSupportedLanguage(language) ? language : 'en';
  return {
    title: getTranslation(lang, 'metaTitle'),
    description: getTranslation(lang, 'metaDescription'),
  };
}; 