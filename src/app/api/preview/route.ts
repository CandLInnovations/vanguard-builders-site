import { NextRequest, NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const type = searchParams.get('type') || 'home'

  // Check for secret to confirm this is a valid request
  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid preview secret' }, { status: 401 })
  }

  // Redirect to the path being previewed
  let previewPath = '/'
  
  if (type === 'home' && slug) {
    previewPath = `/inventory/${slug}?preview=true`
  } else if (type === 'inventory') {
    previewPath = '/inventory?preview=true'
  }

  redirect(previewPath)
}

export async function POST() {
  // Exit preview mode
  const response = NextResponse.json({ message: 'Preview mode disabled' })
  
  // Clear preview cookies if any
  response.cookies.delete('__prerender_bypass')
  response.cookies.delete('__next_preview_data')
  
  return response
}