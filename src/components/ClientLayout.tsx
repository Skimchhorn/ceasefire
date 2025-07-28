"use client"

import { Navbar } from './navBar'
import { ThemeProvider } from './theme-provider'
import { Footer } from './footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar />
      {children}
      <Footer />
    </ThemeProvider>
  )
}
