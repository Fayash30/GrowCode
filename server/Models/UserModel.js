const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },

    user_name :{
        type:String,
        required: true,
        unique : true,
    },

    email : {
        type:String,
        required : true,
        unique : true,
    },
    password:{
        type:String,
        required:true,
    }
})

const User = mongoose.model("User_Account",UserSchema);

module.exports = User;