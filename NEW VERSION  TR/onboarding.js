/* =========================================================
   TourGo Splash Screen — script.js
   Stars + drifting particles, a randomly-timed shooting star
   ("comet") surprise, tap sparkles, subtle desktop parallax,
   and a gentle pointer-reactive tilt on the 3D glass globe.
   ========================================================= */

(function () {
  "use strict";

  const particlesContainer = document.getElementById("particles");
  const cometLayer = document.getElementById("cometLayer");
  const phone = document.getElementById("phone");
  const bgLayer = document.getElementById("bgLayer");
  const ctaButton = document.getElementById("ctaButton");
  const globe = document.getElementById("globe");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Where the onboarding flow hands off to once the person signs in —
  // update this if the home app lives at a different path.
  const HOME_APP_URL = "home.html";

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  /* ---------------------------------------------------------
     1. Twinkling stars — scattered across the upper sky area
     --------------------------------------------------------- */
  function createStars(count) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "particle star";

      const size = rand(1, 2.6);
      const top = rand(2, 50);
      const left = rand(2, 98);
      const dur = rand(2.5, 5.5);
      const delay = rand(0, 5);

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${top}%`;
      star.style.left = `${left}%`;
      star.style.setProperty("--dur", `${dur}s`);
      star.style.setProperty("--delay", `${delay}s`);

      particlesContainer.appendChild(star);
    }
  }

  /* ---------------------------------------------------------
     2. Drifting ambient particles — slow upward float
     --------------------------------------------------------- */
  function createDrifters(count) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle drift";

      const size = rand(1, 2.2);
      const left = rand(4, 96);
      const bottom = rand(0, 40);
      const dur = rand(9, 18);
      const delay = rand(0, 12);

      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${left}%`;
      p.style.bottom = `${bottom}%`;
      p.style.setProperty("--dur", `${dur}s`);
      p.style.setProperty("--delay", `${delay}s`);

      particlesContainer.appendChild(p);
    }
  }

  createStars(26);
  createDrifters(12);

  /* ---------------------------------------------------------
     3. The surprise: a shooting star streaks across the sky
        at random, unpredictable intervals. When it burns out
        it leaves a tiny sparkle burst.
     --------------------------------------------------------- */
  function spawnComet() {
    const comet = document.createElement("div");
    comet.className = "comet";

    const startX = rand(-10, 20);      // %
    const startY = rand(6, 34);        // %
    const angle = rand(14, 26);        // deg, gentle downward-right streak
    const length = rand(90, 150);      // px
    const duration = rand(1.1, 1.7);   // s

    comet.style.setProperty("--x", `${startX}%`);
    comet.style.setProperty("--y", `${startY}%`);
    comet.style.setProperty("--angle", `${angle}deg`);
    comet.style.setProperty("--len", `${length}px`);
    comet.style.setProperty("--cdur", `${duration}s`);

    cometLayer.appendChild(comet);

    // Burst a few sparkles near where the comet fades out
    window.setTimeout(() => {
      const rect = comet.getBoundingClientRect();
      const layerRect = cometLayer.getBoundingClientRect();
      const endX = rect.left - layerRect.left + rect.width;
      const endY = rect.top - layerRect.top + rect.height / 2;
      spawnSparkBurst(endX, endY, 6);
      comet.remove();
    }, duration * 1000);
  }

  function spawnSparkBurst(x, y, count) {
    for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      s.className = "spark-burst";
      const dist = rand(10, 34);
      const dir = rand(0, Math.PI * 2);
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;
      s.style.setProperty("--sx", `${Math.cos(dir) * dist}px`);
      s.style.setProperty("--sy", `${Math.sin(dir) * dist}px`);
      cometLayer.appendChild(s);
      window.setTimeout(() => s.remove(), 750);
    }
  }

  function scheduleNextComet() {
    const delay = rand(6000, 13000); // unpredictable: 6–13s apart
    window.setTimeout(() => {
      spawnComet();
      scheduleNextComet();
    }, delay);
  }

  // First comet arrives a little after load, then repeats unpredictably
  window.setTimeout(spawnComet, rand(2200, 3800));
  scheduleNextComet();

  /* ---------------------------------------------------------
     4. Tap / click sparkle — small delight on interaction
     --------------------------------------------------------- */
  if (phone) {
    phone.addEventListener("pointerdown", (e) => {
      const rect = phone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (let i = 0; i < 5; i++) {
        const s = document.createElement("div");
        s.className = "tap-spark";
        const dist = rand(14, 40);
        const dir = rand(0, Math.PI * 2);
        s.style.left = `${x}px`;
        s.style.top = `${y}px`;
        s.style.setProperty("--tx", `${Math.cos(dir) * dist}px`);
        s.style.setProperty("--ty", `${Math.sin(dir) * dist}px`);
        phone.appendChild(s);
        window.setTimeout(() => s.remove(), 850);
      }
    });
  }

  /* ---------------------------------------------------------
     5. CTA button feedback (visual only — no navigation target)
     --------------------------------------------------------- */
  if (ctaButton) {
    ctaButton.addEventListener("click", () => {
      ctaButton.style.transform = "scale(0.95)";
      window.setTimeout(() => {
        ctaButton.style.transform = "";
      }, 160);
    });
  }

  /* ---------------------------------------------------------
     6. Slide navigation — dots jump between the 3 onboarding
        screens, each screen's back button steps to the previous
        one, and the arrow on slide 3 continues to sign in/up
     --------------------------------------------------------- */
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".dot-nav .dot"));
  const backBtns = Array.from(document.querySelectorAll(".back-btn"));
  const nextArrow = document.getElementById("nextArrow");
  const dotNav = document.getElementById("dotNav");
  let currentSlide = 0;
  let slideTimer = null;

  function goToSlide(index) {
    if (index === currentSlide || !slides[index]) return;
    const forward = index > currentSlide;

    slides.forEach((slide) => slide.classList.remove("exit-forward", "exit-back"));

    slides[currentSlide].classList.remove("is-active");
    slides[currentSlide].classList.add(forward ? "exit-forward" : "exit-back");

    slides[index].classList.remove("exit-forward", "exit-back");
    slides[index].classList.add("is-active");

    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));

    // The dot nav only represents the 3 onboarding screens; hide it
    // once the person reaches the sign in / sign up screen.
    if (dotNav) dotNav.classList.toggle("is-hidden", index >= dots.length);

    currentSlide = index;

    // Clear the exit class once the transition settles so the slide
    // is ready to animate cleanly again next time it's revisited.
    if (slideTimer) window.clearTimeout(slideTimer);
    slideTimer = window.setTimeout(() => {
      slides.forEach((slide, i) => {
        if (i !== currentSlide) slide.classList.remove("exit-forward", "exit-back");
      });
    }, 700);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = parseInt(dot.dataset.slide, 10);
      goToSlide(target);
    });
  });

  // Every screen's back button simply steps back one slide. Only the
  // button belonging to the active slide is interactive, since inactive
  // slides are visibility:hidden.
  backBtns.forEach((btn) => {
    btn.addEventListener("click", () => goToSlide(currentSlide - 1));
  });

  if (nextArrow) {
    nextArrow.addEventListener("click", () => goToSlide(currentSlide + 1));
  }

  /* ---------------------------------------------------------
     6b. Sign in / sign up toggle on the auth screen
     --------------------------------------------------------- */
  const authHeading = document.getElementById("authHeading");
  const authSubtitle = document.getElementById("authSubtitle");
  const authSubmitLabel = document.getElementById("authSubmitLabel");
  const authSwitchText = document.getElementById("authSwitchText");
  const authSwitchBtn = document.getElementById("authSwitchBtn");
  const authNameField = document.getElementById("authNameField");
  const authConfirmField = document.getElementById("authConfirmField");
  const authForgot = document.getElementById("authForgot");
  const authTerms = document.getElementById("authTerms");
  const authDivider = document.getElementById("authDivider");
  const authSocial = document.getElementById("authSocial");
  const authSubmit = document.getElementById("authSubmit");
  let authMode = "signin";

  function setAuthMode(mode) {
    authMode = mode;
    const isSignUp = mode === "signup";

    if (authHeading) authHeading.innerHTML = isSignUp
      ? "Create Account <span class=\"auth-emoji\">✨</span>"
      : "Welcome Back <span class=\"auth-emoji\">👋</span>";
    if (authSubtitle) authSubtitle.textContent = isSignUp
      ? "Start your adventure today"
      : "Let's continue your journey";

    if (authSubmitLabel) authSubmitLabel.textContent = isSignUp ? "Sign Up" : "Log In";
    if (authSwitchText) authSwitchText.textContent = isSignUp ? "Already have an account?" : "Don't have an account?";
    if (authSwitchBtn) authSwitchBtn.textContent = isSignUp ? "Log in" : "Sign up";

    if (authNameField) authNameField.hidden = !isSignUp;
    if (authConfirmField) authConfirmField.hidden = !isSignUp;
    if (authForgot) authForgot.hidden = isSignUp;
    if (authTerms) authTerms.hidden = !isSignUp;
    if (authDivider) authDivider.hidden = isSignUp;
    if (authSocial) authSocial.hidden = isSignUp;
  }

  if (authSwitchBtn) {
    authSwitchBtn.addEventListener("click", () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin");
    });
  }

  // Submitting either Log In or Sign Up hands the person off to the
  // TourGo home app. A brief press animation plays first so the tap
  // still feels acknowledged before the page navigates away.
  if (authSubmit) {
    authSubmit.addEventListener("click", () => {
      authSubmit.style.transform = "scale(0.96)";
      window.setTimeout(() => {
        authSubmit.style.transform = "";
        window.location.href = HOME_APP_URL;
      }, 160);
    });
  }

  // Password visibility toggles
  document.querySelectorAll(".auth-eye").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      const showing = input.type === "text";
      input.type = showing ? "password" : "text";
      btn.classList.toggle("is-visible", !showing);
    });
  });

  /* ---------------------------------------------------------
     7. Subtle pointer-based parallax (desktop only)
     --------------------------------------------------------- */
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (supportsHover && phone && !reduceMotion) {
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    // Globe tilt targets (kept separate + gentler than the bg parallax)
    let globeTargetX = 0, globeTargetY = 0;
    let globeCurX = 0, globeCurY = 0;

    phone.addEventListener("mousemove", (e) => {
      const rect = phone.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = px * 10;
      targetY = py * 8;
      globeTargetY = py * 6;   // tilt up/down
      globeTargetX = px * 10;  // tilt left/right
    });

    phone.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
      globeTargetX = 0;
      globeTargetY = 0;
    });

    function animateParallax() {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      if (bgLayer) {
        bgLayer.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }

      if (globe) {
        globeCurX += (globeTargetX - globeCurX) * 0.05;
        globeCurY += (globeTargetY - globeCurY) * 0.05;
        // translateX(-50%) keeps the globe centered; the rotate values
        // add a gentle 3D tilt toward the pointer on top of that.
        globe.style.transform =
          `translateX(-50%) rotateY(${globeCurX}deg) rotateX(${-globeCurY}deg)`;
      }

      requestAnimationFrame(animateParallax);
    }
    requestAnimationFrame(animateParallax);
  }

  /* ---------------------------------------------------------
     8. Respect reduced-motion
     --------------------------------------------------------- */
  if (reduceMotion) {
    document.querySelectorAll(".particle").forEach((el) => {
      el.style.animation = "none";
      el.style.opacity = "0.4";
    });
  }
})();