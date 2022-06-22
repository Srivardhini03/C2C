const mongoose = require('mongoose');
const loanSchema = require('./loan');
//const multer = require('multer');
//const path = require('path');

//const AVATAR_PATH = path.join('/uploads/users/avatars')

const userSchema = new mongoose.Schema ({
          email: {type:String,unique: true , sparse: true},
          name :{type: String },
          password: {type:String},
          googleId: String,
          bankDetails:{name:String,accNo:String,ifsc:String,email:String,num:String},
          //documets: String,
        loanApplied: [loanSchema],
        loanGiven: [loanSchema]
        });

const User = mongoose.model('User',userSchema);
module.exports = User;
