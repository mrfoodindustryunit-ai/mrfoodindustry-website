'use client'

import { ArrowLink } from '@/components/arrow-link'
import { LocalizedImage } from '@/components/localized-image'
import { QualityProcess } from '@/components/quality-process'
import { Reveal } from '@/components/reveal'
import { SectionIntro } from '@/components/section-intro'
import { useTranslation } from '@/lib/i18n'

export function QualitySection() {
  const { t } = useTranslation()
  return (
    <section aria-labelledby="quality-title" className="bg-gold py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <SectionIntro
            tone="gold"
            label={t('home.qualityLabel')}
            title={<span id="quality-title">{t('home.qualityTitle')}</span>}
            description={t('home.qualityDescription')}
          />
        </Reveal>

        <Reveal className="mt-16 sm:mt-24">
          <figure className="relative overflow-hidden rounded-[64px_64px_32px_32px] shadow-[0_40px_80px_-40px_rgb(16_44_35/0.6)] sm:rounded-[140px_140px_48px_48px]">
            <div className="relative aspect-[4/5] sm:aspect-[16/7]">
              <LocalizedImage
                src="/images/quality-samples.png"
                altKey="imageAlts.qualitySamples"
                fallbackAlt="Steel bowls of different feed ingredients and feed forms on a wooden table"
                fill
                sizes="(min-width: 1440px) 1376px, 100vw"
                className="object-cover"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <figcaption className="eyebrow absolute bottom-8 left-8 text-paper sm:bottom-12 sm:left-14">
              {t('quality.imageCaption')}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="mt-10 sm:mt-16">
          <QualityProcess />
        </Reveal>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-ink/75">
            {t('home.qualityFootnote')}
          </p>
          <ArrowLink href="/quality-nutrition">{t('home.exploreQuality')}</ArrowLink>
        </div>
      </div>
    </section>
  )
}
