import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'forest' | 'paper' | 'ink'

const styles: Record<Variant, { shell: string; disc: string }> = {
  forest: {
    shell:
      'bg-gradient-to-r from-forest to-forest-bright text-paper-light ring-1 ring-gold/60 shadow-[0_18px_40px_-18px_rgb(13_67_50/0.7)]',
    disc: 'bg-gold text-ink',
  },
  paper: {
    shell: 'bg-paper-light text-ink ring-1 ring-ink/10 shadow-[0_18px_40px_-20px_rgb(16_44_35/0.35)]',
    disc: 'bg-ink text-gold-soft',
  },
  ink: {
    shell: 'bg-ink text-paper-light ring-1 ring-gold/40',
    disc: 'bg-gold text-ink',
  },
}

type ArrowLinkProps = {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  external?: boolean
}

export function ArrowLink({ href, children, variant = 'forest', className, external }: ArrowLinkProps) {
  const style = styles[variant]
  const content = (
    <>
      <span className="eyebrow font-bold">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          'grid size-11 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45',
          style.disc,
        )}
      >
        <ArrowUpRight className="size-4" strokeWidth={2.25} />
      </span>
    </>
  )
  const classes = cn(
    'group shape-cta inline-flex min-h-14 items-center justify-between gap-6 py-1.5 pl-6 pr-1.5 transition-transform duration-300 hover:-translate-y-0.5',
    style.shell,
    className,
  )

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}

export function TextArrowLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group eyebrow inline-flex items-center gap-2 font-bold underline-offset-[6px] hover:underline',
        className,
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  )
}
