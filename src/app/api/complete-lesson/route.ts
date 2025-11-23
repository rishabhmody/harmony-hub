import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import dbConnect from '../../../lib/db'
import { User } from '../../../lib/db/models'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { lessonId, xp } = await req.json()
    if (!lessonId || !xp) {
      return NextResponse.json({ message: 'Missing lessonId or xp' }, { status: 400 })
    }

    await dbConnect()
    
    // Update user XP
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $inc: { xp: xp } },
      { new: true }
    )

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      message: 'Lesson completed successfully',
      newXp: user.xp 
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error completing lesson:', error)
    return NextResponse.json({ 
      message: error.message || 'Internal server error',
      error: error.toString()
    }, { status: 500 })
  }
}

