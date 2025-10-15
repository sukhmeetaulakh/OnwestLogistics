const tl = gsap.timeline({ defaults: { duration: 0.9, ease: "power3.out" } });
tl.from("#redCard", { x: -160, opacity: 0, rotate: -6 })
  .from("#headline", { y: 40, opacity: 0, duration: 1.1 }, "-=0.45")
  .from(".sub", { y: 30, opacity: 0 }, "-=0.7")
  .from("#primaryBtn", { scale: 0.9, opacity: 0, y: 20 }, "-=0.55")
  .from(
    "#visual",
    { x: 200, opacity: 0, duration: 1.1, ease: "power4.out" },
    "-=0.9"
  )
  .from(
    "#frame",
    { scale: 0.92, opacity: 0, duration: 1.2, ease: "elastic.out(1,0.6)" },
    "-=0.9"
  );

// const btn = document.getElementById('primaryBtn')
// btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.03, duration: 0.25 }))
// btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.25 }))

const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40)
    gsap.to(nav, {
      boxShadow: "0 6px 20px rgba(12,10,30,0.08)",
      duration: 0.35,
    });
  else gsap.to(nav, { boxShadow: "none", duration: 0.35 });
});

// gsap.to('#primaryBtn', { scale: 1.03, repeat: -1, yoyo: true, duration: 2.6, ease: 'sine.inOut', repeatDelay: 6 })

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("open");
});
closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
});

/* +++++++++++++++++++++++++++++++   SERVICES SECTION ++++++++++++++++++++++++++++++++++ */

gsap.from(".card", {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  stagger: 0.3,
});

// ++++++++++++++++++++++++  COUNTER SECTION +++++++++++++++++++++++++

gsap.registerPlugin(ScrollTrigger);

// Counter animation function
function animateCounters() {
  const counters = document.querySelectorAll(".number");

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 1.5; // duration in seconds
    const delay = 0.001;

    gsap.fromTo(
      counter,
      {
        innerText: 0,
      },
      {
        innerText: target,
        duration: duration,
        delay: delay,
        ease: "power1.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 100%",
          toggleActions: "play none none none",
        },
        onUpdate: function () {
          counter.innerText = Math.floor(counter.innerText);
        },
      }
    );
  });
}

// Fade-in and slide-in animation for boxes
function animateBoxes() {
  gsap.from(".stat-box", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#accomplishments",
      start: "top bottom",
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  animateCounters();
  animateBoxes();
});

// +++++++++++++++++++++++++++++   QUOTES ++++++++++++++++++++++++++++++++

// GSAP fade-in animation
window.onload = () => {
  gsap.to("form", { duration: 1, opacity: 1, ease: "power2.out" });
};

// Utility: Close all dropdowns except current
function closeAllDropdowns(except) {
  document.querySelectorAll(".custom-dropdown.open").forEach((dd) => {
    if (dd !== except) {
      dd.classList.remove("open");
      dd.setAttribute("aria-expanded", "false");
    }
  });
}

