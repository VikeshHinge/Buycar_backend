const express = require('express')
const {usersModel} = require('../Model/users.model.js')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//Register_________________________________________
userRouter.post('/register',async(req,res)=>{
    let {name,email,password,location,contact,avatar}=req.body
    console.log(req.body)
    try{
        let check = await usersModel.find({email:email})
         if(check.length>0){
            res.send({msg:"user already exist with this ID"})
        }
        else{
            bcrypt.hash(password, 3, async(err, hash) => {
               if(err){
                res.send({'msg':err.message},'user not able to register')
               }else{
                let user = new usersModel({name,email,password:hash,location,contact,avatar})
                await user.save()
                res.send({'msg':'user register sucess !!!'})
               }
            })
        }
    }catch(err){
        res.send({'msg':err.message})
    }
})



// Login ___________________________________________________
userRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
   try{
      let user = await usersModel.find({email})
       if(user.length>0){
        bcrypt.compare(password, user[0].password, (err, result)=>{
            if(result){
                let token = jwt.sign({ userId:user[0]._id }, 'buycars');
                res.send({msg:'User Login Sucess!','name':user[0].name,"token":token})
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


module.exports = {userRouter}