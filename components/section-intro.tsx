import { cn } from '@/lib/utils'

type SectionIntroProps = {
  label: string
  title: React.ReactNode
  accent?: React.ReactNode
  description?: React.ReactNode
  tone?: 'light' | 'dark' | 'gold'
  as?: 'h1' | 'h2'
  className?: string
  children?: React.ReactNode
}

const tones = {
  light: { label: 'text-ink', title: 'text-ink', accent: 'text-gold-deep', body: 'text-muted-ink' },
  dark: { label: 'text-paper/80', title: 'text-paper', accent: 'text-gold-soft', body: 'text-paper/70' },
  gold: { label: 'text-ink', title: 'text-ink', accent: 'text-forest', body: 'text-ink/70' },
}

/** Reference layout: tiny "// LABEL" in the first third, headline offset into the remaining two-thirds. */
export function SectionIntro({
  label,
  title,
  accent,
  description,
  tone = 'light',
  as: Heading = 'h2',
  className,
  children,
}: SectionIntroProps) {
  const t = tones[tone]
  return (
    <div className={cn('grid gap-6 lg:grid-cols-3 lg:gap-8', className)}>
      <p className={cn('eyebrow pt-3', t.label)}>{`// ${label}`}</p>
      <div className="lg:col-span-2">
        <Heading className={cn('headline text-balance text-[2.75rem] sm:text-6xl lg:text-[5.4rem]', t.title)}>
          {title}
          {accent ? (
            <>
              {' '}
              <em className={cn('block italic', t.accent)}>{accent}</em>
            </>
          ) : null}
        </Heading>
        {description ? (
          <p className={cn('mt-7 max-w-[46rem] text-pretty text-lg leading-relaxed sm:text-xl', t.body)}>
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  )
}
