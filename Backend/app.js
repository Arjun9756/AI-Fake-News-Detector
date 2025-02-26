const express = require('express')
const app = express()
const dotenv = require('dotenv')
const DataExtractor = require('./Routes/DataExtractor')
const cors = require('cors')
const db = require('./DataBase/DBConnect')
const Login = require('./Routes/Login')
const Signup = require('./Routes/Signup')
const AINewsDetect = require('./Routes/AINewsDetect')
const SearchAPI = require('./Routes/SearchAPI')

dotenv.config()
app.use(express.json())

app.use(cors())
app.use('/login' , Login)

app.use('/ai-news-detect' , AINewsDetect)

app.use('/signup' , Signup)
app.use('/data' , DataExtractor)
app.use('/search' , SearchAPI)


app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})