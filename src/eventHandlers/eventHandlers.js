export default function eventHandlers(socket) {
  socket.on("join-room", (room) => {
    socket.join(room);
    socket.emit("welcome", socket.id.slice(6));

    socket.to(room).broadcast.emit("user-connected", socket.id.slice(6));
  });

  socket.on("send-msg", msg => {
    const rooms = Object.keys(socket.rooms);
    rooms.slice(1).forEach(room => {
      io.to(room).emit('msg-received', msg);
    });
  })

  // socket.broadcast.emit("msg", {
  // body,
  // from: socket.id.slice(6),
  // });
  // });
}
