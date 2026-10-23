import type { Metadata } from 'next'
import { CattleNutritionIntro } from '@/components/cattle-nutrition-intro'
import { ContactCta } from '@/components/contact-cta'
import { FeedPathway } from '@/components/feed-pathway'
import { LocalizedText } from '@/components/localized-text'
import { PageHero } from '@/components/page-hero'
import { QualityProcess } from '@/components/quality-process'
import type { TranslationKey } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Quality & Nutrition',
  description:
    'How MR Industries thinks about animal feed quality: ingredient selection, nutritional balance, processing, packaging and storage.',
}

const principles = [
  {
    title: 'Nutrition matched to the animal',
    text: 'Feed is organised by animal and stage because a starting broiler, a laying hen and a growing goat have different nutritional needs.',
  },
  {
    title: 'Ingredients matter first',
    text: 'The quality of a feed begins with what goes into it, before any processing takes place.',
  },
  {
    title: 'Handling continues on the farm',
    text: 'Dry, ventilated storage and correct feeding practice help a feed perform as intended.',
  },
]

export default function QualityPage() {
  return (
    <>
      <PageHero
        label={<LocalizedText path="quality.label" fallback="Quality & nutrition" />}
        title={<LocalizedText path="quality.title" fallback="Quality begins with" />}
        accent={<LocalizedText path="quality.accent" fallback="the right decisions." />}
        description={<LocalizedText path="quality.description" fallback="A practical view of the considerations that shape good animal feed — from ingredient to farm." />}
        image={{
          src: '/images/quality-samples.png',
          alt: 'Steel bowls of different feed ingredients and feed forms on a wooden table',
          altKey: 'quality.heroAlt',
          caption: 'Raw material / Nutrition / Storage',
          captionKey: 'quality.imageCaption',
        }}
      />
      <section aria-labelledby="principles-title" className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <h2 id="principles-title" className="sr-only">
            <LocalizedText path="quality.principlesAria" fallback="Principles" />
          </h2>
          <ul className="grid border-t border-line md:grid-cols-3">
            {principles.map((principle, index) => (
              <li key={principle.title} className="border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <span className="eyebrow text-[10px] text-gold-deep">{`0${index + 1}`}</span>
                <h3 className="headline mt-6 text-3xl text-ink">
                  <LocalizedText path={`quality.principles.${index}.title` as TranslationKey} fallback={principle.title} />
                </h3>
                <p className="mt-4 leading-relaxed text-muted-ink">
                  <LocalizedText path={`quality.principles.${index}.text` as TranslationKey} fallback={principle.text} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CattleNutritionIntro />
      <section aria-labelledby="process-title" className="bg-gold py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <h2 id="process-title" className="headline mb-14 max-w-3xl text-5xl text-ink sm:text-6xl">
            <LocalizedText path="quality.processTitle" fallback="Six considerations," />{' '}
            <em className="italic"><LocalizedText path="quality.processAccent" fallback="ingredient to farm." /></em>
          </h2>
          <QualityProcess />
          <p className="mt-10 max-w-2xl text-sm text-ink/75">
            <LocalizedText path="quality.processNote" fallback="Testing and quality checks are applied where applicable and verified per product. Specific certifications or laboratory details are shared only once confirmed." />
          </p>
        </div>
      </section>
      <FeedPathway showCta={false} />
      <ContactCta />
    </>
  )
}
