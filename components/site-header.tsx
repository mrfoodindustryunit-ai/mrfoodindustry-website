'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navLinks, partnerLink } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { Wordmark } from './wordmark'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 24)
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500',
        scrolled || open
          ? 'bg-paper-light/90 shadow-[0_10px_30px_-20px_rgb(16_44_35/0.35)] backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[3px] origin-left bg-gold"
        style={{ width: `${progress * 100}%` }}
      />
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center xl:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'relative text-[15px] text-ink transition-colors hover:text-forest-bright',
                    'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold-deep after:transition-transform after:duration-300 hover:after:scale-x-100',
                    isActive(link.href) && 'after:scale-x-100',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="mx-7 h-10 w-px bg-ink/20" />
          <Link
            href={partnerLink.href}
            aria-current={isActive(partnerLink.href) ? 'page' : undefined}
            className={cn(
              'text-[15px] text-ink transition-colors hover:text-forest-bright',
              isActive(partnerLink.href) && 'text-forest-bright underline underline-offset-8',
            )}
          >
            {partnerLink.label}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="group hidden items-center gap-4 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-sm font-bold text-paper-light ring-1 ring-gold/50 shadow-[0_14px_30px_-14px_rgb(16_44_35/0.8)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Enquire Now
            <span className="grid size-9 place-items-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-12 place-items-center rounded-full bg-paper-light text-ink ring-1 ring-ink/15 xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100svh-5rem)] overflow-y-auto border-t border-line bg-paper-light px-5 pb-10 pt-6 sm:px-8 xl:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {[...navLinks, partnerLink].map((link, index) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="flex items-baseline justify-between py-4"
                >
                  <span
                    className={cn(
                      'headline text-4xl text-ink',
                      isActive(link.href) && 'italic text-gold-deep',
                    )}
                  >
                    {link.label}
                  </span>
                  <span className="eyebrow text-muted-ink">{String(index + 1).padStart(2, '0')}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/contact"
          className="mt-8 flex items-center justify-between rounded-full bg-ink py-2 pl-6 pr-2 font-bold text-paper-light"
        >
          Enquire Now
          <span className="grid size-11 place-items-center rounded-full bg-gold text-ink">
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </span>
        </Link>
      </div>
    </header>
  )
}
