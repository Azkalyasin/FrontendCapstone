'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Modal } from '@/components/ui/Modal';
import { ACHIEVEMENTS_STORAGE_KEY, DEFAULT_ACHIEVEMENTS, readStoredRecords, saveStoredRecords } from '@/lib/demo-data';

const categories = ['Semua', 'Akademik', 'Olahraga', 'Seni & Bahasa', 'Lainnya'];

export default function AchievementAdminPage() {
  const [achievements, setAchievements] = useState(DEFAULT_ACHIEVEMENTS);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    try {
      setAchievements(readStoredRecords(ACHIEVEMENTS_STORAGE_KEY, DEFAULT_ACHIEVEMENTS));
    } catch (readError) {
      console.error('Gagal memuat daftar achievement admin.', readError);
      setError('Daftar achievement tidak dapat dimuat. Muat ulang halaman untuk mencoba kembali.');
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

  const removeAchievement = () => {
    if (!selected) return;
    try {
      const updated = achievements.filter((item) => String(item.id) !== String(selected.id));
      saveStoredRecords(ACHIEVEMENTS_STORAGE_KEY, updated);
      setAchievements(updated);
      setSelected(null);
      setNotice('Achievement berhasil dihapus dari daftar demo.');
      setError('');
    } catch (saveError) {
      console.error('Gagal menghapus achievement.', saveError);
      setError('Achievement belum dapat dihapus. Penyimpanan browser mungkin penuh atau tidak tersedia.');
    }
  };

  return (
    <AdminLayout
      title="Kelola Achievement"
      description="Rayakan proses dan pencapaian para siswa."
      action={<Link href="/admin/achievement/tambah" className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary-700/15 transition hover:-translate-y-0.5 hover:bg-primary-800"><span className="text-base leading-none">+</span> Tambah achievement</Link>}
    >
      {error && <p role="alert" className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
      {notice && <div role="status" className="mb-4 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><span>✓ {notice}</span><button type="button" onClick={() => setNotice('')} aria-label="Tutup notifikasi">×</button></div>}

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">Total cerita prestasi</p><p className="mt-2 text-2xl font-bold text-slate-950">{achievements.length}</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">Kategori tercatat</p><p className="mt-2 text-2xl font-bold text-slate-950">{new Set(achievements.map((item) => item.kategori)).size}</p></div>
        <div className="rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-50 to-white p-4"><p className="text-xs font-medium text-primary-700">Dibagikan untuk publik</p><p className="mt-2 text-sm font-semibold text-primary-900">Perubahan tampil di halaman prestasi</p></div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div><h2 className="text-base font-bold text-slate-900">Cerita prestasi siswa</h2><p className="mt-1 text-xs text-slate-500">{filteredAchievements.length} dari {achievements.length} achievement</p></div>
          <label className="relative block lg:w-72">
            <span className="sr-only">Cari achievement</span>
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama, judul, atau kategori" className="w-full rounded-full border border-slate-200 py-2.5 pl-10 pr-4 text-xs outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100" />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full px-3.5 py-2 text-[11px] font-semibold transition ${category === item ? 'bg-primary-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{item}</button>)}
        </div>

        {filteredAchievements.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredAchievements.map((item, index) => (
              <article key={item.id} className="group overflow-hidden rounded-2xl border border-slate-200 transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg hover:shadow-slate-900/5">
                <div className={`relative flex h-36 items-center justify-center overflow-hidden ${['bg-gradient-to-br from-blue-100 to-sky-50', 'bg-gradient-to-br from-amber-100 to-orange-50', 'bg-gradient-to-br from-emerald-100 to-teal-50', 'bg-gradient-to-br from-violet-100 to-indigo-50'][index % 4]}`}>
                  {item.foto ? <img src={item.foto} alt={`Prestasi ${item.namaSiswa}`} className="h-full w-full object-cover" /> : <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-2xl text-primary-700">✦</span>}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold text-primary-800">{item.kategori}</span>
                  <span className="absolute right-3 top-3 rounded-full bg-slate-950/60 px-2.5 py-1 text-[9px] font-semibold text-white">{item.tahun}</span>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-medium text-slate-500">{item.namaSiswa}</p>
                  <h3 className="mt-1.5 min-h-10 text-sm font-bold leading-5 text-slate-900">{item.judul}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{item.deskripsi}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <button type="button" onClick={() => setDetail(item)} className="text-xs font-semibold text-primary-700 hover:text-primary-900">Lihat detail</button>
                    <div className="flex gap-1.5">
                      <Link href={`/admin/achievement/edit/${item.id}`} className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-semibold text-primary-700 transition hover:bg-blue-100">Edit</Link>
                      <button type="button" onClick={() => setSelected(item)} className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-[10px] font-semibold text-rose-700 transition hover:bg-rose-100">Hapus</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
            <p className="font-semibold text-slate-800">Tidak ada achievement yang cocok.</p>
            <p className="mt-1 text-xs text-slate-500">Ubah pencarian atau pilih kategori lainnya.</p>
            <button type="button" onClick={() => { setQuery(''); setCategory('Semua'); }} className="mt-3 text-xs font-semibold text-primary-700">Atur ulang</button>
          </div>
        )}
      </div>

      <Modal isOpen={Boolean(selected)} onClose={() => setSelected(null)} title="Konfirmasi hapus achievement" size="sm">
        {selected && <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-2xl text-rose-600">!</span>
          <p className="mt-4 text-sm font-semibold text-slate-900">Hapus “{selected.judul}”?</p>
          <p className="mt-2 text-xs leading-5 text-slate-500">Tindakan ini tidak dapat dibatalkan. Cerita prestasi ini juga akan hilang dari halaman publik demo.</p>
          <div className="mt-6 flex justify-center gap-2"><button type="button" onClick={() => setSelected(null)} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Batal</button><button type="button" onClick={removeAchievement} className="rounded-full bg-rose-700 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-800">Hapus achievement</button></div>
        </div>}
      </Modal>

      <Modal isOpen={Boolean(detail)} onClose={() => setDetail(null)} title="Detail achievement" size="md">
        {detail && <div>
          {detail.foto ? <img src={detail.foto} alt={`Prestasi ${detail.namaSiswa}`} className="mb-4 h-44 w-full rounded-2xl object-cover" /> : <div className="mb-4 flex h-36 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-amber-50 text-4xl text-primary-600">✦</div>}
          <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-primary-50 px-3 py-1 text-[10px] font-bold text-primary-800">{detail.kategori}</span><span className="text-xs font-semibold text-slate-500">{detail.tahun}</span></div>
          <h3 className="mt-3 text-lg font-bold text-slate-900">{detail.judul}</h3><p className="mt-1 text-xs font-medium text-primary-700">{detail.namaSiswa}</p><p className="mt-3 text-sm leading-6 text-slate-600">{detail.deskripsi}</p>
        </div>}
      </Modal>
    </AdminLayout>
  );
}
