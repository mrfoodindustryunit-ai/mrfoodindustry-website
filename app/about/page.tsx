import type { Metadata } from 'next'
import { ContactCta } from '@/components/contact-cta'
import { LocalizedImage } from '@/components/localized-image'
import { LocalizedText } from '@/components/localized-text'
import { PageHero } from '@/components/page-hero'
import { PartnershipPaths } from '@/components/partnership-paths'
import type { TranslationKey } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Cattle feed for cows leads the MR Industries range, alongside poultry, layer, goat and sheep feed.',
}

const values = [
  { title: 'Focus', text: 'Cattle feed for cows is our main product, alongside poultry, layer, goat and sheep feed.' },
  { title: 'Clarity', text: 'Products organised by animal and stage, with straight answers on enquiry.' },
  { title: 'Practicality', text: 'Feed considered in the context of real farms, storage and feeding routines.' },
  { title: 'Partnership', text: 'Growing alongside the farmers and dealers who rely on our products.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        label={<LocalizedText path="about.label" fallback="About MR Industries" />}
        title={<LocalizedText path="about.title" fallback="Committed to" />}
        accent={<LocalizedText path="about.accent" fallback="animal nutrition." />}
        description={<LocalizedText path="about.description" fallback="Cattle feed for cows leads the MR Industries range, alongside poultry, layer, goat and sheep feed." />}
      />
      <section aria-labelledby="story-heading" className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[140px_140px_40px_40px]">
            <LocalizedImage
              src="/images/about-farm.png"
              altKey="imageAlts.aboutFarm"
              fallbackAlt="A farmer hand-feeding laying hens outside a rural farm in morning light"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-ink"><LocalizedText path="about.ourApproach" fallback="// Our approach" /></p>
            <h2 id="story-heading" className="headline mt-8 text-5xl text-ink sm:text-6xl">
              <LocalizedText path="about.storyTitle" fallback="Feed that fits" />{' '}
              <em className="italic text-gold-deep"><LocalizedText path="about.storyAccent" fallback="the farm." /></em>
            </h2>
            <div className="mt-8 grid gap-5 text-pretty text-lg leading-relaxed text-muted-ink">
              <p><LocalizedText path="about.storyText1" fallback="Every farm is different — the animals it keeps, their stage, how feed is stored and how it is given." /></p>
              <p><LocalizedText path="about.storyText2" fallback="Cattle feed for cows is our main product, alongside feed for poultry, layer birds, goats and sheep." /></p>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="values-title" className="bg-sage py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <h2 id="values-title" className="headline text-5xl text-ink sm:text-6xl">
            <LocalizedText path="about.valuesTitle" fallback="What we" />{' '}
            <em className="italic text-gold-deep"><LocalizedText path="about.valuesAccent" fallback="stand for." /></em>
          </h2>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => (
              <li
                key={value.title}
                className="rounded-[28px_28px_80px_28px] border border-paper-light bg-paper-light p-8 shadow-[0_30px_60px_-44px_rgb(16_44_35/0.5)]"
              >
                <span className="headline text-4xl tracking-normal text-gold-deep">{`0${index + 1}`}</span>
                <h3 className="headline mt-10 text-3xl text-ink">
                  <LocalizedText path={`about.values.${index}.title` as TranslationKey} fallback={value.title} />
                </h3>
                <p className="mt-3 leading-relaxed text-muted-ink">
                  <LocalizedText path={`about.values.${index}.text` as TranslationKey} fallback={value.text} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <PartnershipPaths />
      <ContactCta />
    </>
  )
}
