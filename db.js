const mongoose = require('mongoose')

const mongoURI ="mongodb+srv://prakharnamdeo15:prakharnamdeo15@cluster0.0lwjjui.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async() =>{
    await mongoose.connect(mongoURI)
    console.log("connected to mongo")
}

module.exports = connectToMongo;
