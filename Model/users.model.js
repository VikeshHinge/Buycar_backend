const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    name:{type:String,required:true},
    avatar:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    location:{type:String,required:true},
    contact:{type:Number,required:true},
    type:{type:String}
})

const usersModel = mongoose.model('users',usersSchema)
module.exports ={usersModel}