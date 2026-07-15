/* ==========================================================================
   Dads on a Mission — Interaktion
   Reines Vanilla JS, keine Abhängigkeiten. Steuert das Fullscreen-Menü, den
   Kontakt-Ausklapper, das scroll-fixierte Eck-Logo mit Farbwechsel, den
   Hero-Logo-Scroll-Effekt sowie einen einfachen Produkt-Slider.
   ========================================================================== */
(function () {
  "use strict";

  var header = document.getElementById("header");

  /* ---- Fullscreen-Menü ---------------------------------------------- */
  var burgerBtn = document.getElementById("burgerBtn");
  var bigmenu = document.getElementById("bigmenu");

  function toggleMenu() {
    var isOpen = header.classList.toggle("navi");
    burgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    bigmenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
  }
  burgerBtn.addEventListener("click", toggleMenu);
  burgerBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleMenu(); }
  });
  // Menü schließen, wenn ein Link im Menü angeklickt wird
  bigmenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      header.classList.remove("navi");
      burgerBtn.setAttribute("aria-expanded", "false");
      bigmenu.setAttribute("aria-hidden", "true");
    });
  });

  /* ---- Kontakt-Ausklapper --------------------------------------------- */
  var contactTab = document.getElementById("contactTab");
  var contactSidebar = document.getElementById("contactSidebar");
  var contactClose = document.getElementById("contactClose");

  function toggleContact(open) {
    var shouldOpen = typeof open === "boolean" ? open : !contactSidebar.classList.contains("open");
    contactSidebar.classList.toggle("open", shouldOpen);
    contactSidebar.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
  }
  contactTab.addEventListener("click", function () { toggleContact(); });
  contactTab.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleContact(); }
  });
  contactClose.addEventListener("click", function () { toggleContact(false); });

  /* ---- Scrollcue "Hier geht's weiter": schnelles Ausblenden bei Klick
         oder sobald zu scrollen begonnen wird ----------------------------
         Nur auf der Startseite vorhanden. */
  var scrollCue = document.getElementById("scrollCue");
  if (scrollCue) {
    var hideScrollCue = function () { scrollCue.classList.add("is-hidden"); };
    scrollCue.addEventListener("click", hideScrollCue);
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        hideScrollCue();
      } else {
        scrollCue.classList.remove("is-hidden");
      }
    }, { passive: true });
  }

  /* ---- Eck-Logo: fixiert sich sobald #manifest erreicht ist,
         wechselt Farbe/Deckkraft sobald #manifest verlassen wird -------
         Nur auf der Startseite vorhanden (dort gibt es #manifest/#maskLogo).
         Auf Unterseiten ist das Eck-Logo stattdessen dauerhaft fix per CSS
         positioniert (Klasse .static-fixed in index.html/den Unterseiten),
         daher wird dieser ganze Block dort übersprungen. */
  var manifest = document.getElementById("manifest");
  var cornerLogo = document.getElementById("cornerLogo");
  var maskLogo = document.getElementById("maskLogo");

  if (manifest && cornerLogo && maskLogo) {
    var distanceTop = 0;
    var distanceBottom = 0;

    var measureManifest = function () {
      var rect = manifest.getBoundingClientRect();
      distanceTop = rect.top + window.scrollY;
      distanceBottom = distanceTop + manifest.offsetHeight;
    };

    var updateCornerLogo = function () {
      var y = window.scrollY;
      cornerLogo.classList.toggle("fixed", y >= distanceTop);
      cornerLogo.classList.toggle("swap", y >= distanceBottom);
    };

    /* Großes Hero-Logo: scrollt mit derselben Geschwindigkeit (1:1 mit
       scrollY) nach oben weg wie das Eck-Logo/der Manifest-Text ankommen,
       und ist vollständig verschwunden, sobald distanceTop erreicht ist —
       genau der Punkt, an dem sich das Eck-Logo oben fixiert. Das Hero-Foto
       selbst (#video) bleibt dabei unverändert fix stehen; nur das Logo
       bewegt sich, unabhängig vom fixierten Hintergrund. */
    var updateMaskLogo = function () {
      var shift = Math.min(window.scrollY, distanceTop);
      maskLogo.style.transform = "translate3d(-50%, calc(-50% - " + shift + "px), 0)";
    };

    var ticking = false;
    var onScroll = function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateCornerLogo();
          updateMaskLogo();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () {
      measureManifest();
      onScroll();
    });

    measureManifest();
    updateCornerLogo();
    updateMaskLogo();
  }

  /* ---- Produkt-Slider --------------------------------------------------- */
  var slider = document.getElementById("productSlider");
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll(".slide"));
    var pager = document.getElementById("sliderPager");
    var current = 0;

    slides.forEach(function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.textContent = String(i + 1).padStart(2, "0");
      dot.addEventListener("click", function () { goTo(i); });
      pager.appendChild(dot);
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("active", i === current);
      });
      pager.querySelectorAll("button").forEach(function (dot, i) {
        dot.classList.toggle("active", i === current);
      });
    }

    document.getElementById("prevSlide").addEventListener("click", function () { goTo(current - 1); });
    document.getElementById("nextSlide").addEventListener("click", function () { goTo(current + 1); });

    goTo(0);

    // Optional: automatischer Wechsel alle 6 Sekunden
    var autoplay = window.setInterval(function () { goTo(current + 1); }, 6000);
    slider.addEventListener("mouseenter", function () { window.clearInterval(autoplay); });
  }

  /* ---- "Nach-Vätern"-Bildsektion: Foto scrollt langsamer als die Seite
         (Parallax) --------------------------------------------------------
         Nur auf "wie-ich-arbeite.html" vorhanden. */
  var nachvaternPhoto = document.getElementById("nachvaternPhoto");
  var nachvaternShowcase = document.getElementById("nachvaternShowcase");

  if (nachvaternPhoto && nachvaternShowcase) {
    var updateNachvaternParallax = function () {
      var rect = nachvaternShowcase.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        var progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        var shift = (progress - 0.5) * (rect.height * 0.07); /* an minimalen Foto-Puffer angepasst (Foto-Kanten sollen bündig sein) */
        nachvaternPhoto.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
      }
    };

    var nvTicking = false;
    var onNvScroll = function () {
      if (!nvTicking) {
        window.requestAnimationFrame(function () {
          updateNachvaternParallax();
          nvTicking = false;
        });
        nvTicking = true;
      }
    };

    window.addEventListener("scroll", onNvScroll, { passive: true });
    window.addEventListener("resize", onNvScroll);
    updateNachvaternParallax();
  }
})();

