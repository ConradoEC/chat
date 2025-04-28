const express = require('express')
const app = express()
const PORT = 3000
const { Server } = require('socket.io')
const ejs = require('ejs')
const path = require('path')
require('dotenv').config()

// BD
const connectiondb = require('./connection/connectiondb.js')
connectiondb()

// Aqui foi definido o o servidor com base no protocolo HTTP
const httpServer = require("http").createServer(app)
// E aqui o protocolo Web socket
const io = new Server(httpServer)
module.exports = io

app.set('view engine', 'ejs')
app.set('views', 'visoes')
app.use(express.json())
app.use(express.static('public'));

const routes = require('./routes/routes')
app.use(routes)


var allMessages = []

// Aqui, toda vez que um cliente se conectar ao socket (ao protocolo), vai ser retornado uma mensagem + o id da pessoa que se conectou
// io.on('connection', (socket) => {
//     // console.log(socket.client.sockets)
        
//     socket.on('disconnect', () => {
//         // console.log('Cliente desconectado');
//     });
    
//     socket.on('sendMessage', data => {
//         allMessages.push(data)
//         console.log(allMessages)
        
//         // A nova mensagem é enviada para todos os usuários, menos para o próprio usuário que enviou a mensagem
//         // socket.broadcast.emit("renderMessages", data)

//         // Este tipo de envio faz com que todos os usuários na mesma sala recebam as mensagens inclusive, o usuário que está linkado ao Socket nesse momento
//         io.to(data.class).emit('sendMessage', data)
//     })
    
//     socket.on('joinClass', data => {
        
//         var allRooms = Array.from(socket.adapter.rooms.entries())
//         console.log(allRooms)
//         allRooms.forEach(el => {
//             console.log("IDs que estão em cada sala: ")
//             el[1].values().forEach(el2 => {
//                 console.log(el2)
//                 if(el2 == socket.id) {
//                     socket.leave(el[0])
//                 }
//             })
//         })

//         var thatMessage = {
//             "username": "Sistema",
//             "message": `O usuário ${socket.id} acabou de entrar na sala.`,
//             "class": `${data.class}`,
//             "time": Date()
//         }
        
//         socket.join(data.class)
//         console.log(socket.adapter.rooms.entries());
//         console.log(allMessages)
        
//         allMessagesFromThisClass = allMessages.filter(el => el.class == data.class)
//         console.log(allMessagesFromThisClass)
//         console.log('\n')
        
//         // Agora esse modo permite que todos na sala recebam a mensagem, incluindo o próprio remetente
//         // io.to(data.class).emit('allMessagesFromThisClass', allMessagesFromThisClass)
        
//         // Aqui eu estou enviando as antigas mensagens apenas para o usuário que acabou de logar
//         socket.emit('allMessagesFromThisClass', allMessagesFromThisClass)

//         io.to(data.class).emit('newUserLogin', thatMessage)
        
//         allMessages.push(thatMessage)
//     })
// })


// Ao invés de usar "app.listen" que seria o normal, nesse caso se usa o "httpServer", porque o Web Socket foi gerado usando como base o servidor baseado em HTTP, então se eu não ativo esse servidor baseado em HTTP, eu não ativo o Web Socket  
httpServer.listen(PORT, () => {
    console.log("Server on")
})