// Setup all dropdowns with their options
function setupDropdown(dropdownId, hiddenInputId, manualInputId = null) {
  const dropdown = document.getElementById(dropdownId);
  const selected = dropdown.querySelector(".custom-dropdown__selected");
  const list = dropdown.querySelector(".custom-dropdown__list");
  const hiddenInput = document.getElementById(hiddenInputId);
  const manualInputContainer = manualInputId
    ? document.getElementById(manualInputId)
    : null;
  const manualInput = manualInputContainer
    ? manualInputContainer.querySelector("input.manual-input")
    : null;

  let focusedOptionIndex = -1;
  const options = Array.from(list.querySelectorAll(".custom-dropdown__option"));

  // Toggle open/close dropdown
  function toggleDropdown() {
    if (dropdown.classList.contains("open")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }
  function openDropdown() {
    closeAllDropdowns(dropdown);
    dropdown.classList.add("open");
    dropdown.setAttribute("aria-expanded", "true");
    list.focus();
    focusedOptionIndex = -1;
    updateAriaActiveDescendant();
  }
  function closeDropdown() {
    dropdown.classList.remove("open");
    dropdown.setAttribute("aria-expanded", "false");
    focusedOptionIndex = -1;
    updateAriaActiveDescendant();
  }

  // Update aria-activedescendant for listbox keyboard navigation
  function updateAriaActiveDescendant() {
    if (focusedOptionIndex >= 0 && options[focusedOptionIndex]) {
      list.setAttribute(
        "aria-activedescendant",
        options[focusedOptionIndex].id
      );
    } else {
      list.removeAttribute("aria-activedescendant");
    }
  }

  // Select option by index
  function selectOption(index) {
    if (index < 0 || index >= options.length) return;
    const option = options[index];
    options.forEach((opt) => opt.setAttribute("aria-selected", "false"));
    option.setAttribute("aria-selected", "true");
    let value = option.dataset.value;

    if (value === "custom" && manualInputContainer && manualInput) {
      manualInputContainer.style.display = "flex";
      hiddenInput.required = false; // We will require manual input then
      manualInput.required = true;
      hiddenInput.value = "";
      selected.textContent = option.textContent;
      manualInput.focus();
    } else {
      if (manualInputContainer && manualInput) {
        manualInputContainer.style.display = "none";
        manualInput.required = false;
        manualInput.value = "";
      }
      hiddenInput.required = true;
      hiddenInput.value = value;
      selected.textContent = option.textContent;
    }
    closeDropdown();
  }

  // Click handlers for dropdown and options
  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  options.forEach((option, index) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      selectOption(index);
    });
  });

  // Keyboard navigation on dropdown container
  dropdown.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!dropdown.classList.contains("open")) {
        openDropdown();
        focusedOptionIndex = 0;
      } else {
        focusedOptionIndex = (focusedOptionIndex + 1) % options.length;
      }
      updateAriaActiveDescendant();
      options[focusedOptionIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!dropdown.classList.contains("open")) {
        openDropdown();
        focusedOptionIndex = options.length - 1;
      } else {
        focusedOptionIndex =
          (focusedOptionIndex - 1 + options.length) % options.length;
      }
      updateAriaActiveDescendant();
      options[focusedOptionIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!dropdown.classList.contains("open")) {
        openDropdown();
      } else if (focusedOptionIndex >= 0) {
        selectOption(focusedOptionIndex);
      }
    } else if (e.key === "Escape") {
      if (dropdown.classList.contains("open")) {
        e.preventDefault();
        closeDropdown();
      }
    }
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", () => {
    closeDropdown();
  });

  // If manual input present, listen to input events
  if (manualInput) {
    manualInput.addEventListener("input", () => {
      hiddenInput.value = manualInput.value.trim();
    });
  }
}

// Setup dropdowns
setupDropdown("originCityDropdown", "origin_city_input", "originCityManual");
setupDropdown(
  "destinationCityDropdown",
  "destination_city_input",
  "destinationCityManual"
);
setupDropdown("packageTypeDropdown", "package_type_input");
// setupDropdown('fridgeTypeDropdown', 'fridge_type_input');
// setupDropdown('shippingTypeDropdown', 'shipping_type_input');

// Form validation and submission
const form = document.getElementById("bookingForm");
form.addEventListener("submit", (e) => {
  let valid = true;

  // Helper to show error
  function showError(id, show) {
    const el = document.getElementById(id);
    if (show) {
      el.classList.add("error-visible");
    } else {
      el.classList.remove("error-visible");
    }
  }

  // Validate name
  const nameInput = form.name;
  if (!nameInput.value.trim()) {
    valid = false;
    showError("nameError", true);
  } else {
    showError("nameError", false);
  }

  // Validate email with simple regex
  const emailInput = form.email;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    valid = false;
    showError("emailError", true);
  } else {
    showError("emailError", false);
  }

  // Validate phone with pattern attribute
  const phoneInput = form.phone;
  const phonePattern = new RegExp(phoneInput.pattern);
  if (!phonePattern.test(phoneInput.value.trim())) {
    valid = false;
    showError("phoneError", true);
  } else {
    showError("phoneError", false);
  }

  // Validate hidden inputs (dropdowns)
  const hiddenInputs = [
    "origin_city_input",
    "destination_city_input",
    "package_type_input",
    "fridge_type_input",
    "shipping_type_input",
  ];
  hiddenInputs.forEach((id) => {
    const input = document.getElementById(id);
    if (!input.value.trim()) {
      valid = false;
      // For simplicity, no error message, but could add here
      input.parentElement.classList.add("error-visible");
    } else {
      input.parentElement.classList.remove("error-visible");
    }
  });

  if (!valid) {
    e.preventDefault();
    alert("Please fill all required fields correctly.");
    return false;
  }
});

