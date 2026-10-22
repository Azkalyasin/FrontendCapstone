'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import { DEFAULT_PROGRAMS, DEFAULT_REGISTRATIONS, PROGRAMS_STORAGE_KEY, REGISTRATIONS_STORAGE_KEY, readStoredRecords, saveStoredRecords } from '@/lib/demo-data';

const initialForm = {
  nama: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '',
  alamat: '',
  telepon: '',
  namaOrangTua: '',
  jenjang: '',
  program: '',
};

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:ring-4 focus:ring-primary-100';

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

  const handleJenjangChange = (event) => {
    const jenjang = event.target.value;
    const matchingProgram = programs.find((program) => (program.tingkat || program.jenjang) === jenjang);
    setForm((current) => ({
      ...current,
      jenjang,
      program: matchingProgram?.nama || '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');

    const nextErrors = {};
    if (!form.nama.trim()) nextErrors.nama = 'Nama lengkap perlu diisi.';
    if (!form.tempatLahir.trim()) nextErrors.tempatLahir = 'Tempat lahir perlu diisi.';
    if (!form.tanggalLahir) nextErrors.tanggalLahir = 'Tanggal lahir perlu diisi.';
    if (!form.jenisKelamin) nextErrors.jenisKelamin = 'Pilih jenis kelamin.';
    if (!form.alamat.trim()) nextErrors.alamat = 'Alamat lengkap perlu diisi.';
    if (!form.telepon.trim()) nextErrors.telepon = 'Nomor HP/WhatsApp perlu diisi.';
    if (!form.namaOrangTua.trim()) nextErrors.namaOrangTua = 'Nama orang tua/wali perlu diisi.';
    if (!form.jenjang) nextErrors.jenjang = 'Pilih tingkat pendidikan.';
    if (form.jenjang && !form.program) nextErrors.program = 'Belum ada program untuk tingkat pendidikan ini.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      const registrations = readStoredRecords(REGISTRATIONS_STORAGE_KEY, DEFAULT_REGISTRATIONS);
      const newRegistration = {
        ...form,
        email: '',
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
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-3xl text-emerald-700" aria-hidden="true">✓</span>
            <p className="mt-6 text-xs font-bold tracking-[0.18em] text-emerald-700 uppercase">Pendaftaran diterima</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">Terima kasih, {form.nama.split(' ')[0]}!</h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">Data pendaftaran sudah tersimpan di browser ini sebagai demo. Pilihan tingkat pendidikan: <span className="font-semibold text-slate-800">{form.jenjang}</span>.</p>
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
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary-800 shadow-sm ring-1 ring-primary-100">Pendaftaran siswa baru</span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">Pendaftaran online</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Lengkapi formulir di bawah ini untuk mendaftar program bimbingan belajar.</p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-9 max-w-3xl rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-xl shadow-primary-900/5 sm:p-8" noValidate>
            {message && <p role="alert" className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{message}</p>}

            <fieldset>
              <legend className="w-full border-b border-slate-200 pb-3 text-lg font-bold text-slate-900">Data siswa</legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700">Nama lengkap <span className="text-rose-500">*</span></span>
                  <input value={form.nama} onChange={(event) => setForm({ ...form, nama: event.target.value })} autoComplete="name" className={inputClass} placeholder="Masukkan nama lengkap" aria-invalid={Boolean(errors.nama)} />
                  {errors.nama && <span className="mt-1 block text-xs text-rose-600">{errors.nama}</span>}
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700">Tempat lahir <span className="text-rose-500">*</span></span>
                  <input value={form.tempatLahir} onChange={(event) => setForm({ ...form, tempatLahir: event.target.value })} autoComplete="address-level2" className={inputClass} placeholder="Kota lahir" aria-invalid={Boolean(errors.tempatLahir)} />
                  {errors.tempatLahir && <span className="mt-1 block text-xs text-rose-600">{errors.tempatLahir}</span>}
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700">Tanggal lahir <span className="text-rose-500">*</span></span>
                  <input type="date" value={form.tanggalLahir} onChange={(event) => setForm({ ...form, tanggalLahir: event.target.value })} className={inputClass} aria-invalid={Boolean(errors.tanggalLahir)} />
                  {errors.tanggalLahir && <span className="mt-1 block text-xs text-rose-600">{errors.tanggalLahir}</span>}
                </label>
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 text-xs font-semibold text-slate-700">Jenis kelamin <span className="text-rose-500">*</span></legend>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {['Laki-laki', 'Perempuan'].map((gender) => (
                      <label key={gender} className="inline-flex items-center gap-2 text-sm text-slate-700">
                        <input type="radio" name="jenisKelamin" value={gender} checked={form.jenisKelamin === gender} onChange={(event) => setForm({ ...form, jenisKelamin: event.target.value })} className="h-4 w-4 accent-primary-700" />
                        {gender}
                      </label>
                    ))}
                  </div>
                  {errors.jenisKelamin && <span className="mt-1 block text-xs text-rose-600">{errors.jenisKelamin}</span>}
                </fieldset>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700">Alamat lengkap <span className="text-rose-500">*</span></span>
                  <textarea value={form.alamat} onChange={(event) => setForm({ ...form, alamat: event.target.value })} autoComplete="street-address" rows={3} className={`${inputClass} resize-y`} placeholder="Masukkan alamat domisili" aria-invalid={Boolean(errors.alamat)} />
                  {errors.alamat && <span className="mt-1 block text-xs text-rose-600">{errors.alamat}</span>}
                </label>
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="w-full border-b border-slate-200 pb-3 text-lg font-bold text-slate-900">Kontak & program</legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700">No. HP / WhatsApp <span className="text-rose-500">*</span></span>
                  <input type="tel" value={form.telepon} onChange={(event) => setForm({ ...form, telepon: event.target.value })} autoComplete="tel" className={inputClass} placeholder="08xx xxxx xxxx" aria-invalid={Boolean(errors.telepon)} />
                  {errors.telepon && <span className="mt-1 block text-xs text-rose-600">{errors.telepon}</span>}
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700">Nama orang tua/wali <span className="text-rose-500">*</span></span>
                  <input value={form.namaOrangTua} onChange={(event) => setForm({ ...form, namaOrangTua: event.target.value })} autoComplete="name" className={inputClass} placeholder="Nama ayah/ibu/wali" aria-invalid={Boolean(errors.namaOrangTua)} />
                  {errors.namaOrangTua && <span className="mt-1 block text-xs text-rose-600">{errors.namaOrangTua}</span>}
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700">Pilih tingkat pendidikan <span className="text-rose-500">*</span></span>
                  <select value={form.jenjang} onChange={handleJenjangChange} className={inputClass} aria-invalid={Boolean(errors.jenjang || errors.program)}>
                    <option value="">Pilih tingkat pendidikan</option>
                    {['SD', 'SMP', 'SMA'].map((level) => <option key={level} value={level}>{level}</option>)}
                  </select>
                  {(errors.jenjang || errors.program) && <span className="mt-1 block text-xs text-rose-600">{errors.jenjang || errors.program}</span>}
                  {form.program && <span className="mt-1.5 block text-xs text-slate-500">Program pilihan: {form.program}</span>}
                </label>
              </div>
            </fieldset>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link href="/" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Batal</Link>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-700/15 transition hover:-translate-y-0.5 hover:bg-primary-800">Daftar sekarang <span aria-hidden="true">→</span></button>
            </div>
            <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">Data pendaftaran tersimpan secara lokal di browser ini untuk demo dan belum dikirim ke server.</p>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}
