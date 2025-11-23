import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "./db/models"
import dbConnect from "./db"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        try {
          await dbConnect()

          const user = await User.findOne({ email: credentials.email })

          if (!user) {
            throw new Error("No user found with this email")
          }

          if (!user.password) {
            throw new Error("This account was created with OAuth. Please sign in with Google or GitHub.")
          }

          const isMatch = await bcrypt.compare(credentials.password, user.password)
          
          if (!isMatch) {
            throw new Error("Invalid password")
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || 'artist',
          }
        } catch (error: any) {
          console.error("Authorization error:", error)
          throw new Error(error.message || "Invalid credentials")
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider !== 'credentials' && user?.email) {
        try {
          await dbConnect()
          const existing = await User.findOne({ email: user.email })
          if (!existing) {
            await User.create({
              email: user.email,
              name: user.name || (profile as any)?.name || 'Harmony Hub User',
              role: 'artist',
              provider: account.provider,
              xp: 0,
              gigsPlayed: 0,
            })
          }
        } catch (error) {
          console.error("Error creating OAuth user:", error)
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        
        await dbConnect()
        const userRecord = await User.findOne({ email: user.email }).lean() as any
        if (userRecord) {
          token.role = userRecord.role || 'artist'
          token.xp = userRecord.xp || 0
          token.gigsPlayed = userRecord.gigsPlayed || 0
        } else if (account?.provider === 'credentials') {
          token.role = (user as any).role || 'artist'
        }
      } else if (token.email) {
        await dbConnect()
        const userRecord = await User.findOne({ email: token.email }).lean() as any
        if (userRecord) {
          token.role = userRecord.role || 'artist'
          token.xp = userRecord.xp || 0
          token.gigsPlayed = userRecord.gigsPlayed || 0
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: (token.role as string) || 'artist',
          xp: (token.xp as number) || 0,
          gigsPlayed: (token.gigsPlayed as number) || 0,
        } as any
      }
      
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        const callbackUrl = new URL(url, baseUrl).searchParams.get('callbackUrl') || url
        return `${baseUrl}/auth/callback?callbackUrl=${encodeURIComponent(callbackUrl)}`
      }
      return `${baseUrl}/auth/callback`
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
}

