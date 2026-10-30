'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { products } from '@/lib/products'
import { hasEmail, hasPhone, hasWhatsApp, siteConfig } from '@/lib/site-config'
import { productCopyKey } from './product-copy'
import { Wordmark } from './wordmark'

export function SiteFooter() {
  const { contact, social } = siteConfig
  const { t, locale } = useTranslation()

  const columns = [
    {
      title: t('footer.livestockFeed'),
      links: products
        .filter((product) => product.category === 'goat-sheep' || product.category === 'cattle')
        .map((product) => ({
          label: product.slug === 'cattle-feed'
            ? t('cattle.name')
            : locale === 'kn' && productCopyKey(product.slug, 'name')
              ? t(productCopyKey(product.slug, 'name')!)
              : product.name,
          href: `/products/${product.slug}`,
        })),
      secondTitle: t('footer.company'),
      secondLinks: [
        { label: t('nav.about'), href: '/about' },
        { label: t('nav.quality'), href: '/quality-nutrition' },
      ],
    },
    {
      title: t('footer.poultryFeed'),
      links: products
        .filter((product) => product.category !== 'goat-sheep' && product.category !== 'cattle')
        .map((product) => ({
          label: locale === 'kn' && productCopyKey(product.slug, 'name')
            ? t(productCopyKey(product.slug, 'name')!)
            : product.name,
          href: `/products/${product.slug}`,
        })),
    },
    {
      title: t('footer.usefulLinks'),
      links: [
        { label: t('nav.allProducts'), href: '/products' },
        { label: t('nav.support'), href: '/farmer-support' },
        { label: t('nav.dealer'), href: '/dealer-partnership' },
        { label: t('nav.contact'), href: '/contact' },
      ],
    },
  ]

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark tone="light" size="lg" />
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-paper/65">
              {t('about.description')}
            </p>
            <dl className="mt-8 grid gap-3 text-sm">
              {contact.address ? (
                <div className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="font-bold text-gold-soft">{t('footer.address')}</dt>
                  <dd className="whitespace-pre-line text-paper/70">{contact.address}</dd>
                </div>
              ) : null}
              {hasEmail ? (
                <div className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="font-bold text-gold-soft">{t('footer.email')}</dt>
                  <dd>
                    <a href={`mailto:${contact.email}`} className="hover:text-gold-soft">
                      {contact.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {hasPhone ? (
                <div className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="font-bold text-gold-soft">{t('footer.phone')}</dt>
                  <dd>
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-gold-soft">
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {hasWhatsApp ? (
                <div className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="font-bold text-gold-soft">{t('footer.whatsapp')}</dt>
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
              {t('footer.sendEnquiry')} <ArrowUpRight aria-hidden="true" className="size-3.5" />
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
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-paper/45">{t('footer.connect')}</h2>
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
          <p>{t('footer.copyright', { year: String(new Date().getFullYear()) })}</p>
          <p>{t('footer.tagline')}</p>
          <a href="#top" className="hover:text-gold-soft">
            {t('footer.backToTop')}
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
