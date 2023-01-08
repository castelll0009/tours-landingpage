$(document).ready(function(){
        //desplejar la sinta desde abajo   
    $("#producto1").click(function(){
        $(".div-detalles").toggleClass("mostrar-detalles");
    });

    $(".div-detalles").click(function(){ 
        $(".div-detalles").toggleClass("mostrar-detalles");
    }); 
}); 
