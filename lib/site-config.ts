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
    'Cattle feed for cows leads the MR Industries range, alongside feed for poultry, layer birds, goats and sheep.',
  contact: {
    email: '',
    phone: '+91 70220 32264',
    /** International format without "+" or spaces, e.g. 919876543210 */
    whatsapp: '917022032264',
    address: 'M R FOOD INDUSTRY UNIT\n\nNo. 51, Ground Floor,\nKarnataka Rice Mill,\nMayasandra Road, Opp. T V S Showroom,\nTuruvekere, Tumakuru District,\nKarnataka - 572227, India.',
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
