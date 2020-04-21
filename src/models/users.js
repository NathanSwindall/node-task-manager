const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");



// create a schema for your data
const userSchema = new mongoose.Schema({
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

userSchema.pre("save", async function(next) {
    const user = this

    if(user.isModified("password"))
    {
        user.password = await bcrypt.hash(user.password, 8); 
    }

    next()
})

const User = mongoose.model("user", userSchema) 


module.exports = User
