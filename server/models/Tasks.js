const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },completed: {
        type: Boolean,
        default: false
    },
    dueDate:{
        type:Date,
         default: null
    }
})

module.exports = mongoose.model('Notes',NotesSchema);