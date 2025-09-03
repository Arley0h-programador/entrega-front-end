const socket = new WebSocket("wss://echo.websocket.events");

socket.onmessage = (event) => {
  const chat = document.getElementById("chat");
  chat.innerHTML += `<p><b>Servidor:</b> ${event.data}</p>`;
};

function enviar() {
  const nome = document.getElementById("nome").value;
  const msg = document.getElementById("mensagem").value;
  const texto = `${nome}: ${msg}`;
  socket.send(texto);

  const chat = document.getElementById("chat");
  chat.innerHTML += `<p><b>Você:</b> ${msg}</p>`;
}
