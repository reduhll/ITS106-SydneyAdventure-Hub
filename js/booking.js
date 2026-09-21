/* ============================================
   Booking & Cost Calculator:
   live estimate + validation + booking summary.
   ============================================ */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("tripDate").min = localToday();
    populateExperienceSelect();
    populateExtras();
    preselectFromQuery();
    bindLiveCalculation();
    bindSubmit();
    updateSummary();
  });

  function localToday() {
    var today = new Date();
    return today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
  }

  function populateExperienceSelect() {
    var select = document.getElementById("experienceSelect");
    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select an experience\u2026";
    select.appendChild(placeholder);

    EXPERIENCES.forEach(function (exp) {
      var opt = document.createElement("option");
      opt.value = exp.id;
      opt.textContent = exp.title + " \u2014 $" + exp.price + " / person";
      select.appendChild(opt);
    });
  }

  function populateExtras() {
    var wrap = document.getElementById("extrasList");
    wrap.innerHTML = EXTRAS.map(function (extra) {
      return (
        '<label class="checkbox-row">' +
          '<input type="checkbox" name="extras" value="' + extra.id + '"> ' +
          extra.label + " (+$" + extra.price + " / person)" +
        "</label>"
      );
    }).join("");
  }

  function preselectFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var expId = params.get("exp");
    if (expId) {
      var select = document.getElementById("experienceSelect");
      select.value = expId;
    }
  }

  function bindLiveCalculation() {
    var form = document.getElementById("bookingForm");
    form.addEventListener("input", updateSummary);
    form.addEventListener("change", updateSummary);
  }

  function getSelectedExperience() {
    var id = document.getElementById("experienceSelect").value;
    return EXPERIENCES.find(function (e) { return e.id === id; });
  }

  function getSelectedExtras() {
    var boxes = document.querySelectorAll('input[name="extras"]:checked');
    return Array.prototype.map.call(boxes, function (box) {
      return EXTRAS.find(function (e) { return e.id === box.value; });
    });
  }

  function calculateTotal() {
    var exp = getSelectedExperience();
    var participants = Number(document.getElementById("participants").value);
    if (!exp || !Number.isSafeInteger(participants) || participants < 1) return null;

    var extras = getSelectedExtras();
    var extrasPerPerson = extras.reduce(function (sum, e) { return sum + e.price; }, 0);
    var baseTotal = exp.price * participants;
    var extrasTotal = extrasPerPerson * participants;

    return {
      exp: exp,
      participants: participants,
      extras: extras,
      baseTotal: baseTotal,
      extrasTotal: extrasTotal,
      grandTotal: baseTotal + extrasTotal
    };
  }

  function updateSummary() {
    document.getElementById("confirmBanner").hidden = true;
    var box = document.getElementById("summaryBox");
    var list = document.getElementById("summaryList");
    var calc = calculateTotal();

    if (!calc) {
      list.innerHTML = "";
      box.querySelector("p").hidden = false;
      return;
    }
    box.querySelector("p").hidden = true;

    var rows =
      "<dt>Experience</dt><dd>" + calc.exp.title + "</dd>" +
      "<dt>Participants</dt><dd>" + calc.participants + "</dd>" +
      "<dt>Base (" + calc.participants + " \u00d7 $" + calc.exp.price + ")</dt><dd>$" + calc.baseTotal.toFixed(2) + "</dd>";

    var date = document.getElementById("tripDate").value;
    if (date) rows += "<dt>Preferred date</dt><dd>" + new Date(date + "T00:00:00").toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) + "</dd>";
    if (calc.extras.length) {
      rows += "<dt>Extras</dt><dd>$" + calc.extrasTotal.toFixed(2) + "</dd>";
    }
    rows += '<dt class="total-row">Estimated total</dt><dd class="total-row">$' + calc.grandTotal.toFixed(2) + "</dd>";

    list.innerHTML = rows;
  }

  function bindSubmit() {
    document.getElementById("bookingForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = validateForm();
      document.getElementById("confirmBanner").hidden = !valid;
      if (valid) {
        document.getElementById("confirmBanner").scrollIntoView({ block: "nearest" });
      }
    });
  }

  function setError(fieldId, message) {
    var field = document.getElementById("field-" + fieldId);
    var error = document.getElementById("error-" + fieldId);
    field.classList.toggle("has-error", !!message);
    error.textContent = message || "";
    field.querySelector("input, select, textarea").setAttribute("aria-invalid", String(!!message));
  }

  function validateForm() {
    var isValid = true;

    var name = document.getElementById("customerName").value.trim();
    if (!name) { setError("customerName", "Please enter your full name."); isValid = false; }
    else setError("customerName", "");

    var email = document.getElementById("customerEmail").value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) { setError("customerEmail", "Please enter your email."); isValid = false; }
    else if (!emailPattern.test(email)) { setError("customerEmail", "Please enter a valid email address."); isValid = false; }
    else setError("customerEmail", "");

    var expId = document.getElementById("experienceSelect").value;
    if (!expId) { setError("experience", "Please choose an experience."); isValid = false; }
    else setError("experience", "");

    var date = document.getElementById("tripDate").value;
    if (!date) { setError("tripDate", "Please select a date."); isValid = false; }
    else {
      if (date < localToday()) { setError("tripDate", "Date can't be in the past."); isValid = false; }
      else setError("tripDate", "");
    }

    var participants = Number(document.getElementById("participants").value);
    if (!Number.isSafeInteger(participants) || participants < 1) { setError("participants", "Enter a whole number of at least 1 participant."); isValid = false; }
    else setError("participants", "");

    if (!isValid) document.querySelector(".has-error input, .has-error select, .has-error textarea").focus();
    return isValid;
  }
})();
