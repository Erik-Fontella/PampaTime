// src/pages/History.tsx

import React from 'react';
import PageLayout from '../components/ui/PageLayout'; // Importação do PageLayout
import HistoryToolbar from '@/components/history/HistoryToolbar';
import WeeklyCalendar from '@/components/history/WeeklyCalendar';
import EditHistory from '@/components/history/EditHistory';

const History = () => {
  return (
    <PageLayout>
      {/* O PageLayout já cuida do Header e do Footer */}
      <div className="flex flex-1 min-h-0">
        <main className="flex flex-col flex-1 overflow-hidden">
          <HistoryToolbar /> {/* <-- AQUI ESTÁ A ÚNICA CHAMADA DA TOOLBAR */}
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto">
              <WeeklyCalendar />
            </div>
            <EditHistory />
          </div>
        </main>
      </div>
    </PageLayout>
  );
};

export default History;