const chatBox = document.getElementById("chat-box");
const inputBox = document.getElementById("inputbox");
const sendButton = document.getElementById("send-button");

// Conectar ao  WebSocket
// const socket = new WebSocket("ws://localhost:10000");
const socket = new WebSocket("wss://geminiserver-5j3v.onrender.com/:10000");

socket.onopen = () => {
  console.log("Conectado ao WebSocket.");
};

socket.onmessage = (event) => {
  try {
    const message = JSON.parse(event.data);
    processReceivedMessage(message);
  } catch (e) {
    console.error("Erro ao processar mensagem recebida:", e);
  }
};

sendButton.addEventListener("click", () => {
  const messageText = inputBox.value;
  if (messageText.trim() === "") return;

  const message = {
    type: "user_message",
    content: messageText,
  };

  socket.send(JSON.stringify(message));
  addMessageToChatBox("Você: " + messageText);
  inputBox.value = "";
});

function addMessageToChatBox(message, owner = 0) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;

  // Adiciona a classe dependendo do valor de owner
  if (owner === 0) {
    messageElement.classList.add("user-message");
  } else if (owner === 1) {
    messageElement.classList.add("ai-message");
  }

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Rola para a última mensagem
}

function processReceivedMessage(message) {
  if (message.type === "ai_response") {
    addMessageToChatBox("IA: " + message.content, 1);
  } else {
    console.warn("Tipo de mensagem não reconhecido:", message.type);
  }
}
