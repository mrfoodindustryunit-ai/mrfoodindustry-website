import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EnquiryForm } from '@/components/enquiry-form'
import { Faq } from '@/components/faq'
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
        label="Contact MR Industries"
        title="Let's discuss your"
        accent="feed requirements."
        description="Product questions, selection help, availability or a general enquiry — tell us what you need and we will take it from there."
      />
      <section aria-label="Enquiry form" className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-3">
          <aside className="flex flex-col gap-6">
            <div className="rounded-[28px_28px_80px_28px] bg-ink p-8 text-paper">
              <p className="eyebrow text-[10px] text-gold-soft">Direct contact</p>
              {details.length > 0 ? (
                <dl className="mt-6">
                  {details.map((item) => (
                    <div key={item.label} className="border-t border-paper/15 py-4">
                      <dt className="eyebrow text-[10px] text-paper/60">{item.label}</dt>
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
                  Direct phone, email and WhatsApp details are being finalised and will appear here once confirmed. In
                  the meantime, prepare your enquiry with the form.
                </p>
              )}
            </div>
            <div className="rounded-[28px] border border-line p-8">
              <p className="eyebrow text-[10px] text-gold-deep">Helpful to include</p>
              <ul className="mt-5 grid gap-3 text-[15px] text-muted-ink">
                <li>Animal type and age or stage</li>
                <li>Approximate flock or herd size</li>
                <li>Product you are interested in</li>
                <li>Your town or district</li>
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
