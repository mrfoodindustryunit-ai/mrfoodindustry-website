'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function Wordmark({ tone = 'dark', size = 'md' }: { tone?: 'dark' | 'light'; size?: 'md' | 'lg' }) {
  const { t } = useTranslation()
  const large = size === 'lg'
  return (
    <Link
      href="/"
      aria-label={t('nav.home')}
      className="group inline-flex items-center gap-3"
    >
      <span
        aria-hidden="true"
        className={cn(
          'relative grid place-items-center bg-gradient-to-br from-forest to-forest-bright text-gold-soft',
          large ? 'size-20 rounded-[18px_18px_44px_18px]' : 'size-12 rounded-[12px_12px_26px_12px]',
        )}
      >
        <span className={cn('headline tracking-[-0.08em]', large ? 'text-4xl' : 'text-2xl')}>MR</span>
        <span
          className={cn(
            'absolute rounded-full bg-gold',
            large ? '-right-1.5 -top-1.5 size-5' : '-right-1 -top-1 size-3',
          )}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'headline tracking-[-0.05em]',
            large ? 'text-5xl' : 'text-[1.6rem]',
            tone === 'dark' ? 'text-forest' : 'text-paper',
          )}
        >
          MR
        </span>
        <span
          className={cn(
            'mt-1 font-bold uppercase tracking-[0.32em] text-gold-deep',
            large ? 'text-sm text-gold-soft' : 'text-[10px]',
            tone === 'light' && 'text-gold-soft',
          )}
        >
          Industries
        </span>
      </span>
    </Link>
  )
}
