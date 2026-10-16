'use client';

import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';

export default function AchievementPage() {
  return (
    <AdminLayout
      title="Kelola Achievement"
      description="Kelola pencapaian dan prestasi siswa"
      action={
        <Button variant="primary">
          + Tambah Achievement
        </Button>
      }
    >
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        <div className="text-6xl mb-4">🏆</div>
        <p className="text-lg font-medium">Halaman Kelola Achievement</p>
        <p className="text-sm mt-2">TODO: Implementasi CRUD achievement dengan wireframe yang sesuai</p>
      </div>
    </AdminLayout>
  );
}
