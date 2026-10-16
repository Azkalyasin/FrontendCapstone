'use client';

import { AdminLayout } from '@/components/layout/AdminLayout';

export default function AdminDashboardPage() {
  return (
    <AdminLayout
      title="Dashboard"
      description="Ringkasan data dan statistik Bimble Wanda"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Siswa</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">124</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Program Aktif</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center text-2xl">
              📚
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendaftar Baru</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">15</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
              ✍️
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Achievement</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">42</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl">
              🏆
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for more content */}
      <div className="mt-6 bg-white rounded-lg shadow p-8 text-center text-gray-500">
        <p className="text-lg">Dashboard content akan dikembangkan lebih lanjut</p>
        <p className="text-sm mt-2">TODO: Grafik, tabel aktivitas, dll</p>
      </div>
    </AdminLayout>
  );
}
