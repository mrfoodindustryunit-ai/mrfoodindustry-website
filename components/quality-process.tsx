'use client'

import { useTranslation } from '@/lib/i18n'

export function QualityProcess() {
  const { data } = useTranslation()
  const qualitySteps = data('quality.steps') as Array<{ step: string; title: string; text: string }>

  return (
    <div className="dot-grid relative overflow-hidden rounded-[40px_40px_100px_40px] bg-gradient-to-br from-forest via-[#0f3a2c] to-ink p-5 sm:p-12 lg:rounded-[56px_56px_150px_56px]">
      <div
        aria-hidden="true"
        className="absolute -left-20 -top-20 size-80 rounded-full bg-gold-soft/15 blur-3xl"
      />
      <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {qualitySteps.map((item) => (
          <li
            key={item.step}
            className="group relative rounded-[28px_28px_72px_28px] border border-paper/20 bg-paper/[0.06] p-7 text-paper backdrop-blur-md transition-colors duration-500 hover:border-gold-soft/60 hover:bg-paper/[0.1]"
          >
            <span aria-hidden="true" className="absolute right-8 top-8 size-2 rounded-full bg-gold-soft shadow-[0_0_14px_var(--gold-soft)]" />
            <span className="headline block text-4xl tracking-normal text-gold-soft">{item.step}</span>
            <h3 className="headline mt-8 text-3xl">{item.title}</h3>
            <p className="mt-2 text-sm text-paper/65">{item.text}</p>
          </li>
        ))}
      </ol>
      <div
        aria-hidden="true"
        className="absolute left-12 right-12 top-1/2 hidden h-px bg-gradient-to-r from-gold/0 via-gold to-gold/0 lg:block"
      />
    </div>
  )
}
