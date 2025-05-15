"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CompanyDetailModal from '@/components/CompanyDetailModal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Amazon',
    location: 'Jakarta',
    salary: 'Rp15.000.000 - Rp20.000.000',
    jobType: 'WFH',
    logo: '/amazon.png',
    description: `
<p>Amazon adalah perusahaan teknologi global yang berfokus pada e-commerce, komputasi awan, digital streaming, dan kecerdasan buatan.</p>
<p>Sejak didirikan oleh Jeff Bezos pada tahun 1994, Amazon telah berkembang menjadi salah satu perusahaan paling bernilai di dunia.</p>
<p>Kami mengoperasikan platform perdagangan online terbesar dan jaringan logistik mutakhir yang menjangkau berbagai negara.</p>
<p>Inovasi dan kepuasan pelanggan adalah inti dari misi kami dalam menyediakan pengalaman belanja yang cepat, aman, dan andal.</p>
<p>Di Indonesia, Amazon terus memperluas kehadirannya melalui kolaborasi strategis dan perekrutan talenta teknologi terbaik.</p>
<p>Kami percaya pada budaya kerja yang fleksibel, inklusif, dan berbasis data.</p>
`,
     images: ["/amazon1.jpg", "/amazon2.jpg", "/amazon3.jpg"]
  },
  {
    id: 2,
    title: 'iOS Developer',
    company: 'Apple',
    location: 'Remote',
    salary: 'Rp18.000.000 - Rp25.000.000',
    jobType: 'WFA',
    logo: '/apple.png',
    description: `Apple Inc. adalah pemimpin global dalam inovasi teknologi, terkenal dengan produk-produk seperti iPhone, iPad, Mac, dan sistem operasi eksklusif seperti iOS dan macOS. Didirikan oleh Steve Jobs, Steve Wozniak, dan Ronald Wayne, Apple telah mengubah cara dunia berinteraksi dengan teknologi.

Kami fokus pada desain elegan, keamanan, dan pengalaman pengguna yang intuitif. Apple terus menjadi pionir dalam pengembangan perangkat keras, perangkat lunak, dan layanan digital seperti Apple Music dan iCloud.

Sebagai bagian dari tim global Apple, Anda akan berkontribusi dalam menciptakan solusi yang memengaruhi kehidupan jutaan orang, sambil bekerja di lingkungan yang menghargai kreativitas dan keunggulan.` 
  },
  {
    id: 3,
    title: 'Analis Data Keuangan',
    company: 'Bank Jago',
    location: 'Jakarta',
    salary: 'Rp10.000.000 - Rp15.000.000',
    jobType: 'WFO',
    logo: '/bankjago.png',
    description: `Bank Jago adalah bank berbasis teknologi yang mengusung konsep digital banking untuk memberikan kemudahan akses layanan keuangan kepada seluruh masyarakat Indonesia. Kami percaya bahwa teknologi dapat menciptakan pengalaman perbankan yang lebih personal dan transparan.

Sebagai bagian dari ekosistem digital, Bank Jago terus berinovasi dalam mengembangkan fitur-fitur finansial yang dapat disesuaikan dengan kebutuhan pengguna. Fokus kami adalah pada kolaborasi dan integrasi, bukan hanya layanan perbankan konvensional.

Dengan semangat agile dan budaya kerja modern, kami membuka peluang bagi talenta berbakat untuk tumbuh bersama dan menciptakan dampak nyata dalam kehidupan finansial masyarakat.` 
  },
  {
    id: 4,
    title: 'Auditor Internal',
    company: 'Bank Indonesia',
    location: 'Yogyakarta',
    salary: 'Rp12.000.000 - Rp18.000.000',
    jobType: 'WFO',
    logo: '/bi.png',
    description: `Bank Indonesia adalah bank sentral Republik Indonesia yang memiliki mandat utama menjaga kestabilan nilai rupiah. Dalam menjalankan fungsinya, Bank Indonesia fokus pada kebijakan moneter, sistem pembayaran, dan stabilitas sistem keuangan nasional.

Sebagai institusi yang independen dan kredibel, kami berperan penting dalam mendorong pertumbuhan ekonomi yang inklusif dan berkelanjutan. Melalui riset, pengawasan, dan inovasi teknologi keuangan, BI berkomitmen menjaga integritas sistem ekonomi.

Kami mencari individu berintegritas tinggi yang siap berkontribusi dalam menjaga stabilitas keuangan nasional, sambil menghadapi tantangan dan dinamika ekonomi global secara adaptif dan profesional.` 
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
const locations = ['Jakarta', 'Remote', 'Yogyakarta', 'Surabaya', 'Bandung', 'Semarang', 'Makassar'];

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

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">
          Findra.
        </Link>
        <nav className="space-x-6 text-sm font-medium relative">
          <Link href="/" className="text-gray-600 hover:text-indigo-600">Beranda</Link>
          <Link href="/jobs" className="text-gray-600 hover:text-indigo-600">Lowongan</Link>
          <Link href="/history" className="text-gray-600 hover:text-indigo-600">Riwayat</Link>

          {/* Dropdown Masuk */}
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

        {/* Filter Section */}
        <section className="max-w-6xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Cari Pekerjaan Anda Sekarang!</h2>

          {/* Search Inputs */}
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

          {/* Job Type Filter */}
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

          {/* Job Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
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

      {/* Job Detail Modal */}
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

{/* Dynamic Slider */}
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