const express = require('express');
const {Inventorymodel} = require('../Model/inventory.model.js');
const inventoryRouter = express.Router();
const {dealerAuthantication} = require('../middleware/dealersMiddleware.js')
const cloudinary = require('cloudinary')


inventoryRouter.get('/deals',async(req,res)=>{
    let query = req.query
 
    if(query.list_price){
    if(query.list_price===500001){
        query.list_price={$gte:0,$lte:Number(query.list_price)}
    }
    else{
        query.list_price={ $gt: 500000 }
    }
    }

    if(query.mileage){
        query.mileage={$gte:0,$lte:Number(query.mileage)}
    }
   console.log(query)
    try{
        const data = await Inventorymodel.find(query)
        res.send(data)
    }
    catch(err){
        res.send({"err":err})
    }
})


inventoryRouter.get('/',dealerAuthantication,async(req,res)=>{
    let query = req.query
    console.log(req.body)
    try{
        const data = await Inventorymodel.find({user:req.body.user})
        res.send(data)
    }
    catch(err){
        res.send({"err":err})
    }
})

inventoryRouter.post('/addpost',dealerAuthantication,async(req,res)=>{
    let newdata = req.body;
    console.log(newdata)
    try{
        const uplodedimgs = [];
        for(const image of req.body.images){
            const result =  await cloudinary.v2.uploader.upload(image, 
                {
                    folder : "carimgs",
                    width : 300,
                    height: 350,
                     crop:'scale'
                });
                uplodedimgs.push({
                    public_id:result.public_id,
                    url:result.secure_url
                })
        }
    
        const newPopst = await Inventorymodel.create({
            ...newdata,
            images : uplodedimgs,
        })
        console.log(newPopst)
        res.send('data post sucess')
    }catch(e){
        res.send(e)
    }
})

inventoryRouter.patch('/updatepost/:id',async(req,res)=>{
    let id = req.params.id;
    try{
       let product = await Inventorymodel.findOneAndUpdate({_id:id},req.body)
        res.send({msg:'product get Updated!'})
    }catch(err){
        res.send({error:err.message})
    }
})


inventoryRouter.delete('/postdelete/:id',dealerAuthantication,async(req,res)=>{
    let id = req.params.id
    console.log(id)
    console.log(req.body)
    try{
        await Inventorymodel.findOneAndDelete({_id:id})
        res.send({msg:'product removed prom cart'})
    }catch(err){
        res.send({'err':err.message})
    }
})




module.exports={inventoryRouter}