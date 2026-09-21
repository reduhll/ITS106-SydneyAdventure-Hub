/* ============================================
   Homepage: hero image slider + featured experience cards.
   ============================================ */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    renderFeatured();
    initHeroSlider();
  });

  function renderFeatured() {
    var grid = document.getElementById("featuredGrid");
    if (!grid) return;
    var featured = EXPERIENCES.slice(0, 3);
    grid.innerHTML = featured.map(cardHTML).join("");
  }

  function cardHTML(exp) {
    return (
      '<article class="card">' +
        '<div class="card__media" style="background-image:url(\'' + exp.image + '\')"></div>' +
        '<div class="card__body">' +
          '<span class="card__category">' + exp.category + "</span>" +
          "<h3>" + exp.title + "</h3>" +
          "<p>" + exp.description + "</p>" +
          '<div class="card__meta"><span>&#9201; ' + exp.duration + '</span><span>&#128197; ' + exp.availability + "</span></div>" +
          '<div class="card__foot"><span class="card__price">$' + exp.price + ' / person</span>' +
          '<a class="btn btn-outline" href="booking.html?exp=' + exp.id + '">Book</a></div>' +
        "</div>" +
      "</article>"
    );
  }

  function initHeroSlider() {
    var root = document.getElementById("heroSlider");
    if (!root) return;
    var slides = root.querySelectorAll(".hero__slide");
    var dotsWrap = document.getElementById("heroDots");
    var current = 0;
    var timer;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", function () { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
    });

    function goTo(index) {
      slides[current].classList.remove("is-active");
      dotsWrap.children[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dotsWrap.children[current].classList.add("is-active");
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 6000);
    }

    document.getElementById("heroNext").addEventListener("click", function () { next(); restart(); });
    document.getElementById("heroPrev").addEventListener("click", function () { prev(); restart(); });

    restart();
  }
})();
