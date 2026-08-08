import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { profile } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const profiles = await db.select().from(profile)
  return NextResponse.json(profiles)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const [newProfile] = await db.insert(profile).values({
      id: body.id || 1,
      name: body.name || '',
      bioZh: body.bioZh || '',
      bioEn: body.bioEn || '',
      avatarUrl: body.avatarUrl || '',
    }).returning()

    return NextResponse.json({ ...newProfile }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { id, ...updates } = body
    await db.update(profile).set(updates).where(eq(profile.id, id))

    const [updated] = await db.select().from(profile).where(eq(profile.id, id))
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    await db.delete(profile).where(eq(profile.id, Number(id)))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 })
  }
}
