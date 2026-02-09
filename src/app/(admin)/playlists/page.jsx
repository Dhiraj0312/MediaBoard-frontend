'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import PlaylistList from '@/components/playlists/PlaylistList';

export default function PlaylistsPage() {
  return (
    <DashboardLayout>
      <div className="container-responsive space-page">
        <PlaylistList />
      </div>
    </DashboardLayout>
  );
}