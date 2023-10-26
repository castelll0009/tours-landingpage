const typSpd = 30;
const waitTime = 2000;

const text = [
  "I would like to visit the Amazon",
  "Oh, I like to prioritize birding",
  "En donde puedo personalizar mi tour?",
  "I would like to talk with one advisor",
  "Necesito más información, por favor!"
];

var mi = 0;

function writeString(e, str, i) {
  e.innerHTML = e.innerHTML + str[i];

  if (e.innerHTML.length == str.length && mi != text.length) {
    setTimeout(() => slowlyDelete(e), waitTime);
  } else if (e.innerHTML.length == str.length && mi == text.length) {
    mi = 0;
    setTimeout(() => slowlyDelete(e), waitTime);
  } else {
    setTimeout(() => writeString(e, str, i + 1), typSpd);
  }
}

function deleteString(e) {
  e.innerHTML = e.innerHTML.substring(0, e.innerHTML.length - 1);

  if (e.innerHTML.length == 0) {
    slowlyWrite(e, text[mi++]);
  } else {
    setTimeout(() => deleteString(e), typSpd / 2);
  }
}

function slowlyDelete(e) {
  if (e.innerHTML.length > 0) {
    deleteString(e);
  } else {
    setTimeout(() => slowlyWrite(e, text[mi++]), waitTime);
  }
}

function slowlyWrite(e, str) {
  if (str) {
    writeString(e, str, 0);
  }
}

const msg = document.querySelector(".msg-icn");

slowlyDelete(msg);
