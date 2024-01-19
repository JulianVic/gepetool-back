import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
//dotenv
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server,
    {
        cors: {
            origin: process.env.CLIENT_URL,
        }
    }
)

io.on('connection', (socket) => {
    socket.on('msg', (body) => {    
        socket.broadcast.emit('msg', {
            body,
            from: socket.id.slice(6)
        })
        })
})

const PORT = process.env.SERVER_PORT || 4000

server.listen(PORT, () => {
    console.log('Server running on port '+PORT )
}
)
