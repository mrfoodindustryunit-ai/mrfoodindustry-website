'use client'

import { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useTranslation, type TranslationKey } from '@/lib/i18n'
import { products } from '@/lib/products'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { productCopyKey } from './product-copy'

const topics = [
  { id: 'product', label: 'common.productEnquiry' },
  { id: 'selection', label: 'common.productSelectionHelp' },
  { id: 'availability', label: 'common.availabilityCheck' },
  { id: 'dealer', label: 'common.dealerEnquiry' },
  { id: 'general', label: 'common.generalEnquiry' },
] as const

type Variant = 'general' | 'dealer'
type Errors = Partial<Record<string, string>>
type SubmitState = { type: 'success' | 'error'; message: string }

const fieldClass =
  'mt-2 w-full rounded-2xl border border-line bg-paper px-5 py-3.5 text-[16px] text-ink placeholder:text-muted-ink/70 focus:border-gold-deep focus:outline-none aria-[invalid=true]:border-red-700'

export function EnquiryForm({ variant = 'general' }: { variant?: Variant }) {
  const searchParams = useSearchParams()
  const { t, locale } = useTranslation()
  const topicParam = searchParams.get('topic')
  const productParam = searchParams.get('product')
  const initialTopic =
    variant === 'dealer' ? 'dealer' : topics.some((t) => t.id === topicParam) ? (topicParam as string) : 'general'
  const initialProduct = products.some((p) => p.slug === productParam) ? (productParam as string) : ''

  const formRef = useRef<HTMLFormElement | null>(null)
  const formDataRef = useRef<FormData | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [summary, setSummary] = useState<string | null>(null)
  const [submitState, setSubmitState] = useState<SubmitState | null>(null)
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (key: string) => String(data.get(key) ?? '').trim()

    const next: Errors = {}
    if (value('name').length < 2) next.name = t('common.formFieldRequired')
    const contact = value('contact')
    if (!/^[+\d\s()-]{7,}$/.test(contact) && !/^\S+@\S+\.\S+$/.test(contact))
      next.contact = t('common.invalidContact')
    if (!value('location')) next.location = t('common.requiredLocation')
    if (variant === 'dealer' && !value('business')) next.business = t('common.requiredBusiness')
    if (value('message').length < 10) next.message = t('common.requiredMessage')

    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)
      first?.focus()
      return
    }

    const topicKey = topics.find((topic) => topic.id === value('topic'))?.label ?? 'common.generalEnquiry'
    const topicLabel = t(topicKey)
    const selectedProduct = products.find((p) => p.slug === value('product'))
    const productKey = selectedProduct ? productCopyKey(selectedProduct.slug, 'name') : null
    const productName = selectedProduct?.slug === 'cattle-feed'
      ? t('cattle.formName')
      : locale === 'kn' && productKey
        ? t(productKey)
        : selectedProduct?.name

    const lines = [
      `${t('common.enquiryType')}: ${topicLabel} — ${siteConfig.name}`,
      `${t('common.fullName')}: ${value('name')}`,
      variant === 'dealer' ? `${t('common.businessName')}: ${value('business')}` : null,
      `${t('common.phoneOrEmail')}: ${contact}`,
      `${t('common.townDistrict')}: ${value('location')}`,
      productName ? `${t('common.product')}: ${productName}` : null,
      variant === 'dealer' && value('area') ? `${t('common.areaOfInterest')}: ${value('area')}` : null,
      '',
      value('message'),
    ].filter((line) => line !== null)

    formDataRef.current = data
    setSummary(lines.join('\n'))
    setSubmitState(null)
    setCopied(false)
  }

  const handleSendEnquiry = async () => {
    const payload = formDataRef.current
    if (!payload) return

    setIsSubmitting(true)
    setSubmitState(null)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        body: payload,
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        const errorMessage = typeof result?.error === 'string' ? result.error : 'We could not send your enquiry right now. Please try again later.'
        throw new Error(errorMessage)
      }

      setSummary(null)
      setErrors({})
      formRef.current?.reset()
      setSubmitState({
        type: 'success',
        message: 'Thank you. Your enquiry has been sent successfully. Our team will contact you soon.',
      })
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error instanceof Error ? error.message : 'We could not send your enquiry right now. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitState?.type === 'success') {
    return (
      <div className="rounded-[32px_32px_96px_32px] bg-ink p-8 text-paper sm:p-12" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-gold text-ink">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <h3 className="headline mt-8 text-4xl sm:text-5xl">Thank you</h3>
        <p className="mt-4 max-w-lg text-paper/75">{submitState.message}</p>
        <button
          type="button"
          onClick={() => {
            setSubmitState(null)
            setSummary(null)
            setErrors({})
            formRef.current?.reset()
          }}
          className="eyebrow mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/30 px-6 font-bold text-paper hover:bg-paper/10"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  if (summary) {
    return (
      <div className="rounded-[32px_32px_96px_32px] bg-ink p-8 text-paper sm:p-12" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-gold text-ink">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <h3 className="headline mt-8 text-4xl sm:text-5xl">{t('contact.ready')}</h3>
        <p className="mt-4 max-w-lg text-paper/75">{t('contact.readyText')}</p>
        {submitState?.type === 'error' ? (
          <p className="mt-4 rounded-2xl border border-red-400/50 bg-red-500/10 p-3 text-sm text-red-100">
            {submitState.message}
          </p>
        ) : null}
        <pre className="mt-8 max-h-64 overflow-auto whitespace-pre-wrap rounded-2xl bg-paper/[0.07] p-5 font-sans text-sm leading-relaxed text-paper/85">
          {summary}
        </pre>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSendEnquiry}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 font-bold text-ink disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Send enquiry'} <ArrowUpRight aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(summary)
              setCopied(true)
            }}
            className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/30 px-6 font-bold text-paper hover:bg-paper/10"
          >
            {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
            {copied ? t('common.copied') : t('common.copyEnquiry')}
          </button>
          <button
            type="button"
            onClick={() => {
              setSummary(null)
              setSubmitState(null)
            }}
            className="eyebrow inline-flex min-h-12 items-center px-4 font-bold text-paper/70 underline-offset-4 hover:underline"
          >
            {t('common.editDetails')}
          </button>
        </div>
      </div>
    )
  }

  const field = (name: string, label: string, input: React.ReactNode, hint?: string) => (
    <div>
      <label htmlFor={`f-${name}`} className="eyebrow text-[11px] font-bold text-ink">
        {label}
      </label>
      {input}
      {errors[name] ? (
        <p id={`f-${name}-error`} className="mt-2 text-sm text-red-700">
          {errors[name]}
        </p>
      ) : hint ? (
        <p className="mt-2 text-xs text-muted-ink">{hint}</p>
      ) : null}
    </div>
  )

  const a11y = (name: string) => ({
    id: `f-${name}`,
    name,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `f-${name}-error` : undefined,
  })

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-[32px_32px_96px_32px] border border-paper-light bg-paper-light p-6 shadow-[0_40px_80px_-50px_rgb(16_44_35/0.55)] sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {field(t('common.fullName'), t('common.fullName'), <input {...a11y('name')} autoComplete="name" className={fieldClass} />)}
        {variant === 'dealer'
          ? field('business', t('common.businessName'), <input {...a11y('business')} autoComplete="organization" className={fieldClass} />)
          : field(
              'contact',
              t('common.phoneOrEmail'),
              <input {...a11y('contact')} autoComplete="email" className={fieldClass} />,
            )}
        {variant === 'dealer'
          ? field(
              'contact',
              t('common.phoneOrEmail'),
              <input {...a11y('contact')} autoComplete="email" className={fieldClass} />,
            )
          : null}
        {field(
          'location',
          t('common.townDistrict'),
          <input {...a11y('location')} autoComplete="address-level2" className={fieldClass} />,
        )}
        {variant === 'dealer'
          ? field(
              'area',
              t('common.areaOfInterest'),
              <input {...a11y('area')} placeholder={t('common.areaPlaceholder')} className={fieldClass} />,
              t('common.optional'),
            )
          : null}
        {variant === 'general'
          ? field(
              'topic',
              t('common.enquiryType'),
              <select {...a11y('topic')} defaultValue={initialTopic} className={cn(fieldClass, 'appearance-none')}>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {t(topic.label as TranslationKey)}
                  </option>
                ))}
              </select>,
            )
          : <input type="hidden" name="topic" value="dealer" />}
        {field(
          'product',
          variant === 'dealer' ? t('common.productRangeOfInterest') : t('common.product'),
          <select {...a11y('product')} defaultValue={initialProduct} className={cn(fieldClass, 'appearance-none')}>
            <option value="">{variant === 'dealer' ? t('common.notSureDealer') : t('common.notSure')}</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.slug === 'cattle-feed'
                  ? t('cattle.formName')
                  : locale === 'kn' && productCopyKey(product.slug, 'name')
                    ? t(productCopyKey(product.slug, 'name') as TranslationKey)
                    : product.name}
              </option>
            ))}
          </select>,
          t('common.optional'),
        )}
      </div>
      {field(
        'message',
        variant === 'dealer' ? t('common.businessMessage') : t('common.message'),
        <textarea
          {...a11y('message')}
          rows={5}
          placeholder={
            variant === 'dealer'
              ? t('common.currentProducts')
              : t('common.messageHint')
          }
          className={cn(fieldClass, 'resize-y')}
        />,
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {t('common.note') ? (
          <p className="max-w-sm text-xs leading-relaxed text-muted-ink">
            {t('common.note')}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex min-h-[56px] items-center gap-5 rounded-[2px_36px_36px_2px] border border-gold/60 bg-gradient-to-r from-forest to-forest-bright py-1.5 pl-6 pr-1.5 text-xs font-bold uppercase tracking-[0.14em] text-paper-light disabled:cursor-not-allowed disabled:opacity-70"
        >
          {t('common.prepareEnquiry')}
          <span className="grid size-11 place-items-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </span>
        </button>
      </div>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    </form>
  )
}
