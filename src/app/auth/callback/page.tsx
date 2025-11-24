'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession, getSession } from 'next-auth/react'

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const callbackUrl = searchParams?.get('callbackUrl') || '/home'
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const handleRedirect = async () => {
      // if not authenticated, send to login
      if (status === 'unauthenticated') {
        router.replace('/login')
        return
      }

      // wait until session is available
      if (status !== 'authenticated' || !session) return

      try {
        // safe access to sessionStorage
        const signupRole =
          typeof window !== 'undefined' ? sessionStorage.getItem('signupRole') : null

        // If signup role exists and differs from session role, update DB
        if (signupRole && (session?.user?.role ?? null) !== signupRole) {
          setIsUpdating(true)
          const res = await fetch('/api/update-role', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: signupRole }),
          })

          if (!res.ok) {
            console.error('Failed to update role on server', await res.text())
            // optional: show user-friendly UI or retry logic
          } else {
            // Remove the temp flag
            sessionStorage.removeItem('signupRole')

            // Re-fetch session from next-auth to get the latest role
            const fresh = await getSession()
            const freshRole = fresh?.user?.role ?? signupRole

            // Redirect based on fresh role (no full reload)
            if (callbackUrl && (callbackUrl.includes('/reader/dashboard') || callbackUrl.includes('/curator/dashboard'))) {
              router.replace(callbackUrl)
            } else {
              if (freshRole === 'venue') {
                router.replace('/curator/dashboard')
              } else {
                router.replace('/reader/dashboard')
              }
            }
            return
          }
        }

        // No update needed: decide redirect from session (use safe fallback)
        const userRole = session?.user?.role ?? 'artist'

        if (callbackUrl && (callbackUrl.includes('/reader/dashboard') || callbackUrl.includes('/curator/dashboard'))) {
          router.replace(callbackUrl)
        } else {
          if (userRole === 'venue') {
            router.replace('/curator/dashboard')
          } else {
            router.replace('/reader/dashboard')
          }
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        // fallback: push to login or home
        router.replace('/login')
      } finally {
        setIsUpdating(false)
      }
    }

    handleRedirect()
    // Note: we intentionally include only what we rely on; session and status are required
  }, [status, session, router, callbackUrl])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg">{isUpdating ? 'Setting up your account...' : 'Completing sign in...'}</p>
      </div>
    </div>
  )
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Completing sign in...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}
