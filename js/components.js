(function () {
  var navLinks = [
    { href: "index.html", label: "Home" },
    { href: "experiences.html", label: "Experiences" },
    { href: "booking.html", label: "Booking Calculator" },
    { href: "guide.html", label: "Visitor Guide & FAQ" },
    { href: "contact.html", label: "Contact" }
  ];

  document.addEventListener("DOMContentLoaded", function () {
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");
    var links = navLinks.map(function (link) {
      var current = link.href === currentPage ? ' aria-current="page"' : "";
      return '<li><a href="' + link.href + '"' + current + '>' + link.label.replace('&', '&amp;') + '</a></li>';
    }).join("");

    header.innerHTML = `
      <nav class="container nav" aria-label="Main navigation">
        <a class="brand" href="index.html">
          <svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="19" fill="#087f68"/>
            <path d="M20 30V13M20 16l-7 7m7-7 7 7" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 30Q20 22 32 30" stroke="#f5c451" stroke-width="2.4" fill="none" stroke-linecap="round"/>
          </svg>
          <span class="brand__text">Sydney Adventure Hub<span>Nature &amp; Eco Escapes</span></span>
        </a>
        <button class="nav__toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="navLinks" aria-label="Open menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <ul class="nav__links" id="navLinks">${links}</ul>
        <div class="nav__cta"><a class="btn btn-primary" href="booking.html">Book Now</a></div>
      </nav>`;

    footer.innerHTML = `
      <div class="container footer__grid">
        <div class="footer__about">
          <h2>Sydney Adventure Hub</h2>
          <p>Small-group nature and eco experiences across Greater Sydney. Local guides, fresh air, and a Leave No Trace approach.</p>
        </div>
        <nav aria-label="Footer navigation">
          <h2>Explore</h2>
          <ul>
            <li><a href="experiences.html">Experiences &amp; Packages</a></li>
            <li><a href="booking.html">Booking &amp; Cost Calculator</a></li>
            <li><a href="guide.html">Visitor Guide &amp; FAQ</a></li>
            <li><a href="contact.html">Contact &amp; Feedback</a></li>
          </ul>
        </nav>
        <div>
          <h2>Reach us</h2>
          <ul>
            <li>Cadigal Wharf, Circular Quay, Sydney NSW</li>
            <li><a href="mailto:sydneyadventurehubinfo@.com.au">sydneyadventurehubinfo@.com.au</a></li>
            <li><a href="tel:+61212345678">(02) 1234 5678</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer__bottom">
        <p>&copy; 2026 Sydney Adventure Hub</p>
      </div>`;

    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navLinks");
    var backdrop = document.createElement("div");
    backdrop.className = "nav__backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);

    function setMenu(open) {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      backdrop.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    backdrop.addEventListener("click", function () { setMenu(false); });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    header.addEventListener("focusout", function (event) {
      if (!header.contains(event.relatedTarget)) setMenu(false);
    });
    window.matchMedia("(max-width: 820px)").addEventListener("change", function () {
      setMenu(false);
    });
  });
})();

function experienceCardHTML(exp) {
  return `
    <article class="card">
      <div class="card__media"><img src="${exp.image}" alt="${exp.title}" loading="lazy" width="640" height="400"></div>
      <div class="card__body">
        <span class="card__category">${exp.category}</span>
        <h3>${exp.title}</h3>
        <p>${exp.description}</p>
        <div class="card__meta"><span>Duration: ${exp.duration}</span><span>Availability: ${exp.availability}</span></div>
        <div class="card__foot">
          <span class="card__price">$${exp.price} <small>/ person</small></span>
          <a class="btn btn-outline" href="booking.html?exp=${exp.id}" aria-label="Book ${exp.title}">Book</a>
        </div>
      </div>
    </article>`;
}
