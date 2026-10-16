'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import { DEFAULT_PROGRAMS, readStoredRecords, PROGRAMS_STORAGE_KEY, formatRupiah } from '@/lib/demo-data';

const highlights = [
  { value: '95%', label: 'lulus PTN', icon: '↗', tone: 'bg-blue-50 text-blue-700' },
  { value: '500+', label: 'siswa aktif', icon: '✦', tone: 'bg-amber-50 text-amber-700' },
  { value: '50+', label: 'tutor ahli', icon: '◎', tone: 'bg-emerald-50 text-emerald-700' },
  { value: '10 th', label: 'pengalaman', icon: '⌁', tone: 'bg-violet-50 text-violet-700' },
];

export default function HomePage() {
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);

  useEffect(() => {
    try {
      setPrograms(readStoredRecords(PROGRAMS_STORAGE_KEY, DEFAULT_PROGRAMS));
    } catch (error) {
      console.error('Gagal memuat program belajar dari penyimpanan lokal.', error);
    }
  }, []);

  return (
    <PublicLayout>
      <section className="relative isolate overflow-hidden bg-[#f4f8ff]">
        <div className="absolute -right-28 -top-32 -z-10 h-[460px] w-[460px] rounded-full bg-primary-100/80 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-secondary-100/70 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-primary-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Teman belajar untuk masa depan cerah
            </div>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem]">
              Belajar lebih yakin,
              <span className="mt-1 block text-primary-700">berprestasi tanpa ragu.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Pendampingan belajar yang hangat, tutor yang peduli, dan langkah belajar yang disesuaikan dengan potensi setiap siswa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/daftar" className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-700/20 transition-all hover:-translate-y-0.5 hover:bg-primary-800">
                Mulai konsultasi <span aria-hidden="true">→</span>
              </Link>
              <Link href="/program" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-primary-200 hover:text-primary-800">
                Jelajahi program
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
              <div className="flex -space-x-2" aria-hidden="true">
                {['bg-primary-200', 'bg-amber-200', 'bg-emerald-200', 'bg-violet-200'].map((tone, index) => (
                  <span key={index} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#f4f8ff] ${tone} text-[10px] font-bold text-slate-700`}>{['A', 'N', 'R', 'S'][index]}</span>
                ))}
              </div>
              <span><strong className="text-slate-800">500+</strong> siswa tumbuh bersama kami</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-5 top-12 h-24 w-24 rounded-[2rem] bg-secondary-300/70 blur-2xl" />
            <div className="absolute -right-4 bottom-8 h-32 w-32 rounded-full bg-primary-300/70 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-2xl shadow-primary-900/10">
              <div className="relative flex min-h-[350px] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary-700 via-blue-600 to-indigo-800 p-7 text-white sm:min-h-[430px] sm:p-9">
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
                <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full border border-white/10" />
                <div className="relative">
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-blue-50">Ruang belajar yang mendukung</span>
                  <h2 className="mt-6 max-w-sm text-3xl font-bold leading-tight sm:text-4xl">Setiap anak punya cara hebatnya sendiri.</h2>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100">Kami hadir untuk membantu mereka menemukan dan mengembangkan potensi itu.</p>
                </div>
                <div className="relative mt-10 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <p className="text-2xl font-bold">1:8</p>
                    <p className="mt-1 text-xs text-blue-100">rasio tutor & siswa</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <p className="text-2xl font-bold">Fleksibel</p>
                    <p className="mt-1 text-xs text-blue-100">pilihan jadwal belajar</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 left-0 right-0 mx-auto flex w-[88%] items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:-left-9 sm:right-auto sm:w-auto sm:gap-4 sm:px-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-lg text-amber-700">✦</span>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Belajar dengan tujuan</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">Progres kecil, dampak besar</p>
                </div>
                <span className="text-lg text-emerald-500" aria-hidden="true">✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-xs font-bold tracking-[0.18em] text-primary-700 uppercase">Belajar sesuai kebutuhan</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Temukan program yang pas</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">Dari fondasi akademik hingga persiapan masuk kampus, mulai dari langkah yang sesuai untukmu.</p>
          </div>
          <Link href="/program" className="text-sm font-semibold text-primary-700 transition hover:text-primary-900">Lihat semua program <span aria-hidden="true">→</span></Link>
        </div>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.slice(0, 4).map((program, index) => (
            <article key={program.id} className="group rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold ${['bg-blue-50 text-primary-700', 'bg-amber-50 text-amber-700', 'bg-violet-50 text-violet-700', 'bg-emerald-50 text-emerald-700'][index % 4]}`}>0{index + 1}</div>
              <p className="mt-5 text-xs font-semibold text-primary-700">{program.tingkat || program.jenjang}</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{program.nama}</h3>
              <p className="mt-2 min-h-[60px] text-sm leading-5 text-slate-500">{program.deskripsi}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-bold text-slate-900">{formatRupiah(program.biaya)}<span className="font-normal text-slate-400">/bln</span></span>
                <Link href="/program" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition group-hover:bg-primary-700 group-hover:text-white" aria-label={`Lihat ${program.nama}`}>↗</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="flex items-center gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0 md:border-b-0 md:border-r md:pb-0 md:last:border-0">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-bold ${item.tone}`}>{item.icon}</span>
              <div><p className="text-2xl font-bold tracking-tight">{item.value}</p><p className="mt-1 text-xs font-medium text-slate-400 uppercase">{item.label}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.18em] text-primary-700 uppercase">Jadwal & investasi</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Waktu belajar yang lebih terencana.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">Lihat gambaran jadwal dan biaya, lalu pilih kelas yang paling cocok.</p>
          </div>
          <Link href="/program" className="text-sm font-semibold text-primary-700 transition hover:text-primary-900">Lihat jadwal lengkap <span aria-hidden="true">→</span></Link>
        </div>
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.2fr_1.5fr_0.8fr_1fr_auto] gap-4 bg-slate-950 px-6 py-4 text-[10px] font-bold tracking-wide text-slate-300 uppercase sm:grid">
            <span>Program</span><span>Hari / waktu</span><span>Durasi</span><span>Biaya / bulan</span><span>Aksi</span>
          </div>
          {programs.map((program, index) => (
            <div key={program.id} className={`grid gap-3 px-5 py-4 sm:grid-cols-[1.2fr_1.5fr_0.8fr_1fr_auto] sm:items-center sm:gap-4 sm:px-6 ${index ? 'border-t border-slate-100' : ''}`}>
              <div><p className="text-[10px] font-medium text-slate-400 sm:hidden">Program</p><p className="text-sm font-semibold text-slate-800">{program.nama}</p></div>
              <div><p className="text-[10px] font-medium text-slate-400 sm:hidden">Hari / waktu</p><p className="text-xs text-slate-600">{program.jadwal}</p></div>
              <div><p className="text-[10px] font-medium text-slate-400 sm:hidden">Durasi</p><p className="text-xs text-slate-600">{program.durasi || 'Fleksibel'}</p></div>
              <div><p className="text-[10px] font-medium text-slate-400 sm:hidden">Biaya / bulan</p><p className="text-sm font-bold text-primary-800">{formatRupiah(program.biaya)}</p></div>
              <Link href="/daftar" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-800 transition hover:bg-primary-700 hover:text-white">Daftar <span aria-hidden="true">→</span></Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid items-center gap-10 rounded-[2rem] bg-gradient-to-r from-amber-50 via-orange-50 to-primary-50 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-12">
          <div>
            <span className="text-xs font-bold tracking-[0.18em] text-amber-700 uppercase">Kisah yang menginspirasi</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Bangga pada setiap pencapaian.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Prestasi bukan hanya tentang menjadi yang terbaik, tetapi juga tentang terus melampaui diri sendiri.</p>
          </div>
          <Link href="/achievement" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-800">Cerita para siswa <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </PublicLayout>
  );
}
