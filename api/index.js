import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import authRoute from './routes/authRoute.js'
import employeRoute from './routes/employeRoute.js'
import tripRoute from './routes/tripRoute.js'
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
server.use(bodyParser.json())



server.use(express.static(path.join(__dirname,'/client/dist' )))

server.get('*',(resq, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist' ,'index.html'))
})


// error handler middle ware

server.use(errorHandler)

const startServer= ()=>{
    server.listen(PORT,()=>{
        console.log(`sever is running on port ${PORT}`)
    })
}









