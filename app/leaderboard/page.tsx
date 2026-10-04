import React from 'react';
import { LeaderboardView } from '@/components/LeaderboardView';

export const metadata = {
  title: 'Leaderboard | AI60 Growth Engine',
  description: 'Top student referrers and campus rankings for the AI60 Campaign Simulation.',
};

export default function LeaderboardPage() {
  return (
    <div className="py-6">
      <LeaderboardView />
    </div>
  );
}
