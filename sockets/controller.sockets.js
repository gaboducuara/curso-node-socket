const socketController = (socket) => {
  console.log("Cliente conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });
  // con este codigo se envian los mensajes
  //del server, y debe estar configurado en el socket
  socket.on("enviar-mensaje", (payload, callback) => {
    // this.io.emit('enviar-mensaje', payload)
    const id = 123456789;
    callback(id);

    socket.broadcast.emit("enviar-mensaje", payload);
  });
};

module.exports = { 
  socketController,
};
