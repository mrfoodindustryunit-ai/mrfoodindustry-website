import Image from 'next/image'
import { ArrowLink } from '@/components/arrow-link'
import { QualityProcess } from '@/components/quality-process'
import { Reveal } from '@/components/reveal'
import { SectionIntro } from '@/components/section-intro'

export function QualitySection() {
  return (
    <section aria-labelledby="quality-title" className="bg-gold py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <SectionIntro
            tone="gold"
            label="Quality & nutrition"
            title={<span id="quality-title">Quality begins with the right decisions.</span>}
            description="From ingredient selection through nutrition, processing and storage, each consideration has a practical role in how feed performs on the farm."
          />
        </Reveal>

        <Reveal className="mt-16 sm:mt-24">
          <figure className="relative overflow-hidden rounded-[64px_64px_32px_32px] shadow-[0_40px_80px_-40px_rgb(16_44_35/0.6)] sm:rounded-[140px_140px_48px_48px]">
            <div className="relative aspect-[4/5] sm:aspect-[16/7]">
              <Image
                src="/images/quality-samples.png"
                alt="Steel bowls of different feed ingredients and feed forms on a wooden table"
                fill
                sizes="(min-width: 1440px) 1376px, 100vw"
                className="object-cover"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <figcaption className="eyebrow absolute bottom-8 left-8 text-paper sm:bottom-12 sm:left-14">
              Raw material / Nutrition / Storage
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="mt-10 sm:mt-16">
          <QualityProcess />
        </Reveal>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-ink/75">
            These are the considerations behind good feed. Steps marked &ldquo;where applicable&rdquo; or &ldquo;where
            verified&rdquo; depend on the product and are confirmed on enquiry.
          </p>
          <ArrowLink href="/quality-nutrition">Explore quality & nutrition</ArrowLink>
        </div>
      </div>
    </section>
  )
}
