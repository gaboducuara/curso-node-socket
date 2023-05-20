const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

const socket = io();
//  listener que ayuda a saber cuando se conecta al servidor
socket.on("connect", () => {
  // console.log("conectado");

  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

//Nos ayuda a saber cuando nos desconectamos del servidor
socket.on("disconnect", () => {
  // console.log("Desconectado del servidor");

  lblOnline.style.display = "none";
  lblOffline.style.display = "";
});


socket.on('enviar-mensaje' , (payload) => {
  console.log(payload)
})

btnEnviar.addEventListener('click' , () => {

    const mensaje = txtMensaje.value;
    const payload = {
      mensaje,
      id: '12345abc',
      fecha: new Date().getTime()
    }
    socket.emit( 'enviar-mensaje', payload, ( id ) => {
      console.log('Desde el server', id)
    } )
})