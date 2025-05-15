'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaApple } from 'react-icons/fa';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'jobseeker';
  const isCompany = role === 'company';

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg flex w-full max-w-5xl overflow-hidden">
        {/* Left: Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src="/bglogin.jpg"
            alt="Login background"
            fill
            className="object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-1">
              {isCompany ? 'Akun Perusahaan' : 'Akun Pelamar'}
            </h2>
            <p className="text-gray-600 text-sm">
              Selamat datang! Silakan login untuk melanjutkan.
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition">
              <FcGoogle className="text-xl" />
              <span className="text-sm font-medium">Masuk dengan Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition text-blue-600">
              <FaFacebookF className="text-xl" />
              <span className="text-sm font-medium">Masuk dengan Facebook</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition text-black">
              <FaApple className="text-xl" />
              <span className="text-sm font-medium">Masuk dengan Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-300" />
            <span>atau masuk dengan email</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Login Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="email@gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kata Sandi</label>
              <input
                type="password"
                required
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
