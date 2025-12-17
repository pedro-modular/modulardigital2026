'use client'

import Script from 'next/script'

// Extend window type for Umami
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void
    }
  }
}

export function UmamiAnalytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

  // Don't render if no website ID is configured
  if (!websiteId) {
    return null
  }

  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  )
}

/**
 * Track a custom event in Umami
 * @param eventName - Name of the event (e.g., 'button_click', 'form_submit')
 * @param eventData - Optional data to attach to the event
 *
 * @example
 * // Track a simple event
 * trackEvent('cta_click')
 *
 * // Track with data
 * trackEvent('form_submit', { form: 'contact', page: '/contactos' })
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData)
  }
}

/**
 * Pre-defined event trackers for common actions
 */
export const umamiEvents = {
  // CTA clicks
  ctaClick: (ctaName: string, page?: string) =>
    trackEvent('cta_click', { cta: ctaName, ...(page && { page }) }),

  // Form events
  formStart: (formName: string) =>
    trackEvent('form_start', { form: formName }),
  formSubmit: (formName: string) =>
    trackEvent('form_submit', { form: formName }),
  formError: (formName: string, error: string) =>
    trackEvent('form_error', { form: formName, error }),

  // Navigation
  externalLink: (url: string) =>
    trackEvent('external_link', { url }),
  downloadClick: (fileName: string) =>
    trackEvent('download', { file: fileName }),

  // Engagement
  scrollDepth: (percentage: number) =>
    trackEvent('scroll_depth', { depth: percentage }),
  timeOnPage: (seconds: number) =>
    trackEvent('time_on_page', { seconds }),

  // Contact
  phoneClick: () =>
    trackEvent('phone_click'),
  emailClick: () =>
    trackEvent('email_click'),
  whatsappClick: () =>
    trackEvent('whatsapp_click'),
}
