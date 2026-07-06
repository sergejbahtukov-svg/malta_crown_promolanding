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
    formSubmit: "lead_form_submit"
  };

  function reachGoal(goalName, params) {
    if (typeof window.ym !== "function") {
      return;
    }

    window.ym(METRIKA_COUNTER_ID, "reachGoal", goalName, params || {});
  }

  root.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || typeof target.closest !== "function") {
      return;
    }

    var link = target.closest('a[href^="tel:"], a[href^="mailto:"]');
    if (!link || !root.contains(link)) {
      return;
    }

    var href = link.getAttribute("href") || "";
    var isPhoneClick = href.indexOf("tel:") === 0;

    reachGoal(isPhoneClick ? METRIKA_GOALS.phoneClick : METRIKA_GOALS.emailClick, {
      page: window.location.pathname
    });
  });

  var menuButton = root.querySelector("[data-mcrown-menu]");
  var nav = root.querySelector("[data-mcrown-nav]");

  function closeMenu() {
    if (!menuButton || !nav) {
      return;
    }

    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Открыть меню");
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        closeMenu();
      }
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
    var labelText = daysLeft > 0 ? "до безопасного срока" : "последний день подачи";

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

  var tabButtons = root.querySelectorAll("[data-mcrown-tab]");
  var tabPanels = root.querySelectorAll("[data-mcrown-panel]");

  tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var activeTab = button.getAttribute("data-mcrown-tab");

      tabButtons.forEach(function (item) {
        var isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      tabPanels.forEach(function (panel) {
        panel.classList.toggle("is-active", panel.getAttribute("data-mcrown-panel") === activeTab);
      });
    });
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
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = "Проверьте обязательные поля перед отправкой.";
        form.reportValidity();
        return;
      }

      reachGoal(METRIKA_GOALS.formSubmit, {
        form: "admissions",
        page: window.location.pathname
      });

      status.textContent = "Заявка подготовлена. Подключите обработчик формы в конструкторе сайта или CRM.";
      form.reset();
    });
  }
})();
