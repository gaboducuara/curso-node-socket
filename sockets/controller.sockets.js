const TicketControl = require('../models/ticket-control');


const ticketControls = new TicketControl();

const socketController = (socket) => {
  /// Todo esto se dispara cuando un nuevo cliente se conecta
  socket.emit('ultimo-ticket', ticketControls.ultimo)
  socket.emit('estado-actual', ticketControls.ultimos4)
  socket.emit('tickets-pendientes', ticketControls.tickets.length)

  socket.on('siguiente-ticket' , ( payload , callback ) => {

    const siguiente = ticketControls.next();
    callback( siguiente )
    socket.broadcast.emit('tickets-pendientes' , ticketControls.tickets.length)
  })

  socket.on('atender-ticket' , ({ escritorio } , callback ) => {
    // console.log( payload)
    if (!escritorio) {
      return callback({
        ok:false, 
        msg: 'EL escritorio es obligatorio'
      });
    }

    const ticket = ticketControls.atenderTicket( escritorio)

    //Notificar cambios en los ultimos 4 
    socket.broadcast.emit('estado-actual', ticketControls.ultimos4)
    socket.emit('tickets-pendientes' , ticketControls.tickets.length)
    socket.broadcast.emit('tickets-pendientes' , ticketControls.tickets.length)

    
    if (!ticket ) {
      callback({
        ok: false,
        msg: 'Ya no hay tickets pendientes'
      })
    } else {
      callback({
        ok: true,
        ticket
      })
    }
  })
};

module.exports = { 
  socketController,
};