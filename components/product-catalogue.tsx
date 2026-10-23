'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useTranslation, type TranslationKey } from '@/lib/i18n'
import { categories, products, type ProductCategory } from '@/lib/products'
import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'

type Filter = ProductCategory | 'all'

const categoryLabels: Record<Filter, TranslationKey> = {
  all: 'common.categoryAll',
  broiler: 'common.categoryBroiler',
  layer: 'common.categoryLayer',
  'goat-sheep': 'common.categoryGoatSheep',
  cattle: 'common.categoryCattle',
}

function isFilter(value: string | null): value is Filter {
  return categories.some((category) => category.id === value)
}

export function ProductCatalogue() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const param = searchParams.get('category')
  const active: Filter = isFilter(param) ? param : 'all'
  const [query, setQuery] = useState('')

  const setFilter = (filter: Filter) => {
    const params = new URLSearchParams(searchParams.toString())
    if (filter === 'all') params.delete('category')
    else params.set('category', filter)
    const search = params.toString()
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false })
  }

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    return products.filter((product) => {
      const inCategory = active === 'all' || product.category === active
      const haystack = `${product.name} ${product.animal} ${product.stage} ${product.summary} ${product.searchTerms?.join(' ') ?? ''}`.toLowerCase()
      return inCategory && (!term || haystack.includes(term))
    })
  }, [active, query])

  const counts = useMemo(
    () =>
      Object.fromEntries(
        categories.map((category) => [
          category.id,
          category.id === 'all' ? products.length : products.filter((p) => p.category === category.id).length,
        ]),
      ),
    [],
  )

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-[28px_28px_72px_28px] border border-paper-light bg-paper-light p-4 shadow-[0_30px_60px_-44px_rgb(16_44_35/0.5)] sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label={t('common.filterByCategory')} className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const selected = active === category.id
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(category.id)}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors',
                  selected
                    ? 'bg-ink text-paper-light'
                    : category.id === 'cattle'
                      ? 'bg-gold text-ink hover:bg-gold-deep'
                      : 'bg-sage text-ink hover:bg-ink/10',
                )}
              >
                {t(categoryLabels[category.id])}
                <span
                  className={cn(
                    'grid size-6 place-items-center rounded-full text-[11px]',
                    selected ? 'bg-gold text-ink' : 'bg-paper-light text-muted-ink',
                  )}
                >
                  {counts[category.id]}
                </span>
              </button>
            )
          })}
        </div>
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor="product-search" className="sr-only">
            {t('common.searchProducts')}
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-muted-ink" />
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('common.searchPlaceholder')}
            className="h-12 w-full rounded-full border border-line bg-paper pl-12 pr-12 text-[15px] text-ink placeholder:text-muted-ink/80 focus:border-gold-deep focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-ink hover:bg-sage"
            >
              <X aria-hidden="true" className="size-4" />
              <span className="sr-only">{t('common.clearSearch')}</span>
            </button>
          ) : null}
        </div>
      </div>

      <p aria-live="polite" className="eyebrow mt-10 text-muted-ink">
        {t(results.length === 1 ? 'common.feedsShown_one' : 'common.feedsShown_other', {
          count: String(results.length),
        })}
      </p>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.map((product, index) => (
            <li key={product.slug}>
              <ProductCard product={product} priority={index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-[32px_32px_96px_32px] border border-dashed border-ink/20 p-12 text-center">
          <p className="headline text-4xl text-ink">{t('common.noFeeds')}</p>
          <p className="mt-4 text-muted-ink">{t('common.noFeedsHint')}</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setFilter('all')
            }}
            className="eyebrow mt-8 rounded-full bg-ink px-6 py-3 font-bold text-paper-light"
          >
            {t('common.resetFilters')}
          </button>
        </div>
      )}
    </div>
  )
}
