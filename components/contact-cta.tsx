import Image from 'next/image'
import { ArrowLink } from '@/components/arrow-link'
import { Marquee } from '@/components/marquee'
import { hasWhatsApp, siteConfig } from '@/lib/site-config'

export function ContactCta() {
  return (
    <section aria-labelledby="contact-cta-title" className="relative isolate overflow-hidden bg-ink text-paper">
      <Image src="/images/contact-field.png" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-forest/80 via-ink/70 to-ink/95" />

      <div className="mx-auto max-w-5xl px-5 pb-20 pt-24 text-center sm:px-8 sm:pt-32">
        <p className="eyebrow text-gold-soft">{'// Contact MR Industries'}</p>
        <h2 id="contact-cta-title" className="headline mt-8 text-balance text-5xl sm:text-7xl lg:text-[6rem]">
          Let&apos;s discuss your <em className="italic text-gold-soft">feed requirements.</em>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-paper/75">
          Tell us about your animals, your farm or your business, and we will take the conversation from there.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <ArrowLink href="/contact?topic=product">Product enquiry</ArrowLink>
          <ArrowLink href="/dealer-partnership#dealer-enquiry" variant="paper">
            Dealer enquiry
          </ArrowLink>
          <ArrowLink href="/contact" variant="paper">
            General contact
          </ArrowLink>
          {hasWhatsApp ? (
            <ArrowLink href={`https://wa.me/${siteConfig.contact.whatsapp}`} variant="paper" external>
              WhatsApp
            </ArrowLink>
          ) : null}
        </div>
      </div>
      <Marquee className="border-paper/15 bg-transparent" />
    </section>
  )
}
