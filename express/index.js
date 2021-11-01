const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)

        // emit message to all clients except current socket
        socket.broadcast.emit('chat message', msg)
    })
})

http.listen(3000, () => {
    console.log('Listing on :3000')
})