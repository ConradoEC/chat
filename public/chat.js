// Aqui está sendo feita a conexão do Socket do front-end com o do back-end
// Esse "io()" ele vem do link do Socket que foi colocado no html

const username = document.getElementById("username")
const message = document.getElementById("message")
const chatForm = document.getElementById("chatForm")
const contentMessages = document.getElementById('contentMessages')
const content_contentMessage = document.getElementById('content_contentMessage')
const thatClass = document.getElementById("class")
var socket = io.connect("https://chat-test-53d3.up.railway.app")

var clientData = {
    "username": '',
    "userId": '',
    "message": '',
    "class": '',
    "time": ''
}

function allMessages(message) {
    const contentDiv = document.createElement('div')
    const div = document.createElement("div")
    const thisUsername = document.createElement('p')
    const thisMessage = document.createElement('p')
    thisUsername.innerText = `${message.username}`
    thisMessage.innerText = `${message.message}`

    div.appendChild(thisUsername)
    div.appendChild(thisMessage)
    contentDiv.appendChild(div)

    if(message.username == username.value) {
        Object.assign(thisUsername.style, {
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'right'
        })

        Object.assign(thisMessage.style, {
            fontSize: '16px',
            textAlign: 'left',
            maxWidth: '30vw'
        })

        Object.assign(div.style, {
            maxWidth: '70%',
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            overflowWrap: 'break-word',
            backgroundColor: 'rgb(99, 175, 68)',
            padding: '10px',
            borderRadius: '10px',
            borderTopRightRadius: '0px'
        })

        Object.assign(contentDiv.style, {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            justifyContent: 'end'
        })

        contentMessages.append(contentDiv)
    }
    else {
        Object.assign(thisUsername.style, {
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'left'
        })

        Object.assign(thisMessage.style, {
            fontSize: '16px',
            textAlign: 'left'
        })

        Object.assign(div.style, {
            maxWidth: '70%',
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            overflowWrap: 'break-word',
            backgroundColor: 'rgb(99, 175, 68)',
            padding: '10px',
            borderRadius: '10px',
            borderTopLeftRadius: '0px'
        })

        Object.assign(contentDiv.style, {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            justifyContent: 'baseline'
        })

        contentMessages.append(contentDiv)
    }
}

username.addEventListener('change', () => {
    clientData.username = username.value
})

socket.on('yourOwnChat', data => {
    thatClass.value = data.userId
    username.value = data.userId
    clientData = {
        "username": data.userId,
        "userId": data.userId,
        "message": data.message,
        "class": data.class,
        "time": data.time
    }
    allMessages(data)
})

socket.on('receiveMessage', async(data) => {
    await allMessages(data)
    content_contentMessage.scrollTop = content_contentMessage.scrollHeight
})

chatForm.addEventListener('submit', async(event) => {
    event.preventDefault() 

    if(username.value != '' && thatClass.value != '') {
        if(message.value == '') {
            if(thatClass.value != clientData.class) {
                clientData.class = thatClass.value
                socket.emit('joinClass', clientData)
                contentMessages.innerHTML = ''
            }
        }
        else {
            clientData.message = message.value
            socket.emit('sendMessage', clientData)
            message.value = ''
        }
    }
})

socket.on('newRoom', data => {    
    data.forEach(el => {
        allMessages(el)
    })
})

socket.on('newUserRoom', data => {
    allMessages(data)
})



// socket.on("renderOldMessages", data => {
//     data.forEach(el => {
//         allMessages(el)
//     })
// })

// socket.on("sendMessage", data => {
//     allMessages(data)
// })

// socket.on('allMessagesFromThisClass', data => {
//     data.forEach(el => {
//         allMessages(el)
//     })
//     console.log(data)
// })

// socket.on('newUserLogin', data => {
//     allMessages(data)
// })