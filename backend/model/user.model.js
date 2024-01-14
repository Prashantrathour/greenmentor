const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        trim: true,
        
       
    },
    name:{
        type: String,
        required: true,
        trim: true,  
    },
   
    password: {
        type: String,
        required: true,
        trim: true
       
    }, 
}, {
    timestamps: true
  });



const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel
};
