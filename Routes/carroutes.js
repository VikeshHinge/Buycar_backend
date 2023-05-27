const express = require('express');
const {Carmodel} = require('../Model/car.model.js');
const carRouter = express.Router();

carRouter.get('/',async(req,res)=>{
    let query = req.query
    try{
        const users = await Carmodel.find(query)
        res.send(users)
    }
    catch(err){
        res.send({"err":err})
    }
})


carRouter.post('/addcar',async(req,res)=>{
    let newdata = req.body;
    try{
        let data = new Carmodel(newdata)
        await data.save()
        res.send({msg:'Post Success !'})
    }
    catch(err){
        res.send({"err":err})
    }
})


module.exports = {carRouter}