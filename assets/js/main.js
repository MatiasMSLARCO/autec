// AUTEC — motion system
// Replica el sistema de interacciones IX2 de turah.com con GSAP + ScrollTrigger + Lenis.
// Valores (keyframes/easing/duración) extraídos del Webflow compilado real.
// Regla de robustez: si GSAP no carga, se limpia todo estado oculto y el
// sitio queda 100% usable y visible (fallback en revealAllStatic).

(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = Boolean(window.gsap && window.ScrollTrigger);

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initMobileNav();
    initNavHideShow();
    initContactForm();
    initSliderControls();
    initModelsShowcase();

    if (!hasGsap) {
      revealAllStatic();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (!reduced) initLenis();

    runIntro(); // preloader + reveal_hero + reveal_nav
    initScrollLogo(); // wordmark gigante que se encoge (scroll_logo)
    initHeroParallax(); // scroll_hero / scroll_video
    initTextReveals(); // reveal (fade + translate)
    initImageReveals(); // reveal con máscara (a-6)
    initStackedSections(); // overlap reveal (secciones apiladas)
    initFooterWordmark();

    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  // ---- Smooth scroll (Lenis) sincronizado con ScrollTrigger ----
  function initLenis() {
    if (!window.Lenis) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // ---- Secuencia de carga: preloader se retira, hero y nav revelan ----
  function runIntro() {
    const preloader = document.querySelector("[data-preloader]");
    const panels = preloader
      ? preloader.querySelectorAll(".preloader-panel")
      : [];
    const heroMedia = document.querySelector("[data-hero-media]");
    const heroWord = document.querySelector("[data-hero-wordmark]");

    // reveal_hero (a-29): zoom lento del media al cargar
    if (heroMedia) {
      if (heroMedia.tagName === "VIDEO") heroMedia.play().catch(() => {});
      gsap.fromTo(
        heroMedia,
        { scale: 1.25 },
        { scale: 1.05, duration: 6, ease: "power2.out" },
      );
    }
    if (heroWord)
      gsap.fromTo(
        heroWord,
        { opacity: 0, y: 40 },
        { opacity: 0.85, y: 0, duration: 1.2, delay: 0.2, ease: "expo.out" },
      );

    const tl = gsap.timeline();
    if (panels.length) {
      tl.to(panels, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.9,
        ease: "expo.inOut",
        stagger: 0.08,
      }).set(preloader, { display: "none" });
    }
  }

  // ---- scroll_logo (a-32): wordmark gigante scale 1 -> 0.124 al iniciar scroll ----
  function initScrollLogo() {
    const word = document.querySelector("[data-hero-wordmark]");
    const hero = document.querySelector("[data-hero]");
    const header = document.querySelector("[data-site-header]");
    if (!word || !hero) return;

    // wordmark es position:fixed → centro en 50vh; lo llevamos al tope (nav) al scrollear.
    gsap.to(word, {
      scale: 0.13,
      y: () => -(window.innerHeight / 2) + 44,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "40% top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }

  // ---- scroll_hero / scroll_video (a-28/a-68): parallax -10% -> +10% ----
  function initHeroParallax() {
    const media = document.querySelector("[data-hero-media]");
    const hero = document.querySelector("[data-hero]");
    if (!media || !hero) return;

    gsap.fromTo(
      media,
      { yPercent: -6 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }

  // ---- reveal: fade + translateY de textos al entrar en viewport ----
  function initTextReveals() {
    const targets = gsap.utils.toArray("[data-reveal]");
    targets.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  }

  // ---- reveal con máscara (a-6): overlay wipe hacia arriba + imagen scale 1.2 -> 1 ----
  function initImageReveals() {
    const blocks = gsap.utils.toArray(".reveal");
    blocks.forEach((block) => {
      const img = block.querySelector(".image_reveal");
      const overlay = block.querySelector(".overlay_reveal");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: block, start: "top 80%", once: true },
      });
      if (overlay)
        tl.to(
          overlay,
          {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1.2,
            ease: "expo.out",
          },
          0,
        );
      if (img) tl.to(img, { scale: 1, duration: 1.6, ease: "expo.out" }, 0);
    });
  }

  // ---- move_rotation (a-25): paneo horizontal lento en loop de la foto de flota ----
  function initFleetPan() {
    const img = document.querySelector("[data-fleet-pan]");
    if (!img || reduced) return;
    gsap.to(img, {
      xPercent: -33,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  }

  // ---- Stacked sections: sticky hace el apilado; GSAP agrega profundidad ----
  // Mientras cada panel queda pineado y el siguiente lo cubre, su media hace un
  // leve zoom y una sombra negra sube (sensación de capa que retrocede).
  function initStackedSections() {
    const panels = gsap.utils.toArray('[data-stack-panel]');
    if (!panels.length) return;

    panels.forEach((panel, i) => {
      const media = panel.querySelector('[data-stack-media]');
      const shade = panel.querySelector('[data-stack-shade]');
      const isLast = i === panels.length - 1;

      // parallax/zoom sutil del media mientras el panel está en vista
      if (media) {
        gsap.fromTo(media, { scale: 1.08 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top top', scrub: true },
        });
      }
      // el panel se oscurece al ser cubierto por el siguiente (no el último)
      if (shade && !isLast) {
        gsap.to(shade, {
          opacity: 0.55,
          ease: 'none',
          scrollTrigger: { trigger: panel, start: 'bottom bottom', end: 'bottom top', scrub: true },
        });
      }
    });
  }

  function initFooterWordmark() {
    const el = document.querySelector("[data-footer-wordmark]");
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      },
    );
  }

  // ---- nav hide on scroll down / show on scroll up (a-46/a-47) ----
  function initNavHideShow() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;
    let lastY = window.scrollY;
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y < 80) {
          header.setAttribute("data-hidden", "false");
          lastY = y;
          return;
        }
        header.setAttribute("data-hidden", y > lastY ? "true" : "false");
        lastY = y;
      },
      { passive: true },
    );
  }

  // ---- Slider de modelos (Gallery Slider In a-39): fade + scale 1.1 -> 1 ----
  function initSliderControls() {
    const root = document.querySelector("[data-slider-models]");
    if (!root) return;
    const slides = Array.from(root.querySelectorAll("[data-slide]"));
    const prev = root.querySelector("[data-slider-prev]");
    const next = root.querySelector("[data-slider-next]");
    if (!slides.length) return;

    let current = 0,
      animating = false;

    function show(index) {
      if (animating) return;
      const n = (index + slides.length) % slides.length;
      if (n === current) return;
      const from = slides[current],
        to = slides[n];

      if (hasGsap) {
        animating = true;
        to.setAttribute("data-active", "true");
        const img = to.querySelector(".model-image");
        gsap.set(to, { opacity: 0 });
        if (img) gsap.set(img, { scale: 1.1 });
        const tl = gsap.timeline({
          onComplete: () => {
            from.setAttribute("data-active", "false");
            animating = false;
          },
        });
        tl.to(from, { opacity: 0, duration: 0.35, ease: "power1.out" }, 0).to(
          to,
          { opacity: 1, duration: 0.5, ease: "power1.out" },
          0.1,
        );
        if (img)
          tl.to(img, { scale: 1, duration: 1.4, ease: "power2.out" }, 0.1);
      } else {
        from.setAttribute("data-active", "false");
        to.setAttribute("data-active", "true");
      }
      current = n;
    }

    prev && prev.addEventListener("click", () => show(current - 1));
    next && next.addEventListener("click", () => show(current + 1));
    slides.forEach((s, i) => s.setAttribute("data-active", String(i === 0)));
  }

  function initMobileNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", () => {
      const open = menu.getAttribute("data-open") === "true";
      menu.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
    document.querySelectorAll("[data-dropdown-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sub = btn.nextElementSibling;
        if (!sub) return;
        sub.setAttribute(
          "data-open",
          String(sub.getAttribute("data-open") !== "true"),
        );
      });
    });
  }

  function initContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;
    const ok = form.querySelector("[data-form-success]");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.querySelectorAll("input, select, textarea, button").forEach((el) => {
        el.classList.add("opacity-40");
        el.disabled = true;
      });
      if (ok) ok.classList.remove("hidden");
    });
  }

  // ---- Modelos interactivos (Estilo TURAH: cambio de auto + specs + título + animación suave) ----
  function initModelsShowcase() {
    const section = document.querySelector("#modelos");
    if (!section) return;

    const models = [
      {
        brand: "JMC",
        name: "GRAND AVENUE",
        image: "assets/img/models/model1-grand-avenue.jpg",
        type: "Pickup 4x4",
        motor: "2.3L Turbo Diésel Puma",
        power: "174 HP / 450 Nm",
        status: "Entrega Inmediata",
        link: "/jmc/",
      },
      {
        brand: "FOTON",
        name: "AUMAN 460",
        image: "assets/img/models/model2-auman-460.jpg",
        type: "Tractocamión Pesado",
        motor: "Cummins ISG12 Diésel",
        power: "460 HP / 2300 Nm",
        status: "Disponible",
        link: "/foton/",
      },
      {
        brand: "JMC",
        name: "VIGUS PRO",
        image: "assets/img/models/model3-vigus-pro.jpg",
        type: "Pickup Doble Cabina",
        motor: "2.5L Diésel Isuzu",
        power: "140 HP / Common Rail",
        status: "Entrega Inmediata",
        link: "/jmc/",
      },
      {
        brand: "VENTURA",
        name: "R6",
        image: "assets/img/models/model4-ventura-r6.jpg",
        type: "Van 18 Pasajeros",
        motor: "2.7L Tecnología Toyota",
        power: "150 HP / Tracción Trasera",
        status: "Disponible",
        link: "/ventura/",
      },
      {
        brand: "JMC",
        name: "CARRYING PLUS",
        image: "assets/img/models/model5-carrying-plus.jpg",
        type: "Camión Comercial 5Ton",
        motor: "2.8L Diésel Isuzu",
        power: "115 HP / Freno de Aire",
        status: "En Stock",
        link: "/jmc/",
      },
    ];

    let current = 0;
    let isTransitioning = false;

    const titleEl = section.querySelector("[data-model-title]");
    const imgEl = section.querySelector("[data-model-image]");
    const typeEl = section.querySelector("[data-spec-type]");
    const motorEl = section.querySelector("[data-spec-motor]");
    const powerEl = section.querySelector("[data-spec-power]");
    const statusEl = section.querySelector("[data-spec-status]");
    const linkEl = section.querySelector("[data-model-link]");
    const indexEl = section.querySelector("[data-model-index]");
    const prevBtn = section.querySelector("[data-model-prev]");
    const nextBtn = section.querySelector("[data-model-next]");

    function goTo(index, direction = 1) {
      if (isTransitioning) return;
      const target = (index + models.length) % models.length;
      if (target === current) return;

      const model = models[target];
      isTransitioning = true;

      if (window.gsap) {
        const tl = gsap.timeline({
          onComplete: () => {
            current = target;
            isTransitioning = false;
          },
        });

        // Salida suave
        tl.to([imgEl, typeEl, motorEl, powerEl, statusEl], {
          opacity: 0,
          x: direction * -24,
          duration: 0.22,
          ease: "power2.in",
          onComplete: () => {
            titleEl.innerHTML = `<span class="text-accent">${model.brand}</span> ${model.name}`;
            imgEl.src = model.image;
            imgEl.alt = `${model.brand} ${model.name}`;
            if (typeEl) typeEl.textContent = model.type;
            if (motorEl) motorEl.textContent = model.motor;
            if (powerEl) powerEl.textContent = model.power;
            if (statusEl) statusEl.textContent = model.status;
            if (linkEl) linkEl.href = model.link;
            if (indexEl) indexEl.textContent = String(target + 1).padStart(2, "0");

            gsap.set([imgEl, typeEl, motorEl, powerEl, statusEl], {
              x: direction * 24,
            });
          },
        });

        // Entrada elegante
        tl.to([imgEl, typeEl, motorEl, powerEl, statusEl], {
          opacity: 1,
          x: 0,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.02,
        });
      } else {
        titleEl.innerHTML = `<span class="text-accent">${model.brand}</span> ${model.name}`;
        imgEl.src = model.image;
        imgEl.alt = `${model.brand} ${model.name}`;
        if (typeEl) typeEl.textContent = model.type;
        if (motorEl) motorEl.textContent = model.motor;
        if (powerEl) powerEl.textContent = model.power;
        if (statusEl) statusEl.textContent = model.status;
        if (linkEl) linkEl.href = model.link;
        if (indexEl) indexEl.textContent = String(target + 1).padStart(2, "0");
        current = target;
        isTransitioning = false;
      }
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1, -1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1, 1));

    // Navegación por teclado cuando la sección está en pantalla
    window.addEventListener("keydown", (e) => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowLeft") goTo(current - 1, -1);
      if (e.key === "ArrowRight") goTo(current + 1, 1);
    });

    // Soporte táctil swipe
    let touchStartX = 0;
    section.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );
    section.addEventListener(
      "touchend",
      (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) goTo(current - 1, -1);
          else goTo(current + 1, 1);
        }
      },
      { passive: true },
    );
  }

  // Fallback total si no hay GSAP: nada queda oculto.
  function revealAllStatic() {
    const pre = document.querySelector("[data-preloader]");
    if (pre) pre.style.display = "none";
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
    document.querySelectorAll(".image_reveal").forEach((el) => {
      el.style.transform = "none";
    });
    document.querySelectorAll(".overlay_reveal").forEach((el) => {
      el.style.display = "none";
    });
    const fw = document.querySelector("[data-footer-wordmark]");
    if (fw) fw.style.opacity = 1;
    const hw = document.querySelector("[data-hero-wordmark]");
    if (hw) hw.style.opacity = 0.85;
    const header = document.querySelector("[data-site-header]");
    if (header) header.setAttribute("data-navlogo", "on");
  }
})();
