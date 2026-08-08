import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const [post] = await db.select().from(posts).where(eq(posts.id, Number(id)))
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  }

  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt))
  return NextResponse.json(allPosts)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const [newPost] = await db.insert(posts).values({
      titleZh: body.titleZh || '',
      titleEn: body.titleEn || '',
      contentZh: body.contentZh || '',
      contentEn: body.contentEn || '',
      slug: body.slug || '',
      locationId: body.locationId || null,
    }).returning()

    return NextResponse.json({ id: newPost.id, ...body }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { id, ...updates } = body
    await db.update(posts).set(updates).where(eq(posts.id, id))

    const [updated] = await db.select().from(posts).where(eq(posts.id, id))
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    await db.delete(posts).where(eq(posts.id, Number(id)))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
