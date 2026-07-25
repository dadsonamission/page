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
  // Schließt die Kontakt-Fläche auch, wenn irgendwo auf der noch
  // sichtbaren Seite daneben geklickt wird (nicht auf die Fläche selbst
  // oder den Kontakt-Reiter, die haben ihre eigene Klick-Logik oben).
  document.addEventListener("click", function (e) {
    if (!contactSidebar.classList.contains("open")) return;
    if (contactSidebar.contains(e.target) || contactTab.contains(e.target)) return;
    toggleContact(false);
  });

  /* ---- Scrollcue "Hier geht's weiter": schnelles Ausblenden bei Klick
         oder sobald zu scrollen begonnen wird. Der Klick scrollt gezielt
         bis zum Anfang von "Fatherhood is not a Solo Mission" (#mission)
         statt nur bis zum Anfang der kurzen, transparenten #start-Zone —
         sonst bliebe ein Teil des Hero-Fotos sichtbar stehen.
         Nur auf der Startseite vorhanden. */
  var scrollCue = document.getElementById("scrollCue");
  if (scrollCue) {
    var hideScrollCue = function () { scrollCue.classList.add("is-hidden"); };
    var missionSection = document.getElementById("mission");
    scrollCue.addEventListener("click", function (e) {
      hideScrollCue();
      if (missionSection) {
        e.preventDefault();
        missionSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        hideScrollCue();
      } else {
        scrollCue.classList.remove("is-hidden");
      }
    }, { passive: true });
  }

  /* ---- Eck-Logo: sitzt von Anfang an fixed an seiner finalen Position
         (scrollt nie mit), blendet sich aber erst ein, sobald die
         Santa-Fe-Fläche ("Fatherhood is not a Solo Mission", #mission)
         bereits sichtbar ist — bleibt weiß, solange nur das Santa-Fe-
         Headline-Band (#pitchHeadingBand) im Hintergrund ist, und
         wechselt auf Dark Leather, sobald direkt danach die erste weiße
         Fläche erreicht ist. Diese Farbe bleibt dann bis zum Ende der
         Seite bestehen (keine weiteren Wechsel mehr nötig, da alles
         Folgende auf hellem Untergrund liegt). Deshalb wird
         distanceBottom am Ende von #pitchHeadingBand gemessen, nicht am
         Ende von #mission.
         Nur auf der Startseite vorhanden (dort gibt es #mission/#maskLogo).
         Auf Unterseiten ist das Eck-Logo stattdessen dauerhaft sichtbar
         per CSS positioniert (Klasse .static-fixed in index.html/den
         Unterseiten), daher wird dieser ganze Block dort übersprungen. */
  var pitchSection = document.getElementById("mission");
  var pitchHeadingBand = document.getElementById("pitchHeadingBand");
  var cornerLogo = document.getElementById("cornerLogo");
  var maskLogo = document.getElementById("maskLogo");

  if (pitchSection && cornerLogo && maskLogo) {
    var distanceTop = 0;
    var distanceBottom = 0;

    var measurePitchSection = function () {
      var rect = pitchSection.getBoundingClientRect();
      distanceTop = rect.top + window.scrollY;
      if (pitchHeadingBand) {
        var bandRect = pitchHeadingBand.getBoundingClientRect();
        distanceBottom = bandRect.top + window.scrollY + pitchHeadingBand.offsetHeight;
      } else {
        distanceBottom = distanceTop + pitchSection.offsetHeight;
      }
    };

    var updateCornerLogo = function () {
      var y = window.scrollY;
      cornerLogo.classList.toggle("visible", y >= distanceTop);
      cornerLogo.classList.toggle("swap", y >= distanceBottom);
    };

    /* Großes Hero-Logo: scrollt mit derselben Geschwindigkeit (1:1 mit
       scrollY) nach oben weg wie das Eck-Logo ankommt, und ist vollständig
       verschwunden, sobald distanceTop erreicht ist — genau der Punkt, an
       dem sich das Eck-Logo oben fixiert. Das Hero-Foto selbst (#video)
       bleibt dabei unverändert fix stehen; nur das Logo bewegt sich,
       unabhängig vom fixierten Hintergrund. */
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
      measurePitchSection();
      onScroll();
    });

    measurePitchSection();
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

    // Automatischer Wechsel alle 6 Sekunden — startet erst, sobald der
    // Slider tatsächlich in den Sichtbereich scrollt (nicht sofort beim
    // Laden der Seite), damit man den ersten Durchlauf von Anfang an sieht
    // statt beim Ankommen schon mitten im Zyklus zu landen.
    var autoplay = null;
    function startAutoplay() {
      if (autoplay) return;
      autoplay = window.setInterval(function () { goTo(current + 1); }, 6000);
    }
    if ("IntersectionObserver" in window) {
      var sliderObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startAutoplay();
            sliderObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      sliderObserver.observe(slider);
    } else {
      // Fallback ohne IntersectionObserver-Unterstützung: wie zuvor sofort.
      startAutoplay();
    }
    slider.addEventListener("mouseenter", function () {
      if (autoplay) { window.clearInterval(autoplay); autoplay = null; }
    });
  }

  /* ---- "Nach-Vatern"-Cutout: deutlich verstärkter Parallax-Effekt (Foto
         scrollt langsamer als die Seite). Steht am Anfang von
         "Wie ich arbeite." (ursprünglich auf der Startseite, dorthin
         verlagert). ------------------------------------------------------
         Nur auf Seiten mit dieser Sektion vorhanden. */
  var goldCutoutPhoto = document.getElementById("goldCutoutPhoto");
  var goldCutoutShowcase = document.getElementById("goldCutoutShowcase");

  if (goldCutoutPhoto && goldCutoutShowcase) {
    var updateGoldCutoutParallax = function () {
      var rect = goldCutoutShowcase.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        var progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        var shift = (progress - 0.5) * (rect.height * 0.70); /* nochmals deutlich verstärkt, an den Foto-Puffer (±35%) angepasst */
        goldCutoutPhoto.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
      }
    };

    var gcTicking = false;
    var onGcScroll = function () {
      if (!gcTicking) {
        window.requestAnimationFrame(function () {
          updateGoldCutoutParallax();
          gcTicking = false;
        });
        gcTicking = true;
      }
    };

    window.addEventListener("scroll", onGcScroll, { passive: true });
    window.addEventListener("resize", onGcScroll);
    updateGoldCutoutParallax();
  }

  /* ---- Mission-Banner (Gruppenfoto bei Sonnenuntergang): Parallax
         innerhalb der unteren Bildhälfte (Basis-Position -250% per CSS,
         siehe style.css für die Herleitung). factor:1.0, da hier —
         anders als bei den anderen Parallax-Fotos — die Bewegung genau
         eine Fensterhöhe (rect.height) durchlaufen soll, um innerhalb
         der unteren Bildhälfte zu bleiben. Nur auf "Warum Mission?"
         vorhanden. */
  var missionBannerImg = document.getElementById("missionBannerImg");
  var missionBanner = document.getElementById("missionBanner");

  if (missionBannerImg && missionBanner) {
    var updateMissionBannerParallax = function () {
      var rect = missionBanner.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        var progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        var mbFactor = window.innerWidth <= 900 ? 0.2 : 1.0; /* auf Mobil verdoppelt (vorher 0.1, war kaum sichtbar) — Ruheposition in style.css dafür leicht angepasst (-90% statt -100%), damit trotz stärkerer Bewegung kein Rand ins Leere zeigt */
        var shift = (progress - 0.5) * (rect.height * mbFactor);
        missionBannerImg.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
      }
    };

    var mbTicking = false;
    var onMbScroll = function () {
      if (!mbTicking) {
        window.requestAnimationFrame(function () {
          updateMissionBannerParallax();
          mbTicking = false;
        });
        mbTicking = true;
      }
    };

    window.addEventListener("scroll", onMbScroll, { passive: true });
    window.addEventListener("resize", onMbScroll);
    updateMissionBannerParallax();
  }

  /* ---- Zweiter Mission-Banner (Familie, direkt unter dem Gedicht):
         gleiche Ausschnittshöhe, aber zentrierte statt untere Position
         (Basis -150% per CSS) — daher moderater, symmetrischer
         Bewegungsfaktor (0.7) statt des vollen 1.0 des anderen Banners,
         der genau die untere Bildhälfte ausschöpfen musste. */
  var missionBannerFamilyImg = document.getElementById("missionBannerFamilyImg");
  var missionBannerFamily = document.getElementById("missionBannerFamily");

  if (missionBannerFamilyImg && missionBannerFamily) {
    var updateMissionBannerFamilyParallax = function () {
      var rect = missionBannerFamily.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        var progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        var mbfFactor = window.innerWidth <= 900 ? 0.32 : 0.4; /* auf Mobil verdoppelt (vorher 0.16, war kaum sichtbar) — passt ohne weitere Anpassung sicher in den vorhandenen Spielraum */
        var shift = (progress - 0.5) * (rect.height * mbfFactor);
        missionBannerFamilyImg.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
      }
    };

    var mbfTicking = false;
    var onMbfScroll = function () {
      if (!mbfTicking) {
        window.requestAnimationFrame(function () {
          updateMissionBannerFamilyParallax();
          mbfTicking = false;
        });
        mbfTicking = true;
      }
    };

    window.addEventListener("scroll", onMbfScroll, { passive: true });
    window.addEventListener("resize", onMbfScroll);
    updateMissionBannerFamilyParallax();
  }

  /* ---- Handgezeichnete Hervorhebungen (Kreis/Unterstreichung): "zeichnen
         sich" per stroke-dashoffset-Übergang (siehe style.css), sobald sie
         beim Scrollen ins Bild kommen. Einmalig pro Element — danach
         nicht mehr beobachtet, damit es nicht bei jedem erneuten
         Vorbeiscrollen nochmal "zeichnet". Nur auf Seiten mit
         entsprechend markierten Elementen aktiv. */
  var highlightEls = document.querySelectorAll("[data-highlight]");
  if (highlightEls.length && "IntersectionObserver" in window) {
    var highlightObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-drawn");
          highlightObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    highlightEls.forEach(function (el) { highlightObserver.observe(el); });
  } else {
    // Fallback ohne IntersectionObserver-Unterstützung: direkt anzeigen.
    highlightEls.forEach(function (el) { el.classList.add("is-drawn"); });
  }

  /* ---- Info-Karten (Gemeinschaft/Nach-Vatern/Mission) auf Touch-Geräten:
         Da :hover dort nie zuverlässig auslösbar ist, übernimmt das erste
         Tippen auf eine Karte dessen Rolle (Klasse .is-active, siehe
         style.css) — zeigt Verlauf→Vorschau-Text, genau wie :hover am
         Desktop. Erst ein zweites Tippen auf dieselbe, bereits aktive
         Karte folgt dann dem Link ganz normal. Tippen außerhalb schließt
         eine offene Vorschau wieder. Nur relevant, wenn kein zuverlässiger
         Hover vorhanden ist — auf Geräten mit Maus bleibt :hover
         unangetastet, dieser Code greift dort gar nicht ein. */
  var infoCards = document.querySelectorAll(".info-card");
  var noReliableHover = window.matchMedia &&
    window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (infoCards.length && noReliableHover) {
    infoCards.forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (!card.classList.contains("is-active")) {
          e.preventDefault();
          infoCards.forEach(function (c) { c.classList.remove("is-active"); });
          card.classList.add("is-active");
        }
        // Karte war schon aktiv: kein preventDefault, Link öffnet normal.
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".info-card")) {
        infoCards.forEach(function (c) { c.classList.remove("is-active"); });
      }
    });
  }
})();

