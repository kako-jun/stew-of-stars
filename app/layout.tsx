import type { Metadata } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kako-jun.github.io/stew-of-stars'
const siteName = 'Stew of Stars'
const description =
  '四柱推命（八字命学）であなたの運命を占います。生年月日から五行のバランスを分析し、性格や人生のアドバイスを提供。A cosmic blend of destiny and elements - Four Pillars of Destiny fortune-telling.'
const keywords = [
  '四柱推命',
  '八字命学',
  '占い',
  'fortune telling',
  'Four Pillars of Destiny',
  '五行',
  'five elements',
  '干支',
  '天干地支',
  '運命',
  'destiny',
  '無料占い',
]

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | 四柱推命で運命を占う`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: keywords.join(', '),
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: ['en_US'],
    url: siteUrl,
    title: `${siteName} | 四柱推命で運命を占う`,
    description,
    siteName,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | 四柱推命で運命を占う`,
    description,
    images: [`${siteUrl}/og-image.png`],
    creator: '@kako_jun_42',
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Google Search Console用（後で設定）
    // google: 'verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // JSON-LD構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteName,
    description,
    url: siteUrl,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
    inLanguage: ['ja', 'en'],
  }

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
