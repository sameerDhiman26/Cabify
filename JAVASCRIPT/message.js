let messageInput = document.querySelector("#messageInput");
let sendMessageBtn = document.querySelector("#sendMessageBtn");
let chatMessages = document.querySelector("#chatMessages");

sendMessageBtn.addEventListener("click", () => {

  let text = messageInput.value.trim();

  if (text === "") return;

  let message = document.createElement("div");

  message.classList.add("message", "sent");
  message.innerText = text;

  chatMessages.appendChild(message);

  messageInput.value = "";

  chatMessages.scrollTop = chatMessages.scrollHeight;
});