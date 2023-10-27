var mySwiper = new Swiper('.swiper', {
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
      loop: true,
      pagination: {
        el: ".swiper-pagination"
      }
    });

    // Obtén la cantidad total de diapositivas
    var totalSlides = mySwiper.slides.length;

    // Variable para llevar un registro de la diapositiva actual
    var currentSlideIndex = 0;

    // Función para avanzar a la siguiente diapositiva
    function nextSlide() {
        currentSlideIndex++;
        if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = 0;
        }
        mySwiper.slideTo(currentSlideIndex);
    }

    // Función para retroceder a la diapositiva anterior
    function prevSlide() {
        currentSlideIndex--;
        if (currentSlideIndex < 0) {
            currentSlideIndex = totalSlides - 1;
        }
        mySwiper.slideTo(currentSlideIndex);
    }

    // Agregar controladores de evento a los botones de siguiente y previo
    document.getElementById("next-slide-button").addEventListener("click", nextSlide);
    document.getElementById("prev-slide-button").addEventListener("click", prevSlide);
