const express = require('express')
const routes = express.Router()
const mongoose = require('mongoose')
const messagesModel = require('../connection/dbModels/messagesModel.js')
const io = require('../app.js')

io.on('connection', (socket) => {
    console.log(socket.adapter.rooms.entries())

    serverData = {
        "username": 'Sistema',
        "userId": socket.id,
        "message": 'Bem vindo de volta ao seu chat!',
        "class": socket.id,
        "time": Date()
    }

    socket.emit('yourOwnChat', serverData)

    socket.on('disconnect', () => {
        console.log("Left the server")
    })

    socket.on('joinClass', async(data) => {
        try {
            console.log("primeiro")
            console.log(socket.adapter.rooms.entries())

            doubleForIn: 
            for(var el of socket.adapter.rooms.entries()) {
                for(var el2 of el[1].values()) {
                    const thatClass = await messagesModel.find({roomsName: data.class})
                    var thoseMessages = []
                    console.log(thatClass)
                    
                    if(thatClass == [] || thatClass == '') {
                        const newMessage = await messagesModel.create({
                            roomsName: data.class,
                            messages: []
                        })
                        console.log("OiOI")
                    }
                    else {
                        thoseMessages = thatClass[0].messages
                    }

                    console.log("saindo da sala: " + el[0])
                    socket.leave(el[0])
                    socket.join(data.class)
                    
                    console.log(thoseMessages)
                    socket.emit('newRoom', thoseMessages)

                    serverData.message = `O usuário ${data.username} acabou de entrar na sala`
                    serverData.username = 'Sistema'
                    serverData.userId = `0`
                    serverData.class = `${data.class}`
                    serverData.time = Date()

                    const updateMessage = await messagesModel.findOneAndUpdate({roomsName: data.class}, {$push: {messages: serverData}}, {new: true})
                    
                    io.to(data.class).emit('newUserRoom', serverData)
                    break doubleForIn
                }
            }
    
            console.log("segundo")
            console.log(socket.adapter.rooms.entries())
        }
        catch (e) {
            console.log(e)
        }

    })

    socket.on('sendMessage', async(data) => {
        await messagesModel.findOneAndUpdate({roomsName: data.class}, {$push: {messages: data}}, {new: true})
        io.to(data.class).emit('receiveMessage', data)
    })
})

routes.get('/', (req, res) => {
    res.render('index', {nomePagina: 'Início'})
    console.log('tmj')
})

routes.get('/chat', (req, res) => {
    res.render('chat', {nomePagina: "Chat"})
})

routes.get('/items', async(req, res) => {
})

routes.post('/newItem', async(req, res) => {
})

module.exports = routes