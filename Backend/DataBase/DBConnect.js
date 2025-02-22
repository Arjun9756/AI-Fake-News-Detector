const mongoose = require('mongoose')
function connectDB(){
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully")
    }
    catch(error){
        console.log("MongoDB Connection Failed")
    }
}
connectDB()
module.exports = connectDB