import type { Metadata } from 'next'
import './globals.css'
import { ModeProvider } from '@/components/ui/ModeProvider'
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider'

export const metadata: Metadata = {
  title: 'Franchesca Lei Demisana — Full-Stack · Mobile · Game Developer',
  description:
    'Portfolio of Franchesca Lei Demisana, a versatile software developer working across full-stack web, mobile, and game development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Professional: Outfit + JetBrains Mono */}
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* Playful: Playfair Display + DM Sans + DM Mono */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* Minimal: Syne + Syne Mono */}
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Syne+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ModeProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ModeProvider>
      </body>
    </html>
  )
}