export const handleJoinChannel = (socket, data) => {
  socket.join(data.channelID);
};

export const handleSendMessage = (socket, data, io) => {
  io.to(data.channelID).emit("receiveMessage", {
    from: data.sender,
    body: data.body,
    isAuthor: data.isAuthor,
  });
};

export const handleLeaveChannel = (socket, data) => {
  socket.leave(data.channelID);
};
