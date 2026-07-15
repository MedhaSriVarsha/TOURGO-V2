/* =========================================================
   TourGo — shared theme manager
   Handles light/dark theming across the onboarding flow and the
   home app: auto-detects the system preference, lets the person
   override it manually (stored in localStorage), and keeps every
   open tab/toggle in sync if either changes.

   Include this AFTER the inline blocking snippet that already ran
   in <head> (see the comment at the top of that snippet for why
   it has to run separately, before CSS paints).
   ========================================================= */

(function () {
  "use strict";

  var STORAGE_KEY = "tourgo-theme"; // "light" | "dark" | absent = follow system
  var root = document.documentElement;
  var mql = window.matchMedia("(prefers-color-scheme: light)");

  function storedTheme() {
    try {
      var v = window.localStorage.getItem(STORAGE_KEY);
      return v === "light" || v === "dark" ? v : null;
    } catch (e) {
      return null; // localStorage unavailable (private mode, etc.)
    }
  }

  function systemTheme() {
    return mql.matches ? "light" : "dark";
  }

  function resolvedTheme() {
    return storedTheme() || systemTheme();
  }

  function paint(theme) {
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    document.dispatchEvent(
      new CustomEvent("tourgo:themechange", { detail: { theme: theme } })
    );
    syncToggles(theme);
  }

  // Manual override: pass "light" or "dark" to pin it, or null to
  // clear the override and go back to following the system setting.
  function setTheme(theme) {
    try {
      if (theme === "light" || theme === "dark") {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      /* ignore — theme still applies for this session */
    }
    paint(resolvedTheme());
  }

  function toggleTheme() {
    setTheme(resolvedTheme() === "light" ? "dark" : "light");
  }

  // Keep every [data-theme-toggle] control in the DOM reflecting
  // the live theme (e.g. a switch's checked state, or an icon).
  function syncToggles(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (el) {
      var isLight = theme === "light";
      if (el.matches('input[type="checkbox"]')) {
        el.checked = isLight;
      }
      el.setAttribute("aria-checked", String(isLight));
      el.classList.toggle("is-light", isLight);
      el.classList.toggle("is-dark", !isLight);
    });
  }

  function wireToggles() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (el) {
      if (el.dataset.themeWired) return;
      el.dataset.themeWired = "1";
      el.addEventListener("click", function (e) {
        // Checkboxes/switches already flip their own visual state on
        // click — just read where they ended up and apply it.
        if (el.matches('input[type="checkbox"]')) {
          setTheme(el.checked ? "light" : "dark");
        } else {
          toggleTheme();
        }
      });
    });
    syncToggles(resolvedTheme());
  }

  // If there's no manual override, follow the OS/browser live —
  // e.g. the person's system switches to dark mode at sunset.
  mql.addEventListener("change", function () {
    if (!storedTheme()) paint(systemTheme());
  });

  // Repaint immediately (the blocking <head> snippet already set the
  // initial attribute before first paint — this just wires up toggles
  // and keeps things in sync once the full DOM is available).
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireToggles);
  } else {
    wireToggles();
  }

  // Expose a tiny API other scripts (home.js / onboarding.js) can use.
  window.TourGoTheme = {
    get: resolvedTheme,
    set: setTheme,
    toggle: toggleTheme
  };
})();