(function () {
  "use strict";

  var root = document.querySelector(".mcrown-site");
  if (!root) {
    return;
  }

  var METRIKA_COUNTER_ID = 110442062;
  var METRIKA_GOALS = {
    phoneClick: "phone_click",
    emailClick: "email_click",
    whatsappClick: "whatsapp_click",
    maxClick: "max_click",
    formStart: "lead_form_start",
    formSubmit: "lead_form_submit",
    presentation: "presentation_get"
  };

  function reachGoal(goalName, params) {
    if (typeof window.ym !== "function") {
      return;
    }

    window.ym(METRIKA_COUNTER_ID, "reachGoal", goalName, params || {});
  }

  function initCookieNotice() {
    var storageKey = "mcrown_cookie_notice_accepted";
    var isAccepted = false;

    try {
      isAccepted = window.localStorage.getItem(storageKey) === "yes";
    } catch (error) {
      isAccepted = false;
    }

    if (isAccepted) {
      return;
    }

    var banner = document.createElement("div");
    banner.className = "mc-cookie";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Уведомление об использовании cookie");
    banner.innerHTML = '<p>Мы используем cookie, чтобы сайт работал корректно.</p><button class="mc-cookie__button" type="button" data-mcrown-cookie-accept>Хорошо</button>';

    document.body.appendChild(banner);

    var acceptButton = banner.querySelector("[data-mcrown-cookie-accept]");
    if (!acceptButton) {
      return;
    }

    acceptButton.addEventListener("click", function () {
      try {
        window.localStorage.setItem(storageKey, "yes");
      } catch (error) {
        // Ignore storage failures; the banner can still be dismissed for this page view.
      }

      banner.remove();
    });
  }

  initCookieNotice();

  root.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || typeof target.closest !== "function") {
      return;
    }

    var link = target.closest("a[href]");
    if (!link || !root.contains(link)) {
      return;
    }

    var href = link.getAttribute("href") || "";
    var normalizedHref = href.toLowerCase();
    var goalName = "";

    if (link.hasAttribute("data-presentation-download")) {
      goalName = METRIKA_GOALS.presentation;
    } else if (normalizedHref.indexOf("tel:") === 0) {
      goalName = METRIKA_GOALS.phoneClick;
    } else if (normalizedHref.indexOf("mailto:") === 0) {
      goalName = METRIKA_GOALS.emailClick;
    } else if (normalizedHref.indexOf("wa.me/") !== -1 || normalizedHref.indexOf("whatsapp.com/") !== -1) {
      goalName = METRIKA_GOALS.whatsappClick;
    } else if (normalizedHref.indexOf("max.ru") !== -1) {
      goalName = METRIKA_GOALS.maxClick;
    }

    if (!goalName) {
      return;
    }

    reachGoal(goalName, {
      page: window.location.pathname,
      href: href
    });
  });

  var menuButton = root.querySelector("[data-mcrown-menu]");
  var nav = root.querySelector("[data-mcrown-nav]");

  function closeMenu() {
    if (!menuButton || !nav) {
      return;
    }

    nav.classList.remove("is-open");
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Открыть меню");
  }

  var reducedMotionQuery = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  function prefersReducedMotion() {
    return Boolean(reducedMotionQuery && reducedMotionQuery.matches);
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      menuButton.classList.toggle("is-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !nav.classList.contains("is-open")) {
        return;
      }

      closeMenu();
      menuButton.focus();
    });
  }

  root.querySelectorAll('a[href^="#"]').forEach(function (link) {
    function activateAnchor(event) {
      var targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      var target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      closeMenu();
      target.scrollIntoView({
        behavior: prefersReducedMotion() || event.type === "keydown" ? "auto" : "smooth",
        block: "start"
      });
    }

    link.addEventListener("click", activateAnchor);

    link.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        activateAnchor(event);
      }
    });
  });

  var heroCarousel = root.querySelector("[data-mcrown-hero-carousel]");

  if (heroCarousel) {
    var heroSlides = Array.prototype.slice.call(heroCarousel.querySelectorAll(".mc-hero-carousel__slide"));
    var heroDots = Array.prototype.slice.call(heroCarousel.querySelectorAll(".mc-hero-carousel__dots button"));
    var heroCaptionLabel = heroCarousel.querySelector("[data-mcrown-hero-caption-label]");
    var heroCaptionText = heroCarousel.querySelector("[data-mcrown-hero-caption-text]");
    var activeHeroSlide = 0;
    var heroCarouselTimer = null;
    var reduceHeroMotion = prefersReducedMotion();

    function showHeroSlide(nextIndex) {
      if (!heroSlides.length) {
        return;
      }

      activeHeroSlide = (nextIndex + heroSlides.length) % heroSlides.length;

      heroSlides.forEach(function (slide, index) {
        var isActive = index === activeHeroSlide;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      heroDots.forEach(function (dot, index) {
        var isActive = index === activeHeroSlide;

        dot.classList.toggle("is-active", isActive);
        if (isActive) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });

      if (heroCaptionLabel) {
        heroCaptionLabel.textContent = heroSlides[activeHeroSlide].getAttribute("data-label") || "";
      }

      if (heroCaptionText) {
        heroCaptionText.textContent = heroSlides[activeHeroSlide].getAttribute("data-text") || "";
      }
    }

    function stopHeroCarousel() {
      if (heroCarouselTimer) {
        window.clearInterval(heroCarouselTimer);
        heroCarouselTimer = null;
      }
    }

    function startHeroCarousel() {
      if (reduceHeroMotion || heroSlides.length < 2 || heroCarouselTimer) {
        return;
      }

      heroCarouselTimer = window.setInterval(function () {
        showHeroSlide(activeHeroSlide + 1);
      }, 5000);
    }

    heroDots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        stopHeroCarousel();
        showHeroSlide(index);
        startHeroCarousel();
      });
    });

    showHeroSlide(0);
    startHeroCarousel();
    heroCarousel.addEventListener("mouseenter", stopHeroCarousel);
    heroCarousel.addEventListener("mouseleave", startHeroCarousel);
    heroCarousel.addEventListener("focusin", stopHeroCarousel);
    heroCarousel.addEventListener("focusout", startHeroCarousel);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopHeroCarousel();
      } else {
        startHeroCarousel();
      }
    });
  }

  root.querySelectorAll("[data-mcrown-programme-carousel]").forEach(function (carousel) {
    var tabButtons = Array.prototype.slice.call(carousel.querySelectorAll("[data-mcrown-tab]"));
    var tabPanels = Array.prototype.slice.call(carousel.querySelectorAll("[data-mcrown-panel]"));

    if (!tabButtons.length || !tabPanels.length) {
      return;
    }

    function activateProgrammeTab(button, shouldFocus) {
      var activeTab = button.getAttribute("data-mcrown-tab");

      tabButtons.forEach(function (item) {
        var isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
        item.setAttribute("tabindex", isActive ? "0" : "-1");
      });

      tabPanels.forEach(function (panel) {
        var isActive = panel.getAttribute("data-mcrown-panel") === activeTab;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
        panel.setAttribute("aria-hidden", String(!isActive));
      });

      if (shouldFocus) {
        button.focus();
      }
    }

    tabButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        activateProgrammeTab(button, false);
      });

      button.addEventListener("keydown", function (event) {
        var nextIndex = index;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % tabButtons.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabButtons.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        activateProgrammeTab(tabButtons[nextIndex], true);
      });
    });

    activateProgrammeTab(tabButtons.find(function (button) {
      return button.getAttribute("aria-selected") === "true";
    }) || tabButtons[0], false);
  });

  root.querySelectorAll("[data-mcrown-boarding-gallery]").forEach(function (gallery) {
    var slides = Array.prototype.slice.call(gallery.querySelectorAll("[data-mcrown-boarding-slide]"));
    var previousButton = gallery.querySelector("[data-mcrown-boarding-prev]");
    var nextButton = gallery.querySelector("[data-mcrown-boarding-next]");
    var counter = gallery.querySelector("[data-mcrown-boarding-counter]");
    var activeSlide = 0;

    if (!slides.length || !previousButton || !nextButton) {
      return;
    }

    function showBoardingSlide(nextIndex) {
      activeSlide = (nextIndex + slides.length) % slides.length;

      slides.forEach(function (slide, index) {
        var isActive = index === activeSlide;
        slide.classList.toggle("is-active", isActive);
        slide.hidden = !isActive;
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      if (counter) {
        counter.textContent = String(activeSlide + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
      }
    }

    previousButton.addEventListener("click", function () {
      showBoardingSlide(activeSlide - 1);
    });

    nextButton.addEventListener("click", function () {
      showBoardingSlide(activeSlide + 1);
    });

    gallery.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showBoardingSlide(activeSlide - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showBoardingSlide(activeSlide + 1);
      }
    });

    showBoardingSlide(0);
  });

  root.querySelectorAll("[data-mcrown-accordion] article").forEach(function (item) {
    var trigger = item.querySelector("button");
    var panel = item.querySelector("div");

    if (!trigger || !panel) {
      return;
    }

    trigger.addEventListener("click", function () {
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });

  var form = root.querySelector("[data-mcrown-form]");
  var status = root.querySelector("[data-mcrown-form-status]");

  if (form && status) {
    var formEndpoint = form.getAttribute("data-mcrown-form-endpoint");
    var submitButton = form.querySelector('[type="submit"]');
    var submitButtonText = submitButton ? submitButton.textContent : "";
    var formFields = form.querySelector("[data-form-fields]");
    var successPanel = form.querySelector("[data-form-success]");
    var isFormSubmitting = false;
    var hasStartedForm = false;

    function trackFormStart() {
      if (hasStartedForm) {
        return;
      }

      hasStartedForm = true;
      reachGoal(METRIKA_GOALS.formStart, {
        form: "admissions",
        page: window.location.pathname
      });
    }

    form.addEventListener("input", trackFormStart);
    form.addEventListener("change", trackFormStart);

    function setFormSubmitting(isSubmitting) {
      isFormSubmitting = isSubmitting;
      form.classList.toggle("is-sending", isSubmitting);

      if (!submitButton) {
        return;
      }

      submitButton.disabled = isSubmitting;
      submitButton.textContent = isSubmitting ? "Отправляем..." : submitButtonText;
    }

    function addTrackingParams(payload) {
      if (typeof URLSearchParams !== "function") {
        return;
      }

      var searchParams = new URLSearchParams(window.location.search);
      [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "yclid"
      ].forEach(function (paramName) {
        var value = searchParams.get(paramName);
        if (value) {
          payload[paramName] = value;
        }
      });
    }

    function buildFormPayload() {
      var payload = {};
      var formData = new FormData(form);

      formData.forEach(function (value, key) {
        payload[key] = typeof value === "string" ? value.trim() : value;
      });

      payload.page = window.location.href;
      payload.referrer = document.referrer || "";
      addTrackingParams(payload);

      return payload;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (isFormSubmitting) {
        return;
      }

      if (!form.checkValidity()) {
        status.textContent = "Проверьте обязательные поля перед отправкой.";
        form.reportValidity();
        return;
      }

      if (!formEndpoint || typeof window.fetch !== "function") {
        status.textContent = "Не удалось отправить заявку. Пожалуйста, позвоните или напишите нам на email.";
        return;
      }

      setFormSubmitting(true);
      status.textContent = "Отправляем заявку...";

      window.fetch(formEndpoint, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8"
        },
        body: JSON.stringify(buildFormPayload())
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Form request failed");
          }
        })
        .then(function () {
          reachGoal(METRIKA_GOALS.formSubmit, {
            form: "admissions",
            page: window.location.pathname,
            configuredGoalId: form.getAttribute("data-metrika-goal-id") || ""
          });

          status.textContent = "";
          form.reset();
          if (formFields) {
            formFields.hidden = true;
          }
          if (successPanel) {
            successPanel.hidden = false;
            successPanel.focus({ preventScroll: true });
          }
        })
        .catch(function () {
          status.textContent = "Не удалось отправить заявку. Пожалуйста, позвоните или напишите нам на email.";
        })
        .then(function () {
          setFormSubmitting(false);
        });
    });
  }
})();
