import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daily Better Journey - Become Better Every Single Day',
  description: 'Join a journey of growth, habits, and self-awareness that leads to the best version of you. Weekly insights, stories, and growth tips.',
  keywords: 'personal growth, self improvement, habits, mindfulness, self awareness, daily better journey',
  authors: [{ name: 'Daily Better Journey' }],
  openGraph: {
    title: 'Daily Better Journey - Become Better Every Single Day',
    description: 'Join a journey of growth, habits, and self-awareness that leads to the best version of you.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Daily Better Journey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Better Journey - Become Better Every Single Day',
    description: 'Join a journey of growth, habits, and self-awareness that leads to the best version of you.',
  },
  robots: {
    index: true,
    follow: true,
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
        {/* Google AdSense Script - ADD YOUR PUBLISHER ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
          data-nscript="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

