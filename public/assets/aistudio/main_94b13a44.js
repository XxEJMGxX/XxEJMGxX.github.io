document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("langBtn");
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const javaModal = document.getElementById("javaModal");
  const modalBox = document.getElementById("modalBox");
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const navLinks = document.getElementById("navLinks");

  let currentLang = localStorage.getItem("portfolio_lang") || "es";

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("portfolio_lang", lang);
    document.documentElement.lang = lang;

    const translatableElements =
      document.querySelectorAll("[data-es][data-en]");
    translatableElements.forEach((el) => {
      el.innerHTML = el.getAttribute(`data-${lang}`);
    });

    if (langBtn) {
      if (lang === "es") {
        langBtn.innerHTML =
          '<span class="lang-active">ES</span> | <span class="lang-inactive">EN</span>';
        langBtn.setAttribute("aria-label", "Cambiar idioma a inglés");
      } else {
        langBtn.innerHTML =
          '<span class="lang-inactive">ES</span> | <span class="lang-active">EN</span>';
        langBtn.setAttribute("aria-label", "Switch language to Spanish");
      }
    }
  }

  applyLanguage(currentLang);

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const nextLang = currentLang === "es" ? "en" : "es";
      applyLanguage(nextLang);
    });
  }

  if (menuToggleBtn && navLinks) {
    menuToggleBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggleBtn.classList.toggle("active", isOpen);
      menuToggleBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggleBtn.classList.remove("active");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggleBtn.contains(event.target)
      ) {
        navLinks.classList.remove("open");
        menuToggleBtn.classList.remove("active");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function openModal() {
    if (!javaModal) return;
    javaModal.classList.add("active");
    javaModal.setAttribute("aria-hidden", "false");
    closeModalBtn?.focus();
  }

  function closeModal() {
    if (!javaModal) return;
    javaModal.classList.remove("active");
    javaModal.setAttribute("aria-hidden", "true");
    openModalBtn?.focus();
  }

  if (openModalBtn) {
    openModalBtn.addEventListener("click", openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (javaModal && modalBox) {
    javaModal.addEventListener("click", closeModal);

    modalBox.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && javaModal.classList.contains("active")) {
        closeModal();
      }
    });
  }
});
