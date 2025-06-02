'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Pencil, Trash2 } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  logo: string;
  description: string;
}

export default function CompanyHistoryPage() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/login?role=company';
    }
  }, [status]);

  const fetchJobs = async () => {
    const res = await fetch('/api/jobs');
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm('Apakah kamu yakin ingin menghapus lowongan ini?');
  if (!confirmDelete) return;

  const res = await fetch(`/api/jobs?id=${id}`, { method: 'DELETE' }); // ubah di sini

  if (res.ok) {
    setJobs(jobs.filter((job) => job._id !== id));
  } else {
    alert('Gagal menghapus lowongan.');
  }
};


  const renderLogo = (logo: string, altText: string) => {
    const isValidURL = logo && (logo.startsWith('http') || logo.startsWith('/'));
    return (
      <Image
        src={isValidURL ? logo : '/default-logo.png'}
        alt={altText}
        fill
        className="object-contain"
      />
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-800">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">Findra.</Link>
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

      {/* Job List */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Riwayat Lowongan Perusahaan</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              onClick={() => setSelectedJob(job)}
              className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-12 h-12 relative">
                  {renderLogo(job.logo, job.company)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm text-gray-500">{job.salary}</p>
              <span className="inline-block mt-2 text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                {job.jobType}
              </span>
              <div className="mt-4 flex gap-2">
                <Link href={`/company/edit/${job._id}`}>
                  <button className="p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">
                    <Pencil size={16} />
                  </button>
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(job._id);
                  }}
                  className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-start justify-center z-50 pt-10 overflow-auto">
          <div className="bg-white rounded-xl w-[90%] max-w-4xl p-8 shadow-lg relative max-h-[90vh] overflow-auto">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 relative mr-4">
                {renderLogo(selectedJob.logo, selectedJob.company)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-indigo-700">{selectedJob.title}</h3>
                <p className="text-sm text-gray-500">{selectedJob.company}</p>
              </div>
            </div>
            <div
              className="prose max-w-none text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: selectedJob.description }}
            />
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <li><strong>Lokasi:</strong> {selectedJob.location}</li>
              <li><strong>Gaji:</strong> {selectedJob.salary}</li>
              <li><strong>Tipe Kerja:</strong> {selectedJob.jobType}</li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
