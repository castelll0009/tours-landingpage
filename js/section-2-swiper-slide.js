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
  