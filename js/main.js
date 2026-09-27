(function () {
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("featuredGrid").innerHTML = EXPERIENCES.slice(0, 3).map(experienceCardHTML).join("");

    var slides = document.querySelectorAll("#heroSlider .hero__slide");
    var images = document.querySelectorAll("#heroSlider .hero__image");
    var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var current = 0;
    var timer;

    function showSlide(index) {
      current = index;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === current);
      });
      images.forEach(function (image, i) {
        image.classList.toggle("is-active", i === current);
      });
    }

    function start() {
      clearInterval(timer);
      showSlide(0);
      if (!motion.matches) {
        timer = setInterval(function () {
          showSlide((current + 1) % slides.length);
        }, 6500);
      }
    }

    motion.addEventListener("change", start);
    start();
  });
})();