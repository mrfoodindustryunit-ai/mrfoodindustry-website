import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EnquiryForm } from '@/components/enquiry-form'
import { Faq } from '@/components/faq'
import { LocalizedText } from '@/components/localized-text'
import { PageHero } from '@/components/page-hero'
import { hasEmail, hasPhone, hasWhatsApp, siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact MR Industries about animal feed products, product selection, availability or dealer partnership.',
}

export default function ContactPage() {
  const { email, phone, whatsapp, address } = siteConfig.contact
  const details = [
    hasEmail ? { label: 'Email', value: email, href: `mailto:${email}` } : null,
    hasPhone ? { label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` } : null,
    hasWhatsApp ? { label: 'WhatsApp', value: `+${whatsapp}`, href: `https://wa.me/${whatsapp}` } : null,
    address ? { label: 'Address', value: address } : null,
  ].filter((item) => item !== null)

  return (
    <>
      <PageHero
        label={<LocalizedText path="contact.label" fallback="Contact MR Industries" />}
        title={<LocalizedText path="contact.titleLine" fallback="Let's discuss your" />}
        accent={<LocalizedText path="contact.accent" fallback="feed requirements." />}
        description={<LocalizedText path="contact.description" fallback="Product questions, selection help, availability or a general enquiry — tell us what you need." />}
      />
      <section aria-labelledby="contact-form-heading" className="bg-paper pb-24 sm:pb-32">
        <h2 id="contact-form-heading" className="sr-only">
          <LocalizedText path="contact.formAria" fallback="Enquiry form" />
        </h2>
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-3">
          <aside className="flex flex-col gap-6">
            <div className="rounded-[28px_28px_80px_28px] bg-ink p-8 text-paper">
              <p className="eyebrow text-[10px] text-gold-soft">
                <LocalizedText path="contact.directContact" fallback="Direct contact" />
              </p>
              {details.length > 0 ? (
                <dl className="mt-6">
                  {details.map((item) => (
                    <div key={item.label} className="border-t border-paper/15 py-4">
                      <dt className="eyebrow text-[10px] text-paper/60">
                        <LocalizedText
                          path={item.label === 'Email' ? 'common.email' : item.label === 'Phone' ? 'common.phone' : item.label === 'WhatsApp' ? 'common.whatsapp' : 'common.address'}
                          fallback={item.label}
                        />
                      </dt>
                      <dd className="mt-1 text-lg">
                        {'href' in item && item.href ? (
                          <a href={item.href} className="hover:text-gold-soft">
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-6 text-pretty leading-relaxed text-paper/75">
                  <LocalizedText path="contact.info" fallback="Direct phone, email and WhatsApp details are being finalised. In the meantime, prepare your enquiry with the form." />
                </p>
              )}
            </div>
            <div className="rounded-[28px] border border-line p-8">
              <p className="eyebrow text-[10px] text-gold-deep">
                <LocalizedText path="contact.helpfulInclude" fallback="Helpful to include" />
              </p>
              <ul className="mt-5 grid gap-3 text-[15px] text-muted-ink">
                <li><LocalizedText path="contact.helpList.0" fallback="Animal type and age or stage" /></li>
                <li><LocalizedText path="contact.helpList.1" fallback="Approximate flock or herd size" /></li>
                <li><LocalizedText path="contact.helpList.2" fallback="Product you are interested in" /></li>
                <li><LocalizedText path="contact.helpList.3" fallback="Your town or district" /></li>
              </ul>
            </div>
          </aside>
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="h-[36rem]" />}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </section>
      <Faq />
    </>
  )
}
