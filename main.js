const terminal = document.getElementById('terminal');
const message = document.createElement('div');
const options = document.createElement('ul');
message.id = 'message';
options.id = 'options';
options.classList.add('options-list');
terminal.appendChild(message);
terminal.appendChild(options);

document.addEventListener("DOMContentLoaded", () => {
  cacheStorage();
  manageMessages();
});

function cacheStorage() {
  const existCacheStorage = loadCache();
  if (!existCacheStorage) localStorage.setItem('cacheStorage', '{}');
  if (!isObjectEmpty(existCacheStorage)) initialOptions.push('Eliminar');
}

function saveCache(data) {
  const currentSave = { data: data };
  const newStorage = JSON.stringify(currentSave);
  localStorage.setItem('cacheStorage', newStorage);
  initialOptions.push('Eliminar');
}

function loadCache() {
  return (existCacheStorage = JSON.parse(localStorage.getItem('cacheStorage')));
}

function deleteCache() {
  clearOptions();
  initialOptions = ['Nueva Partida', 'Continuar', 'Cargar'];
  localStorage.setItem('cacheStorage', '{}');
  cacheStorage();
  initialMessage();
}

function createElement(tagName, id = '', elementClass = '', content = '') {
  const allClasses = addClasses(elementClass);
  const element = document.createElement(tagName);
  if (id !== "") element.id = id;
  allClasses.forEach((classItem) => {
    if (elementClass !== "") element.classList.add(classItem);
  });
  element.textContent = content;
  return element;
}

function createOptions(option, customId = '', customClass = 'option', isAddingFunctions = false) {
  const newOption = createElement('li', customId, customClass, option.toString());
  if(isAddingFunctions) {
    newOption.addEventListener('click', () =>
      selectedOption(newOption.textContent)
    );
  }
  options.appendChild(newOption);
}

function createMenu(array) {
  const existCache = loadCache();
  array.forEach((option) => {
    const optionValidation = (isObjectEmpty(existCache) && (option === initialOptions[1] || option === initialOptions[2]));
    optionValidation
      ? (optionClass = 'option.disabled')
      : (optionClass = 'option');
    createOptions(option.toString(), option.toString(), optionClass, true);
  });
}

function createNewArrayOptions(array, isAddingFunctions = false) {
  array.forEach((option) => {
    createOptions(option.toString(), '', 'option', isAddingFunctions);
  });
}

function addClasses(classesList) {
  return classesList.split('.');
}

function generateMessage(content = '', display = '') {
  message.textContent = content;
  message.style.display = display;
}

function manageMessages() {
  initialMessage();
}

function generateLoadingMessage() {
  generateMessage('Cargando...');
}

function initialMessage() {
  generateLoadingMessage();
  setTimeout(() => {
    generateMessage('¡Bienvenido al terminal de novelas interactivas!');
    createMenu(initialOptions);
  }, 900);
}

function showMessage(message = '') {
  setTimeout(() => {
    generateMessage(message);
  }, 900);
}

function selectedOption(option) {
  switch (option) {
    case initialOptions[0]:
      newGame();
      break;
    case initialOptions[1]:
      continueGame();
      break;
    case initialOptions[2]:
      loadGame();
      break;
    case initialOptions[3]:
      deleteSavedGame();
        break;
    case 'Borrar Partidas':
      deleteCache();
      break;
    case 'Volver':
      getBack();
      break;
    default:
      break;
  }
}

function newGame() {
  generateLoadingMessage();
  clearOptions();

  setTimeout(() => {
    generateMessage(
      'Después de una noche de sueño intranquilo has despertado.' +
      'No obstante ahora te encuentras en un lugar oscuro sin ninguna pista de lo que ha pasado' +
      'Delante de ti se encuentra una joven mujer, aparenta tener una edad cercana a los 30,' +
      'ella está sentada, comiendo una especie de papitas desinteresadamente.' +
      'Como ella no te presta atención, aprovechas para darle una mirada cautelosa. puedes notar su figura' +
      'de complexión esbelta, con un cuerpo que puedes encontrar "atractivo", una piel blanca y delicada' +
      'asi como un cabello largo y de color azul.' +
      '"¿Cómo te llamas?"' +
      'Pregunta ella levantándose de su asiento.'
    );

    const playerNameInput = createElement('input', 'player-name', 'player-input', '');
    terminal.appendChild(playerNameInput);

    playerNameInput.focus();
    playerNameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const playerName = getPlayerName(playerNameInput);
        savePlayerName(playerName); 
        // Limpiar el input después de guardar el nombre
        playerNameInput.value = '';
      }
    });
  }, 900);
}

function continueGame() {
  if(isOptionDisabled(initialOptions[1])) return;
  const saveState = loadCache();
  generateLoadingMessage();
  clearOptions();

  setTimeout(() => {
    generateMessage('¿Desea cargar la última partida guardada de ' + saveState.data.playerName + '?');
    createNewArrayOptions(dicotomyOptions, true);
  }, 900);
}

function loadGame() {
  if(isOptionDisabled(initialOptions[1])) return;
  const saveState = loadCache();
  generateLoadingMessage();
  clearOptions();

  setTimeout(() => {
    generateMessage('Seleccione la partida que desea cargar:');
    const savedGames = [saveState.data.playerName, 'Volver']
    createNewArrayOptions(savedGames, true);
  }, 900);
}

function deleteSavedGame() {
  generateLoadingMessage();
  clearOptions();

  setTimeout(() => {
    generateMessage('¿Desea eliminar todas las partidas guardadas?');
    const savedGames = ['Borrar Partidas', 'Volver']
    createNewArrayOptions(savedGames, true);
  }, 900);
}

function getBack() {
  clearOptions();
  generateMessage();
  initialMessage(); 
}

function clearOptions() {
  options.innerHTML = '';
}

function isOptionDisabled(option) {
  const continueLi = document.getElementById(option);
  return continueLi.classList.contains('disabled');
}

const isObjectEmpty = (objectName) => {
  return (
    Object.keys(objectName).length === 0 && objectName.constructor === Object
  );
}

function getPlayerName(inputElement) {
  return inputElement.value;
}

function savePlayerName(name) {
  const newSave = {
    playerName: name,
    advance: 0,
    decisions: {}
  }
  saveCache(newSave);
}

let initialOptions = ['Nueva Partida', 'Continuar', 'Cargar'];
const dicotomyOptions = ['Si', 'No', 'Volver'];