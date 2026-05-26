const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

const allowedTransitions = {
  'open': ['in_progress'],
  'in_progress': ['resolved'],
  'resolved': ['in_progress', 'closed'],
  'closed': ['resolved']
};

// GET /tickets
router.get('/', async (req, res) => {
  try {
    const { status, priority, breached } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    let tickets = await Ticket.find(filter).sort({ createdAt: -1 });
    
    if (breached === 'true') {
      tickets = tickets.filter(t => t.slaBreached);
    } else if (breached === 'false') {
      tickets = tickets.filter(t => !t.slaBreached);
    }
    
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /tickets/stats
router.get('/stats', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    
    const stats = {
      total: tickets.length,
      open: 0,
      in_progress: 0,
      resolved: 0,
      closed: 0,
      breached: 0
    };
    
    tickets.forEach(t => {
      if (stats[t.status] !== undefined) {
        stats[t.status]++;
      }
      if (t.slaBreached) {
        stats.breached++;
      }
    });
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /tickets/:id
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /tickets
router.post('/', async (req, res) => {
  try {
    const { subject, description, customerEmail, priority } = req.body;
    const ticket = new Ticket({ subject, description, customerEmail, priority });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /tickets/:id
router.patch('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    
    const { status, ...otherUpdates } = req.body;
    
    // Status transition validation
    if (status && status !== ticket.status) {
      const allowed = allowedTransitions[ticket.status];
      if (!allowed || !allowed.includes(status)) {
        return res.status(400).json({ 
          error: `Invalid status transition from ${ticket.status} to ${status}` 
        });
      }
      
      ticket.status = status;
      
      if (status === 'resolved') {
        ticket.resolvedAt = new Date();
      } else if (status === 'in_progress' && ticket.resolvedAt) {
        // Clear resolvedAt if moving back from resolved
        ticket.resolvedAt = undefined;
      }
    }
    
    // Apply other updates
    Object.keys(otherUpdates).forEach(key => {
      ticket[key] = otherUpdates[key];
    });
    
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /tickets/:id
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
