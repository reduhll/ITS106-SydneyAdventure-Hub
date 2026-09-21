/* ============================================
   Contact & Feedback form: required-field and
   email-format validation, with confirmation message.
   ============================================ */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contactForm");
    form.addEventListener("input", function () { document.getElementById("contactConfirm").hidden = true; });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = validateForm();
      var confirm = document.getElementById("contactConfirm");
      confirm.hidden = !valid;
      if (valid) {
        confirm.scrollIntoView({ block: "nearest" });
        var name = document.getElementById("fullName").value.trim();
        var email = document.getElementById("email").value.trim();
        var type = document.getElementById("enquiryType").selectedOptions[0].text;
        var rating = document.getElementById("rating").selectedOptions[0].text;
        var message = document.getElementById("message").value.trim();
        var body = "Name: " + name + "\nEmail: " + email + "\nEnquiry type: " + type + "\nRating: " + rating + "\n\n" + message;
        confirm.querySelector("a").href = "mailto:sydneyadventurehubinfo@.com.au?subject=" + encodeURIComponent(type + " - " + name) + "&body=" + encodeURIComponent(body);
      }
    });
  });

  function setError(fieldId, message) {
    var field = document.getElementById("field-" + fieldId);
    var error = document.getElementById("error-" + fieldId);
    field.classList.toggle("has-error", !!message);
    error.textContent = message || "";
    field.querySelector("input, select, textarea").setAttribute("aria-invalid", String(!!message));
  }

  function validateForm() {
    var isValid = true;

    var name = document.getElementById("fullName").value.trim();
    if (!name) { setError("fullName", "Please enter your name."); isValid = false; }
    else setError("fullName", "");

    var email = document.getElementById("email").value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) { setError("email", "Please enter your email."); isValid = false; }
    else if (!emailPattern.test(email)) { setError("email", "Please enter a valid email address."); isValid = false; }
    else setError("email", "");

    var enquiryType = document.getElementById("enquiryType").value;
    if (!enquiryType) { setError("enquiryType", "Please select an enquiry type."); isValid = false; }
    else setError("enquiryType", "");

    var message = document.getElementById("message").value.trim();
    if (!message) { setError("message", "Please enter a message."); isValid = false; }
    else if (message.length < 10) { setError("message", "Please add a little more detail (10+ characters)."); isValid = false; }
    else setError("message", "");

    if (!isValid) document.querySelector(".has-error input, .has-error select, .has-error textarea").focus();
    return isValid;
  }
})();
