import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute.js'
import errorHandler from './errorHandler.js'




dotenv.config();

const server = express();


// middle wares
server.use(express.json())
server.use('/api/users',userRoute)
server.use(bodyParser.json())

// error handler middle ware

server.use(errorHandler)

const PORT = 5000 ||process.env.PORT 

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

const startServer= ()=>{


    server.listen(PORT,()=>{
        console.log(`sever is running on port ${PORT}`)
    })


}

// startServer()







