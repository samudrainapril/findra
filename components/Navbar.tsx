'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <Link href="/">
        <span className="font-bold text-xl text-indigo-600">Findra</span>
      </Link>

      <div className="flex items-center gap-4">
        {status === 'loading' ? (
          <span>Loading...</span>
        ) : session ? (
          <>
            <Image
              src={session.user?.image || '/default-avatar.png'}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">{session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition text-sm"
            >
              Keluar
            </button>
          </>
        ) : (
          <Link href="/login">
            <span className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm cursor-pointer">
              Masuk
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
