const express = require("express");
const UserRouter = new express.Router();
const User = require("../models/users.js")

UserRouter.post("/users", async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save() // we get a promise back from this
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error); // It was a bad request if you weren't able to create it. 
    }
    
})


UserRouter.get("/users", async (req,res) => {

    try {
        const users = await User.find({})
        res.send(users);
    } catch (error) {
        res.status(500).send(error)
    }
    
    
})


UserRouter.get("/users/:id", async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id);
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
    
})

UserRouter.patch("/users/:id", async (req, res) => {
    //get valid keys
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidUpdate){
        return res.status(400).send("Invalid Updates!")
    }

    try {
        const user = await User.findById(req.params.id); // get the user
        //update this user
        updates.forEach((update) => {
            user[update] = req.body[update];
        })

        //now save the user
        await user.save();
        

        //const user =  await User.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true})
        if(!user){
            return res.send(404).send()
        }
        res.send(user);
    } catch (error) {
        res.status(400).send()
    }



})



UserRouter.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user)
        {
            return res.status(404);
        }

        res.send(user)
        
    } catch (error) {
        res.status(500).send(error);
    }
})


module.exports = UserRouter;
