import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | World Explorer',
  description: 'Administration dashboard for managing content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
