'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import {
  ACHIEVEMENTS_STORAGE_KEY,
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_PROGRAMS,
  DEFAULT_REGISTRATIONS,
  PROGRAMS_STORAGE_KEY,
  readStoredRecords,
  REGISTRATIONS_STORAGE_KEY,
} from '@/lib/demo-data';

const periods = [
  { label: '7 hari', days: 7 },
  { label: '30 hari', days: 30 },
  { label: 'Semua', days: null },
];

function isoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState(7);
  const [registrations, setRegistrations] = useState(DEFAULT_REGISTRATIONS);
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);
  const [achievements, setAchievements] = useState(DEFAULT_ACHIEVEMENTS);
  const [loadError, setLoadError] = useState('');
  const [today, setToday] = useState(null);

  useEffect(() => {
    setToday(new Date());
    try {
      setRegistrations(readStoredRecords(REGISTRATIONS_STORAGE_KEY, DEFAULT_REGISTRATIONS));
      setPrograms(readStoredRecords(PROGRAMS_STORAGE_KEY, DEFAULT_PROGRAMS));
      setAchievements(readStoredRecords(ACHIEVEMENTS_STORAGE_KEY, DEFAULT_ACHIEVEMENTS));
    } catch (error) {
      console.error('Gagal memuat ringkasan dashboard.', error);
      setLoadError('Beberapa data dashboard tidak dapat dimuat dari browser ini.');
    }
  }, []);

  const recentRegistrations = useMemo(() => {
    if (period === null) return registrations;
    if (!today) return [];
    const cutoff = new Date(today.getTime());
    cutoff.setDate(cutoff.getDate() - period + 1);
    const cutoffDate = isoDate(cutoff);
    return registrations.filter((item) => item.tanggal >= cutoffDate);
  }, [period, registrations, today]);

  const weeklyActivity = useMemo(() => {
    if (!today) return [];
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today.getTime());
      date.setDate(date.getDate() - (6 - index));
      const key = isoDate(date);
      return {
        label: date.toLocaleDateString('id-ID', { weekday: 'short' }),
        count: registrations.filter((item) => item.tanggal === key).length,
        active: key === isoDate(today),
      };
    });
  }, [registrations, today]);
  const maxActivity = Math.max(1, ...weeklyActivity.map((item) => item.count));

  const metrics = [
    { label: 'Minat pendaftaran', value: recentRegistrations.length, helper: 'Sesuai periode yang dipilih', icon: '↗', tone: 'bg-blue-50 text-primary-700' },
    { label: 'Program belajar', value: programs.length, helper: 'Tersedia untuk siswa', icon: '▤', tone: 'bg-amber-50 text-amber-700' },
    { label: 'Cerita prestasi', value: achievements.length, helper: 'Pencapaian yang dirayakan', icon: '✦', tone: 'bg-violet-50 text-violet-700' },
  ];

  return (
    <AdminLayout title="Selamat datang kembali 👋" description="Ringkasan aktivitas Bimble Wanda hari ini.">
      {loadError && <p role="alert" className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{loadError}</p>}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-gradient-to-r from-primary-50 via-white to-amber-50 p-4 sm:px-5">
        <div><p className="text-sm font-semibold text-slate-900">Mode pratinjau interaktif</p><p className="mt-1 text-xs text-slate-500">Data saat ini tersimpan di browser ini sambil menunggu integrasi backend.</p></div>
        <Link href="/" target="_blank" className="rounded-full border border-white bg-white px-4 py-2 text-xs font-semibold text-primary-800 shadow-sm transition hover:bg-primary-50">Lihat situs publik ↗</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5">
            <div className="flex items-start justify-between"><div><p className="text-xs font-medium text-slate-500">{metric.label}</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{metric.value}</p></div><span className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${metric.tone}`}>{metric.icon}</span></div>
            <p className="mt-3 text-[11px] text-slate-400">{metric.helper}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><h2 className="text-sm font-bold text-slate-900">Aktivitas pendaftaran</h2><p className="mt-1 text-[11px] text-slate-500">Minat yang masuk · {period === null ? 'semua waktu' : period === 7 ? '7 hari terakhir' : '30 hari terakhir'}</p></div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-full bg-slate-100 p-1" aria-label="Rentang aktivitas">
                {periods.map((item) => <button type="button" key={item.label} aria-pressed={period === item.days} onClick={() => setPeriod(item.days)} className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold transition ${period === item.days ? 'bg-white text-primary-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>{item.label}</button>)}
              </div>
              <Link href="/admin/pendaftar" className="text-xs font-semibold text-primary-700 hover:text-primary-900">Lihat →</Link>
            </div>
          </div>
          <div className="mt-7 flex h-40 items-end gap-3 sm:gap-5" role="img" aria-label="Grafik jumlah pendaftar selama tujuh hari terakhir">
            {weeklyActivity.map((day) => (
              <div key={day.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[10px] font-semibold text-slate-500">{day.count || ''}</span>
                <div className="flex w-full flex-1 items-end overflow-hidden rounded-t-lg bg-slate-50">
                  <div className={`w-full rounded-t-lg transition-all duration-500 ${day.active ? 'bg-primary-600' : 'bg-primary-200'}`} style={{ height: `${Math.max(8, (day.count / maxActivity) * 100)}%` }} />
                </div>
                <span className={`text-[10px] font-medium ${day.active ? 'text-primary-700' : 'text-slate-400'}`}>{day.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between gap-3"><div><h2 className="text-sm font-bold text-slate-900">Akses cepat</h2><p className="mt-1 text-[11px] text-slate-500">Lanjutkan pekerjaan admin</p></div><span className="text-lg text-secondary-500">✦</span></div>
          <div className="mt-4 space-y-2">
            {[
              { href: '/admin/program/tambah', title: 'Tambah program', description: 'Buka pendaftaran kelas baru', icon: '+' },
              { href: '/admin/achievement/tambah', title: 'Tambah prestasi', description: 'Rayakan pencapaian siswa', icon: '✦' },
              { href: '/admin/pendaftar', title: 'Tinjau pendaftar', description: `${registrations.filter((item) => item.status === 'Baru').length} menunggu tindak lanjut`, icon: '→' },
            ].map((action) => (
              <Link key={action.href} href={action.href} className="group flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-primary-100 hover:bg-primary-50/50">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-primary-700 transition group-hover:bg-primary-100">{action.icon}</span>
                <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-slate-800">{action.title}</span><span className="mt-0.5 block truncate text-[10px] text-slate-500">{action.description}</span></span>
                <span className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-primary-700">↗</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-bold text-slate-900">Minat terbaru</h2><p className="mt-1 text-[11px] text-slate-500">Pendaftar yang perlu diperhatikan</p></div><Link href="/admin/pendaftar" className="text-xs font-semibold text-primary-700 hover:text-primary-900">Kelola semua →</Link></div>
        <div className="mt-4 divide-y divide-slate-100">
          {registrations.slice(0, 4).map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">{item.nama.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><div><p className="text-xs font-semibold text-slate-800">{item.nama}</p><p className="mt-0.5 text-[10px] text-slate-500">{item.program} · {item.tanggal}</p></div></div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${item.status === 'Baru' ? 'bg-amber-50 text-amber-800' : item.status === 'Selesai' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-primary-800'}`}>{item.status}</span>
            </div>
          ))}
          {!registrations.length && <p className="py-6 text-center text-xs text-slate-500">Belum ada minat pendaftaran.</p>}
        </div>
      </section>
    </AdminLayout>
  );
}
