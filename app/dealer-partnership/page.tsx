import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EnquiryForm } from '@/components/enquiry-form'
import { LocalizedText } from '@/components/localized-text'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import type { TranslationKey } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Dealer Partnership',
  description: 'Discuss dealer and distribution opportunities for MR Industries animal feed in your area.',
}

const points = [
  {
    code: '01',
    title: 'A focused range',
    text: 'Cattle feed for cows leads the range, alongside poultry, layer, and goat and sheep feed categories.',
  },
  {
    code: '02',
    title: 'Clear product information',
    text: 'Each product has its own page your customers can view, with enquiries routed back to MR Industries.',
  },
  {
    code: '03',
    title: 'A conversation first',
    text: 'Terms, areas and supply arrangements are discussed directly. Tell us about your business to begin.',
  },
]

export default function DealerPage() {
  return (
    <>
      <PageHero
        label={<LocalizedText path="dealer.label" fallback="Dealer partnership" />}
        title={<LocalizedText path="dealer.heroTitle" fallback="Build a feed business" />}
        accent={<LocalizedText path="dealer.heroAccent" fallback="with MR Industries." />}
        description={<LocalizedText path="dealer.description" fallback="We welcome conversations with feed dealers, agri-input retailers and distributors interested in the MR Industries range." />}
        image={{
          src: '/images/partnership-shed.png',
          alt: 'Broiler chickens inside an open-sided poultry shed at dusk',
          altKey: 'dealer.imageAlt',
          caption: 'Trust / Partnership / Shared growth',
          captionKey: 'dealer.imageCaption',
        }}
      />
      <section aria-labelledby="dealer-points" className="bg-gold py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <h2 id="dealer-points" className="headline max-w-3xl text-5xl text-ink sm:text-6xl">
            <LocalizedText path="dealer.pointsTitle" fallback="What a partnership" />{' '}
            <em className="italic"><LocalizedText path="dealer.pointsAccent" fallback="starts with." /></em>
          </h2>
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {points.map((point, index) => (
              <li key={point.code}>
                <Reveal delay={index * 100} className="h-full">
                  <article className="h-full rounded-[28px_28px_80px_28px] bg-ink p-8 text-paper">
                    <span className="headline text-4xl tracking-normal text-gold-soft">{point.code}</span>
                    <h3 className="headline mt-10 text-3xl">
                      <LocalizedText path={`dealer.points.${index}.title` as TranslationKey} fallback={point.title} />
                    </h3>
                    <p className="mt-4 leading-relaxed text-paper/70">
                      <LocalizedText path={`dealer.points.${index}.text` as TranslationKey} fallback={point.text} />
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm text-ink/70">
            <LocalizedText path="dealer.note" fallback="We do not publish commission, margin or territory terms on this website — these are discussed individually." />
          </p>
        </div>
      </section>
      <section id="dealer-enquiry" aria-labelledby="dealer-form-title" className="scroll-mt-28 bg-paper py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-3">
          <div>
            <p className="eyebrow text-ink"><LocalizedText path="dealer.formLabel" fallback="// Dealer enquiry" /></p>
            <h2 id="dealer-form-title" className="headline mt-8 text-5xl text-ink sm:text-6xl">
              <LocalizedText path="dealer.sectionTitle" fallback="Tell us about" />{' '}
              <em className="italic text-gold-deep"><LocalizedText path="dealer.sectionAccent" fallback="your business." /></em>
            </h2>
          </div>
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="h-[36rem]" />}>
              <EnquiryForm variant="dealer" />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}
