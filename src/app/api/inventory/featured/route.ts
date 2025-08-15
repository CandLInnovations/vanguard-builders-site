import { NextResponse } from 'next/server'
import { getFeaturedHomes } from '@/lib/sanity-queries'
import type { FeaturedHomesApiResponse } from '@/types/sanity'

export async function GET() {
  try {
    const homes = await getFeaturedHomes()
    return NextResponse.json({ homes, total: homes.length })
  } catch (error) {
    console.error('Error fetching featured homes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured homes' },
      { status: 500 }
    )
  }
}