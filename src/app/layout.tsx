// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'LevelupReads | Sign up',
  description: 'Create your account to get started with LevelupReads',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">

        {/* Main Page Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer (Optional) */}
        <footer className="text-center text-gray-500 text-sm py-4">
          © {new Date().getFullYear()} LevelupReads. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
