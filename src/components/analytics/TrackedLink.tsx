'use client'

import Link from 'next/link'
import { umamiEvents } from './UmamiAnalytics'
import { ComponentProps } from 'react'

type TrackedLinkProps = ComponentProps<typeof Link> & {
  /** Event name to track (uses pre-defined events or custom) */
  trackAs?: 'cta' | 'external' | 'download' | 'phone' | 'email' | 'whatsapp'
  /** Label for the tracked event */
  trackLabel?: string
}

/**
 * A Link component with built-in Umami tracking
 *
 * @example
 * // Track as CTA
 * <TrackedLink href="/contactos" trackAs="cta" trackLabel="header_contact">
 *   Contactar
 * </TrackedLink>
 *
 * // Track phone click
 * <TrackedLink href="tel:+351914663553" trackAs="phone">
 *   Ligar
 * </TrackedLink>
 */
export function TrackedLink({
  trackAs,
  trackLabel,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the event based on type
    switch (trackAs) {
      case 'cta':
        umamiEvents.ctaClick(trackLabel || 'unknown')
        break
      case 'external':
        umamiEvents.externalLink(props.href?.toString() || '')
        break
      case 'download':
        umamiEvents.downloadClick(trackLabel || props.href?.toString() || '')
        break
      case 'phone':
        umamiEvents.phoneClick()
        break
      case 'email':
        umamiEvents.emailClick()
        break
      case 'whatsapp':
        umamiEvents.whatsappClick()
        break
    }

    // Call original onClick if provided
    onClick?.(e)
  }

  return (
    <Link onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}

type TrackedButtonProps = ComponentProps<'button'> & {
  trackAs?: 'cta' | 'form_submit'
  trackLabel?: string
}

/**
 * A Button with built-in Umami tracking
 */
export function TrackedButton({
  trackAs,
  trackLabel,
  onClick,
  children,
  ...props
}: TrackedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (trackAs === 'cta') {
      umamiEvents.ctaClick(trackLabel || 'button')
    } else if (trackAs === 'form_submit') {
      umamiEvents.formSubmit(trackLabel || 'unknown')
    }

    onClick?.(e)
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  )
}
