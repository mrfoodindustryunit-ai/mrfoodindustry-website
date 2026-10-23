'use client'

import { Reveal } from '@/components/reveal'
import { SectionIntro } from '@/components/section-intro'
import { SupportRoutes } from '@/components/support-routes'
import { useTranslation } from '@/lib/i18n'

export function SupportSection() {
  const { t } = useTranslation()
  return (
    <section aria-labelledby="support-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <SectionIntro
            label={t('home.supportLabel')}
            title={<span id="support-title">{t('home.supportTitle')}</span>}
            accent={t('home.supportAccent')}
            description={t('home.supportDescription')}
          />
        </Reveal>
        <div className="mt-16 sm:mt-24">
          <SupportRoutes />
        </div>
      </div>
    </section>
  )
}
