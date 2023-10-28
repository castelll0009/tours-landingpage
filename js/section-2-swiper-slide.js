// Espera a que el documento esté listo
$(document).ready(function() {
  var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 2,
      slideShadows: true
    },
    spaceBetween: 100,
    loop: false,
    pagination: {
      el: ".swiper-pagination"
    }
  });

  // Agrega un event listener para el botón "Anterior"
  $(".prev-slide").click(function() {
    swiper.slidePrev(); // Desplazarse al slide anterior
  });

  // Agrega un event listener para el botón "Siguiente"
  $(".next-slide").click(function() {
    swiper.slideNext(); // Desplazarse al siguiente slide
  });
});
