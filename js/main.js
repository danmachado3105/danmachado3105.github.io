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

// Efeito 3D sutil ao passar o mouse nos cards de projeto
if (!prefersReducedMotion) {
  document.querySelectorAll('.project-card').forEach((card) => {
    const maxTilt = 6; // graus, mantido sutil de propósito

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * maxTilt * 2}deg) rotateX(${-y * maxTilt * 2}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
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

if (projectsViewport && projectsTrack && carouselPrev && carouselNext && projectsScrollbar && projectsScrollbarThumb) {
  projectsTrack.querySelectorAll('.project-card[aria-hidden="true"]').forEach((card) => card.remove());

  const scrollAmount = () => {
    const firstCard = projectsTrack.querySelector('.project-card');
    const gap = Number.parseFloat(window.getComputedStyle(projectsTrack).columnGap) || 0;
    return firstCard ? firstCard.getBoundingClientRect().width + gap : projectsViewport.clientWidth;
  }

  function updateProjectsScrollbar() {
    const maxScroll = projectsViewport.scrollWidth - projectsViewport.clientWidth;
    const railWidth = projectsScrollbar.clientWidth;
    const thumbWidth = maxScroll > 0
      ? Math.max(36, railWidth * (projectsViewport.clientWidth / projectsViewport.scrollWidth))
      : railWidth;
    const maxThumbTravel = Math.max(0, railWidth - thumbWidth);
    const progress = maxScroll > 0 ? projectsViewport.scrollLeft / maxScroll : 0;

    projectsScrollbarThumb.style.width = `${thumbWidth}px`;
    projectsScrollbarThumb.style.transform = `translate3d(${maxThumbTravel * progress}px, 0, 0)`;
    projectsScrollbar.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    projectsScrollbar.setAttribute('aria-valuetext', `${Math.round(progress * 100)}% dos projetos`);
    projectsScrollbar.toggleAttribute('aria-disabled', maxScroll <= 0);
  }

  function scrollToPointer(clientX) {
    const railRect = projectsScrollbar.getBoundingClientRect();
    const thumbWidth = projectsScrollbarThumb.getBoundingClientRect().width;
    const maxThumbTravel = Math.max(0, railRect.width - thumbWidth);
    const thumbPosition = Math.min(maxThumbTravel, Math.max(0, clientX - railRect.left - thumbWidth / 2));
    const maxScroll = projectsViewport.scrollWidth - projectsViewport.clientWidth;
    projectsViewport.scrollLeft = maxThumbTravel > 0 ? (thumbPosition / maxThumbTravel) * maxScroll : 0;
  }

  carouselPrev.addEventListener('click', () => {
    projectsViewport.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  carouselNext.addEventListener('click', () => {
    projectsViewport.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  projectsViewport.addEventListener('scroll', updateProjectsScrollbar, { passive: true });

  projectsScrollbar.addEventListener('pointerdown', (event) => {
    projectsScrollbar.setPointerCapture(event.pointerId);
    projectsScrollbar.classList.add('is-dragging');
    scrollToPointer(event.clientX);
  });

  projectsScrollbar.addEventListener('pointermove', (event) => {
    if (projectsScrollbar.hasPointerCapture(event.pointerId)) scrollToPointer(event.clientX);
  });

  function endScrollbarDrag(event) {
    if (projectsScrollbar.hasPointerCapture(event.pointerId)) {
      projectsScrollbar.releasePointerCapture(event.pointerId);
      projectsScrollbar.classList.remove('is-dragging');
    }
  }

  projectsScrollbar.addEventListener('pointerup', endScrollbarDrag);
  projectsScrollbar.addEventListener('pointercancel', endScrollbarDrag);
  projectsScrollbar.addEventListener('click', (event) => scrollToPointer(event.clientX));
  projectsScrollbar.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      projectsViewport.scrollBy({ left: (event.key === 'ArrowRight' ? 1 : -1) * scrollAmount(), behavior: 'smooth' });
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      projectsViewport.scrollTo({ left: event.key === 'End' ? projectsViewport.scrollWidth : 0, behavior: 'smooth' });
    }
  });

  new ResizeObserver(updateProjectsScrollbar).observe(projectsViewport);
  new ResizeObserver(updateProjectsScrollbar).observe(projectsTrack);
  new MutationObserver(updateProjectsScrollbar).observe(projectsTrack, { childList: true });
  updateProjectsScrollbar();
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
