var velo_menu = document.querySelector(".velo-menu");
var grad1 = document.querySelector(".grad1");
document.querySelector("label").addEventListener("click", mostrarVeloMenu);   
   
function mostrarVeloMenu(){
   if(velo_menu.style.display ==  "block"){      
      velo_menu.style = "display : none";  
   }else{      
      velo_menu.style = "display : block";                      
   }
 
}

var contador = 0;
$("label").click(function(){  
   contador = contador + 1;   
   if(  contador <= 1)  {
    $("#main-movil").css("width", "100%");
    $("#main-movil").css("background", " black");    
    $("#main-movil").css("z-index", "21");   
    
   }else{
    $("#main-movil").css("width", "100px"); 
    $("#main-movil").css("background", "transparent");
    contador = 0;
   }
        
});
