'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { products } from '@/lib/products'
import { hasEmail, hasWhatsApp, siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const topics = [
  { id: 'product', label: 'Product enquiry' },
  { id: 'selection', label: 'Product selection help' },
  { id: 'availability', label: 'Availability check' },
  { id: 'dealer', label: 'Dealer / distribution enquiry' },
  { id: 'general', label: 'General enquiry' },
] as const

type Variant = 'general' | 'dealer'
type Errors = Partial<Record<string, string>>

const fieldClass =
  'mt-2 w-full rounded-2xl border border-line bg-paper px-5 py-3.5 text-[16px] text-ink placeholder:text-muted-ink/70 focus:border-gold-deep focus:outline-none aria-[invalid=true]:border-red-700'

export function EnquiryForm({ variant = 'general' }: { variant?: Variant }) {
  const searchParams = useSearchParams()
  const topicParam = searchParams.get('topic')
  const productParam = searchParams.get('product')
  const initialTopic =
    variant === 'dealer' ? 'dealer' : topics.some((t) => t.id === topicParam) ? (topicParam as string) : 'general'
  const initialProduct = products.some((p) => p.slug === productParam) ? (productParam as string) : ''

  const [errors, setErrors] = useState<Errors>({})
  const [summary, setSummary] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (key: string) => String(data.get(key) ?? '').trim()

    const next: Errors = {}
    if (value('name').length < 2) next.name = 'Please enter your name.'
    const contact = value('contact')
    if (!/^[+\d\s()-]{7,}$/.test(contact) && !/^\S+@\S+\.\S+$/.test(contact))
      next.contact = 'Enter a valid phone number or email address.'
    if (!value('location')) next.location = 'Please tell us your town or district.'
    if (variant === 'dealer' && !value('business')) next.business = 'Please enter your business name.'
    if (value('message').length < 10) next.message = 'Please add a few more details (10+ characters).'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)
      first?.focus()
      return
    }

    const topicLabel = topics.find((t) => t.id === value('topic'))?.label ?? 'Enquiry'
    const productName = products.find((p) => p.slug === value('product'))?.name
    const lines = [
      `${topicLabel} — ${siteConfig.name}`,
      `Name: ${value('name')}`,
      variant === 'dealer' ? `Business: ${value('business')}` : null,
      `Contact: ${contact}`,
      `Location: ${value('location')}`,
      productName ? `Product: ${productName}` : null,
      variant === 'dealer' && value('area') ? `Area of interest: ${value('area')}` : null,
      '',
      value('message'),
    ].filter((line) => line !== null)
    setSummary(lines.join('\n'))
    setCopied(false)
  }

  if (summary) {
    const subject = encodeURIComponent(summary.split('\n')[0])
    const body = encodeURIComponent(summary)
    return (
      <div className="rounded-[32px_32px_96px_32px] bg-ink p-8 text-paper sm:p-12" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-gold text-ink">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <h3 className="headline mt-8 text-4xl sm:text-5xl">Your enquiry is ready.</h3>
        <p className="mt-4 max-w-lg text-paper/75">
          {hasEmail || hasWhatsApp
            ? 'Choose how you would like to send it. Your details open in your own email or WhatsApp app.'
            : 'Direct contact details are being finalised. Copy your enquiry below so it is ready to send as soon as they are published.'}
        </p>
        <pre className="mt-8 max-h-64 overflow-auto whitespace-pre-wrap rounded-2xl bg-paper/[0.07] p-5 font-sans text-sm leading-relaxed text-paper/85">
          {summary}
        </pre>
        <div className="mt-8 flex flex-wrap gap-3">
          {hasEmail ? (
            <a
              href={`mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`}
              className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 font-bold text-ink"
            >
              Send by email <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          ) : null}
          {hasWhatsApp ? (
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${body}`}
              target="_blank"
              rel="noreferrer"
              className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-full bg-paper-light px-6 font-bold text-ink"
            >
              Send on WhatsApp <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          ) : null}
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(summary)
              setCopied(true)
            }}
            className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/30 px-6 font-bold text-paper hover:bg-paper/10"
          >
            {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
            {copied ? 'Copied' : 'Copy enquiry'}
          </button>
          <button
            type="button"
            onClick={() => setSummary(null)}
            className="eyebrow inline-flex min-h-12 items-center px-4 font-bold text-paper/70 underline-offset-4 hover:underline"
          >
            Edit details
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
      noValidate
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-[32px_32px_96px_32px] border border-paper-light bg-paper-light p-6 shadow-[0_40px_80px_-50px_rgb(16_44_35/0.55)] sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {field('name', 'Full name', <input {...a11y('name')} autoComplete="name" className={fieldClass} />)}
        {variant === 'dealer'
          ? field('business', 'Business name', <input {...a11y('business')} autoComplete="organization" className={fieldClass} />)
          : field(
              'contact',
              'Phone or email',
              <input {...a11y('contact')} autoComplete="email" className={fieldClass} />,
            )}
        {variant === 'dealer'
          ? field(
              'contact',
              'Phone or email',
              <input {...a11y('contact')} autoComplete="email" className={fieldClass} />,
            )
          : null}
        {field(
          'location',
          'Town / district',
          <input {...a11y('location')} autoComplete="address-level2" className={fieldClass} />,
        )}
        {variant === 'dealer'
          ? field(
              'area',
              'Area of interest',
              <input {...a11y('area')} placeholder="e.g. districts you could serve" className={fieldClass} />,
              'Optional',
            )
          : null}
        {variant === 'general'
          ? field(
              'topic',
              'Enquiry type',
              <select {...a11y('topic')} defaultValue={initialTopic} className={cn(fieldClass, 'appearance-none')}>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.label}
                  </option>
                ))}
              </select>,
            )
          : <input type="hidden" name="topic" value="dealer" />}
        {field(
          'product',
          variant === 'dealer' ? 'Product range of interest' : 'Product',
          <select {...a11y('product')} defaultValue={initialProduct} className={cn(fieldClass, 'appearance-none')}>
            <option value="">{variant === 'dealer' ? 'Full range / not sure' : 'Not sure / not specific'}</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </select>,
          'Optional',
        )}
      </div>
      {field(
        'message',
        variant === 'dealer' ? 'Tell us about your business' : 'Your message',
        <textarea
          {...a11y('message')}
          rows={5}
          placeholder={
            variant === 'dealer'
              ? 'Current products you handle, the customers you serve and what you are looking for.'
              : 'Animals, stage, approximate quantity and your question.'
          }
          className={cn(fieldClass, 'resize-y')}
        />,
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-muted-ink">
          Your details are only used to prepare this enquiry. Nothing is stored on this website.
        </p>
        <button
          type="submit"
          className="group inline-flex min-h-[56px] items-center gap-5 rounded-[2px_36px_36px_2px] border border-gold/60 bg-gradient-to-r from-forest to-forest-bright py-1.5 pl-6 pr-1.5 text-xs font-bold uppercase tracking-[0.14em] text-paper-light"
        >
          Prepare enquiry
          <span className="grid size-11 place-items-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </span>
        </button>
      </div>
    </form>
  )
}
