const mongodb = require("mongodb")
const mongoose = require("mongoose")

const connectiondb = async() => {
    console.log(process.env.DB_USERNAME)
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@testedechatws.arahusq.mongodb.net/?retryWrites=true&w=majority&appName=testeDeChatWS`)
    .then(() => {
        console.log("DB connected")
    })
    .catch((error) => {
        console.log(error)
    })
}

module.exports = connectiondb