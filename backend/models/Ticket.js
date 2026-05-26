const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date
  }
});

const slaTargets = {
  urgent: 1 * 60, // 1 hour in minutes
  high: 4 * 60,
  medium: 24 * 60,
  low: 72 * 60
};

// Calculate derived fields
ticketSchema.virtual('ageMinutes').get(function() {
  const end = this.resolvedAt ? this.resolvedAt : new Date();
  const diffMs = end - this.createdAt;
  return Math.floor(diffMs / (1000 * 60));
});

ticketSchema.virtual('slaBreached').get(function() {
  const limitMinutes = slaTargets[this.priority];
  if (!limitMinutes) return false;
  return this.ageMinutes > limitMinutes;
});

// Ensure virtuals are included when converting to JSON
ticketSchema.set('toJSON', { virtuals: true });
ticketSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Ticket', ticketSchema);
