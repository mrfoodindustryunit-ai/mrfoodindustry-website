'use client'

import { useTranslation, type TranslationKey } from '@/lib/i18n'

export function LocalizedText({ path, fallback }: { path: TranslationKey; fallback: string }) {
  const { t } = useTranslation()
  return (t(path) as string) || fallback
}