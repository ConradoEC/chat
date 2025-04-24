const mongodb = require("mongodb")
const mongoose = require("mongoose")

const connectiondb = async() => {
    await mongoose.connect(`mongodb+srv://erickconrado317:123321@testedechatws.arahusq.mongodb.net/?retryWrites=true&w=majority&appName=testeDeChatWS`)
    .then(() => {
        console.log("DB connected")
    })
    .catch((error) => {
        console.log(error)
    })
}

module.exports = connectiondb