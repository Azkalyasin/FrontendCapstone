'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';

export default function ProgramBelajarPage() {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // TODO: Replace with actual API call
  const [programs, setPrograms] = useState([
    {
      id: 1,
      nama: 'Bimbingan Intensif UTBK',
      deskripsi: 'Persiapan masuk PTN favorit dengan materi...',
      jenjang: 'SMA',
      biaya: 2500000,
      jadwal: 'Senin - Jumat, 15:00 - 17:00',
    },
    {
      id: 2,
      nama: 'Privat Matematika SMP',
      deskripsi: 'Fokus pada materi dasar dan penguatan konsep...',
      jenjang: 'SMP',
      biaya: 1200000,
      jadwal: 'Selasa & Kamis, 16:00 - 18:00',
    },
  ]);

  const handleDelete = () => {
    // TODO: Replace with actual API call
    setPrograms(programs.filter(p => p.id !== selectedProgram.id));
    setShowDeleteModal(false);
    setSelectedProgram(null);
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
      accessor: 'jenjang',
      width: '8%',
      render: (row) => (
        <span className="inline-flex items-center border border-black px-2 py-0.5 text-[10px] font-medium text-gray-900">
          {row.jenjang}
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
      description="[Description Placeholder]"
      action={
        <Button
          variant="outline"
          onClick={() => router.push('/admin/program/tambah')}
        >
          <span aria-hidden="true" className="mr-2">+</span>
          Tambah Program
        </Button>
      }
    >
      <div className="bg-white">
        <Table
          columns={columns}
          data={programs}
          actions={(row) => (
            <>
              <button
                onClick={() => router.push(`/admin/program/edit/${row.id}`)}
                className="border border-black p-1 hover:bg-gray-100"
                title="Edit"
              >
                <svg className="h-3.5 w-3.5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setSelectedProgram(row);
                  setShowDeleteModal(true);
                }}
                className="border border-black p-1 hover:bg-gray-100"
                title="Hapus"
              >
                <svg className="h-3.5 w-3.5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-black px-3 py-2">
          <div className="text-[10px] text-gray-700">
            Menampilkan <span className="font-medium">{programs.length}</span> data
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
            <div className="flex h-16 w-16 items-center justify-center border border-black bg-white">
              <svg className="h-8 w-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Konfirmasi Hapus
          </h3>

          {/* Message */}
          <p className="text-sm text-gray-600 mb-6">
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
              variant="primary"
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
