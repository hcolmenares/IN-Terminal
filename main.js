document.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("terminal");
  manageMessages(terminal);
});

function createElementWithId(tagName, id) {
  const element = document.createElement(tagName);
  element.id = id;
  return element;
}

function generateMessage(type, content = "", display = "flex") {
  const messageElement = createElementWithId("div", type);
  messageElement.textContent = content;
  messageElement.style.display = display;
  return messageElement;
}

function manageMessages(terminal, loadingMessageContent = "Cargando") {
  const terminalContainer = terminal;

  // Crear y agregar los mensajes
  const loadingMessage = generateMessage(
    "loading-message",
    loadingMessageContent
  );
  const welcomeMessage = generateMessage(
    "welcome-message",
    "¡Bienvenido al terminal de novelas interactivas!",
    "none"
  );

  terminalContainer.appendChild(loadingMessage);
  terminalContainer.appendChild(welcomeMessage);

  // Función para mostrar un punto en el mensaje de carga
  function showLoadingPoint(index) {
    const point = document.createElement("span");
    point.textContent = ".";
    loadingMessage.appendChild(point);

    setTimeout(() => {
      if (index < 2) {
        showLoadingPoint(index + 1);
      } else {
        loadingMessage.style.display = "none";
        welcomeMessage.style.display = "flex";
      }
    }, 600);
  }

  // Iniciar la animación de carga
  showLoadingPoint(0);
}
