'use client'

import { ArrowLink } from '@/components/arrow-link'
import { LocalizedImage } from '@/components/localized-image'
import { Marquee } from '@/components/marquee'
import { useTranslation } from '@/lib/i18n'
import { hasWhatsApp, siteConfig } from '@/lib/site-config'

export function ContactCta() {
  const { t } = useTranslation()
  return (
    <section aria-labelledby="contact-cta-title" className="relative isolate overflow-hidden bg-ink text-paper">
      <LocalizedImage src="/images/contact-field.png" altKey="imageAlts.contactField" fallbackAlt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-forest/80 via-ink/70 to-ink/95" />

      <div className="mx-auto max-w-5xl px-5 pb-20 pt-24 text-center sm:px-8 sm:pt-32">
        <p className="eyebrow text-gold-soft">{t('home.contactBadge')}</p>
        <h2 id="contact-cta-title" className="headline mt-8 text-balance text-5xl sm:text-7xl lg:text-[6rem]">
          {t('home.contactHeadline')} <em className="italic text-gold-soft">{t('home.contactAccent')}</em>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-paper/75">
          {t('home.contactText')}
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <ArrowLink href="/contact?topic=product">{t('home.contactCta')}</ArrowLink>
          <ArrowLink href="/dealer-partnership#dealer-enquiry" variant="paper">
            {t('home.dealerCta')}
          </ArrowLink>
          <ArrowLink href="/contact" variant="paper">
            {t('home.generalCta')}
          </ArrowLink>
          {hasWhatsApp ? (
            <ArrowLink href={`https://wa.me/${siteConfig.contact.whatsapp}`} variant="paper" external>
              {t('home.whatsapp')}
            </ArrowLink>
          ) : null}
        </div>
      </div>
      <Marquee className="border-paper/15 bg-transparent" />
    </section>
  )
}
