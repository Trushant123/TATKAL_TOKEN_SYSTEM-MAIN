import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"
import { TokenProvider } from "@/contexts/token-context"
import { ToastProvider } from "@/components/ui/toast"
import { ErrorBoundary } from "@/components/ui/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tatkal Token Management - Indian Railways",
  description: "Digital token management system for Tatkal bookings - Indian Railways",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ToastProvider>
            <LanguageProvider>
              <AuthProvider>
                <TokenProvider>{children}</TokenProvider>
              </AuthProvider>
            </LanguageProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
