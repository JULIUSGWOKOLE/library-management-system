const pool = require('../database/db');

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single contact
const getContactById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new contact
const createContact = async (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO contacts (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)',
      [first_name, last_name, email, phone]
    );
    res.status(201).json({ id: result.insertId, first_name, last_name, email, phone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update contact
const updateContact = async (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?',
      [first_name, last_name, email, phone, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ id: req.params.id, first_name, last_name, email, phone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};