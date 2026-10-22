import Image from 'next/image'
import { ArrowLink } from '@/components/arrow-link'
import { Reveal } from '@/components/reveal'
import { SectionIntro } from '@/components/section-intro'

export function StorySection() {
  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <span
        aria-hidden="true"
        className="headline pointer-events-none absolute -right-8 -top-10 select-none text-[22rem] leading-none text-ink/[0.04] sm:text-[30rem]"
      >
        MR
      </span>
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <SectionIntro
            label="An animal feed company"
            title={<span id="story-title">Practical nutrition.</span>}
            accent="Focused on farm needs."
            description="MR Industries makes animal feed for poultry, layer birds, goats and sheep — a focused range organised by animal and stage, so farmers can find the right feed with fewer guesses."
          />
        </Reveal>

        <Reveal className="mt-16 sm:mt-24">
          <figure className="relative overflow-hidden rounded-[64px_64px_32px_32px] shadow-[0_40px_80px_-40px_rgb(16_44_35/0.5)] sm:rounded-[140px_140px_48px_48px]">
            <div className="relative aspect-[4/5] sm:aspect-[16/7]">
              <Image
                src="/images/story-grains.png"
                alt="A farmer's hands holding maize and feed grains above a jute sack"
                fill
                sizes="(min-width: 1440px) 1376px, 100vw"
                className="object-cover"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <figcaption className="eyebrow absolute bottom-8 left-8 text-paper sm:bottom-12 sm:left-14">
              Ingredients / Nutrition / Farm use
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-3">
          <div className="hidden lg:block" />
          <Reveal className="flex flex-col gap-10 lg:col-span-2 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-pretty text-2xl leading-snug text-muted-ink sm:text-[1.75rem]">
              Broiler, layer, and goat and sheep feed — each category presented clearly, with product information
              available on enquiry.
            </p>
            <ArrowLink href="/about" className="shrink-0 self-start lg:self-end">
              Read our story
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
