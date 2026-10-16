'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ACHIEVEMENTS_STORAGE_KEY, DEFAULT_ACHIEVEMENTS, readStoredRecords, saveStoredRecords } from '@/lib/demo-data';

const emptyAchievement = {
  namaSiswa: '',
  judul: '',
  kategori: '',
  deskripsi: '',
  tanggal: '',
  foto: '',
};

const categories = ['Akademik', 'Olahraga', 'Seni & Bahasa', 'Lainnya'];

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Foto tidak dapat dibaca. Coba pilih file lain.'));
    reader.readAsDataURL(file);
  });
}

export function AchievementForm({ achievementId }) {
  const router = useRouter();
  const isEditing = Boolean(achievementId);
  const [form, setForm] = useState(emptyAchievement);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEditing);
  const [missingAchievement, setMissingAchievement] = useState(false);

  useEffect(() => {
    if (!isEditing) return;
    try {
      const achievements = readStoredRecords(ACHIEVEMENTS_STORAGE_KEY, DEFAULT_ACHIEVEMENTS);
      const record = achievements.find((item) => String(item.id) === String(achievementId));
      if (!record) {
        setMissingAchievement(true);
      } else {
        setForm({
          ...emptyAchievement,
          ...record,
          tanggal: record.tanggal || `${record.tahun || 2026}-01-01`,
        });
      }
    } catch (readError) {
      console.error('Gagal memuat prestasi yang akan diedit.', readError);
      setError('Data prestasi tidak dapat dimuat. Coba muat ulang halaman.');
    } finally {
      setLoading(false);
    }
  }, [achievementId, isEditing]);

  const handlePhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Pilih foto JPG, PNG, atau WebP.');
      event.target.value = '';
      return;
    }
    if (file.size > 1024 * 1024) {
      setError('Ukuran foto maksimal 1 MB untuk penyimpanan demo di browser.');
      event.target.value = '';
      return;
    }
    try {
      const foto = await fileToDataUrl(file);
      setForm((current) => ({ ...current, foto }));
    } catch (readError) {
      console.error('Gagal membaca foto prestasi.', readError);
      setError(readError.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    if (!form.namaSiswa.trim() || !form.judul.trim() || !form.kategori || !form.deskripsi.trim() || !form.tanggal) {
      setError('Lengkapi nama siswa, judul, kategori, deskripsi, dan tanggal prestasi.');
      return;
    }
    try {
      const achievements = readStoredRecords(ACHIEVEMENTS_STORAGE_KEY, DEFAULT_ACHIEVEMENTS);
      const record = {
        ...form,
        id: isEditing ? achievementId : `achievement-${Date.now()}`,
        tahun: Number(form.tanggal.slice(0, 4)),
      };
      const updated = isEditing
        ? achievements.map((item) => String(item.id) === String(achievementId) ? record : item)
        : [record, ...achievements];
      saveStoredRecords(ACHIEVEMENTS_STORAGE_KEY, updated);
      router.push('/admin/achievement');
    } catch (saveError) {
      console.error('Prestasi tidak dapat disimpan di perangkat ini.', saveError);
      setError('Prestasi belum tersimpan. Ruang penyimpanan browser mungkin penuh.');
    }
  };

  if (loading) {
    return <AdminLayout title={null} showTopbar={false}><div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500">Memuat data prestasi...</div></AdminLayout>;
  }

  return (
    <AdminLayout title={null} showTopbar={false}>
      <Link href="/admin/achievement" className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-semibold text-primary-700 transition hover:bg-primary-50 hover:text-primary-900"><span aria-hidden="true">←</span> Kembali ke Kelola Achievement</Link>
      <div className="mb-5 mt-4">
        <span className="text-[10px] font-bold tracking-[0.18em] text-primary-700 uppercase">Cerita inspiratif</span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{isEditing ? 'Edit Achievement' : 'Tambah Achievement Baru'}</h1>
        <p className="mt-1 text-xs text-slate-500">{isEditing ? 'Perbarui detail prestasi siswa.' : 'Lengkapi detail untuk merayakan pencapaian siswa.'}</p>
      </div>

      {missingAchievement ? (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <p className="font-semibold text-amber-900">Data prestasi tidak ditemukan.</p>
          <p className="mt-1 text-sm text-amber-800">Data mungkin sudah dihapus atau belum tersimpan pada browser ini.</p>
          <Link href="/admin/achievement" className="mt-4 inline-flex text-sm font-semibold text-amber-900 underline">Kembali ke daftar prestasi</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-4xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <div>
              <label className="text-xs font-bold text-slate-700" htmlFor="achievement-photo">Foto achievement <span className="font-normal text-slate-400">(opsional)</span></label>
              <div className="mt-3 flex aspect-square max-w-[220px] items-center justify-center overflow-hidden rounded-3xl border border-dashed border-primary-200 bg-gradient-to-br from-primary-50 via-white to-amber-50">
                {form.foto ? <img src={form.foto} alt="Pratinjau foto prestasi" className="h-full w-full object-cover" /> : <div className="text-center"><span className="text-4xl text-primary-400">✦</span><p className="mt-2 text-xs text-slate-500">Pratinjau foto</p></div>}
              </div>
              <input id="achievement-photo" type="file" accept="image/png,image/jpeg,image/webp" onChange={handlePhoto} className="mt-3 block w-full text-xs text-slate-500 file:mr-2 file:rounded-full file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-primary-800 hover:file:bg-primary-100" />
              <p className="mt-2 text-[11px] leading-5 text-slate-400">JPG, PNG, atau WebP · maksimal 1 MB.</p>
              {form.foto && <button type="button" onClick={() => setForm((current) => ({ ...current, foto: '' }))} className="mt-2 text-xs font-semibold text-rose-600 hover:text-rose-800">Hapus foto</button>}
            </div>

            <div className="grid content-start gap-4 sm:grid-cols-2">
              <label><span className="mb-1.5 block text-xs font-semibold text-slate-700">Nama siswa <span className="text-rose-500">*</span></span><input value={form.namaSiswa} onChange={(event) => setForm({ ...form, namaSiswa: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100" placeholder="Contoh: Andi Wijaya" /></label>
              <label><span className="mb-1.5 block text-xs font-semibold text-slate-700">Kategori achievement <span className="text-rose-500">*</span></span><select value={form.kategori} onChange={(event) => setForm({ ...form, kategori: event.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"><option value="">Pilih kategori</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
              <label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-slate-700">Judul achievement <span className="text-rose-500">*</span></span><input value={form.judul} onChange={(event) => setForm({ ...form, judul: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100" placeholder="Contoh: Juara 1 Olimpiade Matematika" /></label>
              <label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-slate-700">Deskripsi achievement <span className="text-rose-500">*</span></span><textarea value={form.deskripsi} onChange={(event) => setForm({ ...form, deskripsi: event.target.value })} rows={4} className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100" placeholder="Ceritakan pencapaian dan proses yang dilalui siswa..." /></label>
              <label><span className="mb-1.5 block text-xs font-semibold text-slate-700">Tanggal pencapaian <span className="text-rose-500">*</span></span><input type="date" value={form.tanggal} onChange={(event) => setForm({ ...form, tanggal: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100" /></label>
            </div>
          </div>

          {error && <p role="alert" className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
          <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
            <Link href="/admin/achievement" className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Batal</Link>
            <button type="submit" className="rounded-full bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-700/15 transition hover:bg-primary-800">{isEditing ? 'Simpan perubahan' : 'Simpan achievement'} <span aria-hidden="true">→</span></button>
          </div>
        </form>
      )}
    </AdminLayout>
  );
}
