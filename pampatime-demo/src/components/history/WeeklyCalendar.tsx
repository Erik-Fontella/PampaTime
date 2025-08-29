// src/components/history/WeeklyCalendar.tsx

import React, { useState } from 'react';
import useRealtimeCollection from '@/hooks/useRealtimeCollection';
import { TimetableDay } from '@/types/management';



const WeeklyCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const { data: weeklyData, loading, error } = useRealtimeCollection<TimetableDay>('timetables');
  // --- FIM NOVO ---
  
  const timeSlots = [
    '8:30', '9:30', '10:30', '11:30', '12:30', '13:30', '14:30',
    '15:30', '16:30', '17:30', '18:30', '19:30', '20:30', '21:30'
  ];

  const getEventColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 border-blue-300 text-blue-900',
      green: 'bg-green-100 border-green-300 text-green-900',
      purple: 'bg-purple-100 border-purple-300 text-purple-900',
      orange: 'bg-orange-100 border-orange-300 text-orange-900'
    };
    return colors[color] || colors.blue;
  };


  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-0">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
          </div>
        </div>
      
      </div>

      <div className="bg-white rounded shadow border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-100">
          <div className="p-4 text-sm font-medium text-gray-600 border-r border-gray-200">Hora</div>
          {weeklyData.map((day, i) => ( // <--- MUDANÇA AQUI: Usa dados dinâmicos
            <div key={i} className="p-4 text-center border-r border-gray-200 last:border-r-0">
              <div className="text-xs text-gray-500 uppercase tracking-wider">{day.dayName}</div>
              <div className="text-sm font-medium text-gray-900 mt-1">{day.date.split('/')[0]}</div>
            </div>
          ))}
        </div>

        <div className="relative">
          {timeSlots.map((time, timeIdx) => (
            <div key={timeIdx} className="grid grid-cols-8 border-b border-gray-200 min-h-[60px]">
              <div className="p-3 text-sm text-gray-500 border-r border-gray-200 bg-gray-100 flex items-start">
                {time}
              </div>
              {weeklyData.map((day, dayIdx) => { // <--- MUDANÇA AQUI: Usa dados dinâmicos
                const events = day.events.filter(event => event.time === time);
                return (
                  <div key={dayIdx} className="p-2 border-r border-gray-200 last:border-r-0">
                    {events.map((event) => (
                      <div key={event.id} className={`p-3 border rounded mb-2 text-sm font-medium ${getEventColorClass(event.color)}`}>
                        <div>{event.title}</div>
                        {event.location && (<div className="text-xs opacity-75">{event.location}</div>)}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;