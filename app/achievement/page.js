'use client';

import { useEffect, useMemo, useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import { ACHIEVEMENTS_STORAGE_KEY, DEFAULT_ACHIEVEMENTS, readStoredRecords } from '@/lib/demo-data';

const categories = ['Semua', 'Akademik', 'Olahraga', 'Seni & Bahasa'];

export default function AchievementPage() {
  const [achievements, setAchievements] = useState(DEFAULT_ACHIEVEMENTS);
  const [category, setCategory] = useState('Semua');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    try {
      setAchievements(readStoredRecords(ACHIEVEMENTS_STORAGE_KEY, DEFAULT_ACHIEVEMENTS));
    } catch (error) {
      console.error('Gagal memuat cerita prestasi siswa.', error);
    }
  }, []);

  const filteredAchievements = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return achievements.filter((item) => {
      const matchesCategory = category === 'Semua' || item.kategori === category;
      const matchesQuery = !normalizedQuery || `${item.judul} ${item.namaSiswa} ${item.deskripsi} ${item.kategori}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [achievements, category, query]);

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -right-24 -top-36 h-96 w-96 rounded-full bg-primary-600/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-secondary-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">Cerita baik dari ruang belajar kami</span>
          <div className="mt-6 grid gap-8 md:grid-cols-[1fr_280px] md:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Prestasi tumbuh dari proses yang dijalani bersama.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">Setiap pencapaian punya cerita tentang keberanian mencoba, konsistensi, dan dukungan yang tepat.</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-2xl font-bold text-white">95%</p><p className="mt-1 text-xs text-slate-400">lulus PTN</p></div>
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-2xl font-bold text-white">500+</p><p className="mt-1 text-xs text-slate-400">siswa berkembang</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div><h2 className="text-xl font-bold text-slate-950">Kisah para siswa</h2><p className="mt-1 text-sm text-slate-500">{filteredAchievements.length} cerita prestasi</p></div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block sm:w-64">
              <span className="sr-only">Cari prestasi</span>
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau prestasi" className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100" />
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${category === item ? 'bg-primary-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{item}</button>)}
            </div>
          </div>
        </div>

        {filteredAchievements.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((item, index) => (
              <article key={item.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5">
                <div className={`relative flex h-48 items-center justify-center overflow-hidden ${['bg-gradient-to-br from-blue-100 via-sky-50 to-primary-50', 'bg-gradient-to-br from-amber-100 via-orange-50 to-rose-50', 'bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-50', 'bg-gradient-to-br from-violet-100 via-indigo-50 to-blue-50'][index % 4]}`}>
                  {item.foto ? <img src={item.foto} alt={`Momen prestasi ${item.namaSiswa}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : (
                    <>
                      <span className="absolute -left-4 -top-8 h-36 w-36 rounded-full bg-white/50" />
                      <span className="absolute -bottom-14 -right-8 h-48 w-48 rounded-full bg-white/50" />
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-white/80 text-3xl text-primary-700 shadow-lg shadow-slate-900/5">{['✦', '★', '◎', '✧'][index % 4]}</span>
                    </>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wide text-primary-800 uppercase">{item.kategori}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-slate-950/70 px-3 py-1 text-[10px] font-semibold text-white">{item.tahun}</span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium text-slate-500">Cerita {item.namaSiswa}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900">{item.judul}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{item.deskripsi}</p>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <button type="button" onClick={() => setSelected(item)} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition hover:gap-3 hover:text-primary-900">Baca ceritanya <span aria-hidden="true">→</span></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl text-slate-400 shadow-sm">✦</span>
            <h3 className="mt-4 font-semibold text-slate-800">Belum ada cerita yang cocok</h3>
            <p className="mt-1 text-sm text-slate-500">Coba kata kunci atau kategori lain.</p>
            <button type="button" onClick={() => { setQuery(''); setCategory('Semua'); }} className="mt-4 text-sm font-semibold text-primary-700">Hapus filter</button>
          </div>
        )}
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <article role="dialog" aria-modal="true" aria-labelledby="achievement-dialog-title" className="my-auto w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-primary-100 via-blue-50 to-amber-50">
              {selected.foto ? <img src={selected.foto} alt={`Momen prestasi ${selected.namaSiswa}`} className="h-full w-full object-cover" /> : <span className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-white text-3xl text-primary-700 shadow-lg">✦</span>}
              <button type="button" aria-label="Tutup cerita" onClick={() => setSelected(null)} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow hover:bg-slate-100">×</button>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4"><span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-800">{selected.kategori}</span><span className="text-xs font-semibold text-slate-500">{selected.tahun}</span></div>
              <h2 id="achievement-dialog-title" className="mt-4 text-2xl font-bold text-slate-950">{selected.judul}</h2>
              <p className="mt-2 text-sm font-medium text-primary-700">Oleh {selected.namaSiswa}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{selected.deskripsi}</p>
            </div>
          </article>
        </div>
      )}
    </PublicLayout>
  );
}
