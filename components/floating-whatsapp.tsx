'use client'

import { hasWhatsApp, siteConfig } from '@/lib/site-config'

export function FloatingWhatsApp() {
  if (!hasWhatsApp) return null

  const whatsappLink = `https://wa.me/${siteConfig.contact.whatsapp}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30"
    >
      <span className="sr-only">Chat on WhatsApp</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-current">
        <path d="M19.05 4.95A9.93 9.93 0 0 0 12 2a9.94 9.94 0 0 0-8.61 15.18L2 22l4.9-1.3A9.94 9.94 0 1 0 19.05 4.95Zm-7.05 14.4c-1.5 0-2.97-.41-4.26-1.19l-.31-.18-2.9.77.77-2.83-.2-.29A8.17 8.17 0 0 1 3.8 12a8.2 8.2 0 1 1 8.2 8.2Zm4.48-6.12c-.25-.12-1.47-.72-1.7-.81-.23-.09-.4-.12-.57.12-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.57-1.38-.78-1.89-.2-.5-.41-.43-.57-.43h-.49c-.17 0-.43.06-.66.31-.23.25-.88.86-.88 2.1s.9 2.43.1 3.74c.08.13.36.53.87 1.08.61.55 1.42.89 1.66.96.25.08.42.07.58-.04.17-.11.67-.39.81-.78.14-.36.28-.3.48-.18.2.12 1.31.62 1.54.74.23.12.38.17.44.27.06.1.06.58-.18 1.13Z" />
      </svg>
    </a>
  )
}
