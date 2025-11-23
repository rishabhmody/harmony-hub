import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/db'
import { User } from '../../../lib/db/models'

export async function GET() {
  try {
    await dbConnect()
    
    // Fetch all users, sort by XP in descending order (highest first)
    const users = await User.find({})
      .select('name email xp gigsPlayed role')
      .sort({ xp: -1 }) // Descending order - highest XP first
      .lean()

    return NextResponse.json({ users }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

