import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { locations } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const location = db.select().from(locations).where(eq(locations.id, Number(id))).get()
    if (!location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 })
    }
    return NextResponse.json(location)
  }

  const allLocations = db.select().from(locations).all()
  return NextResponse.json(allLocations)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = db.insert(locations).values({
      name: body.name || '',
      country: body.country || '',
      lat: body.lat || '0',
      lng: body.lng || '0',
      description: body.description || '',
    }).run()

    return NextResponse.json({ id: result.lastInsertRowid, ...body }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { id, ...updates } = body
    db.update(locations).set(updates).where(eq(locations.id, id)).run()

    const updated = db.select().from(locations).where(eq(locations.id, id)).get()
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update location' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    db.delete(locations).where(eq(locations.id, Number(id))).run()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete location' }, { status: 500 })
  }
}
