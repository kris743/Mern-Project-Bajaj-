import { Clock, AlertCircle } from 'lucide-react';

const priorityColors = {
  low: 'bg-slate-100 text-slate-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700'
};

const allowedTransitions = {
  'open': ['in_progress'],
  'in_progress': ['resolved'],
  'resolved': ['in_progress', 'closed'],
  'closed': ['resolved']
};

const statusLabels = {
  'open': 'Open',
  'in_progress': 'In Progress',
  'resolved': 'Resolve',
  'closed': 'Close'
};

export function TicketCard({ ticket, onUpdate }) {
  const allowedNext = allowedTransitions[ticket.status] || [];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow group relative">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h3 className="font-semibold text-slate-800 text-sm line-clamp-2" title={ticket.subject}>
          {ticket.subject}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium uppercase tracking-wide shrink-0 ${priorityColors[ticket.priority]}`}>
          {ticket.priority}
        </span>
      </div>
      
      <p className="text-slate-500 text-xs mb-4 line-clamp-2" title={ticket.description}>
        {ticket.description}
      </p>

      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
        <div className="flex items-center gap-1" title="Age in minutes">
          <Clock size={14} />
          {ticket.ageMinutes}m
        </div>
        {ticket.slaBreached && (
          <div className="flex items-center gap-1 text-red-600 font-medium" title="SLA Breached">
            <AlertCircle size={14} />
            Breached
          </div>
        )}
      </div>

      {allowedNext.length > 0 && (
        <div className="pt-3 border-t border-slate-100 flex gap-2 flex-wrap">
          {allowedNext.map(status => (
            <button
              key={status}
              onClick={() => onUpdate({ status })}
              className="text-xs px-3 py-1.5 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-medium transition-colors"
            >
              Move to {statusLabels[status] || status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
