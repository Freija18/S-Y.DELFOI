document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.getElementById("chat-container");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-text");

  // Chatbotin avaaminen ja sulkeminen
  window.toggleChat = function () {
    chatContainer.style.display = (chatContainer.style.display === "none" || chatContainer.style.display === "") ? "flex" : "none";
  };

  function addMessage(sender, text) {
    const message = document.createElement("div");
    message.style.padding = "5px";
    message.style.margin = "5px";
    message.style.borderRadius = "5px";
    message.style.backgroundColor = sender === "Bot" ? "#eee" : "#cce5ff";
    message.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(input) {
    const responses = {
      "mikä on tämä sivu": "Tämä on S/Y Delfoin kotisivu, jossa kerromme purjehdusmatkoistamme.",
      "kerro matkoista": "Täältä löydät matkakertomuksia ja reittisuunnitelmia!",
      "kuka olet": "Olen chatbot, joka auttaa sinua navigoimaan tällä sivulla.",
      "hei": "Hei! Miten voin auttaa?"
    };

    return responses[input.toLowerCase()] || "Pahoittelut, en ymmärtänyt kysymystäsi.";
  }

  window.sendMessage = function () {
    const userText = chatInput.value.trim();
    if (userText === "") return;

    addMessage("Sinä", userText);
    chatInput.value = "";

    setTimeout(() => {
      const botReply = getBotResponse(userText);
      addMessage("Bot", botReply);
    }, 500);
  };
});

