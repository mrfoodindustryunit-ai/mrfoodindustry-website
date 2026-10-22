import { ArrowLink } from '@/components/arrow-link'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { SectionIntro } from '@/components/section-intro'
import { products } from '@/lib/products'

export function FeaturedProducts() {
  return (
    <section aria-labelledby="products-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <SectionIntro
            label="The MR Industries range"
            title={<span id="products-title">Feed solutions</span>}
            accent="for every need."
            description="Six feed categories across broiler, layer, and goat and sheep farming — each with its own product page and a direct enquiry route."
          />
        </Reveal>

        <ul className="mt-16 grid gap-6 sm:mt-24 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <li key={product.slug}>
              <Reveal delay={(index % 3) * 120} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-end">
          <ArrowLink href="/products">View all products</ArrowLink>
        </div>
      </div>
    </section>
  )
}
