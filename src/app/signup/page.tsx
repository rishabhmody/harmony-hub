'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'artist' | 'venue'>('artist') // Default role
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await response.json()

      if (response.ok) {
        // Automatically sign in the user after successful registration
        const signInResponse = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (signInResponse?.error) {
          setError(signInResponse.error)
        } else {
          router.push('/home') // Redirect to dashboard or home page
        }
      } else {
        setError(data.message || 'Failed to create account')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <header className="fixed top-0 left-0 w-full bg-white p-4 z-50">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-6 w-6" />
          <span className="text-xl font-semibold">Harmony Hub</span>
        </Link>
      </header>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 md:px-16 py-20">
        <h1 className="text-4xl font-medium mb-10 text-center md:text-left">
          Join Harmony Hub
        </h1>

        {/* Social Buttons */}
        <div className="space-y-5 w-full max-w-md mb-8">
          <button
            onClick={() => signIn('google')}
            className="w-full border rounded-full py-3 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100 transition"
          >
            <img src="/google-icon.svg" alt="" className="h-5 w-5" />
            Continue with Google
          </button>

          <button
            onClick={() => signIn('github')}
            className="w-full border rounded-full py-3 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100 transition"
          >
            <img src="/facebook-icon.svg" alt="" className="h-5 w-5" /> {/* Assuming facebook-icon for github */}
            Continue with Github
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-8">
          <span className="flex-1 border-t" />
          <span className="px-4 text-gray-500 text-sm">or create an account with email</span>
          <span className="flex-1 border-t" />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleEmailSignup} className="w-full max-w-md space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="w-full">
            <label className="block text-gray-700 text-sm mb-2">I am signing up as a:</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setRole('artist')}
                className={`flex-1 py-3 rounded-xl border text-center transition ${
                  role === 'artist'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Artist
              </button>
              <button
                type="button"
                onClick={() => setRole('venue')}
                className={`flex-1 py-3 rounded-xl border text-center transition ${
                  role === 'venue'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Venue
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign up'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 md:h-screen p-6">
        <div className="overflow-hidden rounded-3xl shadow-lg w-full max-w-md">
          <Image
            src="/signup_image.jpg"
            alt="Artists collaborating"
            width={500}
            height={700}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}