// Atualiza o ano no rodapé automaticamente
document.getElementById('year').textContent = new Date().getFullYear();

// Alternância de tema com preferência persistida no navegador
const themeToggle = document.getElementById('theme-toggle');

function updateThemeToggle() {
  const isLightMode = document.body.classList.contains('light-mode');
  themeToggle.setAttribute('aria-label', isLightMode ? 'Ativar modo escuro' : 'Ativar modo claro');
  themeToggle.setAttribute('aria-pressed', String(isLightMode));
}

if (themeToggle) {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }

  updateThemeToggle();

  themeToggle.addEventListener('click', () => {
    const isLightMode = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    updateThemeToggle();
  });
}

// Destaca o link do menu correspondente à seção visível na tela

const dockItems = document.querySelectorAll('.dock-item');
const dockSections = document.querySelectorAll('#top, #sobre, #tecnologias, #formacao, #projetos, #contato');

const dockObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      dockItems.forEach((item) => {
        item.classList.toggle('active', item.dataset.target === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

dockSections.forEach((s) => dockObserver.observe(s));

// Respeita quem prefere menos movimento
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animação de entrada ao rolar a página (fade + subida), com leve atraso escalonado
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.children)
            .filter((el) => el.classList.contains('reveal'));
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${Math.min(index, 4) * 90}ms`;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

// Revelação dos títulos dentro de máscaras ao entrar na viewport
const headingRevealEls = document.querySelectorAll('.heading-reveal');

if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  let refreshedAfterInitialScroll = false;

  function refreshAfterInitialScroll() {
    if (refreshedAfterInitialScroll) return;
    refreshedAfterInitialScroll = true;
    requestAnimationFrame(() => requestAnimationFrame(() => window.ScrollTrigger.refresh()));
  }

  window.addEventListener('scroll', refreshAfterInitialScroll, { once: true, passive: true });

  function initializeHeadingReveals() {
    window.ScrollTrigger.refresh();

    headingRevealEls.forEach((heading) => {
      window.gsap.fromTo(heading,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: heading.closest('.heading-mask'),
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    window.ScrollTrigger.refresh();
  }

  initializeHeadingReveals();
  window.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true });
} else {
  headingRevealEls.forEach((heading) => {
    heading.style.opacity = '1';
    heading.style.transform = 'none';
  });
}

// Barra de progresso de leitura no topo da página
const progressFill = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressFill.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// Navegação horizontal dos projetos
const projectsViewport = document.getElementById('projectsViewport');
const projectsTrack = document.getElementById('projectsTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const projectsScrollbar = document.getElementById('projectsScrollbar');
const projectsScrollbarThumb = document.getElementById('projectsScrollbarThumb');

if (projectsViewport && projectsTrack && projectsScrollbar && projectsScrollbarThumb) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let originalCards = [];
  let loopWidth = 0;
  let offset = 0;
  let targetOffset = null;
  let paused = prefersReducedMotion.matches;
  let lastFrameTime = 0;
  let pointerStart = null;
  let isDraggingCards = false;
  let suppressCardClick = false;
  let scrollbarPointerOffset = 0;
  const AUTO_SPEED = 26;
  const MANUAL_EASE = 0.12;

  function markClone(card) {
    card.classList.add('is-carousel-clone');
    card.setAttribute('aria-hidden', 'true');
    card.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((element) => {
      element.setAttribute('tabindex', '-1');
    });
    return card;
  }

  function rebuildLoop() {
    projectsTrack.querySelectorAll('.is-carousel-clone').forEach((card) => card.remove());
    projectsTrack.querySelectorAll('.project-card[aria-hidden="true"]:not(.is-carousel-clone)').forEach((card) => card.remove());
    originalCards = Array.from(projectsTrack.children).filter((card) => (
      card.classList.contains('project-card') && !card.hasAttribute('aria-hidden')
    ));

    originalCards.forEach((card) => projectsTrack.append(markClone(card.cloneNode(true))));
    measureLoop();
  }

  function measureLoop() {
    if (originalCards.length === 0) {
      loopWidth = 0;
      return;
    }

    const firstClone = projectsTrack.children[originalCards.length];
    loopWidth = firstClone ? firstClone.offsetLeft - projectsTrack.children[0].offsetLeft : 0;
    if (loopWidth > 0) offset %= loopWidth;
    updateProjectsScrollbar();
  }

  function updateProjectsScrollbar() {
    const railWidth = projectsScrollbar.clientWidth;
    const thumbWidth = Math.min(railWidth, Math.max(48, railWidth * 0.2));
    const maxThumbTravel = Math.max(0, railWidth - thumbWidth);
    const progress = loopWidth > 0 ? offset / loopWidth : 0;

    projectsScrollbarThumb.style.width = `${thumbWidth}px`;
    projectsScrollbarThumb.style.transform = `translate3d(${maxThumbTravel * progress}px, 0, 0)`;
    projectsScrollbar.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    projectsScrollbar.setAttribute('aria-valuetext', `${Math.round(progress * 100)}% do ciclo de projetos`);
    projectsScrollbar.toggleAttribute('aria-disabled', loopWidth <= 0);
  }

  function wrapOffset() {
    if (loopWidth <= 0 || (offset >= 0 && offset < loopWidth)) return;
    offset = ((offset % loopWidth) + loopWidth) % loopWidth;
    if (targetOffset !== null) {
      targetOffset = ((targetOffset % loopWidth) + loopWidth) % loopWidth;
    }
  }

  function renderProjects(time) {
    if (!lastFrameTime) lastFrameTime = time;
    const delta = Math.min((time - lastFrameTime) / 1000, 0.05);
    lastFrameTime = time;

    if (loopWidth > 0 && !paused) {
      if (targetOffset !== null) {
        const difference = targetOffset - offset;
        offset += difference * Math.min(MANUAL_EASE * (delta * 60), 1);
        if (Math.abs(difference) < 0.5) {
          offset = targetOffset;
          targetOffset = null;
        }
      } else {
        offset += AUTO_SPEED * delta;
      }

      wrapOffset();
      projectsTrack.style.transform = `translate3d(${-offset}px, 0, 0)`;
      updateProjectsScrollbar();
    }

    window.requestAnimationFrame(renderProjects);
  }

  function jumpToScrollbar(clientX, pointerOffset = projectsScrollbarThumb.getBoundingClientRect().width / 2) {
    const railRect = projectsScrollbar.getBoundingClientRect();
    const thumbWidth = projectsScrollbarThumb.getBoundingClientRect().width;
    const travel = Math.max(0, railRect.width - thumbWidth);
    const thumbPosition = Math.min(travel, Math.max(0, clientX - railRect.left - pointerOffset));

    if (travel > 0 && loopWidth > 0) {
      offset = (thumbPosition / travel) * loopWidth;
      targetOffset = null;
      projectsTrack.style.transform = `translate3d(${-offset}px, 0, 0)`;
      updateProjectsScrollbar();
    }
  }

  function moveByCard(direction) {
    if (originalCards.length < 2) return;
    const step = originalCards[1].offsetLeft - originalCards[0].offsetLeft;
    targetOffset = offset + direction * step;
    paused = false;
  }

  if (carouselPrev) carouselPrev.addEventListener('click', () => moveByCard(-1));
  if (carouselNext) carouselNext.addEventListener('click', () => moveByCard(1));

  projectsScrollbar.addEventListener('pointerdown', (event) => {
    const thumbRect = projectsScrollbarThumb.getBoundingClientRect();
    scrollbarPointerOffset = event.target === projectsScrollbarThumb
      ? event.clientX - thumbRect.left
      : thumbRect.width / 2;
    paused = true;
    projectsScrollbar.setPointerCapture(event.pointerId);
    projectsScrollbar.classList.add('is-dragging');
    jumpToScrollbar(event.clientX, scrollbarPointerOffset);
  });

  projectsScrollbar.addEventListener('pointermove', (event) => {
    if (projectsScrollbar.hasPointerCapture(event.pointerId)) jumpToScrollbar(event.clientX, scrollbarPointerOffset);
  });

  function endScrollbarDrag(event) {
    if (!projectsScrollbar.hasPointerCapture(event.pointerId)) return;
    projectsScrollbar.releasePointerCapture(event.pointerId);
    projectsScrollbar.classList.remove('is-dragging');
    paused = prefersReducedMotion.matches;
  }

  projectsScrollbar.addEventListener('pointerup', endScrollbarDrag);
  projectsScrollbar.addEventListener('pointercancel', endScrollbarDrag);
  projectsScrollbar.addEventListener('click', (event) => {
    if (event.target === projectsScrollbar) jumpToScrollbar(event.clientX);
  });
  projectsScrollbar.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveByCard(event.key === 'ArrowRight' ? 1 : -1);
    }
  });

  projectsViewport.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    pointerStart = { x: event.clientX, y: event.clientY, offset };
    isDraggingCards = false;
    paused = true;
  });

  projectsViewport.addEventListener('pointermove', (event) => {
    if (!pointerStart) return;
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;

    if (!isDraggingCards && Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY)) {
      isDraggingCards = true;
      projectsViewport.setPointerCapture(event.pointerId);
    }

    if (isDraggingCards) {
      event.preventDefault();
      offset = pointerStart.offset - deltaX;
      if (loopWidth > 0) offset = ((offset % loopWidth) + loopWidth) % loopWidth;
      targetOffset = null;
      projectsTrack.style.transform = `translate3d(${-offset}px, 0, 0)`;
      updateProjectsScrollbar();
    }
  });

  function endCardDrag(event) {
    if (!pointerStart) return;
    suppressCardClick = isDraggingCards;
    pointerStart = null;
    isDraggingCards = false;
    if (projectsViewport.hasPointerCapture(event.pointerId)) projectsViewport.releasePointerCapture(event.pointerId);
    paused = prefersReducedMotion.matches;
  }

  projectsViewport.addEventListener('pointerup', endCardDrag);
  projectsViewport.addEventListener('pointercancel', endCardDrag);
  projectsViewport.addEventListener('click', (event) => {
    if (!suppressCardClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressCardClick = false;
  }, true);
  projectsViewport.addEventListener('mouseenter', () => { paused = true; });
  projectsViewport.addEventListener('mouseleave', () => { paused = prefersReducedMotion.matches || pointerStart !== null; });
  prefersReducedMotion.addEventListener('change', (event) => { paused = event.matches; });

  rebuildLoop();
  new ResizeObserver(measureLoop).observe(projectsViewport);
  new ResizeObserver(measureLoop).observe(projectsTrack);

  new MutationObserver((records) => {
    if (records.some((record) => [...record.addedNodes, ...record.removedNodes]
      .some((node) => node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('is-carousel-clone')))) {
      rebuildLoop();
    }
  }).observe(projectsTrack, { childList: true });

  window.requestAnimationFrame(renderProjects);
}

const timelineEl = document.getElementById('timeline');
if (timelineEl) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        timelineEl.classList.add('is-drawn');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  timelineObserver.observe(timelineEl);
}
