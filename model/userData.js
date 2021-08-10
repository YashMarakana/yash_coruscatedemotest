const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    id : {
        type: Number
    },
    
    firstName : {
        type: String
    },
    
    lastName : {
        type: String
    },
    email : {
        type: String
    },
    Amount: {
        type: String
    },
    Date: {
        type : Date
    }
})

const User = mongoose.model('userDetail',userSchema);
module.exports = User