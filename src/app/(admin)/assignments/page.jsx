'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import AssignmentList from '@/components/assignments/AssignmentList';

export default function AssignmentsPage() {
  return (
    <DashboardLayout>
      <div className="container-responsive space-page">
        <AssignmentList />
      </div>
    </DashboardLayout>
  );
}