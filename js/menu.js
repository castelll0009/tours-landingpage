var sound = document.getElementById("sonido-logo");
var abrir_refri = document.getElementById("sonido-refri");
var cerrar_refri = document.getElementById("sonido-cerrar-refri");
var beepc = document.querySelector("#beepc");
var var_header= document.querySelector("header");
var var_imgs_logo= document.querySelector(".navbar-brand");

changeImgResolution();

function sonidoLogo() {					
	sound.play();			
}	
function sonidoRefri(){
	abrir_refri.play();
}
function sonidoCerrarRefri(){
	cerrar_refri.play();
}

var zoom = false;
function vistaEscritorio(){	
	if(zoom == false){
		document.body.style = "zoom: 50%";					
		zoom = true;
	}else{
		document.body.style = "zoom: 100%";				
		zoom = false;
	}		
}
/*///////////FUNCIONES///////////////////////////////////////*/
/*///////////FUNCIONES///////////////////////////////////////*/
//abriendo y cerrando el refigerador
var refri1 = document.querySelector(".refri1");
var refri2 = document.querySelector(".refri2");
var refriCerrado = true; 

function abrirCerrarRefri(){
	if(refriCerrado){	
		sonidoRefri();
		refriCerrado = false;
	}else{
		sonidoCerrarRefri();
		refriCerrado = true;
	
	}	
	refri1.classList.toggle("desaparecerRefri"); // desaparece refrigerador
	refri2.classList.toggle("aparecerRefri"); // Aparece refri2	
}
//funcion para cambiar la imagen dependiendo de la resolucion
function changeImgResolution(){
	if (screen.width < 1024){
	//resolucion movil
	console.log("movil");	
	$('.img-foto').attr('src', 'imgs/Artboard 8.png');
	}else{		
	//resolucioin pc
	console.log("pc");
	$('.img-foto').attr('src', 'imgs/Artboard 8.png');	
	}	
}


/*cambiar la apariencia de la barra superiro al mover la rueda del mouse hacia abajo*/

window.onscroll = function() {
  var y = window.scrollY;
  console.log(y);
  if(y > 225){	  	  
	
	var_header.style  =   "background: linear-gradient(to left, rgb(0 0 0 / 37%) 0%, rgb(153 201 243 / 72%) 50%)";
	var_header.style  =   "background: linear-gradient(to left, rgb(0 0 0 / 20%) 0%, rgb(255 255 255 / 95%) 50%)";
	var_header.style = "background: linear-gradient(to left, rgb(255 255 255 / 8%) 10%, rgb(255 255 255 / 90%) 90%)";
	var_header.style  =   "background-color :  rgb(0, 0, 0,0.7);";
	var_imgs_logo.style = "filter: invert(1)";
  }else{
	var_header.style  =   "background-color : transparent";
	var_imgs_logo.style = "filter: none";  }
  
};


/*///////////JQUERY///////////////////////////////////////*/
/*///////////JQUERY///////////////////////////////////////*/
	
$(document).ready(function() {		
	
	$(document).ready(() => {
		$(".sona0").click(function(){
			var elem = $(".puntos0", this).text();
/*			$(".puntos0", this).css("display","none");*/

			if (elem == "...Leer Más") {
				//depliega
				$(".text0", this).slideDown();
				$(".puntos0" ,this).text("");													
				//solo afecta las resoluciones grandes como el PC				
				//ahora dependiendo del hover  cambiamos el estilo del Div-figure																																											
			  } else {
				//pliega
				$(".puntos0", this).text("...Leer Más");		
				$(".text0", this).slideUp();														
			  }				  	
		});
	});
///////////////////////////////////////////////////////////////////

});