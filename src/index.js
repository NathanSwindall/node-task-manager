const express = require("express");
require("./db/mongoose.js") // start the mongoose connection

/*************************
 * Get our mongoose model constructors. 
 ***********************/
const User = require("./models/users")
const Task = require("./models/tasks")


/*******************************
 * Setup the port and the express app
 ****************************/
const port = process.env.PORT || 3001
const app = express();

app.use(express.json())  // makes it so it already parses incoming json files



/**********************************************************************************************
 * Setup our different routes
 ************************************************************************************************/



//
// Users endpoint
//

app.post("/users", async (req, res) => {
    const newUser = new User(req.body);

    try {
        await newUser.save() // we get a promise back from this
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error); // It was a bad request if you weren't able to create it. 
    }
    
})


app.get("/users", async (req,res) => {

    try {
        const users = await User.find({})
        res.send(users);
    } catch (error) {
        res.status(500).send(error)
    }
    
    
})


app.get("/users/:id", async (req, res) => {
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

app.patch("/users/:id", async (req, res) => {
    //get valid keys
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidUpdate){
        return res.status(400).send("Invalid Updates!")
    }

    try {
        const user =  await User.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true})
        if(!user){
            return res.send(404).send()
        }
        res.send(user);
    } catch (error) {
        res.send(400).send()
    }



})



app.delete("/users/:id", async (req, res) => {
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


//
// tasks endpoint
//

app.patch("/tasks/:id", async (req, res) => {
    // allowed updates
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send("Invalid Update");
    }
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!updatedTask){
            return res.status(404).send()
        }
        res.send(updatedTask);
    } catch (error) {
        res.status(404).send(error)
    }
})

app.post("/tasks", async (req, res) => {
    const newTask = new Task(req.body)

    try {
        await newTask.save();
        res.status(201).send("It was succesfull")
    } catch (error) {
        res.status(400).send(error)
    }
    
})

app.get("/tasks", async (req,res) => {
    //get all tasks

    try {
        const task = await Task.find();
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
    
})

app.get("/tasks/:id", async (req, res) => {
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


app.delete("/tasks/:id", async (req, res) => {
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






/**********************************************
 * Setup the server on the port
 *********************************************/
app.listen(port, () => {
    console.log("The server is running now on port " + port )
})




