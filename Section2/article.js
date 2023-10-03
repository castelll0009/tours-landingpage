function loadDoc() {
   const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.getElementById("#art-text").innerHTML =
      this.responseText;
    }
    xhttp.open("GET","amazon.txt");
    xhttp.send();
   
  }

  $(document).jquery(function(){
    $("btn-pe").on("click",function(){
      $("#art.text").load("amazon.txt");
    });
  });

  