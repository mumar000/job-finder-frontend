import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/hooks/use-auth'
import { ToastProvider } from '@/hooks/use-toast'
import './globals.css'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'),
  title: {
    default: 'Job Finder - Smart Freelance Job Aggregator',
    template: '%s | Job Finder'
  },
  description: 'AI-powered job matching platform for freelancers. Find high-quality Upwork jobs that match your skills and preferences.',
  keywords: ['freelance', 'jobs', 'upwork', 'AI matching', 'job finder', 'remote work', 'freelancing'],
  authors: [{ name: 'Job Finder Team' }],
  creator: 'Job Finder',
  publisher: 'Job Finder',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
    title: 'Job Finder - Smart Freelance Job Aggregator',
    description: 'AI-powered job matching platform for freelancers. Find high-quality Upwork jobs that match your skills and preferences.',
    siteName: 'Job Finder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Job Finder - Smart Freelance Job Aggregator',
    description: 'AI-powered job matching platform for freelancers',
    creator: '@jobfinder',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
