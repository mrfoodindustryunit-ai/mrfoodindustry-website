import { Reveal } from '@/components/reveal'
import { SectionIntro } from '@/components/section-intro'
import { SupportRoutes } from '@/components/support-routes'

export function SupportSection() {
  return (
    <section aria-labelledby="support-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <SectionIntro
            label="Farmer support"
            title={<span id="support-title">Support for</span>}
            accent="practical farming needs."
            description="Choose the route that matches your question — product details, the right feed category, selection help or availability in your area."
          />
        </Reveal>
        <div className="mt-16 sm:mt-24">
          <SupportRoutes />
        </div>
      </div>
    </section>
  )
}
