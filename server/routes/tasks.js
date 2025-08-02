const express = require('express');
const router = express.Router();
const Tasks = require('../models/Tasks');


//---------Add-Notes-------//
router.post('/add-notes', async (req, res) => {
    try {
        const { description, dueDate } = req.body;

        const newNote = new Tasks({
            description,
            dueDate: dueDate || null
        });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(500).json({ error: 'Server error while creating note' });
    }
});

//---------Get-Tasks-------//
router.get('/get-Tasks', async (req, res) => {
    try {
        const notes = await Tasks.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching notes' });
    }
});

//---------Update-tasks-------//
router.put('/update-Tasks/:id',async(req,res)=>{
    try{
        const {description} = req.body;
        const task = await Tasks.findById(req.params.id);
        if(!task){
            res.status(400).send('taks Does not exists');
        }

        if(description){task.description = description};
        await task.save();
        res.status(200).json(task);
    }catch(err){
        res.status(500).json({ error: 'Server error while updating tasks' });
    }
})

//---------delete-tasks-------//
router.delete('/del-task/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully', note: deletedNote });
    } catch (err) {
        res.status(500).json({ error: 'Server error while deleting note' });
    }
});

//---------task-complete-------//
router.put('/api/tasks/complete/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Mark it as completed
        task.completed = true;
        await task.save();

        // Delete the completed task
        await Tasks.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Task completed and deleted' });

    } catch (err) {
        res.status(500).json({ error: 'Server error while completing task' });
    }
});

module.exports = router;
