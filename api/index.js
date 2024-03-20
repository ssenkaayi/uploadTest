import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import authRoute from './routes/authRoute.js'
import employeRoute from './routes/employeRoute.js'
import tripRoute from './routes/tripRoute.js'
import supplierRoute from './routes/supplierRoute.js'
import clientRoute from './routes/clientRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import deliveryRoute from './routes/deliveryRoute.js'
import { errorHandler } from './errorHandler.js'
import cookieParser from 'cookie-parser';
import path from 'path'


dotenv.config();

const PORT = 4000 ||process.env.PORT 

// connect to db and start server

const connect = async()=>{
    
    try{

        await mongoose.connect(process.env.DB_URL)
        console.log('connected to db')

        startServer()
        

    }catch(error){
        console.log('error starting connecting to the database')
    }
    
}
connect()

const __dirname = path.resolve();

const server = express();


// middle wares
server.use(cookieParser());
server.use(express.json())
server.use('/api/auth',authRoute)
server.use('/api/employe',employeRoute)
server.use('/api/trip',tripRoute)
server.use('/api/supplier',supplierRoute)
server.use('/api/client',clientRoute)
server.use('/api/payment',paymentRoute)
server.use('/api/delivery',deliveryRoute)
server.use(bodyParser.json())



server.use(express.static(path.join(__dirname,'/client/dist' )))

server.get('*',(resq, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist' ,'index.html'))
})


// error handler middle ware

// server.use(errorHandler)
//creating an error Handler
server.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode:statusCode,
        message:message,
    });
})

const startServer= ()=>{
    server.listen(PORT,()=>{
        console.log(`sever is running on port ${PORT}`)
    })
}









