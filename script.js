document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".office-gallery");

  if (!gallery) {
    return;
  }

  const track = gallery.querySelector(".office-gallery__track");
  const counter = gallery.querySelector(".office-gallery__counter");
  const arrows = gallery.querySelectorAll(".office-gallery__arrows button");
  const dots = gallery.querySelectorAll(".office-gallery__dots button");
  const pauseButton = gallery.querySelector(".office-gallery__pause");
  const slides = gallery.querySelectorAll("figure");

  let current = 0;
  let manuallyPaused = false;
  let interactionPaused = false;

  const update = () => {
    track.style.transform = "translateX(-" + current * 100 + "%)";
    counter.textContent = current + 1 + " / " + slides.length;

    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", index === current ? "false" : "true");
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === current);

      if (index === current) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    update();
  };

  arrows[0]?.addEventListener("click", () => show(current - 1));
  arrows[1]?.addEventListener("click", () => show(current + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => show(index));
  });

  pauseButton?.addEventListener("click", () => {
    manuallyPaused = !manuallyPaused;
    pauseButton.textContent = manuallyPaused ? "Продолжить" : "Пауза";
    pauseButton.setAttribute(
      "aria-label",
      manuallyPaused
        ? "Продолжить автоматическую смену фотографий"
        : "Остановить автоматическую смену фотографий",
    );
  });

  gallery.addEventListener("mouseenter", () => {
    interactionPaused = true;
  });

  gallery.addEventListener("mouseleave", () => {
    interactionPaused = false;
  });

  gallery.addEventListener("focusin", () => {
    interactionPaused = true;
  });

  gallery.addEventListener("focusout", (event) => {
    if (!gallery.contains(event.relatedTarget)) {
      interactionPaused = false;
    }
  });

  window.setInterval(() => {
    if (!manuallyPaused && !interactionPaused) {
      show(current + 1);
    }
  }, 4500);

  update();
});
