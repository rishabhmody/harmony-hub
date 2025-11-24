import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
      xp?: number
      gigsPlayed?: number
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string
    xp?: number
    gigsPlayed?: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    role?: string
    xp?: number
    gigsPlayed?: number
  }
}

