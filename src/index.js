const express = require("express");
require("./db/mongoose.js") // start the mongoose connection
const jwt = require("jsonwebtoken");


/*****************************
 * Get the different Routes
 ****************************/
const userRouter = require("./routers/users")
const testRouter = require("./routers/test");
const taskRouter = require("./routers/tasks")


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
app.use(userRouter)
app.use(testRouter)

//
// tasks endpoint
//
app.use(taskRouter)




/**********************************************
 * Setup the server on the port
 *********************************************/
app.listen(port, () => {
    console.log("The server is running now on port " + port )
})


/*
 Goal: Have signup back auth token

 1. Generate a token for the saved user
 2. Send back the token and the user
 3. Create a new user from Poastman and confirm the token is there



*/