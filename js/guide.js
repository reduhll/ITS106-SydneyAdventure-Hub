/* ============================================
   Visitor Guide & FAQ: expandable/collapsible accordion.
   ============================================ */
(function () {
  var FAQS = [
    {
      q: "Do I need previous hiking or kayaking experience?",
      a: "No. Our Blue Mountains hike and coastal walk are graded easy-to-moderate and suit most fitness levels. The kayak trail includes a short paddling briefing before you set off, so no prior experience is required."
    },
    {
      q: "What happens if it rains on the day of my trip?",
      a: "Light rain doesn't usually stop a trip. In the case of severe weather, storms, or unsafe trail/water conditions, we'll contact you the evening before or morning of to reschedule or offer a full refund."
    },
    {
      q: "Are your trips suitable for young children?",
      a: "The Wildlife Sanctuary Encounter and Hawkesbury River Eco Cruise are family-friendly for all ages. The Blue Mountains hike and coastal walk suit ages 8 and up due to distance and terrain."
    },
    {
      q: "Can I bring my own food and drinks?",
      a: "Yes, you're welcome to bring your own snacks and a refillable water bottle. A packed lunch and light refreshments can also be added as an extra when booking."
    },
    {
      q: "How do I know my booking is confirmed?",
      a: "After submitting a booking request through the calculator page, our team reviews availability and sends a confirmation email within 24 hours with your exact meeting point and time."
    },
    {
      q: "Is transport to the meeting point included?",
      a: "Meeting points are accessible by public transport. If you'd prefer door-to-door travel, hotel pickup and drop-off can be added as an optional extra on the booking page."
    }
  ];

  document.addEventListener("DOMContentLoaded", function () {
    var wrap = document.getElementById("faqAccordion");
    wrap.innerHTML = FAQS.map(function (item, i) {
      return (
        '<div class="accordion-item">' +
          '<h3 style="margin:0;">' +
            '<button class="accordion-trigger" aria-expanded="false" aria-controls="faq-panel-' + i + '" id="faq-trigger-' + i + '">' +
              "<span>" + item.q + "</span><span class=\"plus\" aria-hidden=\"true\">+</span>" +
            "</button>" +
          "</h3>" +
          '<div class="accordion-panel" id="faq-panel-' + i + '" role="region" aria-labelledby="faq-trigger-' + i + '"><p>' + item.a + "</p></div>" +
        "</div>"
      );
    }).join("");

    wrap.addEventListener("click", function (e) {
      var trigger = e.target.closest(".accordion-trigger");
      if (!trigger) return;
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isOpen));
      if (isOpen) {
        panel.style.maxHeight = null;
        panel.classList.remove("is-open");
      } else {
        panel.classList.add("is-open");
        panel.style.maxHeight = panel.scrollHeight + 20 + "px";
      }
    });
  });
})();
