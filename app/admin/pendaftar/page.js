'use client';

import { useEffect, useMemo, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DEFAULT_REGISTRATIONS, readStoredRecords, REGISTRATIONS_STORAGE_KEY, saveStoredRecords } from '@/lib/demo-data';

const statusOptions = ['Baru', 'Dihubungi', 'Selesai'];
const filters = ['Semua', ...statusOptions];

function escapeCsv(value) {
  const safeValue = String(value ?? '').replace(/^[=+\-@]/, "'$&");
  return `"${safeValue.replaceAll('"', '""')}"`;
}

export default function DataPendaftarPage() {
  const [registrations, setRegistrations] = useState(DEFAULT_REGISTRATIONS);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    try {
      setRegistrations(readStoredRecords(REGISTRATIONS_STORAGE_KEY, DEFAULT_REGISTRATIONS));
    } catch (readError) {
      console.error('Gagal memuat daftar pendaftar.', readError);
      setError('Data pendaftar tidak dapat dimuat. Muat ulang halaman untuk mencoba kembali.');
    }
  }, []);

  const visibleRegistrations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return registrations.filter((item) => {
      const matchesFilter = filter === 'Semua' || item.status === filter;
      const matchesQuery = !normalizedQuery || `${item.nama} ${item.email} ${item.telepon} ${item.program} ${item.jenjang}`.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query, registrations]);

  const updateStatus = (registrationId, status) => {
    try {
      const updated = registrations.map((item) => String(item.id) === String(registrationId) ? { ...item, status } : item);
      saveStoredRecords(REGISTRATIONS_STORAGE_KEY, updated);
      setRegistrations(updated);
      setError('');
      setNotice('Status pendaftar berhasil diperbarui.');
    } catch (saveError) {
      console.error('Gagal memperbarui status pendaftar.', saveError);
      setError('Status belum diperbarui. Penyimpanan browser mungkin penuh.');
    }
  };

  const exportCsv = () => {
    try {
      const headers = ['Nama', 'Tempat Lahir', 'Tanggal Lahir', 'Jenis Kelamin', 'Alamat', 'Nama Orang Tua/Wali', 'Email', 'Telepon', 'Program', 'Jenjang', 'Status', 'Tanggal', 'Catatan'];
      const rows = visibleRegistrations.map((item) => [item.nama, item.tempatLahir, item.tanggalLahir, item.jenisKelamin, item.alamat, item.namaOrangTua, item.email, item.telepon, item.program, item.jenjang, item.status, item.tanggal, item.pesan]);
      const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\r\n');
      const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pendaftar-bimble-wanda-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice(`${visibleRegistrations.length} data berhasil diekspor.`);
    } catch (exportError) {
      console.error('Gagal mengekspor data pendaftar.', exportError);
      setError('Data belum dapat diekspor dari browser ini.');
    }
  };

  const counts = statusOptions.reduce((result, status) => {
    result[status] = registrations.filter((item) => item.status === status).length;
    return result;
  }, {});

  return (
    <AdminLayout title="Data Pendaftar" description="Tindak lanjuti minat belajar dan bantu siswa memulai langkah berikutnya." action={<button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800"><span aria-hidden="true">↓</span> Export CSV</button>}>
      {error && <p role="alert" className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
      {notice && <div role="status" className="mb-4 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><span>✓ {notice}</span><button type="button" onClick={() => setNotice('')} aria-label="Tutup notifikasi">×</button></div>}

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { title: 'Perlu ditindaklanjuti', count: counts.Baru, tone: 'border-amber-100 bg-amber-50 text-amber-800', icon: '◷' },
          { title: 'Sudah dihubungi', count: counts.Dihubungi, tone: 'border-blue-100 bg-blue-50 text-primary-800', icon: '↗' },
          { title: 'Selesai diproses', count: counts.Selesai, tone: 'border-emerald-100 bg-emerald-50 text-emerald-800', icon: '✓' },
        ].map((item) => <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-center justify-between"><p className="text-xs font-medium text-slate-500">{item.title}</p><span className={`flex h-8 w-8 items-center justify-center rounded-xl border text-sm font-bold ${item.tone}`}>{item.icon}</span></div><p className="mt-2 text-2xl font-bold text-slate-950">{item.count}</p></article>)}
      </div>

      <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div><h2 className="text-base font-bold text-slate-900">Daftar minat belajar</h2><p className="mt-1 text-xs text-slate-500">Perbarui status setiap siswa setelah dihubungi.</p></div>
          <label className="relative block lg:w-72">
            <span className="sr-only">Cari pendaftar</span>
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama, program, kontak" className="w-full rounded-full border border-slate-200 py-2.5 pl-10 pr-4 text-xs outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100" />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)} className={`rounded-full px-3.5 py-2 text-[11px] font-semibold transition ${filter === item ? 'bg-primary-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{item}</button>)}
        </div>

        <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-slate-200 md:block">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead className="bg-blue-50/70 text-[10px] font-bold tracking-wide text-slate-500 uppercase"><tr>{['Siswa', 'Program', 'Tanggal', 'Status', 'Perbarui status'].map((item) => <th key={item} className="px-4 py-3">{item}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {visibleRegistrations.map((item) => (
                <tr key={item.id} className="transition hover:bg-slate-50">
                  <td className="px-4 py-3"><p className="text-xs font-semibold text-slate-800">{item.nama}</p><p className="mt-1 text-[10px] text-slate-500">{item.email ? `${item.email} · ` : ''}{item.telepon}</p>{item.namaOrangTua && <p className="mt-1 text-[10px] text-slate-400">Wali: {item.namaOrangTua}</p>}{(item.tempatLahir || item.tanggalLahir || item.jenisKelamin || item.alamat) && <details className="mt-2 text-[10px] text-slate-500"><summary className="cursor-pointer font-semibold text-primary-700">Detail siswa</summary><div className="mt-1 space-y-1 leading-4">{(item.tempatLahir || item.tanggalLahir) && <p>Tempat/tanggal lahir: {[item.tempatLahir, item.tanggalLahir].filter(Boolean).join(', ')}</p>}{item.jenisKelamin && <p>Jenis kelamin: {item.jenisKelamin}</p>}{item.alamat && <p>Alamat: {item.alamat}</p>}</div></details>}</td>
                  <td className="px-4 py-3"><p className="text-xs font-medium text-slate-700">{item.program}</p><p className="mt-1 text-[10px] text-slate-500">{item.jenjang}</p></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{item.tanggal}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${item.status === 'Baru' ? 'bg-amber-50 text-amber-800' : item.status === 'Selesai' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-primary-800'}`}>{item.status}</span></td>
                  <td className="px-4 py-3"><label className="sr-only" htmlFor={`status-${item.id}`}>Ubah status untuk {item.nama}</label><select id={`status-${item.id}`} value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100">{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></td>
                </tr>
              ))}
              {!visibleRegistrations.length && <tr><td colSpan="5" className="px-4 py-12 text-center text-xs text-slate-500">Belum ada pendaftar yang cocok dengan filter ini.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="mt-5 space-y-3 md:hidden">
          {visibleRegistrations.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-semibold text-slate-900">{item.nama}</h3><p className="mt-1 text-[11px] text-slate-500">{item.email ? `${item.email} · ` : ''}{item.telepon}</p>{item.namaOrangTua && <p className="mt-1 text-[10px] text-slate-400">Wali: {item.namaOrangTua}</p>}{(item.tempatLahir || item.tanggalLahir || item.jenisKelamin || item.alamat) && <details className="mt-2 text-[10px] text-slate-500"><summary className="cursor-pointer font-semibold text-primary-700">Detail siswa</summary><div className="mt-1 space-y-1 leading-4">{(item.tempatLahir || item.tanggalLahir) && <p>Tempat/tanggal lahir: {[item.tempatLahir, item.tanggalLahir].filter(Boolean).join(', ')}</p>}{item.jenisKelamin && <p>Jenis kelamin: {item.jenisKelamin}</p>}{item.alamat && <p>Alamat: {item.alamat}</p>}</div></details>}</div><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${item.status === 'Baru' ? 'bg-amber-50 text-amber-800' : item.status === 'Selesai' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-primary-800'}`}>{item.status}</span></div>
              <p className="mt-3 text-xs font-medium text-slate-700">{item.program} · {item.jenjang}</p>
              <div className="mt-3 flex items-center justify-between"><span className="text-[10px] text-slate-400">{item.tanggal}</span><label className="sr-only" htmlFor={`mobile-status-${item.id}`}>Ubah status untuk {item.nama}</label><select id={`mobile-status-${item.id}`} value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs">{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></div>
            </article>
          ))}
          {!visibleRegistrations.length && <p className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-xs text-slate-500">Belum ada pendaftar yang cocok dengan filter ini.</p>}
        </div>
      </section>
    </AdminLayout>
  );
}
