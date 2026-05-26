import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { KanbanBoard } from './components/KanbanBoard';
import { StatsStrip } from './components/StatsStrip';
import { CreateTicketModal } from './components/CreateTicketModal';
import { PlusCircle } from 'lucide-react';

// Use environment variable for backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const [ticketsRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/tickets`),
        axios.get(`${API_BASE_URL}/tickets/stats`)
      ]);
      setTickets(ticketsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to fetch tickets');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleTicketCreated = (newTicket) => {
    setTickets([newTicket, ...tickets]);
    fetchTickets(); // Refresh stats
  };

  const handleTicketUpdate = async (id, updates) => {
    try {
      const res = await axios.patch(`${API_BASE_URL}/tickets/${id}`, updates);
      setTickets(tickets.map(t => t._id === id ? res.data : t));
      fetchTickets(); // Refresh stats
      toast.success('Ticket updated');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update ticket');
      // Revert optimism if needed (here we don't optimistically update)
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">DeskFlow</h1>
            <p className="text-slate-500">Support Ticket Management</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
          >
            <PlusCircle size={20} />
            New Ticket
          </button>
        </header>

        {stats && <StatsStrip stats={stats} />}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <KanbanBoard 
            tickets={tickets} 
            onTicketUpdate={handleTicketUpdate} 
          />
        )}
      </div>

      <CreateTicketModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onCreated={handleTicketCreated}
        apiUrl={API_BASE_URL}
      />
    </div>
  );
}

export default App;
