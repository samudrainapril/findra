'use client';

import Image from 'next/image';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  logo: string;
  description: string;
}

interface Props {
  job: Job;
  onClose: () => void;
}

export default function CompanyDetailModal({ job, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-6 text-3xl text-gray-500 hover:text-red-600">&times;</button>

        {/* Gambar & Identitas Perusahaan */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="relative w-40 h-40 mx-auto md:mx-0">
            <Image src={job.logo} alt={job.company} layout="fill" objectFit="contain" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-1">{job.company}</h2>
            <p className="text-gray-600 mb-1">{job.location}</p>
            <p className="text-sm text-gray-500 italic">"{job.description}"</p>
          </div>
        </div>

        {/* Informasi Lowongan */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Lowongan Tersedia:</h3>
          <ul className="space-y-2 text-sm">
            <li><strong>Posisi:</strong> {job.title}</li>
            <li><strong>Lokasi:</strong> {job.location}</li>
            <li><strong>Gaji:</strong> {job.salary}</li>
            <li><strong>Tipe Kerja:</strong> {job.jobType}</li>
          </ul>
        </div>

        {/* Tombol Apply */}
        <div className="mt-6">
          <a href="/apply" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition">
            Lamar Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}
