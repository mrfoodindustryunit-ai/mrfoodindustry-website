'use client'

import Image from 'next/image'
import { useTranslation } from '@/lib/i18n'

export function CattleNutritionIntro() {
  const { t } = useTranslation()
  const categories = [
    t('common.categoryCattle'),
    t('common.categoryBroiler'),
    t('common.categoryLayer'),
    t('common.categoryGoatSheep'),
  ]

  return (
    <section aria-labelledby="cattle-nutrition-title" className="bg-sage py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[64px_64px_32px_32px] sm:rounded-[100px_100px_40px_40px]">
          <Image
            src="/images/products/cattle-feed.jpg"
            alt={t('imageAlts.cattle')}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow font-bold text-gold-deep">{t('common.categoryCattle')}</p>
          <h2 id="cattle-nutrition-title" className="headline mt-5 text-4xl text-ink sm:text-5xl">
            {t('cattle.nutritionTitle')}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-ink">
            {t('cattle.nutritionDescription')}
          </p>
          <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
            {categories.map((category) => (
              <li key={category} className="border-t border-line py-3 text-sm font-medium text-ink">
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}