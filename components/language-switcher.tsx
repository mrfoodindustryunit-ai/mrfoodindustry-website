'use client'

import { cn } from '@/lib/utils'
import { useLanguage, useTranslation } from '@/lib/i18n'

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage()
  const { t } = useTranslation()

  const options = [
    { value: 'en', label: 'EN' },
    { value: 'kn', label: 'ಕನ್ನಡ' },
  ] as const

  return (
    <div
      aria-label={t('common.languageSwitcherLabel')}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-ink/15 bg-paper-light/80 p-1 text-[11px] font-bold uppercase tracking-[0.18em] text-ink shadow-sm backdrop-blur-sm',
        compact ? 'text-[10px] tracking-[0.14em]' : 'sm:text-[11px]',
      )}
    >
      {options.map((option) => {
        const active = locale === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLocale(option.value)}
            aria-pressed={active}
            aria-label={option.value === 'en' ? t('common.useEnglish') : t('common.useKannada')}
            className={cn(
              'rounded-full px-2.5 py-1.5 transition-colors',
              active ? 'bg-ink text-paper-light shadow-sm' : 'text-ink/70 hover:text-ink',
              compact ? 'px-2 py-1' : 'px-3 py-1.5',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
