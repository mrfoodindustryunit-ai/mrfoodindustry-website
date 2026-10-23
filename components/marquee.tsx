'use client'

import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function Marquee({ className }: { className?: string }) {
  const { data, t } = useTranslation()
  const tickerItems = data('ticker.items') as string[]
  const sequence = [...tickerItems, ...tickerItems]
  return (
    <div
      className={cn('relative overflow-hidden border-y border-paper/15 bg-ink py-5', className)}
      role="region"
      aria-label={t('ticker.aria')}
    >
      <p className="sr-only">{tickerItems.join(', ')}</p>
      <div aria-hidden="true" className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {sequence.map((item, index) => (
              <li key={`${copy}-${index}`} className="flex items-center">
                <span className="headline whitespace-nowrap px-7 text-4xl uppercase italic tracking-[-0.03em] text-paper/55 sm:text-5xl">
                  {item}
                </span>
                <span className="size-1.5 rounded-full bg-gold" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
