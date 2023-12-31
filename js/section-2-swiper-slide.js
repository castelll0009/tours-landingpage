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

  // Mantén el número de slide actual en un rango entre 0 y totalSlides - 1
  var currentSlide = 0;

  // Función para actualizar el número de slide
  function updateSlideNumber() {
    var totalSlides = swiper.slides.length; // Obtiene la cantidad total de slides
    $("#slide-number").html((currentSlide + 1).toString().padStart(2, "0"));
  }

  // Agrega un event listener para el botón "Anterior"
  $(".prev-slide").click(function() {
    var totalSlides = swiper.slides.length; // Obtiene la cantidad total de slides
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Resta 1 y ajusta al rango
    swiper.slideTo(currentSlide);
    updateSlideNumber();
  });

  // Agrega un event listener para el botón "Siguiente"
  $(".next-slide").click(function() {
    var totalSlides = swiper.slides.length; // Obtiene la cantidad total de slides
    currentSlide = (currentSlide + 1) % totalSlides; // Suma 1 y ajusta al rango
    swiper.slideTo(currentSlide);
    updateSlideNumber();
  });

  // Actualiza el número de slide al cargar la página
  updateSlideNumber();
});
