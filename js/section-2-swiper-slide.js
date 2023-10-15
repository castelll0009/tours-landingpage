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
    // Función para generar un color aleatorio
    function getRandomColor() {
      var colors = ["#087ac4", "#b45205", "#86c706"];
      var randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
  }

  // Aplicar un color de fondo aleatorio a todos los elementos con la clase "custom-button"
  var buttons = document.querySelectorAll(".custom-button");
  buttons.forEach(function(button) {
      var randomColor = getRandomColor();
      button.style.background = randomColor;
  });