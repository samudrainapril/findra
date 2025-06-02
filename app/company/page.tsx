'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CompanyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    jobType: '',
    description: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?role=company');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      logo: session?.user?.image || '', // otomatis pakai foto profil user
    };

    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    if (res.ok) {
      alert('Lowongan berhasil ditambahkan!');
      setFormData({
        title: '',
        company: '',
        location: '',
        salary: '',
        jobType: '',
        description: '',
      });
    } else {
      alert('Gagal menambahkan lowongan.');
    }
  };

  if (status === 'loading') return <p className="text-center py-10">Memuat...</p>;

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-800">
      <header className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">
            Findra.
          </Link>
          <nav className="space-x-6 text-sm font-medium relative flex items-center">
            <Link href="/company" className="text-gray-600 hover:text-indigo-600">Lowongan</Link>
            <Link href="/company/history" className="text-gray-600 hover:text-indigo-600">Riwayat</Link>
            {session?.user?.image && (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
                  <Image
                    src={session.user.image}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full border border-gray-300"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                    <p className="block px-4 py-2 text-sm text-gray-700">Halo, {session.user.name?.split(' ')[0]}</p>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Tambah Lowongan Pekerjaan
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['title', 'company', 'location', 'salary', 'jobType'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize text-gray-600">{field}</label>
              <input
                type="text"
                required
                value={(formData as any)[field]}
                placeholder={`Masukkan ${field}`}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Deskripsi</label>
            <textarea
              required
              rows={5}
              value={formData.description}
              placeholder="Profil perusahaan dan detail pekerjaan"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Unggah
          </button>
        </form>
      </section>
    </main>
  );
}
