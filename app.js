const express = require('express');
const mysql = require('mysql2');
const contactsRoutes = require('./routes/contactsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/contacts', contactsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});