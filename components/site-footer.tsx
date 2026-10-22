import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { products } from '@/lib/products'
import { hasEmail, hasPhone, hasWhatsApp, siteConfig } from '@/lib/site-config'
import { Wordmark } from './wordmark'

const columns = [
  {
    title: 'Poultry feed',
    links: products
      .filter((product) => product.category !== 'goat-sheep')
      .map((product) => ({ label: product.name, href: `/products/${product.slug}` })),
  },
  {
    title: 'Livestock feed',
    links: [{ label: 'Goat & Sheep Feed', href: '/products/goat-sheep-feed' }],
    secondTitle: 'Company',
    secondLinks: [
      { label: 'About Us', href: '/about' },
      { label: 'Quality & Nutrition', href: '/quality-nutrition' },
    ],
  },
  {
    title: 'Useful links',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Farmer Support', href: '/farmer-support' },
      { label: 'Dealer Partnership', href: '/dealer-partnership' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export function SiteFooter() {
  const { contact, social } = siteConfig
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark tone="light" size="lg" />
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-paper/65">
              {siteConfig.description}
            </p>
            <dl className="mt-8 grid gap-3 text-sm">
              {contact.address ? (
                <div className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="font-bold text-gold-soft">Address</dt>
                  <dd className="text-paper/70">{contact.address}</dd>
                </div>
              ) : null}
              {hasEmail ? (
                <div className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="font-bold text-gold-soft">Email</dt>
                  <dd>
                    <a href={`mailto:${contact.email}`} className="hover:text-gold-soft">
                      {contact.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {hasPhone ? (
                <div className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="font-bold text-gold-soft">Phone</dt>
                  <dd>
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-gold-soft">
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {hasWhatsApp ? (
                <div className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="font-bold text-gold-soft">WhatsApp</dt>
                  <dd>
                    <a
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold-soft"
                    >
                      +{contact.whatsapp}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
            <Link
              href="/contact"
              className="eyebrow mt-8 inline-flex items-center gap-2 font-bold text-gold-soft hover:underline hover:underline-offset-4"
            >
              Send an enquiry <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-paper/45">{column.title}</h2>
                <ul className="mt-5 grid gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[15px] text-paper/85 transition-colors hover:text-gold-soft">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {column.secondTitle ? (
                  <>
                    <h2 className="mt-10 text-[10px] uppercase tracking-[0.2em] text-paper/45">{column.secondTitle}</h2>
                    <ul className="mt-5 grid gap-3">
                      {column.secondLinks?.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="text-[15px] text-paper/85 transition-colors hover:text-gold-soft">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            ))}
            {social.length > 0 ? (
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-paper/45">Connect</h2>
                <ul className="mt-5 grid gap-3">
                  {social.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[15px] uppercase hover:text-gold-soft">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-paper/15 py-6 text-[10px] uppercase tracking-[0.18em] text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${new Date().getFullYear()} MR Industries`}</p>
          <p>Better nutrition. Stronger farms.</p>
          <a href="#top" className="hover:text-gold-soft">
            {'Back to top ↑'}
          </a>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap px-5 text-center font-sans -mb-[2.2vw] text-[12.4vw] font-bold uppercase leading-[0.8] tracking-[-0.06em] text-paper sm:px-8"
      >
        MR Industries
      </p>
    </footer>
  )
}
