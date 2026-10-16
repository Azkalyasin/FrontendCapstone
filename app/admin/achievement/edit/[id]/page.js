'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { AchievementForm } from '@/components/admin/AchievementForm';

function EditAchievementPageContent() {
  const params = useParams();
  return <AchievementForm achievementId={params.id} />;
}

export default function EditAchievementPage() {
  return <Suspense fallback={<div className="min-h-screen bg-slate-50 p-8 text-sm text-slate-500">Memuat achievement...</div>}>
    <EditAchievementPageContent />
  </Suspense>;
}
