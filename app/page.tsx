import Link from 'next/link';
import { Sparkles } from 'lucide-react'; // opsional, tambahkan ikon hias

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 text-gray-800 flex items-center justify-center px-6">
      <div className="max-w-4xl text-center py-20">
        <div className="flex justify-center items-center gap-2 mb-4 text-indigo-600 font-medium">
          <Sparkles className="w-5 h-5" />
          <span>Platform Pencari Kerja Terpercaya</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-700 drop-shadow-sm">
          Selamat Datang di <span className="text-pink-500">Findra</span>
        </h1>

        <p className="text-lg md:text-xl mb-8 text-gray-600 font-medium">
          Temukan pekerjaan impianmu dari berbagai perusahaan terbaik. Jelajahi lowongan, daftar langsung, dan bangun karirmu hari ini!
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/jobs">
            <span className="px-6 py-3 rounded-full font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer shadow-md">
              Jelajahi Lowongan
            </span>
          </Link>
          <Link href="/jobs">
            <span className="px-6 py-3 rounded-full font-semibold bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition cursor-pointer shadow-sm">
              Daftarkan Diri Anda
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
