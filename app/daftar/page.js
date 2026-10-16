'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import { DEFAULT_PROGRAMS, DEFAULT_REGISTRATIONS, PROGRAMS_STORAGE_KEY, REGISTRATIONS_STORAGE_KEY, readStoredRecords, saveStoredRecords } from '@/lib/demo-data';

const initialForm = { nama: '', email: '', telepon: '', jenjang: '', program: '', pesan: '' };

export default function DaftarPage() {
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      setPrograms(readStoredRecords(PROGRAMS_STORAGE_KEY, DEFAULT_PROGRAMS));
    } catch (error) {
      console.error('Gagal memuat pilihan program untuk pendaftaran.', error);
      setMessage('Pilihan program gagal dimuat. Silakan muat ulang halaman.');
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');

    const nextErrors = {};
    if (!form.nama.trim()) nextErrors.nama = 'Nama lengkap perlu diisi.';
    if (!form.email.trim()) nextErrors.email = 'Alamat email perlu diisi.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Masukkan alamat email yang valid.';
    if (!form.telepon.trim()) nextErrors.telepon = 'Nomor WhatsApp perlu diisi.';
    if (!form.jenjang) nextErrors.jenjang = 'Pilih jenjang pendidikan.';
    if (!form.program) nextErrors.program = 'Pilih program yang diminati.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      const registrations = readStoredRecords(REGISTRATIONS_STORAGE_KEY, DEFAULT_REGISTRATIONS);
      const newRegistration = {
        ...form,
        id: `registration-${Date.now()}`,
        status: 'Baru',
        tanggal: new Date().toISOString().slice(0, 10),
      };
      saveStoredRecords(REGISTRATIONS_STORAGE_KEY, [newRegistration, ...registrations]);
      setSubmitted(true);
    } catch (error) {
      console.error('Pendaftaran tidak dapat disimpan di perangkat ini.', error);
      setMessage('Pendaftaran belum tersimpan. Coba kembali atau gunakan browser lain.');
    }
  };

  if (submitted) {
    return (
      <PublicLayout>
        <section className="mx-auto flex min-h-[65vh] max-w-3xl items-center px-5 py-16 sm:px-8">
          <div className="w-full rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 text-center shadow-xl shadow-emerald-900/5 sm:p-12">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-3xl text-emerald-700">✓</span>
            <p className="mt-6 text-xs font-bold tracking-[0.18em] text-emerald-700 uppercase">Langkah pertama selesai</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">Terima kasih, {form.nama.split(' ')[0]}!</h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">Data minat belajar sudah tersimpan di demo ini. Tim Bimble Wanda akan menghubungi melalui nomor yang kamu berikan.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/program" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Jelajahi program</Link>
              <Link href="/" className="rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-800">Kembali ke beranda</Link>
            </div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-50 via-white to-amber-50/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="pt-3">
            <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary-800 shadow-sm ring-1 ring-primary-100">Pendaftaran & konsultasi</span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">Yuk, mulai perjalanan belajarmu.</h1>
            <p className="mt-5 text-base leading-7 text-slate-600">Ceritakan sedikit tentang kebutuhan belajarmu. Tim kami akan membantu mencari program dan jadwal yang sesuai.</p>
            <div className="mt-8 space-y-4">
              {[['01', 'Isi kebutuhan belajarmu'], ['02', 'Tim kami menghubungi kamu'], ['03', 'Mulai belajar dengan nyaman']].map(([number, label]) => (
                <div key={number} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-xs font-bold text-primary-700 shadow-sm ring-1 ring-slate-100">{number}</span>
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white bg-white/70 p-4 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">Masih ingin mencari tahu?</span>
              <Link href="/program" className="mt-1 block font-semibold text-primary-700 hover:text-primary-900">Lihat pilihan program dahulu →</Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-xl shadow-primary-900/5 sm:p-8" noValidate>
            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-xl font-bold text-slate-950">Ceritakan kebutuhanmu</h2>
              <p className="mt-1 text-sm text-slate-500">Kolom bertanda * wajib diisi.</p>
            </div>
            {message && <p role="alert" className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{message}</p>}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-slate-700">Nama lengkap <span className="text-rose-500">*</span></span><input value={form.nama} onChange={(event) => setForm({ ...form, nama: event.target.value })} autoComplete="name" className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 focus:ring-primary-100 ${errors.nama ? 'border-rose-400' : 'border-slate-200 focus:border-primary-400'}`} placeholder="Nama siswa atau orang tua" />{errors.nama && <span className="mt-1 block text-xs text-rose-600">{errors.nama}</span>}</label>
              <label><span className="mb-1.5 block text-xs font-semibold text-slate-700">Email <span className="text-rose-500">*</span></span><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 focus:ring-primary-100 ${errors.email ? 'border-rose-400' : 'border-slate-200 focus:border-primary-400'}`} placeholder="nama@email.com" />{errors.email && <span className="mt-1 block text-xs text-rose-600">{errors.email}</span>}</label>
              <label><span className="mb-1.5 block text-xs font-semibold text-slate-700">Nomor WhatsApp <span className="text-rose-500">*</span></span><input type="tel" value={form.telepon} onChange={(event) => setForm({ ...form, telepon: event.target.value })} autoComplete="tel" className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 focus:ring-primary-100 ${errors.telepon ? 'border-rose-400' : 'border-slate-200 focus:border-primary-400'}`} placeholder="08xx xxxx xxxx" />{errors.telepon && <span className="mt-1 block text-xs text-rose-600">{errors.telepon}</span>}</label>
              <label><span className="mb-1.5 block text-xs font-semibold text-slate-700">Jenjang <span className="text-rose-500">*</span></span><select value={form.jenjang} onChange={(event) => setForm({ ...form, jenjang: event.target.value })} className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100 ${errors.jenjang ? 'border-rose-400' : 'border-slate-200'}`}><option value="">Pilih jenjang</option>{['SD', 'SMP', 'SMA'].map((item) => <option key={item} value={item}>{item}</option>)}</select>{errors.jenjang && <span className="mt-1 block text-xs text-rose-600">{errors.jenjang}</span>}</label>
              <label><span className="mb-1.5 block text-xs font-semibold text-slate-700">Program yang diminati <span className="text-rose-500">*</span></span><select value={form.program} onChange={(event) => setForm({ ...form, program: event.target.value })} className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100 ${errors.program ? 'border-rose-400' : 'border-slate-200'}`}><option value="">Pilih program</option>{programs.map((item) => <option key={item.id} value={item.nama}>{item.nama}</option>)}</select>{errors.program && <span className="mt-1 block text-xs text-rose-600">{errors.program}</span>}</label>
              <label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-slate-700">Catatan atau target belajar <span className="font-normal text-slate-400">(opsional)</span></span><textarea value={form.pesan} onChange={(event) => setForm({ ...form, pesan: event.target.value })} rows={4} className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100" placeholder="Ceritakan target atau jadwal yang diharapkan..." /></label>
            </div>
            <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-700/15 transition hover:bg-primary-800">Kirim minat pendaftaran <span aria-hidden="true">→</span></button>
            <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">Data tersimpan secara lokal pada demo ini. Integrasi ke server akan dilakukan setelah API backend siap.</p>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}
