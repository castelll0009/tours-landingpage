const typSpd = 30;
const waitTime = 2000;

const text = [
  "Where can I customize my tour?",
  "I would like to visit the Amazon",
  "Oh, I like to prioritize birding",
  "¿En dónde puedo personalizar mi tour?",
  "I would like to talk with one advisor",
  "I need more info please" // Actualizado
];

var mi = 0;

function writeString(e, str, i) {
  e.innerHTML = e.innerHTML + str[i];

  if (e.innerHTML.length == str.length && mi != text.length) {
    setTimeout(slowlyDelete, waitTime, e);
  }
}

function deleteString(e) {
  e.innerHTML = e.innerHTML.substring(0, e.innerHTML.length - 1);

  if (e.innerHTML.length == 0) {
    slowlyWrite(e, text[mi++]);
    if (mi === text.length) mi = 0; // Reiniciar el índice al final del arreglo
  }
}

function slowlyDelete(e) {
  for (var i = 0; i < e.innerHTML.length; i++) {
    setTimeout(deleteString, typSpd / 2 * i, e);
  }
}

function slowlyWrite(e, str) {
  for (var i = 0; i < str.length; i++) {
    setTimeout(writeString, typSpd * i, e, str, i);
  }
}

const msg = document.querySelector(".msg-icn");

function startTyping() {
  mi = 0; // Reiniciar el índice
  slowlyDelete(msg);
}

// Llamar a la función inicialmente
startTyping();

// Repetir el proceso cada vez que se complete
setInterval(startTyping, (text.length * waitTime + text.length * typSpd * text[0].length) * text.length);
