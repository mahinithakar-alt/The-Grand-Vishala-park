/* =========================================================
   The Grand Vishala — Module 02: Home Screen
   home.js  |  Navigation, scroll behaviour and Read More toggle
   ========================================================= */

(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var hamburger = document.getElementById("hamburger");
  var navMenu = document.getElementById("navMenu");

  /* ---------------------------------------------------------
     1. Mobile menu (hamburger)
     --------------------------------------------------------- */
  function setMenu(open) {
    navMenu.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  hamburger.addEventListener("click", function () {
    setMenu(!navMenu.classList.contains("open"));
  });

  // Close the menu after choosing a link
  navMenu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  // Close with the Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      setMenu(false);
      hamburger.focus();
    }
  });

  // Reset when the window grows back to desktop width
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) setMenu(false);
  });

  /* ---------------------------------------------------------
     2. Header turns solid after scrolling
     --------------------------------------------------------- */
  function updateHeader() {
    header.classList.toggle("is-solid", window.scrollY > 40);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------------------------------------------------------
     3. Highlight the nav link of the section in view
     --------------------------------------------------------- */
  var spyLinks = document.querySelectorAll("[data-spy]");
  var sections = Array.prototype.map.call(spyLinks, function (link) {
    return document.getElementById(link.dataset.spy);
  });

  function updateActiveLink() {
    var offset = window.scrollY + header.offsetHeight + 120;
    var current = "home";

    sections.forEach(function (section) {
      if (section && section.offsetTop <= offset) current = section.id;
    });

    // Contact (footer) is active when the page bottom is reached
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) current = "contact";

    spyLinks.forEach(function (link) {
      link.classList.toggle("active", link.dataset.spy === current);
    });
  }
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------------------------------------------------------
     4. About Us: Read More / Read Less
     --------------------------------------------------------- */
  var readBtn = document.getElementById("readMoreBtn");
  var aboutMore = document.getElementById("aboutMore");

  readBtn.addEventListener("click", function () {
    var open = aboutMore.classList.toggle("open");
    readBtn.textContent = open ? "Read Less" : "Read More";
    readBtn.setAttribute("aria-expanded", String(open));
  });

  /* ---------------------------------------------------------
     5. Footer year
     --------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
