/* ============================================
   Shared header + footer, injected on every page.
   Keeps navigation and branding consistent site-wide.
   ============================================ */
(function () {
  var NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "experiences.html", label: "Experiences" },
    { href: "booking.html", label: "Booking Calculator" },
    { href: "guide.html", label: "Visitor Guide & FAQ" },
    { href: "contact.html", label: "Contact" }
  ];

  function currentFile() {
    var path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function renderHeader() {
    var here = currentFile();
    var links = NAV_LINKS.map(function (link) {
      var current = link.href === here ? ' aria-current="page"' : "";
      return '<li><a href="' + link.href + '"' + current + ">" + link.label + "</a></li>";
    }).join("");

    return (
      '<div class="container nav">' +
        '<a class="brand" href="index.html">' +
          '<svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true">' +
            '<circle cx="20" cy="20" r="19" fill="#365E32"/>' +
            '<path d="M20 30 L20 16 M20 16 L13 22 M20 16 L27 22" stroke="#F5F0E1" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
            '<path d="M8 30 Q20 22 32 30" stroke="#8CC8D8" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
          "</svg>" +
          '<span class="brand__text">Sydney Adventure Hub<span>Nature &amp; Eco Escapes</span></span>' +
        "</a>" +
        '<button class="nav__toggle" id="navToggle" aria-expanded="false" aria-controls="navLinks" aria-label="Toggle menu">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
        "</button>" +
        '<ul class="nav__links" id="navLinks">' + links + "</ul>" +
        '<div class="nav__cta"><a class="btn btn-primary" href="booking.html">Book Now</a></div>' +
      "</div>"
    );
  }

  function renderFooter() {
    return (
      '<div class="container footer__grid">' +
        "<div>" +
          '<h4>Sydney Adventure Hub</h4>' +
          "<p>Small-group nature and eco experiences across Greater Sydney &mdash; hikes, water trails, wildlife and coastal days out, run with a Leave No Trace approach.</p>" +
        "</div>" +
        "<div>" +
          "<h4>Explore</h4>" +
          '<ul>' +
            '<li><a href="experiences.html">Experiences &amp; Packages</a></li>' +
            '<li><a href="booking.html">Booking &amp; Cost Calculator</a></li>' +
            '<li><a href="guide.html">Visitor Guide &amp; FAQ</a></li>' +
            '<li><a href="contact.html">Contact &amp; Feedback</a></li>' +
          "</ul>" +
        "</div>" +
        "<div>" +
          "<h4>Reach us</h4>" +
          '<ul>' +
            '<li>Cadigal Wharf, Circular Quay, Sydney NSW</li>' +
            '<li><a href="mailto:hello@sydneyadventurehub.com.au">hello@sydneyadventurehub.com.au</a></li>' +
            '<li><a href="tel:+61212345678">(02) 1234 5678</a></li>' +
          "</ul>" +
        "</div>" +
      "</div>" +
      '<div class="container footer__bottom">' +
        "<span>&copy; 2026 Sydney Adventure Hub. Student project for ITS106.</span>" +
        "<span>Built with HTML, CSS &amp; JavaScript</span>" +
      "</div>"
    );
  }

    document.addEventListener("DOMContentLoaded", function () {
    var headerMount = document.getElementById("site-header");
    var footerMount = document.getElementById("site-footer");
    if (headerMount) headerMount.innerHTML = renderHeader();
    if (footerMount) footerMount.innerHTML = renderFooter();

    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    var backdrop = document.createElement("div");
    backdrop.className = "nav__backdrop";
    backdrop.id = "navBackdrop";
    document.body.appendChild(backdrop);
    if (toggle && links) {
      var closeMenu = function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        backdrop.classList.remove("is-open");
      };
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        backdrop.classList.toggle("is-open", open);
      });
      backdrop.addEventListener("click", closeMenu);
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeMenu);
      });
    }
  });
})();
