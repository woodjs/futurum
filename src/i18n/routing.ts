import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const locales = ['en-us', 'ar-eg'] as const
export type Locale = (typeof locales)[number]

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link } = createSharedPathnamesNavigation({ locales })
