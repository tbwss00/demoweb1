(function () {
  "use strict";

  /* ── Año en footer ── */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Menú responsive ── */
  var navToggle = document.getElementById("navToggle");
  var navMenu   = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
      document.body.classList.toggle("nav-open");
    });
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        document.body.classList.remove("nav-open");
      });
    });
  }

  /* ── Selector de idioma ── */
  var currentLang = "en";

  function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll(".lang-es").forEach(function (el) {
      el.style.display = (lang === "es") ? "inline" : "none";
    });
    document.querySelectorAll(".lang-en").forEach(function (el) {
      el.style.display = (lang === "en") ? "inline" : "none";
    });
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    document.documentElement.lang = lang;
  }

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () { setLanguage(btn.dataset.lang); });
  });

  setLanguage("en");

  /* ── Slideshow ── */
  var slides       = document.querySelectorAll(".slide");
  var dots         = document.querySelectorAll(".slide-dot");
  var progressBar  = document.getElementById("slideProgressBar");
  var currentSlide = 0;
  var slideTimer   = null;
  var DURATION     = 5000;

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
    if (progressBar) {
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          progressBar.style.transition = "width " + DURATION + "ms linear";
          progressBar.style.width = "100%";
        });
      });
    }
  }

  function startAuto() {
    slideTimer = setInterval(function () { goToSlide(currentSlide + 1); }, DURATION);
  }
  function resetAuto() { clearInterval(slideTimer); startAuto(); }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      goToSlide(parseInt(this.dataset.index, 10));
      resetAuto();
    });
  });

  if (slides.length > 0) { goToSlide(0); startAuto(); }

  /* ── Accordion servicios ── */
  document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var item   = this.closest(".accordion-item");
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".accordion-item").forEach(function (el) {
        el.classList.remove("open");
        el.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        this.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ── PROYECTOS — datos ── */
  var PROJECTS = [
    {
      img:   "img/proj1.jpg",
      title: { en: "Building Structures",   es: "Estructuras para edificios" },
      desc:  {
        en: "Welding and erection of structural steel members for medium and large-scale building projects. We ensure precision cuts, certified welds and on-time delivery for every phase of construction.",
        es: "Soldadura y montaje de perfiles estructurales para proyectos de media y gran envergadura. Garantizamos cortes precisos, soldaduras certificadas y entrega a tiempo en cada fase de la obra."
      },
      tags: { en: ["Structural Steel", "MIG Welding", "Construction"], es: ["Acero estructural", "Soldadura MIG", "Construcción"] }
    },
    {
      img:   "img/proj2.jpg",
      title: { en: "Industrial Plants",     es: "Plantas industriales" },
      desc:  {
        en: "Installation of piping, supports and equipment using certified welding procedures. We work with carbon steel and stainless steel in process and chemical plants across the region.",
        es: "Montaje de tuberías, soportes y equipos con procedimientos certificados de soldadura. Trabajamos con acero al carbono e inoxidable en plantas de proceso y químicas de la región."
      },
      tags: { en: ["Piping", "TIG Welding", "Industrial"], es: ["Tuberías", "Soldadura TIG", "Industrial"] }
    },
    {
      img:   "img/proj3.jpg",
      title: { en: "Field Work",            es: "Trabajos en campo" },
      desc:  {
        en: "Mobile welding services for urgent repairs and on-site adjustments. Our field teams respond quickly, equipped to work in any condition to minimize downtime.",
        es: "Servicios móviles de soldadura para reparaciones urgentes y ajustes directamente en obra. Nuestros equipos de campo responden rápidamente, preparados para trabajar en cualquier condición."
      },
      tags: { en: ["Field Service", "SMAW", "Emergency Repair"], es: ["Servicio en campo", "Electrodo", "Reparación urgente"] }
    },
    {
      img:   "img/proj4.jpg",
      title: { en: "Custom Fabrication",    es: "Fabricación a medida" },
      desc:  {
        en: "Design and fabrication of beams, columns, supports, platforms and custom steel enclosures. We deliver mount-ready structures with precision cutting, drilling and finishing.",
        es: "Diseño y fabricación de vigas, columnas, soportes, plataformas y cerramientos metálicos a medida. Entregamos estructuras listas para montaje con cortes, perforados y acabados de precisión."
      },
      tags: { en: ["Fabrication", "Custom Steel", "Precision Cutting"], es: ["Fabricación", "Acero a medida", "Corte de precisión"] }
    },
    {
      img:   "img/proj5.jpg",
      title: { en: "Industrial Maintenance", es: "Mantenimiento industrial" },
      desc:  {
        en: "Preventive and corrective maintenance for equipment, machinery and production lines. We repair cracks, reinforce structures and rehabilitate parts to minimize plant downtime.",
        es: "Mantenimiento preventivo y correctivo para equipos, maquinaria y líneas de producción. Reparamos fisuras, reforzamos estructuras y rehabilitamos piezas para minimizar paradas de planta."
      },
      tags: { en: ["Maintenance", "Structural Repair", "Plant"], es: ["Mantenimiento", "Reparación estructural", "Planta"] }
    },
    {
      img:   "img/proj6.jpg",
      title: { en: "Structural Assemblies", es: "Montajes estructurales" },
      desc:  {
        en: "Coordination and execution of structural steel assembly on construction sites. We manage logistics, safety protocols and quality control from start to final handover.",
        es: "Coordinación y ejecución del montaje de acero estructural en obras. Gestionamos logística, protocolos de seguridad y control de calidad desde el inicio hasta la entrega final."
      },
      tags: { en: ["Assembly", "Steel Erection", "Site Management"], es: ["Montaje", "Erección de acero", "Gestión de obra"] }
    }
  ];

  /* ── Lightbox ── */
  var lightbox         = document.getElementById("lightbox");
  var lightboxBackdrop = document.getElementById("lightboxBackdrop");
  var lightboxImg      = document.getElementById("lightboxImg");
  var lightboxTitle    = document.getElementById("lightboxTitle");
  var lightboxDesc     = document.getElementById("lightboxDesc");
  var lightboxCounter  = document.getElementById("lightboxCounter");
  var lightboxTags     = document.getElementById("lightboxTags");
  var lightboxClose    = document.getElementById("lightboxClose");
  var lightboxPrev     = document.getElementById("lightboxPrev");
  var lightboxNext     = document.getElementById("lightboxNext");
  var currentProject   = 0;

  function renderLightbox(index) {
    var p    = PROJECTS[index];
    var lang = currentLang;
    lightboxImg.src             = p.img;
    lightboxImg.alt             = p.title[lang];
    lightboxTitle.textContent   = p.title[lang];
    lightboxDesc.textContent    = p.desc[lang];
    lightboxCounter.textContent = (index + 1) + " / " + PROJECTS.length;
    lightboxTags.innerHTML = "";
    p.tags[lang].forEach(function (t) {
      var span = document.createElement("span");
      span.className   = "lightbox-tag";
      span.textContent = t;
      lightboxTags.appendChild(span);
    });
    lightboxPrev.style.visibility = (index === 0)                    ? "hidden" : "visible";
    lightboxNext.style.visibility = (index === PROJECTS.length - 1) ? "hidden" : "visible";
  }

  function openLightbox(index) {
    currentProject = index;
    renderLightbox(currentProject);
    lightbox.hidden = false;
    lightboxBackdrop.classList.add("visible");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () {
      lightbox.style.opacity       = "1";
      lightbox.style.pointerEvents = "all";
    });
  }

  function closeLightbox() {
    lightbox.style.opacity       = "0";
    lightbox.style.pointerEvents = "none";
    lightboxBackdrop.classList.remove("visible");
    document.body.style.overflow = "";
    setTimeout(function () { lightbox.hidden = true; }, 300);
  }

  document.querySelectorAll(".project-card").forEach(function (card) {
    card.addEventListener("click", function () {
      openLightbox(parseInt(this.dataset.index, 10));
    });
  });

  lightboxPrev.addEventListener("click", function () {
    if (currentProject > 0) { currentProject--; renderLightbox(currentProject); }
  });

  lightboxNext.addEventListener("click", function () {
    if (currentProject < PROJECTS.length - 1) { currentProject++; renderLightbox(currentProject); }
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowLeft"  && currentProject > 0)                   { currentProject--; renderLightbox(currentProject); }
    if (e.key === "ArrowRight" && currentProject < PROJECTS.length - 1) { currentProject++; renderLightbox(currentProject); }
  });

  /* ── Formulario de contacto ── */
  var contactForm = document.getElementById("contactForm");
  var formMessage = document.getElementById("formMessage");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      formMessage.textContent = currentLang === "es"
        ? "¡Gracias! Responderemos a la brevedad."
        : "Thank you! We will get back to you shortly.";
      contactForm.reset();
    });
  }

})();
