$( document ).ready(function() {
var swiper = new Swiper('.product-slider', {
    spaceBetween: 30,
    grabCursor: true,    
    centeredSlides: true,
    paginationClickable: true,
    slideToClickedSlide: true,
    effect: 'fade',
  
        //initialSlide: 3,
    loop: false,
    navigation: {
        /*
        nextEl: '.next',
        prevEl: '.prev'
        */
        nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
        
    },
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: false,    
        clickable: true,      
            
    },
    // mousewheel: {
    //     // invert: false
    // },
    
    on: { // IMAGEN: cambio de card y cambio de tarjet en la imagen , plus opacidad and animacion de la picture
        init: function(){        
            var index = this.activeIndex;
            console.log("index "+ index);
            $('.swiper-pagination-bullet').eq(index).trigger('click'); //redirecciona haciendo click en el swiper-paginattion correspondiente POOM
            
          

            //guardamos en tarjet el item que queremos cambiarr 
            var target = $('.product-slider__item').eq(index).data('target'); //eq indica el indice actual de una lista de elementos , 
            setupCircleProgress(index);
            console.log("target1 " + target);                   

            $('.product-img__item').removeClass('active');
            $('.product-img__item#'+ target).addClass('active');           
        }
    }

});

    swiper.on('slideChange', function () {           //IMG: change to img when swiper is on     and  changing 
        var index = this.activeIndex; // indicate witch card is currently selected
        console.log("swiper index: " + index); 
        var target = $('.product-slider__item').eq(index).data('target');  
        $('.swiper-pagination-bullet').eq(index).trigger('click'); //redirecciona haciendo click en el swiper-paginattion correspondiente POOM

        if(index == 5){
            playVid();
        }
        
        console.log("swiper on: "+ target);        
           
        //show and  hiden img the corresponding image
        $('.product-img__item').removeClass('active');   //remueve la clase activa a todas las clases
        $('.product-img__item#'+ target).addClass('active'); //crea una clase con el id correspondiente y le activa la clase para mostrar la imagen WOW!

        //PROGRESS BAR: add clas to active and hidden the circle progress bar  
        setupCircleProgress(index);                       

        if(swiper.isEnd) {
            $('.prev').removeClass('disabled');
            $('.next').addClass('disabled');
        } else {
            $('.next').removeClass('disabled');
        }

        if(swiper.isBeginning) {
            $('.prev').addClass('disabled');
        } else {
            $('.prev').removeClass('disabled');
        }
    });

    $(".js-fav").on("click", function() {
        $(this).find('.heart').toggleClass("is-active");
    });

//CIRCLE PROGRESS
//obtenemos el porcentaje escrito en la div
function setupCircleProgress(index){
     var target_circle_progress = $(".product-inf__percent-circle-circle").eq(index); //circle de la card actual
    var radio = target_circle_progress.attr("r"); //radio      
    var pct = parseInt($(".product-inf__percent-txt").eq(index).text());   //pct        
    var stroke_dasharray =  ( 2 * (22 / 7) * radio ) ; //calculamos el dash array
    var stroke_dashoffset = ( 1 - pct / 100 ) * (2 * (22 / 7) * radio); //calculamos el dash offset
    var stroke_100 = ( 1 - -200 / 100 ) * (2 * (22 / 7) * radio); //calculamos el dash offset

    //console.log("radio: "+ radio  + " porcentaje recibido : " + pct +" stok das array " + stroke_dasharray);
    //console.log("stroke_dashoffset "+ stroke_dashoffset);
            
       //show actual progres circle and remove active circle for others
    //reiniciamos a cero  cirle progress segun el PCT y el RADIO
    $(".product-inf__percent-circle-circle").css({ strokeDasharray: stroke_dasharray});
    $(".product-inf__percent-circle-circle").css({ strokeDashoffset: stroke_100});  
    //calculamos the strokes segun el PCT y el radio        
    target_circle_progress.css({strokeDasharray: stroke_dasharray});         
    target_circle_progress.css({strokeDashoffset: stroke_dashoffset}) ;    
}
//VIDEO
var vid = document.querySelector(".product-video__item");
   
function playVid() {
    vid.play();
}

});

//CHATCH SWIPER-SLIDE CLICKED
