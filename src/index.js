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
        res.status(400).send(error);
    }
    
})


app.get("/users", async (req,res) => {

    try {
        const users = await User.find({})
        res.send(users);
    } catch (error) {
        res.status(500).send()
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



//
// tasks endpoint
//

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




/**********************************************
 * Setup the server on the port
 *********************************************/
app.listen(port, () => {
    console.log("The server is running now on port " + port )
})





/*
    Challenges

    Goal: Use async/ await

    1. Create deleteTaskAndCount as an async function
        -Accept id of task to remove
    2. Use await to delete Task to remove
    3. Return the count
    4. Call the function and attach then/catch to log results
    5. Test your work

    Goal: Mess around with promis chaining

    1. Create promis3-chaining-2.js
    2. Load in mongoose and task model
    3. Remove a given task by id
    4. Get and print the total number of incomplete tasks
    5. Test your work

    
    Goal: Setup the trask reading endpoints

    1. Create an endpoint for fetching all tasks
    2. Crete an endpoint for fetching a task by its id
    3. Setup new requests in Postman and test your work


    Goal: Setup the task creation enpoint

    1) Create a separate file for the task model (load it into index.js)
    2) Create the task creation endpoint (handle success and error)
    3) Test the endpoint


    Old code

    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })

    newUser.save().then(() => {
        res.status(201).send("It wass succesful")
    }).catch((error) => {
        res.status(400).send(error);
    })
    old routes code

    //
// Users endpoint
//

app.post("/users", (req, res) => {
    const newUser = new User(req.body);
    newUser.save().then(() => {
        res.status(201).send("It wass succesful")
    }).catch((error) => {
        res.status(400).send(error);
    })
})


app.get("/users", (req,res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
    
})

app.get("/users/:id", (req, res) => {
    const _id = req.params.id
    User.findById(_id).then( (result) => {
        console.log(_id)
        if(!result) {
            return res.status(404).send()
        }

        res.send(result)
    }).catch((e) => {
        res.status(500).send()
    })
})



//
// tasks endpoint
//

app.post("/tasks", (req, res) => {
    const newTask = new Task(req.body)
    newTask.save().then(() => {
        res.status(201).send("It was successfull")
    }).catch((err) => {
        res.status(400).send(error)
    })
})

app.get("/tasks", (req,res) => {
    //get all tasks
    Task.find({}).then( (task) => {
        res.send(task) //if empty we get an empty array back
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get("/tasks/:id", (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then((task) => {
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})





*/