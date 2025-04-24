const mongoose = require('mongoose')

const messagesSchema = new mongoose.Schema({
    roomsName: {
        type: String,
        allowNull: false
    },
    messages: [{}]

    // messages: [{
    //     type: Map,
    //     of: mongoose.Schema.Types.Mixed
    // }]

    // messages: [{
    //     sender: String,
    //     content: String,
    //     timestamp: {
    //         type: Date,
    //         default: Date.now
    //     }
    // }]
})

const messagesModel = mongoose.model('messages', messagesSchema)

module.exports = messagesModel

