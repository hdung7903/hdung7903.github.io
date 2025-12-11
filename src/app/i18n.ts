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
    heroTitlePart1: 'Software',
    heroTitlePart2: 'Engineer',
    heroDescription: 'I am Le Duy Hoang Dung, a Software Engineer passionate about creating innovative solutions with JavaScript, TypeScript, Java, React, Node.js, Next.js, and NestJS.',
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
    portfolioShowcase: 'Portfolio Showcase',
    myWorkTitle: 'My',
    featuredWorkTitle: 'Featured',
    workTitle: 'Work',
    projectsShowcaseDescription: 'A collection of my recent projects showcasing modern development practices and innovative solutions',
    projectsDescriptionWithRepos: 'Recent projects from my GitHub and GitLab repositories',
    projectsDescriptionFallback: 'Some of my featured projects',
    enterGithubUsername: 'Enter your GitHub username',
    enterGitlabUsername: 'Enter your GitLab username',
    githubUsername: 'GitHub Username',
    gitlabUsername: 'GitLab Username',
    loadRepos: 'Load Repos',
    refreshRepos: 'Refresh Repositories',
    allProjects: 'All Projects',
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
    sending: 'Sending...',
    success: 'Message sent successfully!',
    error: 'Failed to send message. Please try again.',
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    messageRequired: 'Message is required',
    
    // Experience Section
    experienceTitle: 'Experience',
    experienceDescription: 'My professional journey and achievements',
    current: 'Current',
    
    // Testimonials Section
    testimonialsTitle: 'Testimonials',
    testimonialsDescription: 'What people say about working with me',
    
    // Education Section
    educationTitle: 'Education',
    educationDescription: 'My academic background and qualifications',
    degree: 'Degree',
    university: 'University',
    graduationYear: 'Graduation Year',
    
    // Certifications Section
    certificationsTitle: 'Certifications',
    certificationsDescription: 'Professional certifications and achievements',
    issuedBy: 'Issued by',
    issuedDate: 'Issued Date',
    viewCertificate: 'View Certificate',
    
    // Project Filter
    filterByTech: 'Filter by Technology',
    clearFilters: 'Clear Filters',
    allTechnologies: 'All Technologies',
    noProjectsFound: 'No projects found with selected filters',
    
    // Blog Section
    blogTitle: 'Latest Articles',
    blogDescription: 'Thoughts, tutorials, and insights about web development',
    readMore: 'Read More',
    readTime: 'min read',
    
    // Newsletter
    newsletterTitle: 'Stay Updated',
    newsletterDescription: 'Get the latest updates and articles delivered to your inbox',
    subscribe: 'Subscribe',
    emailPlaceholder: 'Enter your email',
    subscribeSuccess: 'Successfully subscribed!',
    subscribeError: 'Failed to subscribe. Please try again.',
    
    // Footer
    footerCopyright: 'Le Duy Hoang Dung - Software Engineer Portfolio. All rights reserved.',
  },
  vi: {
    // Metadata
    metaTitle: 'Lê Duy Hoàng Dũng - Portfolio Kỹ sư phần mềm',
    metaDescription: 'Portfolio chuyên nghiệp của Lê Duy Hoàng Dũng, một kỹ sư phần mềm có kỹ năng chuyên về JavaScript, TypeScript, Java, React, Node.js, Next.js và NestJS',
    
    // Navigation
    about: 'Giới Thiệu',
    skills: 'Kỹ Năng',
    projects: 'Dự Án',
    contact: 'Liên Hệ',
    
    // Hero Section
    fullName: 'Lê Duy Hoàng Dũng',
    heroTitle: 'Kỹ sư phần mềm',
    heroTitlePart1: 'Kỹ sư',
    heroTitlePart2: 'phần mềm',
    heroDescription: 'Tôi là Lê Duy Hoàng Dũng, một Kỹ sư phần mềm đam mê tạo ra những giải pháp sáng tạo với JavaScript, TypeScript, Java, React, Node.js, Next.js và NestJS.',
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
    portfolioShowcase: 'Giới Thiệu Portfolio',
    myWorkTitle: 'Các Công Trình',
    featuredWorkTitle: 'Nổi Bật',
    workTitle: 'Của Tôi',
    projectsShowcaseDescription: 'Bộ sưu tập các dự án gần đây của tôi thể hiện các phương pháp phát triển hiện đại và giải pháp sáng tạo',
    projectsDescriptionWithRepos: 'Các dự án gần đây từ kho GitHub của tôi',
    projectsDescriptionFallback: 'Một số dự án nổi bật của tôi',
    enterGithubUsername: 'Nhập tên người dùng GitHub',
    enterGitlabUsername: 'Nhập tên người dùng GitLab',
    githubUsername: 'Tên người dùng GitHub',
    gitlabUsername: 'Tên người dùng GitLab',
    loadRepos: 'Tải Repo',
    refreshRepos: 'Làm mới Repositories',
    allProjects: 'Tất Cả Dự Án',
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
    sending: 'Đang gửi...',
    success: 'Gửi tin nhắn thành công!',
    error: 'Gửi tin nhắn thất bại. Vui lòng thử lại.',
    nameRequired: 'Tên là bắt buộc',
    emailRequired: 'Email là bắt buộc',
    emailInvalid: 'Vui lòng nhập địa chỉ email hợp lệ',
    messageRequired: 'Tin nhắn là bắt buộc',
    
    // Experience Section
    experienceTitle: 'Kinh Nghiệm',
    experienceDescription: 'Hành trình chuyên nghiệp và thành tựu của tôi',
    current: 'Hiện tại',
    
    // Testimonials Section
    testimonialsTitle: 'Lời Chứng Thực',
    testimonialsDescription: 'Những gì mọi người nói về việc làm việc với tôi',
    
    // Education Section
    educationTitle: 'Học Vấn',
    educationDescription: 'Nền tảng học vấn và bằng cấp của tôi',
    degree: 'Bằng Cấp',
    university: 'Trường Đại Học',
    graduationYear: 'Năm Tốt Nghiệp',
    
    // Certifications Section
    certificationsTitle: 'Chứng Chỉ',
    certificationsDescription: 'Chứng chỉ chuyên nghiệp và thành tựu',
    issuedBy: 'Cấp bởi',
    issuedDate: 'Ngày Cấp',
    viewCertificate: 'Xem Chứng Chỉ',
    
    // Project Filter
    filterByTech: 'Lọc theo Công Nghệ',
    clearFilters: 'Xóa Bộ Lọc',
    allTechnologies: 'Tất Cả Công Nghệ',
    noProjectsFound: 'Không tìm thấy dự án với bộ lọc đã chọn',
    
    // Blog Section
    blogTitle: 'Bài Viết Mới Nhất',
    blogDescription: 'Suy nghĩ, hướng dẫn và hiểu biết về phát triển web',
    readMore: 'Đọc Thêm',
    readTime: 'phút đọc',
    
    // Newsletter
    newsletterTitle: 'Cập Nhật',
    newsletterDescription: 'Nhận các cập nhật và bài viết mới nhất được gửi đến hộp thư của bạn',
    subscribe: 'Đăng Ký',
    emailPlaceholder: 'Nhập email của bạn',
    subscribeSuccess: 'Đăng ký thành công!',
    subscribeError: 'Đăng ký thất bại. Vui lòng thử lại.',
    
    // Footer
    footerCopyright: 'Lê Duy Hoàng Dũng - Portfolio Kỹ sư phần mềm. Đã đăng ký bản quyền.',
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