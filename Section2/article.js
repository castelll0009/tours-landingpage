function loadDoc() {
   const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.getElementById("art-text").innerHTML =
      this.responseText;
    }
    xhttp.open("GET","amazon.txt");
    xhttp.send();
   
  }