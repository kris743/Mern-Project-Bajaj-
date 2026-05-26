import { useState } from 'react';
import { TicketCard } from './TicketCard';

const COLUMNS = [
  { id: 'open', title: 'Open', bg: 'bg-slate-100' },
  { id: 'in_progress', title: 'In Progress', bg: 'bg-blue-50' },
  { id: 'resolved', title: 'Resolved', bg: 'bg-green-50' },
  { id: 'closed', title: 'Closed', bg: 'bg-slate-200' }
];

export function KanbanBoard({ tickets, onTicketUpdate }) {
  const getTicketsByStatus = (status) => {
    return tickets.filter(t => t.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {COLUMNS.map(col => (
        <div key={col.id} className={`rounded-xl p-4 min-h-[500px] flex flex-col gap-3 ${col.bg}`}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-slate-800">{col.title}</h2>
            <span className="bg-white/60 text-slate-600 text-xs py-1 px-2 rounded-full font-medium shadow-sm">
              {getTicketsByStatus(col.id).length}
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3">
            {getTicketsByStatus(col.id).map(ticket => (
              <TicketCard 
                key={ticket._id} 
                ticket={ticket} 
                onUpdate={(updates) => onTicketUpdate(ticket._id, updates)} 
              />
            ))}
            
            {getTicketsByStatus(col.id).length === 0 && (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-300/50 rounded-lg text-slate-400 text-sm py-8">
                No tickets
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
