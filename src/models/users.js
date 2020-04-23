const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



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
        unique: true,
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



/***************************************
 * Create a method that creates a token for a user
 ***************************************/
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, "This is my secret")
    return token
    
}


/**********************************
 * Check if there is a user with this email
 * Confirm password is correct
 ****************************/
userSchema.statics.findCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user;
}


// pre method for hashing the password
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
