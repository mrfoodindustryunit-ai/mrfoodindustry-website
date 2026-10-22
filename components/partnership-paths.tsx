import Image from 'next/image'
import { TextArrowLink } from '@/components/arrow-link'
import { Reveal } from '@/components/reveal'
import { SectionIntro } from '@/components/section-intro'

export function PartnershipPaths() {
  return (
    <section aria-labelledby="paths-title" className="relative isolate overflow-hidden bg-ink py-24 sm:py-32">
      <Image src="/images/contact-field.png" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-forest/85 via-ink/80 to-ink" />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <SectionIntro
            tone="dark"
            label="Two ways to grow"
            title={<span id="paths-title">Support for farms.</span>}
            accent="Opportunity for dealers."
          />
        </Reveal>

        <Reveal className="mt-16 sm:mt-24">
          <figure className="relative overflow-hidden rounded-[64px_64px_32px_32px] sm:rounded-[140px_140px_48px_48px]">
            <div className="relative aspect-[4/5] sm:aspect-[16/7]">
              <Image
                src="/images/partnership-shed.png"
                alt="Broiler chickens inside an open-sided poultry shed at dusk"
                fill
                sizes="(min-width: 1440px) 1376px, 100vw"
                className="object-cover"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <figcaption className="eyebrow absolute bottom-8 left-8 text-paper sm:bottom-12 sm:left-14">
              Trust / Partnership / Shared growth
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full min-h-[28rem] flex-col rounded-[48px_48px_150px_48px] border border-paper/20 bg-paper/[0.05] p-8 text-paper backdrop-blur-md sm:p-14">
              <p className="eyebrow text-paper/80">For farmers</p>
              <h3 className="headline mt-auto pt-20 text-5xl leading-[0.95] sm:text-6xl">
                Find the right feed for your farm.
              </h3>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/70">
                Explore product information, identify the relevant feed category and contact MR Industries with your
                enquiry.
              </p>
              <TextArrowLink href="/products" className="mt-10 text-paper">
                Explore products
              </TextArrowLink>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="relative isolate flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[150px_48px_48px_48px] bg-gold p-8 text-ink sm:p-14">
              <div
                aria-hidden="true"
                className="absolute -left-24 -top-24 -z-10 size-96 rounded-full bg-gold-soft/80 blur-3xl"
              />
              <p className="eyebrow text-ink/75 sm:pl-6">For dealers</p>
              <h3 className="headline mt-auto pt-20 text-5xl leading-[0.95] sm:text-6xl">
                Build a feed business with MR Industries.
              </h3>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">
                Discuss potential dealer or distribution opportunities for MR Industries feed in your area.
              </p>
              <TextArrowLink href="/dealer-partnership" className="mt-10 text-ink">
                Become a dealer
              </TextArrowLink>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
