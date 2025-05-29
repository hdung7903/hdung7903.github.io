# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4. Features beautiful animations with Framer Motion and dynamic GitHub/GitLab repository integration.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, React 19, TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4
- **Smooth Animations**: Powered by Framer Motion
- **Dynamic Content**: Fetches repositories from GitHub and GitLab APIs
- **Multilingual Support**: Built-in internationalization (i18n)
- **Static Export**: Optimized for GitHub Pages deployment
- **Performance Optimized**: Lighthouse-ready with excellent Core Web Vitals

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React, Tabler Icons
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 🌐 Live Demo

Visit the live website: [https://hdung7903.github.io](https://hdung7903.github.io)

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/hdung7903/hdung7903.github.io.git
   cd hdung7903.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. **Push to main branch** - The GitHub Actions workflow will automatically:
   - Install dependencies
   - Build the Next.js application
   - Export static files
   - Deploy to GitHub Pages

2. **GitHub Pages Setup**:
   - Go to your repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: Select "gh-pages" (created automatically)
   - Path: "/ (root)"

### Manual Deployment

If you prefer manual deployment:

```bash
# Build and export
npm run build

# The static files will be in the 'out' directory
# Upload the contents of 'out' to your hosting provider
```

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. The portfolio fetches public repository data from GitHub and GitLab APIs.

### Customization

1. **Personal Information**: Update content in `src/app/page.tsx`
2. **GitHub/GitLab Usernames**: Change the default usernames in the state initialization
3. **Styling**: Modify Tailwind classes or extend the theme
4. **Languages**: Add new translations in `src/app/i18n.ts`

## 📁 Project Structure

```
portfolio-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/
│   ├── .nojekyll              # Prevents Jekyll processing
│   └── ...                    # Static assets
├── src/
│   └── app/
│       ├── globals.css        # Global styles
│       ├── i18n.ts           # Internationalization
│       ├── layout.tsx        # Root layout
│       └── page.tsx          # Main portfolio page
├── next.config.ts            # Next.js configuration
├── package.json             # Dependencies and scripts
└── tailwind.config.js       # Tailwind CSS configuration
```

## 🌟 Features Detail

### Repository Integration

The portfolio automatically fetches and displays your latest repositories from:
- **GitHub**: Public repositories with stars, forks, and language info
- **GitLab**: Public projects with similar metadata
- **Fallback Projects**: Displays sample projects if API calls fail

### Responsive Design

- Mobile-first responsive design
- Smooth animations and transitions
- Dark/light mode considerations
- Touch-friendly interactions

### Performance

- Static site generation for fast loading
- Optimized images and assets
- Minimal JavaScript bundle
- SEO-friendly markup

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build and export for production
- `npm run start` - Start production server (not needed for static export)
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Lucide React for beautiful icons
- GitHub Pages for free hosting

---

Made with ❤️ by [hdung7903](https://github.com/hdung7903)
