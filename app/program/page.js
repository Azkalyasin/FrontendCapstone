'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import { DEFAULT_PROGRAMS, formatRupiah, PROGRAMS_STORAGE_KEY, readStoredRecords } from '@/lib/demo-data';

const levels = ['Semua', 'SD', 'SMP', 'SMA', 'Semua jenjang'];

export default function ProgramPage() {
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);
  const [level, setLevel] = useState('Semua');
  const [query, setQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    try {
      setPrograms(readStoredRecords(PROGRAMS_STORAGE_KEY, DEFAULT_PROGRAMS));
    } catch (error) {
      console.error('Gagal memuat daftar program belajar.', error);
    }
  }, []);

  const filteredPrograms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return programs.filter((program) => {
      const matchesLevel = level === 'Semua' || (program.tingkat || program.jenjang) === level;
      const matchesQuery = !normalizedQuery || `${program.nama} ${program.deskripsi} ${program.tingkat || program.jenjang}`.toLowerCase().includes(normalizedQuery);
      return matchesLevel && matchesQuery;
    });
  }, [level, programs, query]);

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-50 via-white to-amber-50/60">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary-800 shadow-sm ring-1 ring-primary-100">
            <span className="h-2 w-2 rounded-full bg-secondary-500" />
            Belajar dengan arah dan dukungan
          </span>
          <div className="mt-5 grid gap-8 md:grid-cols-[1fr_300px] md:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Program belajar yang tumbuh bersama potensimu.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Pilih pendampingan yang sesuai dengan jenjang, ritme, dan tujuan belajar. Kami siap bantu menemukan langkah yang paling pas.</p>
            </div>
            <div className="rounded-3xl border border-white bg-white/80 p-5 shadow-lg shadow-primary-900/5">
              <p className="text-sm font-semibold text-slate-800">Belum tahu harus mulai dari mana?</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Ceritakan kebutuhan belajar, kami bantu rekomendasikan.</p>
              <Link href="/daftar" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900">Konsultasi gratis <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Temukan kelasmu</h2>
            <p className="mt-1 text-sm text-slate-500">{filteredPrograms.length} program tersedia</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block sm:w-64">
              <span className="sr-only">Cari program</span>
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari program belajar" className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100" />
            </label>
            <div className="flex flex-wrap gap-2" aria-label="Filter jenjang">
              {levels.map((item) => (
                <button key={item} type="button" onClick={() => setLevel(item)} aria-pressed={level === item} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${level === item ? 'bg-primary-700 text-white shadow-md shadow-primary-700/15' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{item}</button>
              ))}
            </div>
          </div>
        </div>

        {filteredPrograms.length ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPrograms.map((program, index) => (
              <article key={program.id} className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5">
                <div className={`relative overflow-hidden p-6 ${['bg-gradient-to-br from-blue-100 via-sky-50 to-white', 'bg-gradient-to-br from-amber-100 via-orange-50 to-white', 'bg-gradient-to-br from-violet-100 via-indigo-50 to-white'][index % 3]}`}>
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/60" />
                  <div className="relative flex items-start justify-between">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary-800">{program.tingkat || program.jenjang}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-primary-700 shadow-sm">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="relative mt-8">
                    <h3 className="text-xl font-bold text-slate-900">{program.nama}</h3>
                    <p className="mt-2 min-h-10 max-w-md text-sm leading-5 text-slate-600">{program.durasi || 'Program fleksibel'} · Pendampingan terarah</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-6 text-slate-600">{program.deskripsi}</p>
                  <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm">
                    <div className="flex items-center justify-between gap-3"><span className="text-slate-500">Jadwal</span><span className="text-right font-medium text-slate-800">{program.jadwal}</span></div>
                    <div className="flex items-center justify-between gap-3"><span className="text-slate-500">Biaya per bulan</span><span className="font-bold text-primary-800">{formatRupiah(program.biaya)}</span></div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <button type="button" onClick={() => setSelectedProgram(program)} className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800">Lihat detail</button>
                    <Link href="/daftar" className="flex-1 rounded-full bg-primary-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary-800">Pilih kelas</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl text-slate-400 shadow-sm">⌕</span>
            <h3 className="mt-4 font-semibold text-slate-800">Program belum ditemukan</h3>
            <p className="mt-1 text-sm text-slate-500">Coba kata kunci atau jenjang lainnya.</p>
            <button type="button" onClick={() => { setQuery(''); setLevel('Semua'); }} className="mt-4 text-sm font-semibold text-primary-700 hover:text-primary-900">Atur ulang filter</button>
          </div>
        )}

        <div className="mt-12 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.18em] text-amber-300 uppercase">Langkah berikutnya</span>
              <h2 className="mt-2 text-2xl font-bold">Belajar lebih nyaman saat ada yang menemani.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Sampaikan target dan jadwal yang kamu inginkan. Tim kami siap membantu memilih kelas yang sesuai.</p>
            </div>
            <Link href="/daftar" className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-secondary-300">Tanya program <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm" onClick={() => setSelectedProgram(null)}>
          <section role="dialog" aria-modal="true" aria-labelledby="program-dialog-title" className="my-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div><span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-800">{selectedProgram.tingkat || selectedProgram.jenjang}</span><h2 id="program-dialog-title" className="mt-4 text-2xl font-bold text-slate-950">{selectedProgram.nama}</h2></div>
              <button type="button" aria-label="Tutup detail program" onClick={() => setSelectedProgram(null)} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">×</button>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{selectedProgram.deskripsi}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4"><dt className="text-xs text-slate-500">Durasi belajar</dt><dd className="mt-1 text-sm font-semibold text-slate-800">{selectedProgram.durasi}</dd></div>
              <div className="rounded-2xl bg-slate-50 p-4"><dt className="text-xs text-slate-500">Jadwal</dt><dd className="mt-1 text-sm font-semibold text-slate-800">{selectedProgram.jadwal}</dd></div>
              <div className="rounded-2xl bg-primary-50 p-4"><dt className="text-xs text-primary-700">Biaya per bulan</dt><dd className="mt-1 text-sm font-bold text-primary-900">{formatRupiah(selectedProgram.biaya)}</dd></div>
              <div className="rounded-2xl bg-amber-50 p-4"><dt className="text-xs text-amber-700">Kuota kelas</dt><dd className="mt-1 text-sm font-semibold text-amber-900">{selectedProgram.kuota || 'Hubungi kami'} siswa</dd></div>
            </dl>
            <Link href="/daftar" className="mt-6 flex w-full items-center justify-center rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-800">Daftar program ini <span className="ml-2" aria-hidden="true">→</span></Link>
          </section>
        </div>
      )}
    </PublicLayout>
  );
}
