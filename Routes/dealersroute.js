const express = require('express')
const {dealersModel} = require('../Model/dealers.model.js')
const dealerRouter = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//Register_________________________________________
dealerRouter.post('/register',async(req,res)=>{
    let {name,email,password,location,contact}=req.body
    
    try{
        let check = await dealersModel.find({email:email})
         if(check.length>0){
            res.send({msg:"dealer already exist with this ID"})
        }
        else{
            bcrypt.hash(password, 3, async(err, hash) => {
               if(err){
                res.send({'msg':err.message},'user not able to register')
               }else{
                let user = new dealersModel({name,email,password:hash,location,contact})
                await user.save()
                res.send({'msg':'dealer register sucess !!!'})
               }
            })
        }
    }catch(err){
        res.send({'msg':err.message})
    }
})



// Login ___________________________________________________
dealerRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
   try{
      let user = await dealersModel.find({email})
       if(user.length>0){
        bcrypt.compare(password, user[0].password, (err, result)=>{
            if(result){
                let token = jwt.sign({ userId:user[0]._id }, 'buycars');
        
                res.send({msg:'dealer Login Sucess!','name':user[0].name,"token":token})
                }
                else if(err){
                  console.log('wrong pw')
                  res.send({'err':'wrong password'})
                }
        })
       }else{
        res.send({sug:'User not exist, Signup first'})
       }
   }catch(err){
        res.send({msg:err.message})
    }
})


module.exports = {dealerRouter}