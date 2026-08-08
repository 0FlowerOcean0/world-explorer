import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { profile } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const profiles = db.select().from(profile).all()
  return NextResponse.json(profiles)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = db.insert(profile).values({
      id: body.id || 1,
      name: body.name || '',
      bioZh: body.bioZh || '',
      bioEn: body.bioEn || '',
      avatarUrl: body.avatarUrl || '',
    }).run()

    return NextResponse.json({ ...body }, { status: 201 })
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
    db.update(profile).set(updates).where(eq(profile.id, id)).run()

    const updated = db.select().from(profile).where(eq(profile.id, id)).get()
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

    db.delete(profile).where(eq(profile.id, Number(id))).run()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 })
  }
}
