import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

export function CreateTicketModal({ isOpen, onClose, onCreated, apiUrl }) {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    customerEmail: '',
    priority: 'low'
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/tickets`, formData);
      onCreated(res.data);
      toast.success('Ticket created successfully');
      onClose();
      setFormData({ subject: '', description: '', customerEmail: '', priority: 'low' });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h2 className="font-semibold text-lg text-slate-800">Create Support Ticket</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
            <input 
              required
              type="text"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Customer Email</label>
            <input 
              required
              type="email"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.customerEmail}
              onChange={e => setFormData({...formData, customerEmail: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <select 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              value={formData.priority}
              onChange={e => setFormData({...formData, priority: e.target.value})}
            >
              <option value="low">Low (72h SLA)</option>
              <option value="medium">Medium (24h SLA)</option>
              <option value="high">High (4h SLA)</option>
              <option value="urgent">Urgent (1h SLA)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea 
              required
              rows={4}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div className="pt-4 flex justify-end gap-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
