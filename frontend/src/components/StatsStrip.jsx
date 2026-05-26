import { Clock, AlertTriangle, CheckCircle, Package } from 'lucide-react';

export function StatsStrip({ stats }) {
  const statItems = [
    { label: 'Total', value: stats.total, icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Open', value: stats.open, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'In Progress', value: stats.in_progress, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Breached', value: stats.breached, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {statItems.map((item) => (
        <div key={item.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className={`p-3 rounded-lg ${item.bg}`}>
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <p className="text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
