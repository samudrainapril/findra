"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Amazon',
    location: 'Jakarta',
    salary: 'Rp15.000.000 - Rp20.000.000',
    jobType: 'WFH',
    logo: '/amazon.png',
    description: 'Mengembangkan antarmuka pengguna e-commerce dengan React.',
  },
  {
    id: 2,
    title: 'iOS Developer',
    company: 'Apple',
    location: 'Remote',
    salary: 'Rp18.000.000 - Rp25.000.000',
    jobType: 'WFA',
    logo: '/apple.png',
    description: 'Membangun aplikasi inovatif di ekosistem Apple.',
  },
  {
    id: 3,
    title: 'Analis Data Keuangan',
    company: 'Bank Jago',
    location: 'Jakarta',
    salary: 'Rp10.000.000 - Rp15.000.000',
    jobType: 'WFO',
    logo: '/bankjago.png',
    description: 'Menganalisis data dan tren finansial nasabah.',
  },
  {
    id: 4,
    title: 'Auditor Internal',
    company: 'Bank Indonesia',
    location: 'Yogyakarta',
    salary: 'Rp12.000.000 - Rp18.000.000',
    jobType: 'WFO',
    logo: '/bi.png',
    description: 'Melakukan audit dan pengawasan lembaga keuangan.',
  },
  {
    id: 5,
    title: 'Network Engineer',
    company: 'Biznet',
    location: 'Surabaya',
    salary: 'Rp11.000.000 - Rp17.000.000',
    jobType: 'WFO',
    logo: '/biznet.png',
    description: 'Menjaga koneksi internet dan jaringan nasional.',
  },
  {
    id: 6,
    title: 'UI Designer',
    company: 'Digital Alliance',
    location: 'Bandung',
    salary: 'Rp9.000.000 - Rp13.000.000',
    jobType: 'WFH',
    logo: '/logo da.png',
    description: 'Mendesain tampilan software dan aplikasi gaming.',
  },
  {
    id: 7,
    title: 'Kurir Teknologi',
    company: 'J&T Express',
    location: 'Semarang',
    salary: 'Rp6.000.000 - Rp9.000.000',
    jobType: 'WFO',
    logo: '/logo jnt.png',
    description: 'Distribusi logistik berbasis sistem pintar.',
  },
  {
    id: 8,
    title: 'Product Owner',
    company: 'Shopee',
    location: 'Jakarta',
    salary: 'Rp14.000.000 - Rp22.000.000',
    jobType: 'WFO',
    logo: '/logo shopee.png',
    description: 'Menentukan roadmap produk marketplace.',
  },
  {
    id: 9,
    title: 'AI Researcher',
    company: 'Nodeflux',
    location: 'Remote',
    salary: 'Rp17.000.000 - Rp25.000.000',
    jobType: 'WFH',
    logo: '/nodeflux.png',
    description: 'Riset dan pengembangan kecerdasan buatan untuk pemerintahan.',
  },
  {
    id: 10,
    title: 'Engineer Listrik',
    company: 'PLN',
    location: 'Makassar',
    salary: 'Rp12.000.000 - Rp16.000.000',
    jobType: 'WFO',
    logo: '/pln.png',
    description: 'Mengelola distribusi daya dan infrastruktur listrik.',
  },
  {
    id: 11,
    title: 'Content Creator Edukasi',
    company: 'Ruangguru',
    location: 'Remote',
    salary: 'Rp8.000.000 - Rp12.000.000',
    jobType: 'WFA',
    logo: '/ruang guru.png',
    description: 'Membuat video dan konten pembelajaran interaktif.',
  },
  {
    id: 12,
    title: 'Space Mission Engineer',
    company: 'SpaceX',
    location: 'Remote',
    salary: 'Rp20.000.000 - Rp30.000.000',
    jobType: 'WFH',
    logo: '/spacex.png',
    description: 'Berpartisipasi dalam peluncuran satelit dan roket.',
  },
  {
    id: 13,
    title: 'Backend Developer',
    company: 'Telkom Indonesia',
    location: 'Bandung',
    salary: 'Rp13.000.000 - Rp18.000.000',
    jobType: 'WFO',
    logo: '/telkom.png',
    description: 'Membangun sistem layanan telekomunikasi nasional.',
  },
];

const jobTypes = ['Semua', 'WFH', 'WFO', 'WFA'];

export default function HomePage() {
  const [selectedType, setSelectedType] = useState('Semua');

  const filteredJobs = selectedType === 'Semua' ? jobs : jobs.filter((job) => job.jobType === selectedType);

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-800">
      {/* ✅ Header */}
      <header className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">
            Findra
          </Link>
          <nav className="space-x-6 font-medium text-gray-700">
            <Link href="/" className="hover:text-indigo-500 transition">Beranda</Link>
            <Link href="/jobs" className="hover:text-indigo-500 transition">Lowongan</Link>
            <Link href="/riwayat" className="hover:text-indigo-500 transition">Riwayat</Link>
            <Link href="#" className="hover:text-indigo-500 transition">Profil</Link>
          </nav>
        </div>
      </header>

      {/* Section utama & filter */}
      <section className="text-center max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">Temukan Pekerjaan Impianmu</h2>
        <p className="text-lg text-gray-600 mb-6">
          Pilih berdasarkan jenis kerja yang sesuai dan mulailah kariermu hari ini!
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full border transition text-sm font-medium ${selectedType === type ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border-indigo-600'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Job Card List */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 pb-20">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-gray-100 cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 relative mr-4">
                <Image src={job.logo} alt={job.company} layout="fill" objectFit="contain" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-700">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-2">{job.description}</p>
            <p className="text-gray-500 text-sm"> {job.location}</p>
            <p className="text-gray-500 text-sm"> {job.salary}</p>
            <p className="text-gray-500 text-sm"> {job.jobType}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
