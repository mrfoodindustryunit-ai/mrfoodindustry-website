/**
 * Central company configuration.
 * Fill in genuine contact details here — every enquiry form, CTA and the footer
 * read from this file. Leave a value empty ("") until the real detail is confirmed.
 */
export const siteConfig = {
  name: 'MR Industries',
  shortName: 'MR',
  tagline: 'Better Nutrition. Healthier Animals. Stronger Farms.',
  description:
    'Quality-focused animal feed solutions for poultry, layer birds, goats and sheep, designed around nutritional needs and practical farming requirements.',
  contact: {
    email: '',
    phone: '',
    /** International format without "+" or spaces, e.g. 919876543210 */
    whatsapp: '',
    address: '',
  },
  social: [] as { label: string; href: string }[],
}

export const hasEmail = Boolean(siteConfig.contact.email)
export const hasPhone = Boolean(siteConfig.contact.phone)
export const hasWhatsApp = Boolean(siteConfig.contact.whatsapp)
export const hasDirectContact = hasEmail || hasWhatsApp

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Quality & Nutrition', href: '/quality-nutrition' },
  { label: 'About Us', href: '/about' },
  { label: 'Farmer Support', href: '/farmer-support' },
  { label: 'Contact', href: '/contact' },
]

export const partnerLink = { label: 'Dealer Partnership', href: '/dealer-partnership' }
