import Image from 'next/image'
import { ArrowLink } from '@/components/arrow-link'
import { Reveal } from '@/components/reveal'

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[140px_140px_40px_40px] shadow-[0_40px_80px_-40px_rgb(16_44_35/0.5)]">
            <Image
              src="/images/about-farm.png"
              alt="A farmer hand-feeding laying hens outside a rural farm in morning light"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="eyebrow absolute bottom-8 left-8 rounded-full bg-paper-light/85 px-4 py-2 text-[10px] font-bold text-forest backdrop-blur">
              Illustrative photography
            </span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow text-ink">{'// About MR Industries'}</p>
          <h2 id="about-title" className="headline mt-8 text-balance text-[2.75rem] text-ink sm:text-6xl lg:text-[5rem]">
            Committed to <em className="italic text-gold-deep">animal nutrition.</em>
          </h2>
          <p className="mt-8 max-w-xl text-pretty text-xl leading-relaxed text-muted-ink">
            MR Industries is focused on one thing: animal feed. Our range covers broiler and layer poultry as well as
            goats and sheep, and every enquiry starts with understanding the farm it serves.
          </p>
          <ArrowLink href="/about" className="mt-10">
            About us
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  )
}
