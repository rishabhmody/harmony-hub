'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const callbackUrl = searchParams.get('callbackUrl') || '/home'
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const handleRedirect = async () => {
      if (status === 'authenticated' && session?.user) {
        // Check if we need to update role from sessionStorage (OAuth signup)
        const signupRole = typeof window !== 'undefined' ? sessionStorage.getItem('signupRole') : null
        if (signupRole && session.user.role !== signupRole) {
          // Update user role in database
          try {
            setIsUpdating(true)
            await fetch('/api/update-role', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ role: signupRole }),
            })
            sessionStorage.removeItem('signupRole')
            // Refresh session to get updated role
            window.location.reload()
            return
          } catch (error) {
            console.error('Error updating role:', error)
          } finally {
            setIsUpdating(false)
          }
        }

        // Check user role and redirect accordingly
        const userRole = session.user.role || 'artist'
        
        // If callbackUrl is set and matches expected pattern, use it
        if (callbackUrl.includes('/reader/dashboard') || callbackUrl.includes('/curator/dashboard')) {
          router.push(callbackUrl)
        } else {
          // Otherwise redirect based on role
          if (userRole === 'venue') {
            router.push('/curator/dashboard')
          } else {
            router.push('/reader/dashboard')
          }
        }
      } else if (status === 'unauthenticated') {
        // If not authenticated, redirect to login
        router.push('/login')
      }
    }

    handleRedirect()
  }, [status, session, router, callbackUrl])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg">{isUpdating ? 'Setting up your account...' : 'Completing sign in...'}</p>
      </div>
    </div>
  )
}

