import type { Metadata, Viewport } from 'next'
import { Fira_Sans, Gelasio } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const gelasio = Gelasio({ subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'], variable: '--font-gelasio' })
const fira = Fira_Sans({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-fira' })

export const metadata: Metadata = {
  title: {
    default: 'MR Industries | Animal Feed & Livestock Nutrition',
    template: '%s | MR Industries',
  },
  description:
    'Quality-focused animal feed for poultry, layer birds, goats and sheep. Explore the MR Industries broiler, layer and goat & sheep feed range.',
}

export const viewport: Viewport = {
  themeColor: '#f1efe6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" id="top" className={`${gelasio.variable} ${fira.variable} bg-background`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
