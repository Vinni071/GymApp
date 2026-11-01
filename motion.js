/* Small, optional UI effects. Workout records never depend on animation timing. */
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const easing = 'cubic-bezier(.22, 1, .36, 1)';
  let lastKey = null;
  let lastScreen = null;

  function allowed() {
    return !preference.matches && typeof Element.prototype.animate === 'function';
  }

  function play(element, frames, options = {}) {
    if (!element || !allowed()) return null;
    const effect = element.animate(frames, { duration: 320, easing, ...options });
    // Detached nodes and rapid navigation can cancel an effect; that is harmless.
    effect.finished.catch(() => {});
    return effect;
  }

  function key(ui) {
    return [ui.screen, ui.screen === 'workouts' ? ui.workoutDate :
      ui.screen === 'food' ? ui.foodDate : ui.screen === 'home' ? ui.homeDay : ''].join(':');
  }

  function capture(ui) {
    const nextKey = key(ui);
    return {
      key: nextKey,
      entering: lastKey !== nextKey,
      pageChanged: lastScreen !== ui.screen,
      screen: ui.screen,
      bars: lastKey === nextKey ? Array.from(document.querySelectorAll(
        '.screen-content .progressbar > div, .screen-content .macro .bar > div'
      ), bar => bar.style.width || '0%') : []
    };
  }

  function rendered(state) {
    lastKey = state.key;
    lastScreen = state.screen;
    if (!allowed()) return;
    const content = document.querySelector('.screen-content');
    if (state.entering && content) {
      if (state.pageChanged) play(content, [
          { opacity: 0, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 340 });
      const cards = content.querySelectorAll('.routine-card, .exercise, .meal-card, .stat-card, .achievement');
      Array.from(cards).slice(0, 8).forEach((card, index) => {
        play(card, [
          { opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 380, delay: Math.min(index * 35, 175), fill: 'backwards' });
      });
    }
    document.querySelectorAll('.screen-content .progressbar > div, .screen-content .macro .bar > div')
      .forEach((bar, index) => {
        const from = state.bars[index] || '0%', to = bar.style.width || '0%';
        if (from !== to) play(bar, [{ width: from }, { width: to }], { duration: 580 });
      });
  }

  function details(element) {
    const userToggle = element.hasAttribute('data-motion-user-toggle');
    element.removeAttribute('data-motion-user-toggle');
    if (!element.open || !userToggle) return;
    play(element.querySelector('.ex-body'), [
      { opacity: 0, transform: 'translateY(-6px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 260 });
  }

  function success(element) {
    play(element, [
      { transform: 'scale(.8)', offset: 0 },
      { transform: 'scale(1.16)', offset: .55 },
      { transform: 'scale(1)', offset: 1 }
    ], { duration: 330 });
  }

  function celebrate(button) {
    if (!button || !allowed()) return;
    success(button);
    const rect = button.getBoundingClientRect();
    // Keep the celebration next to the action, even if it is off screen.
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const burst = document.createElement('div');
    burst.className = 'workout-celebration';
    burst.setAttribute('aria-hidden', 'true');
    burst.style.left = `${rect.left + rect.width / 2}px`;
    burst.style.top = `${rect.top + rect.height / 2}px`;
    document.body.append(burst);
    const particles = Array.from({ length: 14 }, (_, index) => {
      const particle = document.createElement('i');
      particle.style.background = ['#a6c2ae', '#d5b98c', '#b5bacb'][index % 3];
      burst.append(particle);
      const angle = index / 14 * Math.PI * 2, distance = 45 + index % 4 * 13;
      const effect = play(particle, [
        { opacity: 1, transform: 'translate(0, 0) rotate(0deg) scale(1)' },
        { opacity: 0, transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 25}px) rotate(${index * 47}deg) scale(.5)` }
      ], { duration: 650 + index % 3 * 60, easing: 'cubic-bezier(.16, .7, .3, 1)' });
      return effect ? effect.finished.catch(() => {}) : Promise.resolve();
    });
    Promise.all(particles).then(() => burst.remove());
  }

  function dismiss(element, remove) {
    if (!element || element.dataset.motionClosing) return;
    if (!allowed()) { remove(); return; }
    element.dataset.motionClosing = 'true';
    element.style.pointerEvents = 'none';
    const effect = play(element, [{ opacity: 1 }, { opacity: 0 }], {
      duration: 150, easing: 'ease-out', fill: 'forwards'
    });
    if (effect) effect.finished.catch(() => {}).then(remove);
    else remove();
  }

  // Stop in-flight effects immediately if the user changes the OS preference.
  preference.addEventListener?.('change', event => {
    if (!event.matches) return;
    document.getAnimations?.().forEach(effect => effect.finish());
  });

  document.addEventListener('click', event => {
    const summary = event.target.closest('summary');
    const element = summary?.parentElement;
    if (element?.matches('details.exercise')) element.setAttribute('data-motion-user-toggle', 'true');
  });

  window.GymMotion = { allowed, capture, rendered, details, success, celebrate, dismiss };
})();
