const path = require('path')
const fs = require('fs')

class Ticket {
  constructor ( numero , table ) {
    this.numero = numero;
    this.table = table;
  }
}

class TicketControl {
  // Propiedades con las cuales se van a trabajar en el constructor
  // y como base para todo el proyecto.
  constructor() {
    //Ultimo ticket
    this.ultimo = 0;
    // Fecha del dia de hoy
    this.hoy = new Date().getDate();
    //manejo de tickets pendientes
    this.tickets = [];
    //ultimos 4 tickets que se mostraran en el front
    this.ultimos4 = [];
    // Inicializar la base de datos
    this.init();
  }

  get toJson() {
    // Se serealizan los tickets para luego guardarlos en la base de datos
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };
  }

  init() {
    const { ultimo, hoy, tickets, ultimos4 } = require("../database/data.json");
    if (hoy === this.hoy) {
      this.ultimo = ultimo,
      this.hoy = hoy , 
      this.tickets = tickets,
      this.ultimos4 = ultimos4
    
    } else {
        // Es otro dia
        this.guardarDB();
    }
  }

  guardarDB() {
      
    const dbPath = path.join( __dirname, '../database/data.json')
    //Grabar
    fs.writeFileSync(dbPath, JSON.stringify( this.toJson));
  }

  //Asignar cual es el siguiente ticket
  next() {
    this.ultimo += 1;
    const ticket = new Ticket( this.ultimo, null );
    this.tickets.push( ticket )

    this.guardarDB();
    return 'Ticket' + ticket.numero
  }

  //Atendiendo los tickets 
  atenderTicket ( table ) {
    if (this.tickets.length === 0) {
        return null;
    }
    const ticket = this.tickets.shift();
    //Borrar tickets
    ticket.table = table;

    // Añadir un arreglo unshift()
    this.ultimos4.unshift( ticket );

    if (this.ultimos4.length > 4) {
        this.ultimos4.splice(-1 , 1);
    }

    this.guardarDB();

    return ticket;
  }
}

module.exports = TicketControl;
