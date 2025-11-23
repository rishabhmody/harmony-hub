import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getToken } from 'next-auth/jwt'
import dbConnect from '../../../lib/db'
import { User } from '../../../lib/db/models'

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const token = await getToken({ 
      req: {
        headers: {
          cookie: cookieStore.toString()
        }
      } as any,
      secret: process.env.NEXTAUTH_SECRET 
    })
    
    if (!token?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { role } = await req.json()
    if (!role || !['artist', 'venue'].includes(role)) {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 })
    }

    await dbConnect()
    await User.findOneAndUpdate(
      { email: token.email },
      { role }
    )

    return NextResponse.json({ message: 'Role updated successfully' }, { status: 200 })
  } catch (error: any) {
    console.error('Error updating role:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

