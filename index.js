import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server,
    {
        cors: {
            origin: 'http://localhost:5173'
        }
    }
)

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('msg', (body) => {    
        socket.broadcast.emit('msg', {
            body,
            from: socket.id.slice(6)
        })
        })
})

server.listen(4000, () => {
    console.log('Server running on port 4000')
}
)
