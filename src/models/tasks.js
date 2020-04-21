const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    
})

taskSchema.pre('save', async function(next){
    next()
})


const Task = mongoose.model("task", taskSchema)


module.exports = Task
