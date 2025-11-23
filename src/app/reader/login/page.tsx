'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/reader/dashboard',
    })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else if (result?.ok) {
      // Fetch session to check user role and redirect accordingly
      const session = await fetch('/api/auth/session').then(res => res.json())
      if (session?.user?.role === 'venue') {
        router.push('/curator/dashboard')
      } else {
        router.push('/reader/dashboard')
      }
      setLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    await signIn(provider, {
      callbackUrl: `${window.location.origin}/auth/callback?callbackUrl=${encodeURIComponent('/reader/dashboard')}`,
    })
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">

      {/* HEADER — always visible */}
      <header className="p-4 flex items-center space-x-2 absolute top-0 left-0">
        <img src="/logo.png" alt="Harmony Hub Logo" className="h-6 w-6" />
        <span className="text-xl font-semibold">Harmony Hub</span>
      </header>

      {/* LEFT — FORM SECTION */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-8 sm:px-12 lg:px-20 py-20 md:py-10">

        <h1 className="text-4xl font-semibold mb-10 text-center md:text-center">
          Log in
        </h1>

        {/* Social Buttons */}
        <div className="space-y-5 w-full max-w-md mx-auto md:mx-0">
          <button
            onClick={() => handleOAuthLogin('google')}
            className="w-full border rounded-full py-3 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100 transition"
          >
            <img src="/google-icon.svg" alt="" className="h-5 w-5" />
            Continue with Google
          </button>

          <button
            onClick={() => handleOAuthLogin('github')}
            className="w-full border rounded-full py-3 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100 transition"
          >
            <img src="/facebook-icon.svg" alt="" className="h-5 w-5" />
            Continue with Github
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-8 w-full max-w-md mx-auto md:mx-0">
          <span className="flex-1 border-t" />
          <span className="px-4 text-gray-500 text-sm">or continue with email</span>
          <span className="flex-1 border-t" />
        </div>

        {error && <p className="text-red-500 text-sm mb-4 w-full max-w-md mx-auto md:mx-0">{error}</p>}

        <form onSubmit={handleEmailLogin} className="w-full max-w-md mx-auto md:mx-0">
          {/* Email */}
          <div className="w-full max-w-md">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-gray-500 focus:outline-none mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center">
              <label className="text-gray-700">Password</label>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm flex items-center gap-1 text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-end mt-1">
              <a href="#" className="text-sm underline">Forget your password</a>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center mt-4 gap-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-gray-700">Remember me</label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition mt-6 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* Sign Up */}
        <p className="text-center text-gray-600 text-sm mt-5">
          Don't have an account?{' '}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* RIGHT — IMAGE SECTION */}
      <div className="hidden md:flex w-full md:w-1/2 justify-center items-center bg-gray-100 p-6">
        <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/Login_image.jpg"
            alt="Reading Illustration"
            fill
            className="object-cover rounded-3xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

    </div>
  )
}
