import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stew of Stars',
  description: 'A cosmic blend of destiny and elements - Four Pillars of Destiny (四柱推命)',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
