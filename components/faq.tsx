'use client'

import { useId, useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { SectionIntro } from './section-intro'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const { t, data } = useTranslation()
  const baseId = useId()
  const faqs = data('faq.questions') as Array<{ q: string; a: string }>

  return (
    <section aria-labelledby="faq-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionIntro
          label={t('faq.label')}
          title={<span id="faq-title">{t('faq.title')}</span>}
        />
        <div className="mt-16 border-t border-line sm:mt-24">
          {faqs.map((faq, index) => {
            const isOpen = open === index
            const buttonId = `${baseId}-q-${index}`
            const panelId = `${baseId}-a-${index}`
            return (
              <div key={faq.q} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-8 text-left text-xl font-bold text-ink transition-colors hover:text-forest-bright sm:text-[2rem] sm:leading-tight"
                  >
                    {faq.q}
                    <span aria-hidden="true" className="relative size-6 shrink-0">
                      <span className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-forest" />
                      <span
                        className={cn(
                          'absolute left-1/2 top-0 h-6 w-0.5 -translate-x-1/2 bg-forest transition-transform duration-300',
                          isOpen && 'scale-y-0',
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    'grid transition-[grid-template-rows] duration-500 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="max-w-4xl pb-9 text-pretty text-lg leading-relaxed text-muted-ink sm:text-[1.45rem]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
