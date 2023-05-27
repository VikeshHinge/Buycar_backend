const mongoose = require('mongoose')

const dealersSchema = mongoose.Schema({
    name:{type:String,required:true},
    avatar:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    location:{type:String,required:true},
    contact:{type:Number,required:true},
    type:{type:String}
})

const dealersModel = mongoose.model('dealers',dealersSchema)
module.exports ={dealersModel}