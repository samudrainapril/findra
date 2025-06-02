'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Slider from 'react-slick';

const jobTypes = ['Semua', 'WFH', 'WFO', 'WFA'];

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  logo: string;
  description: string;
  images?: string[];
}

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">
          Findra.
        </Link>
        <nav className="space-x-6 text-sm font-medium relative flex items-center">
          <Link href="/jobs" className="text-gray-600 hover:text-indigo-600">Lowongan</Link>
          <Link href="/history" className="text-gray-600 hover:text-indigo-600">Riwayat</Link>
          {session?.user ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
                {session.user.image ? (
                  <Image src={session.user.image} alt="User" width={32} height={32} className="rounded-full border border-gray-300" />
                ) : (
                  <span className="text-gray-600">{session.user.name}</span>
                )}
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
          ) : (
            <div className="inline-block relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-600 hover:text-indigo-600 focus:outline-none"
              >
                Masuk
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                  <Link
                    href="/login?role=jobseeker"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Pelamar
                  </Link>
                  <Link
                    href="/login?role=company"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Perusahaan
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default function HomePage() {
  const [selectedType, setSelectedType] = useState('Semua');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchType = selectedType === 'Semua' || job.jobType === selectedType;
    const matchLocation = !searchLocation || job.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchLocation && matchSearch;
  });

  return (
    <>
      <main className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-800">
        <Header />

        <section className="max-w-6xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Cari Pekerjaan Anda Sekarang!</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Cari pekerjaan atau perusahaan..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              placeholder="Masukkan kota atau wilayah..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {jobTypes.map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                onClick={() => setSelectedJob(job)}
                className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-300"
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 relative">
                    <Image src={job.logo} alt={job.company} layout="fill" objectFit="contain" />
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
              </div>
            ))}
          </div>
        </section>
      </main>

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
                <Image src={selectedJob.logo} alt={selectedJob.company} layout="fill" objectFit="contain" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-indigo-700">{selectedJob.title}</h3>
                <p className="text-sm text-gray-500">{selectedJob.company}</p>
              </div>
            </div>

            {selectedJob.images && selectedJob.images.length > 0 && (
              <div className="mb-6">
                <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
                  {selectedJob.images.map((src, idx) => (
                    <div key={idx}>
                      <img src={src} alt={`Galeri ${idx + 1}`} className="rounded-md w-full h-[500px] object-cover" />
                    </div>
                  ))}
                </Slider>
              </div>
            )}

            <div
              className="prose max-w-none text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: selectedJob.description }}
            />

            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <li><strong>Lokasi:</strong> {selectedJob.location}</li>
              <li><strong>Gaji:</strong> {selectedJob.salary}</li>
              <li><strong>Tipe Kerja:</strong> {selectedJob.jobType}</li>
            </ul>
            <Link href="/apply" className="block text-center bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition">
              Lamar Sekarang!
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
