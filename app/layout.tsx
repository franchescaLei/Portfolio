import type { Metadata } from 'next'
import './globals.css'
import { ModeProvider } from '@/components/ui/ModeProvider'
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider'

export const metadata: Metadata = {
  title: 'Your Name — Full-Stack · Mobile · Game Developer',
  description:
    'Portfolio of a versatile software developer working across full-stack web, mobile, and game development.',
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
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@400;500&display=swap"
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
