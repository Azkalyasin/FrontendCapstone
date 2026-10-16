'use client';

import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';

export default function DataPendaftarPage() {
  return (
    <AdminLayout
      title="Data Pendaftar"
      description="Kelola data pendaftaran siswa baru"
      action={
        <Button variant="primary">
          Export Data
        </Button>
      }
    >
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        <div className="text-6xl mb-4">👥</div>
        <p className="text-lg font-medium">Halaman Data Pendaftar</p>
        <p className="text-sm mt-2">TODO: Implementasi tabel data pendaftar dengan wireframe yang sesuai</p>
      </div>
    </AdminLayout>
  );
}
