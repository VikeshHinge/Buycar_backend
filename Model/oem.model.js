const mongoose = require("mongoose");

const oemSchema = mongoose.Schema({
    engine:{type:String,required:true},
    model:{type:String,required:true},
    fuel:{type:Array,required:true},
    year:{type:Number,required:true},
    power:{type:String,required:true},
    mileage:{type:Number,required:true},
    list_price:{type:Number,required:true},
    colors:{type:Array,required:true},
    max_speed:{type:Number,required:true},
    img:{type:String,required:true},
    bootspace:{type:String}
});

const OEMmodel = mongoose.model('oemmodel',oemSchema)

module.exports={OEMmodel}

