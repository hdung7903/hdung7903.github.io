import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getMetadata, getDefaultLanguage } from "./i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata dynamically based on language
export async function generateMetadata(): Promise<Metadata> {
  // For now, we'll use the default language since this is server-side
  // In a full i18n setup, you would get the language from URL segments or headers
  const defaultLang = getDefaultLanguage();
  const { title, description } = getMetadata(defaultLang);
  
  return {
    title,
    description,
    keywords: "Le Duy Hoang Dung, Software Engineer, JavaScript, TypeScript, Java, React, Node.js, Next.js, NestJS, Portfolio, Web Developer, Lê Duy Hoàng Dũng, Kỹ sư phần mềm",
    authors: [{ name: "Le Duy Hoang Dung" }],
    creator: "Le Duy Hoang Dung",
    openGraph: {
      title,
      description,
      type: "website",
      locale: defaultLang === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: defaultLang === 'vi' ? 'en_US' : 'vi_VN',
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="canonical" href="https://hdung7903.me" />
        <link rel="preconnect" href="https://gitlab.com" />
        <link rel="dns-prefetch" href="https://gitlab.com" />
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Theme initialization
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
                
                // 301 redirect for www/non-www subdomain (choose canonical domain)
                const hostname = window.location.hostname;
                const canonicalDomain = 'hdung7903.me'; // Change to 'www.hdung7903.me' if you prefer www
                if ((hostname === 'www.hdung7903.me' && canonicalDomain === 'hdung7903.me') ||
                    (hostname === 'hdung7903.me' && canonicalDomain === 'www.hdung7903.me')) {
                  const targetUrl = 'https://' + canonicalDomain + window.location.pathname + window.location.search + window.location.hash;
                  if (window.location.href !== targetUrl) {
                    window.location.replace(targetUrl);
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
