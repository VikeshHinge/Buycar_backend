const express = require('express');
const {Inventorymodel} = require('../Model/inventory.model.js');
const inventoryRouter = express.Router();
const {dealerAuthantication} = require('../middleware/dealersMiddleware.js')
const cloudinary = require('cloudinary')


inventoryRouter.get('/deals',async(req,res)=>{
    let query = req.query

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

inventoryRouter.patch('/updatepost',dealerAuthantication,async(req,res)=>{
    let newdata = req.body;
    res.send('PATCH')
})


inventoryRouter.delete('/postdelete',dealerAuthantication,async(req,res)=>{
    let newdata = req.body;
    res.send('Delete')
    //http://localhost:4040/inventory/addpost
})


module.exports={inventoryRouter}