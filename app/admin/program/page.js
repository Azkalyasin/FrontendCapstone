'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { DEFAULT_PROGRAMS, PROGRAMS_STORAGE_KEY, readStoredRecords, saveStoredRecords } from '@/lib/demo-data';

export default function ProgramBelajarPage() {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [query, setQuery] = useState('');
  const [programError, setProgramError] = useState('');
  const [notice, setNotice] = useState('');

  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);

  useEffect(() => {
    try {
      setPrograms(readStoredRecords(PROGRAMS_STORAGE_KEY, DEFAULT_PROGRAMS));
    } catch (error) {
      console.error('Gagal memuat daftar program admin.', error);
      setProgramError('Daftar program gagal dimuat. Muat ulang halaman untuk mencoba kembali.');
    }
  }, []);

  const filteredPrograms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return programs.filter((program) => `${program.nama} ${program.deskripsi} ${program.tingkat || program.jenjang} ${program.jadwal}`.toLowerCase().includes(normalizedQuery));
  }, [programs, query]);

  const handleDelete = () => {
    if (!selectedProgram) return;
    try {
      const updated = programs.filter((program) => String(program.id) !== String(selectedProgram.id));
      saveStoredRecords(PROGRAMS_STORAGE_KEY, updated);
      setPrograms(updated);
      setShowDeleteModal(false);
      setSelectedProgram(null);
      setNotice('Program berhasil dihapus.');
      setProgramError('');
    } catch (error) {
      console.error('Gagal menghapus program.', error);
      setProgramError('Program belum dapat dihapus. Penyimpanan browser mungkin penuh.');
    }
  };

  const columns = [
    {
      header: 'Nama Program',
      accessor: 'nama',
      width: '24%',
      render: (row) => <span className="font-semibold">{row.nama}</span>,
    },
    {
      header: 'Deskripsi',
      accessor: 'deskripsi',
      width: '29%',
      render: (row) => (
        <div className="max-w-xs truncate">{row.deskripsi}</div>
      ),
    },
    {
      header: 'Jenjang',
      accessor: 'tingkat',
      width: '8%',
      render: (row) => (
        <span className="inline-flex items-center border border-primary-200 bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-800">
          {row.tingkat || row.jenjang}
        </span>
      ),
    },
    {
      header: 'Biaya',
      accessor: 'biaya',
      width: '13%',
      render: (row) => (
        <span>Rp {row.biaya.toLocaleString('id-ID')}</span>
      ),
    },
    {
      header: 'Jadwal',
      accessor: 'jadwal',
      width: '12%',
    },
  ];

  return (
    <AdminLayout
      title="Kelola Program Belajar"
      description="Atur kelas, jadwal, dan biaya belajar siswa."
      action={
        <Button
          variant="primary"
          onClick={() => router.push('/admin/program/tambah')}
        >
          <span aria-hidden="true" className="mr-2">+</span>
          Tambah Program
        </Button>
      }
    >
      {programError && <p role="alert" className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{programError}</p>}
      {notice && <div role="status" className="mb-4 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><span>✓ {notice}</span><button type="button" onClick={() => setNotice('')} aria-label="Tutup notifikasi">×</button></div>}
      <div className="bg-white">
        <div className="flex flex-col gap-3 border border-b-0 border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500"><span className="font-semibold text-slate-800">{programs.length}</span> program belajar</p>
          <label className="relative block sm:w-64">
            <span className="sr-only">Cari program</span>
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari program..." className="w-full rounded-full border border-slate-200 py-2 pl-9 pr-3 text-xs outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100" />
          </label>
        </div>
        <Table
          columns={columns}
          data={filteredPrograms}
          actions={(row) => (
            <>
              <button
                onClick={() => router.push(`/admin/program/edit/${row.id}`)}
                className="border border-primary-200 bg-primary-50 p-1 text-primary-700 hover:bg-primary-100"
                title="Edit"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setSelectedProgram(row);
                  setShowDeleteModal(true);
                }}
                className="border border-rose-200 bg-rose-50 p-1 text-rose-700 hover:bg-rose-100"
                title="Hapus"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2">
          <div className="text-[10px] text-slate-500">
            Menampilkan <span className="font-medium">{filteredPrograms.length}</span> dari <span className="font-medium">{programs.length}</span> data
          </div>
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" disabled>
              Prev
            </Button>
            <Button variant="primary" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        size="sm"
      >
        <div className="text-center py-4">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center border border-rose-200 bg-rose-50">
              <svg className="h-8 w-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Konfirmasi Hapus
          </h3>

          {/* Message */}
          <p className="text-sm text-slate-600 mb-6">
            Apakah Anda yakin ingin menghapus data program belajar ini? Tindakan ini tidak dapat 
            dibatalkan dan data akan dihapus secara permanen dari sistem.
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Hapus Program
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
