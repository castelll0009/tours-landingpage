// This isn't necessary but more for demonstration purposes

const typSpd = 30; 
const waitTime = 2000;

const text = [
  "I would like to visit the Amazon",
  "Oh i like to priorize the birding",
  "En donde puedo perzonalizar mi tour?",
  "i would like to talk whit one asesor",
  "Necesito mas informacion please!"
]

var mi = 0;

function writeString(e, str, i) {
  e.innerHTML = e.innerHTML + str[i];
  
  if (e.innerHTML.length == str.length && mi != text.length){
    setTimeout(slowlyDelete, waitTime, e);
  }else{
    
  }
   

}

function deleteString(e) {
  e.innerHTML = e.innerHTML.substring(0, e.innerHTML.length - 1);
  
  if (e.innerHTML.length == 0)
    slowlyWrite(e, text[mi++]);
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

slowlyDelete(msg);