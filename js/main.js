(function () {
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("featuredGrid").innerHTML = EXPERIENCES.slice(0, 3).map(experienceCardHTML).join("");
    initHeroSlider();
  });

  function initHeroSlider() {
    var root = document.getElementById("heroSlider");
    var slides = root.querySelectorAll(".hero__slide");
    var dots = document.getElementById("heroDots");
    var pause = document.getElementById("heroPause");
    var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var paused = motion.matches;
    var hovering = false;
    var current = 0;
    var timer;

    slides.forEach(function (slide, index) {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", (index + 1) + " of " + slides.length);
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show slide " + (index + 1));
      dot.addEventListener("click", function () { goTo(index); restart(); });
      dots.appendChild(dot);
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.hidden = i !== current;
        slide.classList.toggle("is-active", i === current);
        dots.children[i].classList.toggle("is-active", i === current);
        dots.children[i].setAttribute("aria-pressed", String(i === current));
      });
    }

    function restart() {
      clearInterval(timer);
      if (!paused && !hovering && !document.hidden && !root.contains(document.activeElement)) {
        timer = setInterval(function () { goTo(current + 1); }, 6500);
      }
      pause.textContent = paused ? "Play slides" : "Pause slides";
      pause.setAttribute("aria-pressed", String(paused));
    }

    document.getElementById("heroNext").addEventListener("click", function () { goTo(current + 1); restart(); });
    document.getElementById("heroPrev").addEventListener("click", function () { goTo(current - 1); restart(); });
    pause.addEventListener("click", function () { paused = !paused; restart(); });
    root.addEventListener("mouseenter", function () { hovering = true; restart(); });
    root.addEventListener("mouseleave", function () { hovering = false; restart(); });
    root.addEventListener("focusin", restart);
    root.addEventListener("focusout", function () { setTimeout(restart, 0); });
    document.addEventListener("visibilitychange", restart);
    motion.addEventListener("change", function () { paused = motion.matches; restart(); });
    goTo(0);
    restart();
  }
})();
