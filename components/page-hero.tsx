'use client'

import Image from 'next/image'
import { useTranslation, type TranslationKey } from '@/lib/i18n'
import { SectionIntro } from './section-intro'

type PageHeroProps = {
  label: React.ReactNode
  title: React.ReactNode
  accent?: React.ReactNode
  description?: React.ReactNode
  image?: { src: string; alt: string; altKey?: TranslationKey; caption?: string; captionKey?: TranslationKey }
  children?: React.ReactNode
}

export function PageHero({ label, title, accent, description, image, children }: PageHeroProps) {
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-36 sm:pb-24 sm:pt-44">
      <span
        aria-hidden="true"
        className="headline pointer-events-none absolute -right-6 -top-16 select-none text-[20rem] leading-none text-ink/[0.04] sm:text-[28rem]"
      >
        MR
      </span>
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionIntro as="h1" label={label} title={title} accent={accent} description={description}>
          {children}
        </SectionIntro>
        {image ? (
          <figure className="relative mt-16 overflow-hidden rounded-[64px_64px_32px_32px] shadow-[0_40px_80px_-40px_rgb(16_44_35/0.5)] sm:mt-24 sm:rounded-[140px_140px_48px_48px]">
            <div className="relative aspect-[4/3] sm:aspect-[16/6]">
              <Image src={image.src} alt={image.altKey ? t(image.altKey) : image.alt} fill priority sizes="100vw" className="object-cover" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            {image.caption ? (
              <figcaption className="eyebrow absolute bottom-8 left-8 text-paper sm:bottom-12 sm:left-14">
                {image.captionKey ? t(image.captionKey) : image.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </div>
    </section>
  )
}
