import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../../lib/mongodb"
import { User } from "../../../../lib/db/models" // Import User model
import dbConnect from "../../../../lib/db" // Import dbConnect
import bcrypt from "bcryptjs" // Import bcrypt

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
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
        await dbConnect()

        const user = await User.findOne({ email: credentials?.email })

        if (user && user.password) {
          const isMatch = await bcrypt.compare(credentials!.password, user.password)
          if (isMatch) {
            // Return user object without the password
            return { id: user._id.toString(), name: user.name, email: user.email }
          }
        }
        return null // If login fails
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (!user) {
        return session
      }

      await dbConnect()

      type MinimalUserRecord = {
        role?: string
        xp?: number
        gigsPlayed?: number
      }

      const userRecord = (await User.findById(user.id).lean()) as
        | MinimalUserRecord
        | null

      const enrichedUser = {
        id: user.id,
        name: user.name ?? session.user?.name ?? null,
        email: user.email ?? session.user?.email ?? null,
        role: userRecord?.role ?? 'artist',
        xp: userRecord?.xp ?? 0,
        gigsPlayed: userRecord?.gigsPlayed ?? 0,
      }

      session.user = enrichedUser as any
      return session
    },
  },
  events: {
    async createUser({ user }) {
      if (!user?.email) {
        return
      }

      await dbConnect()

      const existing = await User.findOne({ email: user.email })
      if (existing) {
        return
      }

      await User.create({
        email: user.email,
        name: user.name || 'Harmony Hub User',
        role: 'artist',
        provider: 'oauth',
        xp: 0,
        gigsPlayed: 0,
      })
    },
  },
})

export { handler as GET, handler as POST }