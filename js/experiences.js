/* ============================================
   Experiences & Packages page:
   search + category filter + sort over EXPERIENCES.
   ============================================ */
(function () {
  var activeCategory = "All";
  var searchTerm = "";
  var sortMode = "default";

  document.addEventListener("DOMContentLoaded", function () {
    buildCategoryChips();
    bindControls();
    render();
  });

  function buildCategoryChips() {
    var wrap = document.getElementById("categoryFilters");
    var categories = ["All"].concat(
      EXPERIENCES.map(function (e) { return e.category; })
        .filter(function (c, i, arr) { return arr.indexOf(c) === i; })
    );
    wrap.innerHTML = categories.map(function (cat) {
      return '<button class="chip' + (cat === "All" ? " is-active" : "") + '" aria-pressed="' + (cat === "All") + '" data-cat="' + cat + '">' + cat + "</button>";
    }).join("");

    wrap.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      activeCategory = btn.dataset.cat;
      Array.prototype.forEach.call(wrap.children, function (c) {
        c.classList.toggle("is-active", c === btn);
        c.setAttribute("aria-pressed", String(c === btn));
      });
      render();
    });
  }

  function bindControls() {
    document.getElementById("searchInput").addEventListener("input", function (e) {
      searchTerm = e.target.value.trim().toLowerCase();
      render();
    });
    document.getElementById("sortSelect").addEventListener("change", function (e) {
      sortMode = e.target.value;
      render();
    });
  }

  function getFiltered() {
    var list = EXPERIENCES.filter(function (exp) {
      var matchesCategory = activeCategory === "All" || exp.category === activeCategory;
      var haystack = (exp.title + " " + exp.category + " " + exp.description).toLowerCase();
      var matchesSearch = searchTerm === "" || haystack.indexOf(searchTerm) !== -1;
      return matchesCategory && matchesSearch;
    });

    if (sortMode === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
    if (sortMode === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
    if (sortMode === "duration-asc") list.sort(function (a, b) { return a.durationHrs - b.durationHrs; });

    return list;
  }

  function render() {
    var grid = document.getElementById("experienceGrid");
    var empty = document.getElementById("emptyState");
    var count = document.getElementById("resultCount");
    var results = getFiltered();

    count.textContent = results.length + " experience" + (results.length === 1 ? "" : "s") + " found";
    grid.innerHTML = results.map(experienceCardHTML).join("");
    empty.hidden = results.length !== 0;
  }

})();
