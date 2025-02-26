const mongoose = require('mongoose')
function connectDB(){
    try{
        mongoose.connect("mongodb+srv://Arjun:Arjun777@cluster0.o4vco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("MongoDB Connected Successfully")
    }
    catch(error){
        console.log("MongoDB Connection Failed")
    }
}
connectDB()
module.exports = connectDB