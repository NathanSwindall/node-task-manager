const mongoose = require("mongoose");


const mongooseUrl = "mongodb://127.0.0.1:27017/task-manager-api"

mongoose.connect(mongooseUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false})








/*
challenges 

Goal: Add validation and sanitization to task

1) Trim the description and make it required
2) Make completed optional and default it to false
3) Test your work with and without errors


Goal: Add a password field to User

1) Setup the field as a required string
2) Ensure the length is greater than 6
3) Trim the password
4) Ensure that password doesn't contain "password"
5) Test your work!




old code

const myTask = new Task({
    description: "Four hours of Udemy everyday",
})

myTask.save().then((result)=> {
    console.log(result);
}).catch((error) => {
    console.log(error)
})



// create a task model
const Task = mongoose.model("task", 
{
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.includes("password"))
            {
                throw new Error("The password cannot include password")
            }
        }


    }
})
// create the model type
const User = mongoose.model('user', {
    name: {
        type: String
    },
    age: {
        type: Number
    }

})


// Now create an instance of that model
const me = new User({
    name: "Nathan",
    age: 28
})

me.save().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})





*/