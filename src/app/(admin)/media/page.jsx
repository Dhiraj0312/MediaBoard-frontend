'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import MediaList from '@/components/media/MediaList';

export default function MediaPage() {
  return (
    <DashboardLayout>
      <div className="container-responsive space-page">
        <MediaList />
      </div>
    </DashboardLayout>
  );
}