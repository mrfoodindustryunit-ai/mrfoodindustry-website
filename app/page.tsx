import { ContactCta } from '@/components/contact-cta'
import { Faq } from '@/components/faq'
import { FeedPathway } from '@/components/feed-pathway'
import { AboutTeaser } from '@/components/home/about-teaser'
import { FeaturedProducts } from '@/components/home/featured-products'
import { Hero } from '@/components/home/hero'
import { QualitySection } from '@/components/home/quality-section'
import { StorySection } from '@/components/home/story-section'
import { SupportSection } from '@/components/home/support-section'
import { Marquee } from '@/components/marquee'
import { PartnershipPaths } from '@/components/partnership-paths'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee className="-mt-14 pt-[4.75rem] sm:-mt-[120px] sm:pt-[8.5rem]" />
      <StorySection />
      <FeedPathway />
      <FeaturedProducts />
      <QualitySection />
      <SupportSection />
      <PartnershipPaths />
      <AboutTeaser />
      <Faq />
      <ContactCta />
    </>
  )
}
