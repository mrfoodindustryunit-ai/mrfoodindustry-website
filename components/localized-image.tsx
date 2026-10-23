'use client'

import Image, { type ImageProps } from 'next/image'
import { useTranslation, type TranslationKey } from '@/lib/i18n'

type LocalizedImageProps = Omit<ImageProps, 'alt'> & {
  altKey: TranslationKey
  fallbackAlt: string
}

export function LocalizedImage({ altKey, fallbackAlt, ...props }: LocalizedImageProps) {
  const { t } = useTranslation()
  return <Image {...props} alt={t(altKey) || fallbackAlt} />
}