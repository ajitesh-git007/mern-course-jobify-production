import 'express-async-errors'
import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

// db and authenticateUser
import connectDB from './db/connect.js'


// router
import authRouter from './routes/authRouter.js'
import jobsRouter from './routes/jobsRouter.js'


// middle ware
import NotFoundMiddleware from './middleware/not-found.js'
import errorHandleMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())

app.use(express.static(path.resolve(__dirname, './client/build')))

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

const port = process.env.PORT || 5000


app.use('/api/v1/auth', authRouter)

app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });


app.get('/', (req, res)=>{
    // console.log(`Server is listening on port ${port}...`)
    res.send(`Welcome`)
})

app.get('/api/v1', (req, res)=>{
    // console.log(`Server is listening on port ${port}...`)
    res.send({msg: 'chakki'})
})

app.use(NotFoundMiddleware)
app.use(errorHandleMiddleware)

// 


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)

        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}...`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()
