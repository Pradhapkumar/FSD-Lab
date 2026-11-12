function sendMessage() {
  const input = document.getElementById("messageInput");
  const chatBox = document.getElementById("chatBox");
  const message = input.value.trim();

  if (message === "") {
    return;
  }

  // Create user message
  const userMessage = document.createElement("div");
  userMessage.classList.add("message", "user");
  userMessage.textContent = message;
  chatBox.appendChild(userMessage);

  // Clear input and scroll to bottom
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Automatic bot echo reply
  setTimeout(function () {
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot");
    botMessage.textContent = "You said: " + message + " 😊";
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);
}

// Send message when Enter is pressed
document.getElementById("messageInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

