// app/riwayat/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function RiwayatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') return <p>Loading...</p>
  if (!session) {
    router.push('/profil')
    return null
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Riwayat Lamaran</h1>
      <p>Berikut adalah riwayat lamaran kamu:</p>
      {/* Ganti dengan data asli dari database */}
    </main>
  )
}
