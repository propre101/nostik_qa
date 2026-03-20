import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Check for Vercel's Cron authorization header to prevent public abuse
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role to bypass RLS
  )

  // A simple query to wake up the DB
    const { data, error } = await supabase.from('settings').select('key').limit(1)


  if (error && error.code !== 'PGRST116') {
     // If the table doesn't exist, we still successfully "hit" the DB, 
     // but you can create an empty dummy table called '_keep_alive' if you want a clean log.
     console.error('Ping failed:', error)
     return NextResponse.json({ success: false, error: error.message })
  }

  return NextResponse.json({ success: true, message: 'Database pinged successfully' })
}