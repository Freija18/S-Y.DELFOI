document.addEventListener("DOMContentLoaded", function () {
  const chatMessages = document.getElementById("chat-messages");
  const questionContainer = document.getElementById("chat-questions");

  const questions = [
    "Mikä tämä sivu on?",
    "Kerro matkoista",
    "Mikä on S/Y Delfoi?",
    "Missä vene sijaitsee?"
  ];

  const responses = {
    "Mikä tämä sivu on?": "Tämä on purjeveneemme S/Y Delfoin kotisivu, jossa kerromme purjehdusmatkoistamme.",
    "Kerro matkoista": ""Matkamme" osiosta löydät matkakertomuksia ja reittisuunnitelmiamme!",
    "Mikä on S/Y Delfoi?": "S/Y Delfoi on Delphia 29 purjevene, jolla olemme viettäneet kesämme vuodesta 2022 alkaen.",
    "Missä vene sijaitsee?": "Veneemme kotisatama sijaitsee Laurinlahdessa Espoossa."
  };

  function addMessage(sender, text, question = '') {
    const message = document.createElement("div");
    message.style.padding = "5px";
    message.style.margin = "5px";
    message.style.borderRadius = "5px";
    message.style.backgroundColor = sender === "Bot" ? "#eee" : "#cce5ff";
    message.innerHTML = `<strong>${sender}:</strong> ${text}`;

    // Lisää 'data-question' attribuutti, joka mahdollistaa chatin sulkemisen samalle kysymykselle
    if (question) {
      message.setAttribute('data-question', question);
    }
    
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage(question) {
    addMessage("Sinä", question);

    setTimeout(() => {
      const botReply = responses[question] || "Pahoittelut, en ymmärtänyt kysymystäsi.";
      addMessage("Bot", botReply, question);
    }, 500);
  }

  // Luodaan kysymykset nappeina
  questions.forEach(question => {
    const button = document.createElement("button");
    button.textContent = question;
    button.style.display = "block";
    button.style.margin = "5px";
    button.style.padding = "10px";
    button.style.border = "none";
    button.style.background = "#007BFF";
    button.style.color = "white";
    button.style.cursor = "pointer";
    button.style.borderRadius = "5px";

    button.onclick = function () {
      // Tarkistetaan, onko sama kysymys jo käsitelty
      const existingResponse = document.querySelector(`#chat-messages div[data-question="${question}"]`);

      if (existingResponse) {
        // Jos vastaus on jo näkyvissä, poistetaan se
        existingResponse.remove();
      } else {
        // Lähetetään viesti normaalisti, jos kysymys ei ole vielä käsitelty
        sendMessage(question);
      }
    };

    questionContainer.appendChild(button);
  });

  // Chat-ikkunan näyttäminen ja piilottaminen
  window.toggleChat = function () {
    const chatContainer = document.getElementById("chat-container");
    // Tarkistetaan, jos chat-ikkuna on piilotettu, niin näytetään se, muuten piilotetaan
    chatContainer.style.display = (chatContainer.style.display === "none" || chatContainer.style.display === "") ? "block" : "none";
  };
});


