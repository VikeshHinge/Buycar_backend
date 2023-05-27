const express = require('express');
const {OEMmodel} = require('../Model/oem.model.js');
const oemRouter = express.Router();

oemRouter.get('/',async(req,res)=>{
    let query = req.query
    console.log(query)
    try{
        const users = await OEMmodel.find(query)
        res.send(users)
    }
    catch(err){
        res.send({"err":err})
    }
})

//Search__________________________
oemRouter.get('/search/:key',async(req,res)=>{
     const number = req.params.key.match(/\d+/g)
     
     console.log(req.params.key,number)
    try{
     let data = await OEMmodel.find({
         "$or":[
             {'model':{$regex:req.params.key,$options:'i'}},
             {'year':number},
         ]
     })
     res.send(data)
    }catch(err){
     res.send({'msg':err.message})
    }
 })


oemRouter.post('/addmodels',async(req,res)=>{
    let newdata = req.body;
    try{
        let data = new OEMmodel(newdata)
        await data.save()
        res.send({msg:'Post Success !'})
    }
    catch(err){
        res.send({"err":err})
    }
})


module.exports = {oemRouter}