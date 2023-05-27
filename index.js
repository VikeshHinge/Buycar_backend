const express = require('express')
const cors = require('cors')
const cloudinary = require('cloudinary')
const connection = require('./Connection/db.js')
const {oemRouter} = require('./Routes/oemroutes.js')
const {inventoryRouter} = require('./Routes/inventoryroute.js')
const {dealerRouter} = require('./Routes/dealersroute.js')
const {userRouter} = require('./Routes/usersroute.js')
const {carRouter} = require('./Routes/carroutes.js')
require('dotenv').config();

const app = express()
app.use(cors({ origin: "*" }))
app.use(express.json())

app.use('/oem',oemRouter)
app.use('/inventory',inventoryRouter)

app.use('/dealer',dealerRouter)
app.use('/user',userRouter)
app.use('/car',carRouter)

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

process.on("uncaughtException", err=>{
    console.log(`Error : ${err.message}`);

    console.log(`Shutting Server Down due to uncaught Exception`);
    server.close(()=>{
        process.exit();
    })
})



const server =  app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log('DB is Connected')
     }
     catch(err){
         console.log(err)
     }
     console.log(`server running on ${process.env.port}`)
})

// process.on("unhandledRejection" , err=>{
//     console.log(`Error : ${err.message}`);
//     console.log(`Shutting Server Down due to unhandled Rejection`);

//     server.close(()=>{
//         process.exit();
//     })
// })