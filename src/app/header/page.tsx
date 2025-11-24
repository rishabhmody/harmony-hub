'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center border-b border-gray-700">
      <div className="flex items-center space-x-4">
          <img src="/harmony logo2.png" alt="Harmony Hub Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold">Harmony Hub</span>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/reader/dashboard" className="hover:text-blue-500 transition">Dashboard</Link>
          <Link href="/reader/explore" className="hover:text-blue-500 transition">Explore</Link>
          <Link href="/leaderboard" className="hover:text-blue-500 transition">Leaderboard</Link>
          <Link href="/contact" className="hover:text-blue-500 transition">Contact</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <span>{session.user?.name}</span>
            <button onClick={() => signOut()} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-500 transition">Log In</Link>
            <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
