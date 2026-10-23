'use client'

import { useTranslation, type TranslationKey } from '@/lib/i18n'
import Image, { type ImageProps } from 'next/image'
import type { Product } from '@/lib/products'

type ProductTextField = 'name' | 'animal' | 'stage' | 'summary' | 'overview' | 'enquiry' | 'imageAlt'

const productCopyIds: Record<string, string> = {
  'broiler-pre-starter': 'broilerPreStarter',
  'broiler-starter': 'broilerStarter',
  'broiler-finisher': 'broilerFinisher',
  'layer-feed': 'layerFeed',
  'layer-concentrate': 'layerConcentrate',
  'goat-sheep-feed': 'goatSheepFeed',
}

export function productCopyKey(slug: string, field: ProductTextField | 'considerations') {
  const id = productCopyIds[slug]
  return id ? (`productCopy.${id}.${field}` as TranslationKey) : null
}

export function ProductText({
  slug,
  field,
  fallback,
}: {
  slug: string
  field: ProductTextField
  fallback: string
}) {
  const { t, locale } = useTranslation()

  if (locale === 'en') return fallback
  if (slug === 'cattle-feed') return t(`cattle.${field}` as TranslationKey) as string

  const key = productCopyKey(slug, field)
  return key ? (t(key) as string) : fallback
}

export function ProductConsiderations({ slug, items }: { slug: string; items: string[] }) {
  const { data, locale } = useTranslation()
  const key = slug === 'cattle-feed' ? 'cattle.considerations' : productCopyKey(slug, 'considerations')
  const considerations = locale === 'kn' && key ? (data(key as TranslationKey) as string[]) : items

  return (
    <>
      {considerations.map((item, index) => (
        <li key={item} className="flex gap-4 border-t border-paper/15 py-4 text-[15px] text-paper/85">
          <span className="headline text-xl tracking-normal text-gold-soft">{`0${index + 1}`}</span>
          {item}
        </li>
      ))}
    </>
  )
}

export function LocalizedProductImage({
  product,
  ...props
}: Omit<ImageProps, 'src' | 'alt'> & { product: Product }) {
  const { t, locale } = useTranslation()
  const key = product.slug === 'cattle-feed' ? 'cattle.imageAlt' : productCopyKey(product.slug, 'imageAlt')
  const alt = locale === 'kn' && key ? (t(key as TranslationKey) as string) : product.imageAlt

  return <Image {...props} src={product.image} alt={alt} />
}