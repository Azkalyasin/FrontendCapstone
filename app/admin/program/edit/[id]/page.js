'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { DEFAULT_PROGRAMS, PROGRAMS_STORAGE_KEY, readStoredRecords, saveStoredRecords } from '@/lib/demo-data';

function EditProgramForm() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    jenjang: '',
    biaya: '',
    jadwal: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const jenjangOptions = [
    { value: 'SD', label: 'SD' },
    { value: 'SMP', label: 'SMP' },
    { value: 'SMA', label: 'SMA' },
  ];

  useEffect(() => {
    try {
      const programs = readStoredRecords(PROGRAMS_STORAGE_KEY, DEFAULT_PROGRAMS);
      const program = programs.find((item) => String(item.id) === String(params.id))
        || (String(params.id) === '1' ? DEFAULT_PROGRAMS[0] : null);
      if (!program) {
        setInitialError('Program tidak ditemukan. Program mungkin sudah dihapus.');
      } else {
        setFormData({
          nama: program.nama,
          deskripsi: program.deskripsi,
          jenjang: program.tingkat || program.jenjang,
          biaya: String(program.biaya),
          jadwal: program.jadwal,
        });
      }
    } catch (error) {
      console.error('Gagal memuat data program.', error);
      setInitialError('Data program gagal dimuat. Muat ulang halaman untuk mencoba kembali.');
    } finally {
      setInitialLoading(false);
    }
  }, [params.id]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama program harus diisi';
    }
    if (!formData.deskripsi.trim()) {
      newErrors.deskripsi = 'Deskripsi harus diisi';
    }
    if (!formData.jenjang) {
      newErrors.jenjang = 'Jenjang harus dipilih';
    }
    if (!formData.biaya) {
      newErrors.biaya = 'Biaya harus diisi';
    } else if (isNaN(formData.biaya) || Number(formData.biaya) < 0) {
      newErrors.biaya = 'Biaya harus berupa angka positif';
    }
    if (!formData.jadwal.trim()) {
      newErrors.jadwal = 'Jadwal harus diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const programs = readStoredRecords(PROGRAMS_STORAGE_KEY, DEFAULT_PROGRAMS);
      const currentProgram = programs.find((item) => String(item.id) === String(params.id));
      const updatedProgram = {
        ...(currentProgram || DEFAULT_PROGRAMS[0]),
        ...formData,
        tingkat: formData.jenjang,
        biaya: Number(formData.biaya),
      };
      const updated = currentProgram
        ? programs.map((item) => String(item.id) === String(params.id) ? updatedProgram : item)
        : [updatedProgram, ...programs];
      saveStoredRecords(PROGRAMS_STORAGE_KEY, updated);
      router.push('/admin/program');
    } catch (error) {
      console.error('Perubahan program tidak dapat disimpan.', error);
      setSubmitError('Perubahan belum tersimpan. Penyimpanan browser mungkin penuh.');
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <AdminLayout title={null} showTopbar={false}>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-600">
            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Memuat data...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={null}
      description={null}
      showTopbar={false}
    >
      {/* Breadcrumb */}
      <div className="mb-2">
        <Link 
          href="/admin/program"
          className="flex items-center gap-1 text-xs text-primary-700 hover:text-primary-900"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Program Belajar
        </Link>
      </div>

      <div className="mb-2">
        <h1 className="text-xl font-semibold text-slate-900">Edit Program Belajar</h1>
        <p className="mt-1 text-xs text-slate-500">Perbarui informasi detail program belajar di bawah ini.</p>
      </div>

      {initialError && <div role="alert" className="mb-4 border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">{initialError}</div>}
      {/* Form */}
      {!initialError && <div className="ml-1 w-[95%] border border-slate-200 bg-white px-4 py-[17px]">
        <form onSubmit={handleSubmit} className="space-y-3">
          {submitError && <p role="alert" className="border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{submitError}</p>}
          {/* Nama Program */}
          <Input
            label="Nama Program"
            type="text"
            placeholder="Contoh: Bimbingan Intensif UTBK"
            value={formData.nama}
            onChange={(e) => handleChange('nama', e.target.value)}
            error={errors.nama}
            required
          />

          {/* Deskripsi */}
          <Textarea
            label="Deskripsi"
            placeholder="Tuliskan deskripsi lengkap mengenai program belajar ini..."
            value={formData.deskripsi}
            onChange={(e) => handleChange('deskripsi', e.target.value)}
            error={errors.deskripsi}
            rows={3}
            required
          />

          {/* Jenjang & Biaya */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Jenjang"
              placeholder="Pilih Jenjang"
              value={formData.jenjang}
              onChange={(e) => handleChange('jenjang', e.target.value)}
              options={jenjangOptions}
              error={errors.jenjang}
              required
            />

            <Input
              label="Biaya"
              type="text"
              placeholder="0"
              icon={<span>Rp</span>}
              value={formData.biaya ? Number(formData.biaya).toLocaleString('id-ID') : ''}
              onChange={(e) => handleChange('biaya', e.target.value.replace(/\D/g, ''))}
              inputMode="numeric"
              error={errors.biaya}
              required
            />
          </div>

          {/* Jadwal */}
          <Input
            label="Jadwal"
            type="text"
            placeholder="Contoh: Senin - Jumat, 15:00 - 17:00 WIB"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z" />
              </svg>
            }
            value={formData.jadwal}
            onChange={(e) => handleChange('jadwal', e.target.value)}
            error={errors.jadwal}
            required
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/program')}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3h12l4 4v14H3V3h2Zm2 0v6h10V3M7 21v-8h10v8" />
                  </svg>
                  Simpan Program
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>}
    </AdminLayout>
  );
}

export default function EditProgramPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">
          Memuat halaman...
        </div>
      }
    >
      <EditProgramForm />
    </Suspense>
  );
}
