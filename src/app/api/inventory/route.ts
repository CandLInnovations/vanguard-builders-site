import { NextRequest, NextResponse } from 'next/server'
import { getAvailableHomes, searchHomes } from '@/lib/sanity-queries'
import type { HomeSearchFilters } from '@/types/sanity'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Check if this is a search request
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const bedrooms = searchParams.get('bedrooms')
    const bathrooms = searchParams.get('bathrooms')
    const architecturalStyle = searchParams.get('architecturalStyle')
    
    // If any search parameters are provided, use search function
    if (minPrice || maxPrice || bedrooms || bathrooms || architecturalStyle) {
      const searchFilters: HomeSearchFilters = {
        minPrice: minPrice ? parseInt(minPrice) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
        bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
        bathrooms: bathrooms ? parseFloat(bathrooms) : undefined,
        architecturalStyle: architecturalStyle || undefined,
      }
      
      const homes = await searchHomes(searchFilters)
      
      return NextResponse.json({ homes, total: homes.length })
    }
    
    // Otherwise, return all available homes
    const homes = await getAvailableHomes()
    
    return NextResponse.json({ homes, total: homes.length })
  } catch (error) {
    console.error('Error fetching luxury homes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch luxury homes' },
      { status: 500 }
    )
  }
}