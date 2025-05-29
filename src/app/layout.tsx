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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
