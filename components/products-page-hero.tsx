'use client'

import { useTranslation } from '@/lib/i18n'
import { PageHero } from './page-hero'

export function ProductsPageHero() {
  const { t } = useTranslation()

  return (
    <PageHero
      label={t('productsPage.label')}
      title={t('productsPage.title')}
      accent={t('productsPage.accent')}
      description={t('productsPage.description')}
    />
  )
}