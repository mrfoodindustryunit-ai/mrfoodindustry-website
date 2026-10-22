import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/products'

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[36px_36px_36px_36px] border border-paper-light bg-paper-light p-2 shadow-[0_30px_60px_-40px_rgb(16_44_35/0.45)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-36px_rgb(16_44_35/0.55)]">
      <div className="relative aspect-square overflow-hidden rounded-[30px_30px_120px_30px] bg-[#f3eee2]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 440px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="absolute -right-10 -top-10 size-32 rounded-full bg-gold-soft/35 transition-transform duration-700 group-hover:scale-125"
        />
        <span className="eyebrow absolute left-5 top-5 rounded-full bg-paper-light/85 px-3 py-1.5 text-[10px] font-bold text-forest backdrop-blur">
          {product.animal}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-6 pt-7">
        <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.14em] text-muted-ink">
          <span>{product.stage}</span>
          <span>Info on enquiry</span>
        </div>
        <h3 className="headline mt-5 text-[2.4rem] leading-none text-ink">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:rounded-[36px]">
            {product.name}
          </Link>
        </h3>
        <p className="mt-4 text-pretty text-[17px] leading-relaxed text-muted-ink">{product.summary}</p>
        <span className="eyebrow mt-auto inline-flex items-center gap-2 pt-8 font-bold text-forest">
          View product
          <span className="grid size-8 place-items-center rounded-full bg-ink text-gold-soft transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </span>
        </span>
      </div>
    </article>
  )
}
