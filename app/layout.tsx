import type { Metadata, Viewport } from 'next'
import { Fira_Sans, Gelasio, Noto_Sans_Kannada } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LocalizedText } from '@/components/localized-text'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FloatingWhatsApp } from '@/components/floating-whatsapp'
import { LanguageProvider } from '@/lib/i18n'
import './globals.css'

const gelasio = Gelasio({ subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'], variable: '--font-gelasio' })
const fira = Fira_Sans({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-fira' })
const kannada = Noto_Sans_Kannada({ subsets: ['kannada'], weight: ['400', '500', '700'], variable: '--font-kannada' })

export const metadata: Metadata = {
  title: {
    default: 'MR Industries | Animal Feed & Livestock Nutrition',
    template: '%s | MR Industries',
  },
  description:
    'Cattle feed for cows leads the MR Industries range, alongside feed for poultry, layer birds, goats and sheep.',
}

export const viewport: Viewport = {
  themeColor: '#f1efe6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" id="top" className={`${gelasio.variable} ${fira.variable} ${kannada.variable} bg-background`}>
      <body>
        <LanguageProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
          >
            <LocalizedText path="nav.skipToContent" fallback="Skip to content" />
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <FloatingWhatsApp />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
