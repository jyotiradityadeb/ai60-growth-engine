import React from 'react';
import { GrowthDashboard } from '@/components/GrowthDashboard';

export const metadata = {
  title: 'Growth Control Room | AI60 Campaign Analytics',
  description: 'Growth analytics, attribution performance, and channel breakdown for AI60 Campaign.',
};

export default function DashboardPage() {
  return (
    <div className="py-6">
      <GrowthDashboard />
    </div>
  );
}
