import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactCta } from '@/components/contact-cta'
import { PageHero } from '@/components/page-hero'
import { ProductCatalogue } from '@/components/product-catalogue'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse the MR Industries feed range: Broiler Pre-Starter, Broiler Starter, Broiler Finisher, Layer Feed, Layer Concentrate and Goat & Sheep Feed.',
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Product catalogue"
        title="The MR Industries"
        accent="feed range."
        description="Search or filter six feed categories across broiler, layer, and goat and sheep farming. Product information and availability are shared on enquiry."
      />
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
