/* ============================================================
   Lakshman Sharma — Portfolio Scripts
   Particle system, typing effect, scroll animations, counters,
   theme toggle, tilt effect, and more.
   ============================================================ */

(function () {
  "use strict";

  /* ======================== PARTICLES ======================== */
  const canvas = document.getElementById("particleCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animId;
    let w, h;

    function resize() {
      const hero = canvas.parentElement;
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(Math.floor((w * h) / 18000), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const dotColor = isDark ? "rgba(99,102,241," : "rgba(99,102,241,";
      const lineColor = isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.05)";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor + (isDark ? "0.35)" : "0.25)");
        ctx.fill();

        // connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = dx * dx + dy * dy;
          if (dist < 18000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(drawParticles);
    }

    resize();
    createParticles();
    drawParticles();

    window.addEventListener("resize", function () {
      resize();
      createParticles();
    });
  }

  /* ======================== TYPING EFFECT ======================== */
  const typedEl = document.getElementById("typedText");
  if (typedEl) {
    const phrases = [
      "AI/ML applications.",
      "full-stack web apps.",
      "LLM fine-tuning pipelines.",
      "responsive interfaces.",
      "deep learning models.",
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeLoop() {
      const current = phrases[phraseIdx];

      if (isDeleting) {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 40;
      } else {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIdx === current.length) {
        typingSpeed = 2000; // pause at end
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 400; // pause before new word
      }

      setTimeout(typeLoop, typingSpeed);
    }

    setTimeout(typeLoop, 1000);
  }

  /* ======================== SCROLL REVEAL ======================== */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ======================== COUNTER ANIMATION ======================== */
  const counters = document.querySelectorAll(".stat-number[data-count]");

  if ("IntersectionObserver" in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const isDecimal = el.dataset.decimal === "true";
    const duration = 1500;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.floor(current);
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = isDecimal ? target.toFixed(1) : target;
      }
    }

    requestAnimationFrame(update);
  }

  /* ======================== THEME TOGGLE ======================== */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  // Load saved theme
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("portfolio-theme", next);
    });
  }

  /* ======================== SCROLL PROGRESS ======================== */
  const scrollProgress = document.getElementById("scrollProgress");

  function updateProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = percent + "%";
  }

  /* ======================== ACTIVE NAV LINK ======================== */
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    let current = "";
    sections.forEach(function (section) {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  /* ======================== BACK TO TOP ======================== */
  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ======================== SCROLL HANDLER ======================== */
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        updateActiveNav();
        updateBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial calls
  updateProgress();
  updateActiveNav();
  updateBackToTop();

  /* ======================== MOBILE NAV ======================== */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close menu on link click
    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ======================== PROJECT CARD TILT ======================== */
  const tiltCards = document.querySelectorAll("[data-tilt]");

  tiltCards.forEach(function (card) {
    const inner = card.querySelector(".project-card-inner");
    if (!inner) return;

    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      inner.style.transform =
        "perspective(800px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      inner.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  /* ======================== PROFILE PHOTO ======================== */
  const photoInput = document.getElementById("photoInput");
  const photoEditBtn = document.getElementById("photoEditBtn");
  const profileImg = document.getElementById("profileImg");
  const photoHint = document.getElementById("photoHint");

  if (photoEditBtn && photoInput) {
    photoEditBtn.addEventListener("click", function () {
      photoInput.click();
    });
  }

  if (photoInput && profileImg) {
    photoInput.addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file || !file.type.startsWith("image/")) return;

      var reader = new FileReader();
      reader.onload = function (ev) {
        profileImg.src = ev.target.result;
        if (photoHint) photoHint.classList.add("show");
      };
      reader.readAsDataURL(file);
    });
  }

  /* ======================== FOOTER YEAR ======================== */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
