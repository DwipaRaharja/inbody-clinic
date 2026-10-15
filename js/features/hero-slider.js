const controllers = new WeakMap();
const autoplayDelay = 5000;
const transitionDuration = 700;

export function initHeroSlider(root) {
  if (!root) return () => {};
  if (controllers.has(root)) return controllers.get(root);

  const slides = [...root.querySelectorAll('[data-hero-slide]')];
  if (!slides.length) return () => {};

  const dots = [...root.querySelectorAll('[data-hero-go-to]')];
  const toggle = root.querySelector('[data-hero-toggle]');
  const playIcon = root.querySelector('[data-hero-play-icon]');
  const status = root.querySelector('[data-hero-status]');
  const section = root.closest('section');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = [];
  let activeIndex = 0;
  let userPaused = reducedMotion.matches;
  let focused = root.contains(document.activeElement);
  let inView = true;
  let pageActive = true;
  let transitioning = false;
  let destroyed = false;
  let autoplayTimer;
  let transitionTimer;
  let firstFrame;
  let secondFrame;

  const listen = (target, type, handler) => {
    target.addEventListener(type, handler);
    listeners.push(() => target.removeEventListener(type, handler));
  };

  const canAutoplay = () => slides.length > 1 && !destroyed && pageActive && !userPaused
    && !focused && inView && !document.hidden;

  function scheduleAutoplay() {
    window.clearTimeout(autoplayTimer);
    root.dataset.autoplay = String(canAutoplay());
    if (canAutoplay() && !transitioning) {
      autoplayTimer = window.setTimeout(() => goTo((activeIndex + 1) % slides.length), autoplayDelay);
    }
  }

  function updatePauseButton() {
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(userPaused));
      toggle.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
    }
    if (playIcon) {
      playIcon.classList.toggle('ph-play', userPaused);
      playIcon.classList.toggle('ph-pause', !userPaused);
    }
  }

  function updateActiveSlide(announce) {
    root.dataset.activeIndex = String(activeIndex);
    slides.forEach((slide, index) => {
      const active = index === activeIndex;
      slide.inert = !active;
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot) => {
      dot.setAttribute('aria-current', String(Number(dot.dataset.heroGoTo) === activeIndex));
    });
    const heading = slides[activeIndex].querySelector('h1[id], h2[id]');
    if (section && heading?.id) section.setAttribute('aria-labelledby', heading.id);
    if (status && announce) status.textContent = `Slide ${activeIndex + 1} of ${slides.length}`;
    root.dispatchEvent(new CustomEvent('hero:change', { detail: { index: activeIndex } }));
  }

  function finishTransition() {
    window.clearTimeout(transitionTimer);
    root.dataset.animate = 'false';
    slides.forEach((slide, index) => {
      slide.dataset.position = index === activeIndex ? 'active' : 'next';
    });
    transitioning = false;
    scheduleAutoplay();
  }

  function goTo(index, announce = false) {
    if (destroyed || transitioning || !Number.isInteger(index) || index < 0 || index >= slides.length) return;
    if (index === activeIndex) {
      scheduleAutoplay();
      return;
    }

    window.clearTimeout(autoplayTimer);
    root.dataset.animate = 'false';
    const outgoing = slides[activeIndex];
    const incoming = slides[index];
    incoming.dataset.position = 'next';

    if (reducedMotion.matches) {
      activeIndex = index;
      updateActiveSlide(announce);
      finishTransition();
      return;
    }

    transitioning = true;
    // Commit the offscreen starting position before enabling the slide transition.
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        root.dataset.animate = 'true';
        outgoing.dataset.position = 'exit';
        incoming.dataset.position = 'active';
        activeIndex = index;
        updateActiveSlide(announce);
        transitionTimer = window.setTimeout(finishTransition, transitionDuration);
      });
    });
  }

  listen(root, 'click', (event) => {
    const dot = event.target.closest('[data-hero-go-to]');
    if (dot && root.contains(dot)) goTo(Number(dot.dataset.heroGoTo), true);
  });

  if (toggle) {
    listen(toggle, 'click', () => {
      userPaused = !userPaused;
      // An explicit Play request resumes even while the control holds focus.
      // A later focus entry pauses rotation again.
      if (!userPaused) {
        focused = false;
      }
      updatePauseButton();
      scheduleAutoplay();
    });
  }

  listen(root, 'keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (!event.target.closest('[data-hero-go-to], [data-hero-toggle]')) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    goTo((activeIndex + direction + slides.length) % slides.length, true);
  });

  listen(root, 'focusin', () => {
    focused = true;
    scheduleAutoplay();
  });
  listen(root, 'focusout', (event) => {
    focused = root.contains(event.relatedTarget);
    scheduleAutoplay();
  });
  listen(document, 'visibilitychange', scheduleAutoplay);
  listen(reducedMotion, 'change', () => {
    if (reducedMotion.matches) {
      userPaused = true;
      updatePauseButton();
    }
    scheduleAutoplay();
  });

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      scheduleAutoplay();
    }, { threshold: 0 })
    : null;
  observer?.observe(root);

  function destroy() {
    destroyed = true;
    window.clearTimeout(autoplayTimer);
    window.clearTimeout(transitionTimer);
    window.cancelAnimationFrame(firstFrame);
    window.cancelAnimationFrame(secondFrame);
    observer?.disconnect();
    listeners.forEach((remove) => remove());
    controllers.delete(root);
  }

  listen(window, 'pagehide', () => {
    pageActive = false;
    window.cancelAnimationFrame(firstFrame);
    window.cancelAnimationFrame(secondFrame);
    finishTransition();
  });
  listen(window, 'pageshow', () => {
    pageActive = true;
    scheduleAutoplay();
  });
  controllers.set(root, destroy);
  root.dataset.animate = 'false';
  slides.forEach((slide, index) => {
    slide.dataset.position = index === activeIndex ? 'active' : 'next';
  });
  updateActiveSlide(false);
  updatePauseButton();
  scheduleAutoplay();
  return destroy;
}
