import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { FavoritesProvider } from "@/hooks/use-favorites"
import { AuthProvider } from "@/hooks/use-auth"
import { ConditionalFooter } from "@/components/conditional-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://platform.disruptasia.today'),
  title: "Disrupt Asia 2025 | Investor Platform",
  description: "Connect with groundbreaking startups at Asia's premier startup conference",
  generator: 'Next.js',
  applicationName: 'Disrupt Asia',
  authors: [{ name: 'Disrupt Asia Team' }],
  keywords: ['Disrupt Asia', 'Technology', 'Innovation', 'Asia'],
  robots: 'index, follow',
  icons: {
    icon: '/logos/logo-02.png',
    apple: '/logos/logo-02.png',
  },
  openGraph: {
    title: 'Disrupt Asia 2025 | Investor Platform',
    description: "Connect with groundbreaking startups at Asia's premier startup conference",
    url: 'https://platform.disruptasia.today',
    siteName: 'Disrupt Asia',
    images: [
      {
        url: '/logos/logo-02.png',
        width: 1200,
        height: 630,
        alt: 'Disrupt Asia 2025',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disrupt Asia 2025 | Investor Platform',
    description: "Connect with groundbreaking startups at Asia's premier startup conference",
    images: ['/logos/logo-02.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <FavoritesProvider>
            <main className="flex-1">
              {children}
            </main>
            <ConditionalFooter />
            <Toaster />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
