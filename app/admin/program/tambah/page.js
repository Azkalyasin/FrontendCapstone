'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { DEFAULT_PROGRAMS, PROGRAMS_STORAGE_KEY, readStoredRecords, saveStoredRecords } from '@/lib/demo-data';

export default function TambahProgramPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    jenjang: '',
    biaya: '',
    jadwal: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const jenjangOptions = [
    { value: 'SD', label: 'SD' },
    { value: 'SMP', label: 'SMP' },
    { value: 'SMA', label: 'SMA' },
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user types
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
      const newProgram = {
        ...formData,
        id: `program-${Date.now()}`,
        tingkat: formData.jenjang,
        biaya: Number(formData.biaya),
        durasi: 'Fleksibel',
        kuota: 12,
      };
      saveStoredRecords(PROGRAMS_STORAGE_KEY, [newProgram, ...programs]);
      router.push('/admin/program');
    } catch (error) {
      console.error('Program tidak dapat disimpan.', error);
      setSubmitError('Program belum tersimpan. Penyimpanan browser mungkin penuh.');
      setLoading(false);
    }
  };

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
        <h1 className="text-xl font-semibold text-slate-900">Tambah Program Belajar Baru</h1>
      </div>

      {/* Form */}
      <div className="ml-1 w-[95%] border border-slate-200 bg-white px-4 py-[17px]">
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
      </div>
    </AdminLayout>
  );
}
