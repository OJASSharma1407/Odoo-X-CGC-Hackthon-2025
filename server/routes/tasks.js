const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Task = require('../models/Tasks');

// ADD TASK (secure)
router.post('/add-task', fetchuser, async (req, res) => {
  try {
    const { description, dueDate, priority, category, completed } = req.body;

    if (!description) return res.status(400).json({ error: 'Task description is required' });

    const newTask = new Task({
      user: req.user.id,
      description,
      dueDate,
      priority,
      category,
      completed
    });

    const saved = await newTask.save();
    res.json(saved);
  } catch (err) {
    console.error('Error in add-task:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET ALL TASKS FOR LOGGED-IN USER
router.get('/get-task', fetchuser, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Error in get-task:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE
router.delete('/delete-task/:id', fetchuser, async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id, user: req.user.id });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// COMPLETE
router.put('/complete-task/:id', fetchuser, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { completed: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('Complete error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
