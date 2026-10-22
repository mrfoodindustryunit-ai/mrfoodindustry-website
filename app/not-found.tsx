import { ArrowLink } from '@/components/arrow-link'

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-paper pt-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <p className="eyebrow text-gold-deep">{'// 404'}</p>
        <h1 className="headline mt-8 text-6xl text-ink sm:text-8xl">
          This page <em className="italic text-gold-deep">isn&apos;t here.</em>
        </h1>
        <div className="mt-10 flex flex-wrap gap-4">
          <ArrowLink href="/">Back home</ArrowLink>
          <ArrowLink href="/products" variant="paper">
            View products
          </ArrowLink>
        </div>
      </div>
    </section>
  )
}
