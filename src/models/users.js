const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("user", 
{
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value))
            {
                throw new Error("Not a valid email")
            }
        }

    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(value.toLowerCase().includes("password"))
            {
                throw new Error("Password cannont contain password")
            }
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0)
            {
                throw new Error("Age cannot be negative")
            }
        }
    }
    
})


module.exports = User
