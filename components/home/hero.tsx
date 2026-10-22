import Image from 'next/image'
import Link from 'next/link'
import { ArrowLink } from '@/components/arrow-link'
import { categories, products } from '@/lib/products'

export function Hero() {
  const ranges = categories.filter((category) => category.id !== 'all')
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate z-10 flex min-h-[100svh] flex-col overflow-hidden rounded-b-[56px] bg-paper sm:rounded-b-[120px]"
    >
      <Image
        src="/images/hero-farm.png"
        alt="Rural farm at golden hour with bowls of maize and feed grains on a stone in the foreground"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(241_239_230/0.95)_0%,rgb(241_239_230/0.82)_32%,rgb(241_239_230/0.15)_62%,transparent_100%)] max-lg:bg-[linear-gradient(180deg,rgb(241_239_230/0.95)_0%,rgb(241_239_230/0.85)_55%,rgb(241_239_230/0.2)_100%)]"
      />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pb-16 pt-36 sm:px-8 lg:pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-4 font-bold text-gold-deep">
            <span aria-hidden="true" className="h-px w-14 bg-gold-deep" />
            MR Industries · Animal feed
          </p>
          <h1
            id="hero-title"
            className="headline mt-7 text-[3.4rem] leading-[0.9] text-forest sm:text-7xl lg:text-[6.4rem]"
          >
            Better nutrition.
            <em className="block italic text-gold-deep">Healthier animals.</em>
            Stronger farms.
          </h1>
          <p className="mt-8 max-w-lg text-pretty text-lg leading-relaxed text-ink/85 sm:text-xl">
            Feed solutions for poultry, layer birds, goats and sheep, built around practical farming needs.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ArrowLink href="/products">Explore Products</ArrowLink>
            <ArrowLink href="/dealer-partnership" variant="paper">
              Become a Dealer
            </ArrowLink>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-10 sm:px-8 lg:pb-14">
        <div className="ml-auto flex w-full max-w-xl flex-wrap items-center gap-x-6 gap-y-3 rounded-[24px_24px_64px_24px] border border-paper/40 bg-ink/55 px-6 py-5 text-paper backdrop-blur-md">
          <p className="eyebrow text-gold-soft">{`${products.length} feed categories`}</p>
          <span aria-hidden="true" className="hidden h-6 w-px bg-paper/30 sm:block" />
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {ranges.map((range) => (
              <li key={range.id}>
                <Link
                  href={`/products?category=${range.id}`}
                  className="text-[15px] underline-offset-4 hover:text-gold-soft hover:underline"
                >
                  {range.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
