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
  const [role, setRole] = useState<'artist' | 'venue'>('artist')
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

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    await signIn(provider, {
      callbackUrl: `${window.location.origin}/auth/callback?callbackUrl=${encodeURIComponent(role === 'venue' ? '/curator/dashboard' : '/reader/dashboard')}`,
    })
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Header Logo — Fixed Top Left */}
      <header className="p-4 flex items-center justify-between w-full absolute top-0 left-0">
        <div className="flex items-center space-x-2">
          <Link href="/home" className="flex items-center space-x-2">
          <img src="/harmony logo2.png" alt="Harmony Hub Logo" className="h-6 w-6" />
          <span className="text-xl font-semibold">Harmony Hub</span>
        </Link>
        </div>
      </header>

      {/* LEFT — FORM */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-10 md:px-20 py-10">
        <h1 className="text-4xl font-medium mb-10 text-center md:text-left">
          Log in
        </h1>

        {/* Social Buttons */}
        <div className="space-y-5 w-full max-w-md mb-8">
          <button
            onClick={() => handleOAuthLogin('google')}
            className="w-full border rounded-full py-3 flex items-center justify-center gap-2 text-white hover:bg-gray-800 transition"
          >
            <img src="/google-icon.svg" alt="" className="h-5 w-5" />
            Continue with Google
          </button>

          <button
            onClick={() => handleOAuthLogin('facebook')}
            className="w-full border rounded-full py-3 flex items-center justify-center gap-2 text-white hover:bg-gray-800 transition"
          >
            <img src="/github logo.png" alt="" className="h-5 w-5" />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-8">
          <span className="flex-1 border-t border-gray-700" />
          <span className="px-4 text-gray-500 text-sm">or continue with email</span>
          <span className="flex-1 border-t border-gray-700" />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleEmailLogin} className="w-full max-w-md">
          {/* Email */}
          <div className="w-full max-w-md">
            <label className="text-gray-400">Email</label>
            <input
              type="email"
              className="w-full bg-gray-800 border-gray-700 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with Eye Toggle */}
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center">
              <label className="text-gray-400">Password</label>

              {/* Eye Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm flex items-center gap-1 text-gray-400"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full bg-gray-800 border-gray-700 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-end mt-1">
              <a href="#" className="text-sm underline text-gray-400">
                Forget your password
              </a>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center mt-4 gap-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-gray-400">
              Remember me
            </label>
          </div>

          <div className="w-full">

              <label className="block text-gray-400 text-sm mb-2">I am signing up as a:</label>

              <div className="flex gap-4">

                <button

                  type="button"

                  onClick={() => setRole('artist')}

                  className={`flex-1 py-3 rounded-xl border text-center transition ${

                    role === 'artist'

                      ? 'bg-blue-500 text-white border-blue-500'

                      : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'

                  }`}

                >

                  Artist

                </button>

                <button

                  type="button"

                  onClick={() => setRole('venue')}

                  className={`flex-1 py-3 rounded-xl border text-center transition ${

                    role === 'venue'

                      ? 'bg-blue-500 text-white border-blue-500'

                      : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'

                  }`}

                >

                  Venue

                </button>

              </div>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition mt-6"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-400 text-sm mt-5">
          Don’t have an account?{' '}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* RIGHT — IMAGE */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-800 rounded-t-3xl md:rounded-l-3xl md:rounded-t-none p-6 md:p-0">
        <div className="overflow-hidden rounded-3xl shadow-lg w-full max-w-md md:max-w-none">
          <Image
            src="/login-signup page.jpg"
            alt="Musician performing illustration"
            width={700}
            height={700}
            className="object-cover w-full h-auto rounded-3xl"
          />
        </div>
      </div>
    </div>
  )
}
