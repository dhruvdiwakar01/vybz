const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        requried:[true, "Username is requried"],
        unique:[true, "Uername must be unique"]
    },
    email:{
        type: String,
        requried:[true, "Email is requried"],
        unique:[true, "Email must be unique"]
    },
    password:{
        type: String,
        requried:[true, "Password is requried"],
        select: false
    }
})


const userModel = mongoose.model("user", userSchema)
module.exports = userModel