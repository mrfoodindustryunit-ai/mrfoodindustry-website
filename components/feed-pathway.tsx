import Image from 'next/image'
import { ArrowLink } from '@/components/arrow-link'
import { Reveal } from '@/components/reveal'
import { SectionIntro } from '@/components/section-intro'
import { feedPathway, pathwayOutcomes } from '@/lib/content'
import { cn } from '@/lib/utils'

const offsets = ['lg:mt-0', 'lg:mt-20', 'lg:mt-10', 'lg:mt-20', 'lg:mt-0']

export function FeedPathway({ showCta = true }: { showCta?: boolean }) {
  return (
    <section aria-labelledby="pathway-title" className="relative overflow-hidden bg-sage py-24 sm:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none whitespace-nowrap text-center font-sans text-[16vw] font-bold uppercase leading-none tracking-[-0.04em] text-ink/[0.035]"
      >
        Nutrition
      </span>
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <SectionIntro
            label="The feed pathway"
            title={<span id="pathway-title">Five considerations.</span>}
            accent="One connected choice."
            description="Good feeding decisions are rarely made in one moment. They connect what goes into the feed, what the animal needs, and how the feed is used on the farm."
          />
        </Reveal>

        <Reveal className="mt-16 sm:mt-24">
          <div className="relative isolate overflow-hidden rounded-[40px_40px_100px_40px] bg-ink px-5 pb-40 pt-10 sm:px-10 sm:pt-16 lg:rounded-[64px_64px_160px_64px] lg:px-12 lg:pb-48">
            <Image
              src="/images/pathway-grain.png"
              alt=""
              fill
              sizes="100vw"
              className="-z-20 object-cover opacity-45"
            />
            <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10 bg-gradient-to-br from-forest/80 via-ink/70 to-ink/90" />

            <div
              aria-hidden="true"
              className="absolute left-12 right-12 top-[52%] hidden h-px bg-gradient-to-r from-gold/0 via-gold to-gold/0 lg:block"
            />

            <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
              {feedPathway.map((item, index) => (
                <li
                  key={item.step}
                  className={cn(
                    'group flex flex-col rounded-[28px_28px_72px_28px] p-6 transition-transform duration-500 hover:-translate-y-1.5 sm:min-h-72',
                    offsets[index],
                    item.highlight
                      ? 'bg-gradient-to-br from-gold-soft to-gold text-ink shadow-[0_30px_60px_-30px_rgb(217_166_46/0.8)]'
                      : 'border border-paper/15 bg-paper/[0.07] text-paper backdrop-blur-md',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-[52px] place-items-center rounded-full border text-xs font-bold tracking-wider',
                      item.highlight ? 'border-ink/60 text-ink' : 'border-gold-soft/70 text-gold-soft',
                    )}
                  >
                    {item.code}
                  </span>
                  <span
                    className={cn(
                      'eyebrow mt-10 text-[10px]',
                      item.highlight ? 'text-ink/70' : 'text-gold-soft/90',
                    )}
                  >
                    {`Stage ${item.step}`}
                  </span>
                  <h3 className="headline mt-auto pt-8 text-3xl">{item.title}</h3>
                  <p className={cn('mt-3 text-sm leading-relaxed', item.highlight ? 'text-ink/75' : 'text-paper/70')}>
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative z-10 mx-auto -mt-28 grid max-w-6xl overflow-hidden rounded-[32px] border border-paper-light bg-paper-light/95 shadow-[0_40px_80px_-40px_rgb(16_44_35/0.45)] backdrop-blur md:grid-cols-3 lg:-mt-24">
            {pathwayOutcomes.map((outcome) => (
              <div key={outcome.label} className="border-line p-8 max-md:border-b md:border-r md:last:border-r-0">
                <p className="eyebrow text-[10px] text-gold-deep">{outcome.label}</p>
                <h3 className="headline mt-5 text-3xl text-ink">{outcome.title}</h3>
                <p className="mt-3 text-[15px] text-muted-ink">{outcome.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-muted-ink">
            This is a general educational framework for thinking about feed — not a description of verified MR Industries
            production processes.
          </p>
          {showCta ? <ArrowLink href="/products">Find the right feed</ArrowLink> : null}
        </div>
      </div>
    </section>
  )
}
