'use client'

import { ArrowLink } from '@/components/arrow-link'
import { LocalizedImage } from '@/components/localized-image'
import { Reveal } from '@/components/reveal'
import { useTranslation } from '@/lib/i18n'

export function AboutTeaser() {
  const { t } = useTranslation()
  return (
    <section aria-labelledby="about-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[140px_140px_40px_40px] shadow-[0_40px_80px_-40px_rgb(16_44_35/0.5)]">
            <LocalizedImage
              src="/images/about-farm.png"
              altKey="imageAlts.aboutFarm"
              fallbackAlt="A farmer hand-feeding laying hens outside a rural farm in morning light"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="eyebrow absolute bottom-8 left-8 rounded-full bg-paper-light/85 px-4 py-2 text-[10px] font-bold text-forest backdrop-blur">
              {t('imageAlts.illustrative')}
            </span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow text-ink">{t('home.aboutBadge')}</p>
          <h2 id="about-title" className="headline mt-8 text-balance text-[2.75rem] text-ink sm:text-6xl lg:text-[5rem]">
            {t('home.aboutTitle')} <em className="italic text-gold-deep">{t('home.aboutAccent')}</em>
          </h2>
          <p className="mt-8 max-w-xl text-pretty text-xl leading-relaxed text-muted-ink">
            {t('home.aboutDescription')}
          </p>
          <ArrowLink href="/about" className="mt-10">
            {t('common.aboutUs')}
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  )
}