/* ++++++++++++++++++++++++++++++++  SECTION AFTER QUOTE ++++++++++++++++ */

(function () {
  // Ensure GSAP ScrollTrigger is available
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger not loaded.");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // animation timeline when section scrolls into view
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#shipmentControlSection",
      start: "top 75%",
      end: "bottom 20%",
      toggleActions: "play none none none",
    },
  });

  // staggered entrance from multiple directions
  tl.from(
    ".sws-large-img",
    { x: -80, opacity: 0, duration: 0.9, ease: "power3.out" },
    0
  )
    .from(
      ".sws-thumb-wrap",
      { scale: 0.9, x: 40, opacity: 0, duration: 0.9, ease: "back.out(1.1)" },
      "-=0.5"
    )
    .from(
      ".sws-title",
      { y: 28, opacity: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .from(
      ".sws-stats-number",
      { scale: 0.8, opacity: 0, duration: 0.7, ease: "elastic.out(1, 0.6)" },
      "-=0.45"
    )
    .from(
      ".sws-copy-text",
      { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .from(
      ".sws-footer > *",
      { y: 20, opacity: 0, stagger: 0.12, duration: 0.6 },
      "-=0.45"
    );

  // Play button -> open YouTube modal
  const playBtn = document.getElementById("swsPlayBtn");
  const modal = document.getElementById("swsModal");
  const modalBackdrop = document.getElementById("swsModalBackdrop");
  const modalClose = document.getElementById("swsModalClose");
  const videoWrap = document.getElementById("swsVideoWrap");

  const YT_DEMO_ID = "dQw4w9WgXcQ"; // demo video id - replace when ready
  function openModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "false");
    // inject iframe
    const iframe = document.createElement("iframe");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "100%");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    );
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute(
      "src",
      `https://www.youtube.com/embed/${YT_DEMO_ID}?autoplay=1&rel=0`
    );
    iframe.setAttribute("title", "Company overview video");
    videoWrap.appendChild(iframe);
    // trap focus to close button (basic)
    modalClose.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    // remove iframe to stop playback
    videoWrap.innerHTML = "";
    playBtn.focus();
  }

  playBtn.addEventListener("click", openModal);
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  // close modal on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false")
      closeModal();
  });

  // a11y: ensure modal aria-hidden initial state
  modal.setAttribute("aria-hidden", "true");
})();






document.addEventListener("DOMContentLoaded", () => {
  // FAQ toggle
  document.querySelectorAll(".sws-faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      item.classList.toggle("active");
    });
  });

  // GSAP animation on scroll
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".sws-faq-item", {
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".sws-faq-wrapper",
      start: "top 80%",
    },
  });
});





/* +++++++++++++++++++++++++++++  FEATURES ++++++++++++++++++++++++++ */



gsap.registerPlugin(ScrollTrigger);

    // Animate text content (left)
    gsap.from(".content-left", {
        scrollTrigger: {
            trigger: ".content-left",
            start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
    });

    // Animate images one by one
    gsap.from(".img1", {
        scrollTrigger: {
            trigger: ".img1",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
    });

    gsap.from(".img2", {
        scrollTrigger: {
            trigger: ".img2",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
    });

    gsap.from(".img3", {
        scrollTrigger: {
            trigger: ".img3",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
    });

    // Animate experience badge
    gsap.from(".experience-badge", {
        scrollTrigger: {
            trigger: ".experience-badge",
            start: "top 90%",
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "back.out(1.7)"
    });


    /* ++++++++++++++++++++++++++++++++++++++++++++ TESIMONIALS +++++++++++++++++++++++++ */

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".sws-testimonial-grid", {
    opacity: 0,
    y: 60,
    stagger: 0.25,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".sws-testimonial-section",
      start: "top 80%",
    },
  });
});




 gsap.registerPlugin(ScrollTrigger);

  gsap.from(".sws-footer-col", {
    scrollTrigger: {
      trigger: ".sws-footer-inner",
      start: "top 85%",
    },
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.2,
    ease: "power3.out"
  });

  gsap.from(".sws-footer-tagline", {
    scrollTrigger: {
      trigger: ".sws-footer-bottom",
      start: "top 90%",
    },
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power3.out"
  });









  document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".contact-info", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
  gsap.from(".contact-form", {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.3
  });
});