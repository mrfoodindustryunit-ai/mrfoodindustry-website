import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const MAX_LENGTHS = {
  name: 100,
  business: 150,
  contact: 120,
  location: 120,
  topic: 50,
  product: 120,
  area: 120,
  message: 2000,
} as const

const ALLOWED_TOPICS = new Set(['product', 'selection', 'availability', 'dealer', 'general'])

function sanitizeText(value: FormDataEntryValue | null, maxLength: number) {
  if (value === null) return ''

  const sanitized = String(value)
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)

  return sanitized
}

function containsHeaderInjection(value: string) {
  return /[\r\n]/.test(value)
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidPhone(value: string) {
  return /^[+]?[(]?[0-9\s().-]{7,}$/.test(value)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildPlainTextEmail(data: Record<string, string>) {
  const details = [
    ['Customer name', data.name],
    ['Phone or email', data.contact],
    ['Town or district', data.location],
    ['Enquiry type', data.topic],
    ['Product', data.product],
    ['Business name', data.business],
    ['Area of interest', data.area],
    ['Message', data.message],
  ]

  const lines = [
    'New Website Enquiry | MR Industries',
    '=================================',
    '',
    ...details
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`),
    '',
    `Submitted on: ${new Date().toISOString()}`,
  ]

  return lines.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData().catch(() => null)

    if (!formData) {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
    }

    if (sanitizeText(formData.get('website'), 50).length > 0) {
      return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 })
    }

    const name = sanitizeText(formData.get('name'), MAX_LENGTHS.name)
    const business = sanitizeText(formData.get('business'), MAX_LENGTHS.business)
    const contact = sanitizeText(formData.get('contact'), MAX_LENGTHS.contact)
    const location = sanitizeText(formData.get('location'), MAX_LENGTHS.location)
    const topic = sanitizeText(formData.get('topic'), MAX_LENGTHS.topic)
    const product = sanitizeText(formData.get('product'), MAX_LENGTHS.product)
    const area = sanitizeText(formData.get('area'), MAX_LENGTHS.area)
    const message = sanitizeText(formData.get('message'), MAX_LENGTHS.message)

    const missingFields = [] as string[]
    if (!name) missingFields.push('name')
    if (!contact) missingFields.push('contact')
    if (!location) missingFields.push('location')
    if (!message) missingFields.push('message')

    if (missingFields.length > 0) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }

    if (name.length < 2 || containsHeaderInjection(name)) {
      return NextResponse.json({ error: 'Please provide a valid name.' }, { status: 400 })
    }

    if (contact.length < 7 || containsHeaderInjection(contact)) {
      return NextResponse.json({ error: 'Please provide a valid phone number or email address.' }, { status: 400 })
    }

    const isEmailContact = isValidEmail(contact)
    const isPhoneContact = isValidPhone(contact)
    if (!isEmailContact && !isPhoneContact) {
      return NextResponse.json({ error: 'Please provide a valid phone number or email address.' }, { status: 400 })
    }

    if (location.length < 2 || containsHeaderInjection(location)) {
      return NextResponse.json({ error: 'Please tell us your town or district.' }, { status: 400 })
    }

    if (message.length < 10 || containsHeaderInjection(message)) {
      return NextResponse.json({ error: 'Please include a more detailed message.' }, { status: 400 })
    }

    if (topic && !ALLOWED_TOPICS.has(topic)) {
      return NextResponse.json({ error: 'Invalid enquiry type selected.' }, { status: 400 })
    }

    if (containsHeaderInjection(product) || containsHeaderInjection(area) || containsHeaderInjection(business)) {
      return NextResponse.json({ error: 'Input contains invalid characters.' }, { status: 400 })
    }

    const normalizedTopic = topic || 'general'
    const normalizedBusiness = business || 'Not provided'
    const normalizedProduct = product || 'Not provided'
    const normalizedArea = area || 'Not provided'

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.ENQUIRY_TO_EMAIL
    const fromEmail = process.env.ENQUIRY_FROM_EMAIL

    if (!apiKey || !toEmail || !fromEmail) {
      return NextResponse.json({ error: 'Email sending is not configured.' }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    const htmlRows = [
      ['Customer name', name],
      ['Phone or email', contact],
      ['Town or district', location],
      ['Enquiry type', normalizedTopic],
      ['Product', normalizedProduct],
      ['Business name', normalizedBusiness],
      ['Area of interest', normalizedArea],
      ['Message', message],
    ]
      .filter(([, value]) => value && value !== 'Not provided')
      .map(([label, value]) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e7e7e7; font-weight: 700; color: #0f172a; vertical-align: top;">${escapeHtml(String(label))}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e7e7e7; color: #1f2937; vertical-align: top;">${escapeHtml(String(value))}</td>
        </tr>
      `)
      .join('')

    const html = `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Website Enquiry | MR Industries</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f6f4ef; font-family: Arial, sans-serif; color: #101828;">
          <div style="max-width: 640px; margin: 0 auto; padding: 32px 20px;">
            <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 18px; overflow: hidden;">
              <div style="background: linear-gradient(90deg, #173a2d 0%, #1f563c 100%); padding: 26px 24px; color: #ffffff;">
                <div style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.8;">MR Industries</div>
                <h1 style="margin: 12px 0 0; font-size: 28px; line-height: 1.2;">New Website Enquiry</h1>
              </div>
              <div style="padding: 24px;">
                <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #374151;">
                  A customer has submitted a new enquiry through the website.
                </p>
                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; background: #f9fafb; border: 1px solid #e7e7e7; border-radius: 12px; overflow: hidden;">
                  <tbody>
                    ${htmlRows}
                  </tbody>
                </table>
                <p style="margin: 22px 0 0; font-size: 14px; color: #475467;">
                  Submitted at: ${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const text = buildPlainTextEmail({
      name,
      contact,
      location,
      topic: normalizedTopic,
      product: normalizedProduct,
      business: normalizedBusiness,
      area: normalizedArea,
      message,
    })

    const replyTo = isEmailContact ? contact : undefined
    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: 'New Website Enquiry | MR Industries',
      html,
      text,
      replyTo,
    })

    if (emailResponse.error) {
      return NextResponse.json(
        { error: 'We could not deliver your enquiry right now. Please try again later.' },
        { status: 502 },
      )
    }

    return NextResponse.json({
      message: 'Thank you. Your enquiry has been sent successfully.',
    })
  } catch {
    return NextResponse.json(
      { error: 'We could not deliver your enquiry right now. Please try again later.' },
      { status: 500 },
    )
  }
}
