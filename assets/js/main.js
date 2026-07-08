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
    formSubmit: "lead_form_submit"
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
    var privacyHref = window.location.pathname.indexOf("privacy.html") !== -1 ? "#policy-title" : "privacy.html";

    banner.className = "mc-cookie";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Уведомление об использовании cookie");
    banner.innerHTML = '<p>Мы используем cookie и Яндекс Метрику для аналитики, улучшения сайта и учета рекламных целей.</p><div class="mc-cookie__actions"><a class="mc-cookie__link" href="' + privacyHref + '">Политика обработки данных</a><button class="mc-cookie__button" type="button" data-mcrown-cookie-accept>Понятно</button></div>';

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

    if (normalizedHref.indexOf("tel:") === 0) {
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
    link.addEventListener("click", function (event) {
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
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  var deadlineCounters = root.querySelectorAll("[data-mcrown-deadline-days]");
  var deadlineLabels = root.querySelectorAll("[data-mcrown-deadline-label]");

  if (deadlineCounters.length) {
    var deadlineDate = new Date(2026, 6, 31);
    var today = new Date();
    var todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var dayMs = 24 * 60 * 60 * 1000;
    var daysLeft = Math.ceil((deadlineDate.getTime() - todayStart.getTime()) / dayMs);

    function pluralizeDays(number) {
      var lastDigit = number % 10;
      var lastTwoDigits = number % 100;

      if (lastDigit === 1 && lastTwoDigits !== 11) {
        return "день";
      }

      if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
        return "дня";
      }

      return "дней";
    }

    var counterText = daysLeft > 0 ? daysLeft + " " + pluralizeDays(daysLeft) : "сегодня";
    var labelText = daysLeft > 0 ? "осталось до 31 июля" : "последний день подачи";

    if (daysLeft < 0) {
      counterText = "срок прошел";
      labelText = "для начала обучения в сентябре";
    }

    deadlineCounters.forEach(function (counter) {
      counter.textContent = counterText;
    });

    deadlineLabels.forEach(function (label) {
      label.textContent = labelText;
    });
  }

  var heroCarousel = root.querySelector("[data-mcrown-hero-carousel]");

  if (heroCarousel) {
    var heroSlides = Array.prototype.slice.call(heroCarousel.querySelectorAll(".mc-hero-carousel__slide"));
    var heroDots = Array.prototype.slice.call(heroCarousel.querySelectorAll(".mc-hero-carousel__dots button"));
    var heroCaptionLabel = heroCarousel.querySelector("[data-mcrown-hero-caption-label]");
    var heroCaptionText = heroCarousel.querySelector("[data-mcrown-hero-caption-text]");
    var activeHeroSlide = 0;
    var heroCarouselTimer = null;
    var reduceHeroMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    var isFormSubmitting = false;

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
            page: window.location.pathname
          });

          status.textContent = "Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.";
          form.reset();
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
