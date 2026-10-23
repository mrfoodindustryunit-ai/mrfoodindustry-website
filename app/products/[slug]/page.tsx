import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ArrowLink } from '@/components/arrow-link'
import { ContactCta } from '@/components/contact-cta'
import { LocalizedText } from '@/components/localized-text'
import { ProductCard } from '@/components/product-card'
import { LocalizedProductImage, ProductConsiderations, ProductText } from '@/components/product-copy'
import { getProduct, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  return { title: product.name, description: product.summary }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category)
  const more = related.length > 0 ? related : products.filter((item) => item.slug !== product.slug).slice(0, 3)

  const facts = [
    { label: <LocalizedText path="productDetail.animal" fallback="Animal" />, value: <ProductText slug={product.slug} field="animal" fallback={product.animal} /> },
    { label: <LocalizedText path="productDetail.range" fallback="Range" />, value: <ProductText slug={product.slug} field="stage" fallback={product.stage} /> },
    { label: <LocalizedText path="productDetail.nutrition" fallback="Nutritional specifications" />, value: <LocalizedText path="productDetail.sharedOnEnquiry" fallback="Shared on enquiry" /> },
    { label: <LocalizedText path="productDetail.packOptions" fallback="Pack options" />, value: <LocalizedText path="productDetail.sharedOnEnquiry" fallback="Shared on enquiry" /> },
    { label: <LocalizedText path="productDetail.pricing" fallback="Pricing" />, value: <LocalizedText path="productDetail.onEnquiry" fallback="On enquiry" /> },
  ]

  return (
    <>
      <section className="bg-paper pb-24 pt-32 sm:pb-32 sm:pt-40">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <nav aria-labelledby="product-breadcrumb-label" className="eyebrow flex items-center gap-3 text-muted-ink">
            <span id="product-breadcrumb-label" className="sr-only">
              <LocalizedText path="productDetail.breadcrumb" fallback="Breadcrumb" />
            </span>
            <Link href="/products" className="inline-flex items-center gap-2 font-bold text-forest hover:underline">
              <ArrowLeft aria-hidden="true" className="size-3.5" />
              <LocalizedText path="productDetail.products" fallback="Products" />
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">
              <ProductText slug={product.slug} field="name" fallback={product.name} />
            </span>
          </nav>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative rounded-[40px] border border-paper-light bg-paper-light p-2 shadow-[0_40px_80px_-50px_rgb(16_44_35/0.55)]">
              <div className="relative aspect-square overflow-hidden rounded-[34px_34px_150px_34px] bg-[#f3eee2]">
                <LocalizedProductImage
                  product={product}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <span aria-hidden="true" className="absolute -right-12 -top-12 size-44 rounded-full bg-gold-soft/35" />
              </div>
              <p className="px-5 pb-3 pt-4 text-xs text-muted-ink">
                <LocalizedText path="productDetail.illustrativePhoto" fallback="Illustrative photography. Genuine packaging images will be added when available." />
              </p>
            </div>

            <div className="flex flex-col">
              {product.featured ? (
                <span className="eyebrow mb-3 inline-flex w-fit rounded-full bg-gold px-3 py-1.5 text-[10px] font-bold text-ink">
                  <LocalizedText path="common.mainProduct" fallback="Main product" />
                </span>
              ) : null}
              <p className="eyebrow font-bold text-gold-deep">
                {'// '}<ProductText slug={product.slug} field="animal" fallback={product.animal} />
              </p>
              <h1 className="headline mt-6 text-[3.25rem] text-ink sm:text-7xl lg:text-[5.5rem]">
                <ProductText slug={product.slug} field="name" fallback={product.name} />
              </h1>
              <p className="mt-8 text-pretty text-xl leading-relaxed text-muted-ink">
                <ProductText slug={product.slug} field="summary" fallback={product.summary} />
              </p>

              <dl className="mt-10 border-t border-line">
                {facts.map((fact, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 border-b border-line py-4">
                    <dt className="eyebrow pt-1 text-[10px] text-muted-ink">{fact.label}</dt>
                    <dd className="text-[15px] text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap gap-4">
                <ArrowLink href={`/contact?topic=product&product=${product.slug}`}>
                  <LocalizedText path="productDetail.enquire" fallback="Enquire about this feed" />
                </ArrowLink>
                <ArrowLink href={`/contact?topic=availability&product=${product.slug}`} variant="paper">
                  <LocalizedText path="productDetail.availability" fallback="Check availability" />
                </ArrowLink>
              </div>
            </div>
          </div>

          <div className="mt-24 grid gap-10 lg:grid-cols-3">
            <p className="eyebrow pt-2 text-ink"><LocalizedText path="productDetail.overview" fallback="Overview" /></p>
            <div className="grid gap-12 lg:col-span-2 md:grid-cols-2">
              <div className="grid gap-5">
                {product.overview.map((paragraph, index) => (
                  <p key={paragraph} className="text-pretty text-lg leading-relaxed text-muted-ink">
                    <ProductText
                      slug={product.slug}
                      field={index === 0 ? 'overview' : 'enquiry'}
                      fallback={paragraph}
                    />
                  </p>
                ))}
              </div>
              <div className="rounded-[28px_28px_80px_28px] bg-ink p-8 text-paper">
                <p className="eyebrow text-[10px] text-gold-soft">
                  <LocalizedText path="productDetail.keyPoints" fallback="Key points" />
                </p>
                <ul className="mt-6">
                  <ProductConsiderations slug={product.slug} items={product.considerations} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="related-title" className="bg-sage py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="related-title" className="headline text-5xl text-ink sm:text-6xl">
              <LocalizedText path="productDetail.relatedTitle" fallback="More from the range." />
            </h2>
            <ArrowLink href="/products" variant="paper">
              <LocalizedText path="productDetail.allProducts" fallback="All products" />
            </ArrowLink>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {more.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactCta />
    </>
  )
}
