import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Med Amine Chouchene - Full Stack Developer | Web Developer Portfolio',
  description: 'Med Amine Chouchene - Full Stack Developer specializing in React, Next.js, JavaScript, and modern web development. View my projects, skills, and experience.',
  keywords: 'Med Amine Chouchene, Chouchene, full stack developer, web developer, React developer, Next.js, JavaScript, portfolio, Tunisia developer',
  authors: [{ name: 'Med Amine Chouchene' }],
  creator: 'Med Amine Chouchene',
  publisher: 'Med Amine Chouchene',
  metadataBase: new URL('https://chouchene.azurewebsites.net'),
  openGraph: {
    title: 'Med Amine Chouchene - Full Stack Developer',
    description: 'Portfolio of Med Amine Chouchene - Full Stack Developer specializing in React, Next.js, and modern web technologies',
    url: 'https://chouchene.azurewebsites.net',
    siteName: 'Med Amine Chouchene Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Med Amine Chouchene - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Med Amine Chouchene - Full Stack Developer',
    description: 'Portfolio of Med Amine Chouchene - Full Stack Developer',
    images: ['/og-image.jpg'],
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Med Amine Chouchene",
              "url": "https://chouchene.azurewebsites.net",
              "image": "https://chouchene.azurewebsites.net/profile.jpg",
              "jobTitle": "Full Stack Developer",
              "description": "Full Stack Developer specializing in React, Next.js, JavaScript, and modern web technologies",
              "knowsAbout": [
                "React", "Next.js", "JavaScript", "TypeScript", 
                "Node.js", "Web Development", "Full Stack Development",
                "Frontend Development", "Backend Development"
              ],
              "sameAs": [
                "https://github.com/Choucheneeee",
                "https://www.linkedin.com/in/chouchene-med-amine",
                
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}