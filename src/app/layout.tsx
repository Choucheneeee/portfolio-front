// src/app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import InstallPrompt from './InstallPrompt';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Better performance
});

export const metadata = {
  title: 'Mohamed Amine Chouchene - Full Stack Developer',
  description: 'Full Stack Developer specializing in React, Next.js, JavaScript, and modern web development.',
  keywords: 'Mohamed Amine Chouchene, Chouchene, full stack developer,Med Amine Chouchene,chouchene, Isima, ISI mahdia , Itbs ,chouchene github,choucheneeee ,med amine web developer,chouchene developer, amine chouchene , web developer, React developer, Next.js, JavaScript, portfolio, Tunisia developer',
  metadataBase: new URL('https://chouchene.azurewebsites.net'),
  authors: [{ name: 'Mohamed Amine Chouchene' }],
  creator: 'Mohamed Amine Chouchene',
  publisher: 'Mohamed Amine Chouchene',
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#0A192F',
  width: 'device-width',
  initialScale: 1,
}

// Inline critical CSS for above-the-fold content
const criticalCSS = `
  body { background-color: #0A192F; color: white; margin: 0; padding: 0; }
  .loading-spinner { border: 2px solid #64FFDA; border-top: 2px solid transparent; }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <link rel="dns-prefetch" href="https://chouchene.azurewebsites.net" />
      </head>
      <body>
        {children}
        <InstallPrompt />
      </body>
    </html>
  )
}