'use client'

import { useState, useEffect, useCallback } from 'react'

type Post = {
  id: number
  titleZh: string
  titleEn: string
  contentZh: string
  contentEn: string
  slug: string
  locationId: number | null
  createdAt: string
}

type Location = {
  id: number
  name: string
  country: string
  lat: string
  lng: string
  description: string
}

type Profile = {
  id: number
  name: string
  bioZh: string
  bioEn: string
  avatarUrl: string
}

type Tab = 'posts' | 'locations' | 'profile'

function Input({ label, value, onChange, multiline, required }: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  required?: boolean
}) {
  const baseClass = 'w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {multiline ? (
        <textarea
          className={`${baseClass} min-h-[100px] resize-y`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      ) : (
        <input
          className={baseClass}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      )}
    </div>
  )
}

function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [editing, setEditing] = useState<Post | null>(null)
  const [showForm, setShowForm] = useState(false)

  const loadPosts = useCallback(async () => {
    const res = await fetch('/api/posts')
    setPosts(await res.json())
  }, [])

  const loadLocations = useCallback(async () => {
    const res = await fetch('/api/locations')
    setLocations(await res.json())
  }, [])

  useEffect(() => { loadPosts(); loadLocations() }, [loadPosts, loadLocations])

  const handleSave = async (data: Partial<Post>) => {
    if (editing) {
      await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: editing.id }),
      })
    } else {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    }
    setEditing(null)
    setShowForm(false)
    loadPosts()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    await fetch(`/api/posts?id=${id}`, { method: 'DELETE' })
    loadPosts()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Posts ({posts.length})</h2>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          + New Post
        </button>
      </div>

      {showForm && (
        <PostForm
          initial={editing || undefined}
          locations={locations}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setShowForm(false) }}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-700">
              <th className="text-left py-2 px-3">ID</th>
              <th className="text-left py-2 px-3">Title (ZH)</th>
              <th className="text-left py-2 px-3">Title (EN)</th>
              <th className="text-left py-2 px-3">Slug</th>
              <th className="text-left py-2 px-3">Created</th>
              <th className="text-right py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                <td className="py-2 px-3">{post.id}</td>
                <td className="py-2 px-3 font-medium">{post.titleZh}</td>
                <td className="py-2 px-3 text-neutral-500">{post.titleEn}</td>
                <td className="py-2 px-3 font-mono text-xs">{post.slug}</td>
                <td className="py-2 px-3 text-xs">{post.createdAt}</td>
                <td className="py-2 px-3 text-right space-x-2">
                  <button
                    onClick={() => { setEditing(post); setShowForm(true) }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PostForm({ initial, locations, onSave, onCancel }: {
  initial?: Post
  locations: Location[]
  onSave: (data: Partial<Post>) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    titleZh: initial?.titleZh || '',
    titleEn: initial?.titleEn || '',
    contentZh: initial?.contentZh || '',
    contentEn: initial?.contentEn || '',
    slug: initial?.slug || '',
    locationId: initial?.locationId || '',
  })

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-4">
      <h3 className="font-medium mb-3">{initial ? 'Edit Post' : 'New Post'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Title (ZH)" value={form.titleZh} onChange={(v) => update('titleZh', v)} required />
        <Input label="Title (EN)" value={form.titleEn} onChange={(v) => update('titleEn', v)} />
        <Input label="Slug" value={form.slug} onChange={(v) => update('slug', v)} required />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Location</label>
          <select
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-sm"
            value={form.locationId}
            onChange={(e) => update('locationId', e.target.value)}
          >
            <option value="">None</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>{loc.name}, {loc.country}</option>
            ))}
          </select>
        </div>
        <Input label="Content (ZH)" value={form.contentZh} onChange={(v) => update('contentZh', v)} multiline />
        <Input label="Content (EN)" value={form.contentEn} onChange={(v) => update('contentEn', v)} multiline />
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onSave({ ...form, locationId: form.locationId ? Number(form.locationId) : null })}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function LocationsManager() {
  const [locations, setLocations] = useState<Location[]>([])
  const [editing, setEditing] = useState<Location | null>(null)
  const [showForm, setShowForm] = useState(false)

  const loadLocations = useCallback(async () => {
    const res = await fetch('/api/locations')
    setLocations(await res.json())
  }, [])

  useEffect(() => { loadLocations() }, [loadLocations])

  const handleSave = async (data: Partial<Location>) => {
    if (editing) {
      await fetch('/api/locations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: editing.id }),
      })
    } else {
      await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    }
    setEditing(null)
    setShowForm(false)
    loadLocations()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this location?')) return
    await fetch(`/api/locations?id=${id}`, { method: 'DELETE' })
    loadLocations()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Locations ({locations.length})</h2>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          + New Location
        </button>
      </div>

      {showForm && (
        <LocationForm
          initial={editing || undefined}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setShowForm(false) }}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-700">
              <th className="text-left py-2 px-3">ID</th>
              <th className="text-left py-2 px-3">Name</th>
              <th className="text-left py-2 px-3">Country</th>
              <th className="text-left py-2 px-3">Lat</th>
              <th className="text-left py-2 px-3">Lng</th>
              <th className="text-left py-2 px-3">Description</th>
              <th className="text-right py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                <td className="py-2 px-3">{loc.id}</td>
                <td className="py-2 px-3 font-medium">{loc.name}</td>
                <td className="py-2 px-3">{loc.country}</td>
                <td className="py-2 px-3 font-mono text-xs">{loc.lat}</td>
                <td className="py-2 px-3 font-mono text-xs">{loc.lng}</td>
                <td className="py-2 px-3 text-neutral-500 max-w-[200px] truncate">{loc.description}</td>
                <td className="py-2 px-3 text-right space-x-2">
                  <button
                    onClick={() => { setEditing(loc); setShowForm(true) }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(loc.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function LocationForm({ initial, onSave, onCancel }: {
  initial?: Location
  onSave: (data: Partial<Location>) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    country: initial?.country || '',
    lat: initial?.lat || '',
    lng: initial?.lng || '',
    description: initial?.description || '',
  })

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-4">
      <h3 className="font-medium mb-3">{initial ? 'Edit Location' : 'New Location'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Name" value={form.name} onChange={(v) => update('name', v)} required />
        <Input label="Country" value={form.country} onChange={(v) => update('country', v)} required />
        <Input label="Latitude" value={form.lat} onChange={(v) => update('lat', v)} required />
        <Input label="Longitude" value={form.lng} onChange={(v) => update('lng', v)} required />
        <Input label="Description" value={form.description} onChange={(v) => update('description', v)} multiline />
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onSave(form)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function ProfileManager() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [editing, setEditing] = useState<Profile | null>(null)
  const [showForm, setShowForm] = useState(false)

  const loadProfiles = useCallback(async () => {
    const res = await fetch('/api/profile')
    setProfiles(await res.json())
  }, [])

  useEffect(() => { loadProfiles() }, [loadProfiles])

  const handleSave = async (data: Partial<Profile>) => {
    if (editing) {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: editing.id }),
      })
    } else {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    }
    setEditing(null)
    setShowForm(false)
    loadProfiles()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this profile?')) return
    await fetch(`/api/profile?id=${id}`, { method: 'DELETE' })
    loadProfiles()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Profile ({profiles.length})</h2>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          + New Profile
        </button>
      </div>

      {showForm && (
        <ProfileForm
          initial={editing || undefined}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setShowForm(false) }}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-700">
              <th className="text-left py-2 px-3">ID</th>
              <th className="text-left py-2 px-3">Name</th>
              <th className="text-left py-2 px-3">Bio (ZH)</th>
              <th className="text-left py-2 px-3">Bio (EN)</th>
              <th className="text-left py-2 px-3">Avatar URL</th>
              <th className="text-right py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((p) => (
              <tr key={p.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                <td className="py-2 px-3">{p.id}</td>
                <td className="py-2 px-3 font-medium">{p.name}</td>
                <td className="py-2 px-3 text-neutral-500 max-w-[200px] truncate">{p.bioZh}</td>
                <td className="py-2 px-3 text-neutral-500 max-w-[200px] truncate">{p.bioEn}</td>
                <td className="py-2 px-3 font-mono text-xs">{p.avatarUrl}</td>
                <td className="py-2 px-3 text-right space-x-2">
                  <button
                    onClick={() => { setEditing(p); setShowForm(true) }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProfileForm({ initial, onSave, onCancel }: {
  initial?: Profile
  onSave: (data: Partial<Profile>) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    id: initial?.id || 1,
    name: initial?.name || '',
    bioZh: initial?.bioZh || '',
    bioEn: initial?.bioEn || '',
    avatarUrl: initial?.avatarUrl || '',
  })

  const update = (field: string, value: string | number) => setForm((f) => ({ ...f, [field]: value }))

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-4">
      <h3 className="font-medium mb-3">{initial ? 'Edit Profile' : 'New Profile'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="ID" value={String(form.id)} onChange={(v) => update('id', Number(v))} required />
        <Input label="Name" value={form.name} onChange={(v) => update('name', v)} required />
        <Input label="Bio (ZH)" value={form.bioZh} onChange={(v) => update('bioZh', v)} multiline />
        <Input label="Bio (EN)" value={form.bioEn} onChange={(v) => update('bioEn', v)} multiline />
        <Input label="Avatar URL" value={form.avatarUrl} onChange={(v) => update('avatarUrl', v)} />
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onSave(form)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('posts')

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <nav className="flex gap-1">
            {(['posts', 'locations', 'profile'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  tab === t
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {tab === 'posts' && <PostsManager />}
        {tab === 'locations' && <LocationsManager />}
        {tab === 'profile' && <ProfileManager />}
      </div>
    </div>
  )
}
