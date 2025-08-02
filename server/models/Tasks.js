const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
    },
  description: { type: String, required: true },
  dueDate: { type: String },
  priority: { type: String, default: 'medium' },
  category: { type: String, default: 'General' },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
