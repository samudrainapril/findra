'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'jobseeker';
  const isCompany = role === 'company';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login dummy
  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      if (isCompany) {
        router.push('/company');
      } else {
        router.push('/jobs');
      }
    }
  };

const handleGoogleLogin = () => {
  console.log('Google login clicked');
  signIn('google', {
    callbackUrl: isCompany ? '/company' : '/jobs',
  });
};

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg flex w-full max-w-5xl overflow-hidden">
        {/* Kiri: Gambar */}
        <div className="hidden md:block md:w-1/2 relative">
          <Image src="/bglogin.jpg" alt="Login background" fill className="object-cover" />
        </div>

        {/* Kanan: Form Login */}
        <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-1">
              {isCompany ? 'Akun Perusahaan' : 'Akun Pelamar'}
            </h2>
            <p className="text-gray-600 text-sm">Silakan login menggunakan email atau Google.</p>
          </div>

          {/* Form Manual */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="email@gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kata Sandi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Masuk
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-300" />
            <span>atau</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm font-medium">Masuk dengan Google</span>
          </button>

          {/* Link Daftar */}
          <p className="text-sm text-gray-600 text-center">
            Belum punya akun?{' '}
            <a href="/register" className="text-indigo-600 hover:underline font-medium">
              Daftar di sini
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
