//autoplay swiper1

    var swiper1 = new Swiper(".swiper1",{
    slidesPerView: "auto",
    spaceBetween: 15,
    freeMode: true,    
    autoplay: true,
    speed: 3000,
    stopOnLastSlide : true 
  })


//autoplay swiper2////////////(/////)
/////////////////////////////sss
var swiper2 = new Swiper(".swiper2",{
  slidesPerView: "auto",
  spaceBetween: 15,
  freeMode: true,    
  autoplay: true,
  speed: 3000,
  stopOnLastSlide : true
 
})
//autoplay swiper3////////////
/////////////////////////////
//////////////////////////////
var swiper3 = new Swiper(".swiper3",{
  slidesPerView: "auto",
  spaceBetween: 15,
  freeMode: true,    
  autoplay: true,
  speed: 3000,
  stopOnLastSlide : true,
})

$(".swiper1").on(" mouseover touched touchmove", function(e){  
  swiper1.autoplay.stop();   
  swiper2.autoplay.start();  
  swiper3.autoplay.start();  
})
$(".swiper2").on(' mouseover touched touchmove', function(e){  
  swiper1.autoplay.start();   
  swiper2.autoplay.stop();  
  swiper3.autoplay.start(); 
})
$(".swiper3").on(' mouseover touched touchmove', function(e){  
  swiper1.autoplay.start();   
  swiper2.autoplay.start();  
  swiper3.autoplay.stop();  
})


