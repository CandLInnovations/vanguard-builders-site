import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio | Vanguard Builders',
  description: 'Content management system for Vanguard Builders luxury home inventory',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ margin: 0, height: '100vh' }}>
      {children}
    </div>
  )
}