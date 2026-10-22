import Image from 'next/image'
import { TextArrowLink } from '@/components/arrow-link'
import { Reveal } from '@/components/reveal'
import { supportRoutes } from '@/lib/content'
import { cn } from '@/lib/utils'

const shapes = [
  'rounded-[40px_110px_40px_40px]',
  'rounded-[40px_40px_40px_40px]',
  'rounded-[40px_40px_110px_40px]',
  'rounded-[110px_40px_40px_40px]',
]

export function SupportRoutes() {
  return (
    <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {supportRoutes.map((route, index) => (
        <li key={route.title}>
          <Reveal delay={index * 100} className="h-full">
            <article
              className={cn(
                'relative isolate flex h-full flex-col overflow-hidden border p-8 transition-transform duration-500 hover:-translate-y-1.5',
                shapes[index],
                route.featured
                  ? 'border-ink bg-ink text-paper'
                  : 'border-ink/10 bg-paper-light text-ink shadow-[0_30px_60px_-44px_rgb(16_44_35/0.5)]',
              )}
            >
              {route.featured ? (
                <>
                  <Image
                    src="/images/partnership-shed.png"
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 340px, 50vw"
                    className="-z-20 object-cover opacity-35"
                  />
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 to-ink/90" />
                </>
              ) : null}
              <p className={cn('eyebrow text-[10px]', route.featured ? 'text-gold-soft' : 'text-gold-deep')}>
                {route.label}
              </p>
              <span
                className={cn(
                  'mt-10 grid size-14 place-items-center rounded-full text-xs font-bold tracking-wider',
                  route.featured ? 'bg-paper/10 text-gold-soft' : 'bg-sage text-forest',
                )}
              >
                {route.code}
              </span>
              <h3 className="headline mt-10 text-[2.25rem] leading-none">{route.title}</h3>
              <p className={cn('mt-5 text-[16px] leading-relaxed', route.featured ? 'text-paper/75' : 'text-muted-ink')}>
                {route.text}
              </p>
              <ul className="mt-8">
                {route.points.map((point) => (
                  <li
                    key={point}
                    className={cn(
                      'border-t py-3 text-sm',
                      route.featured ? 'border-paper/15 text-paper/80' : 'border-line text-muted-ink',
                    )}
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <TextArrowLink
                href={route.href}
                className={cn('mt-auto pt-8', route.featured ? 'text-gold-soft' : 'text-forest')}
              >
                {route.cta}
              </TextArrowLink>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
