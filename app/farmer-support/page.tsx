import type { Metadata } from 'next'
import { ContactCta } from '@/components/contact-cta'
import { Faq } from '@/components/faq'
import { PageHero } from '@/components/page-hero'
import { SupportRoutes } from '@/components/support-routes'

export const metadata: Metadata = {
  title: 'Farmer Support',
  description: 'Product information, feed-category enquiries, product selection help and availability checks from MR Industries.',
}

const tips = [
  { title: 'Store feed dry', text: 'Keep bags off the floor, away from walls and in a dry, ventilated space.' },
  { title: 'Use the right stage', text: 'Follow the feed stage that matches the age and purpose of your animals.' },
  { title: 'Change gradually', text: 'When switching feeds, transition over several days where practical.' },
  { title: 'Provide clean water', text: 'Fresh, clean water should always be available alongside feed.' },
]

export default function FarmerSupportPage() {
  return (
    <>
      <PageHero
        label="Farmer support"
        title="Support for"
        accent="practical farming needs."
        description="Four simple routes to the answer you need — and some general feeding reminders that apply on most farms."
      />
      <section aria-label="Support routes" className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <SupportRoutes />
        </div>
      </section>
      <section aria-labelledby="tips-title" className="bg-ink py-24 text-paper sm:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <p className="eyebrow text-gold-soft">{'// General guidance'}</p>
          <h2 id="tips-title" className="headline mt-8 text-5xl sm:text-6xl">
            Good feeding <em className="italic text-gold-soft">habits.</em>
          </h2>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {tips.map((tip, index) => (
              <li key={tip.title} className="rounded-[28px_28px_80px_28px] border border-paper/15 bg-paper/[0.05] p-8">
                <span className="headline text-4xl tracking-normal text-gold-soft">{`0${index + 1}`}</span>
                <h3 className="headline mt-10 text-3xl">{tip.title}</h3>
                <p className="mt-3 leading-relaxed text-paper/70">{tip.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm text-paper/60">
            General information only. For animal health concerns, consult a qualified veterinarian.
          </p>
        </div>
      </section>
      <Faq />
      <ContactCta />
    </>
  )
}
