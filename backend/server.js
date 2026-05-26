require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tickets', ticketRoutes);

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/deskflow';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
