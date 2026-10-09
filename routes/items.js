const express = require('express');
const router = express.Router();
const path = require('path');
const Item = require('../models/Item');

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/auth/login');
};

// Dashboard - Serve the React App's index.html
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API: GET all habits for logged-in user (Returns JSON)
router.get('/api/items', isAuthenticated, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.session.userId });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// API: CREATE Habit (Returns JSON)
router.post('/api/items', isAuthenticated, async (req, res) => {
  try {
    const { name, frequency } = req.body;
    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + parseInt(frequency || 1));
    
    const newItem = new Item({
      userId: req.session.userId,
      name,
      frequency,
      nextDue: nextDueDate.toISOString().split('T')[0]
    });
    
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding habit' });
  }
});

// API: UPDATE Habit (Returns JSON)
router.put('/api/items/:id', isAuthenticated, async (req, res) => {
  try {
    const { name, frequency } = req.body;
    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + parseInt(frequency || 1));

    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.userId },
      { name, frequency, nextDue: nextDueDate.toISOString().split('T')[0] },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating habit' });
  }
});

// API: DELETE Habit (Returns JSON)
router.delete('/api/items/:id', isAuthenticated, async (req, res) => {
  try {
    await Item.findOneAndDelete({ _id: req.params.id, userId: req.session.userId });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting habit' });
  }
});

module.exports = router;