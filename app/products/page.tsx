import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactCta } from '@/components/contact-cta'
import { ProductCatalogue } from '@/components/product-catalogue'
import { ProductsPageHero } from '@/components/products-page-hero'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse cattle feed for cows first, followed by poultry, layer, and goat and sheep feed from MR Industries.',
}

export default function ProductsPage() {
  return (
    <>
      <ProductsPageHero />
      <section aria-label="Product catalogue" className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <Suspense fallback={<div className="h-96" />}>
            <ProductCatalogue />
          </Suspense>
        </div>
      </section>
      <ContactCta />
    </>
  )
}
