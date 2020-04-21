const express = require("express");
const taskRouter = new express.Router();
const Task = require("../models/tasks");


taskRouter.patch("/tasks/:id", async (req, res) => {
    // allowed updates
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send("Invalid Update");
    }
    try {

        const updatedTask = await Task.findById(req.params.id);

        updates.forEach((update) => {
            updatedTask[update] = req.body[update]
        })

        await updatedTask.save()
        //const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!updatedTask){
            return res.status(404).send()
        }
        res.send(updatedTask);
    } catch (error) {
        res.status(400).send(error)
    }
})

taskRouter.post("/tasks", async (req, res) => {
    const newTask = new Task(req.body)

    try {
        await newTask.save();
        res.status(201).send("It was succesfull")
    } catch (error) {
        res.status(400).send(error)
    }
    
})

taskRouter.get("/tasks", async (req,res) => {
    //get all tasks

    try {
        const task = await Task.find();
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
    
})

taskRouter.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error)
    }
})


taskRouter.delete("/tasks/:id", async (req, res) => {
    try {

        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            res.status(404).send()
        }

        res.send(task)
        
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = taskRouter;