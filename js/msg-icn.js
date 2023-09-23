
const typSpd = 70; 
const waitTime = 500;
var control = true;
var cont = 0;
var contardor = 0;
var mi = 0;

const msgs = document.querySelector(".msg-icn");
const msgsa = document.querySelector(".msg-icn-a");
const text = [
  "I would like to visit the Amazon",
  "Oh i like to priorize the birding",
  "En donde puedo perzonalizar mi tour?",
  "i would like to talk whit one asesor",
  "Necesito mas informacion please!"
]

const textC = [
  "Colombia, located in northern south America is the country with the largest bird species list on earth, come and enjoy any of our featured turs or tell us for a customized tour that we can organize according to your preferences.",
  "All our efforts will be focused in provided the best experience in all features, our great team has the knowledge and taste to encourage an unforgettable time in Colombia.",
  "Live the best birdwatching, nature and photography tours with us!" 
]


function writeString(e, str, i) {
  e.innerHTML = e.innerHTML + str[i];
  
  if (e.innerHTML.length == str.length && mi != text.length)
    setTimeout(slowlyDelete, waitTime, e);
}

function deleteString(e) {
  e.innerHTML = e.innerHTML.substring(0, e.innerHTML.length - 1);
  console.log("deleteString"); 
  console.log(mi) ;
  console.log("muestra text");
 
  if (e.innerHTML.length == 0)
  console.log(text[mi++]);
    slowlyWrite(e, text[mi++]);

}

function slowlyDelete(e) {
  contardor ++;
  console.log("slowleDelete");
  
  console.log(contardor);
  for (var i = 0; i < e.innerHTML.length; i++) {
    setTimeout(deleteString, typSpd / 2 * i, e);
  
  }
}

function slowlyWrite(e, str) {
  for (var i = 0; i < str.length; i++) {
    setTimeout(writeString, typSpd * i, e, str, i);
  }
}

function popupActive() {
  
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
  var msg = document.getElementById("myMsga");
  document.getElementById("myMsg").style.visibility="hidden";
  msg.classList.toggle("shows");
  msgsa.innerHTML= textC;
  control = false;

  if(cont == 1 ){
    control = true;
    msgsa.innerHTML = "";
    cont = 0;
  }else{
    cont ++;
  }
}


// This isn't necessary but more for demonstration purposes
function msgActive() {
    var msg = document.getElementById("myMsg");
    msg.classList.toggle("shows");
    
    
    
    if(control==true){
            msg.style.visibility = "visible";
           slowlyDelete(msgs);
           
          }
         
}
  
/*function actualizar(){window.location.reload(true);}
//Función para actualizar cada 5 segundos(5000 milisegundos)
setInterval("actualizar()",14000);*/
    

 
 


 
