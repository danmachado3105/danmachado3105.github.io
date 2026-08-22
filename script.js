// Atualiza o ano no rodapé automaticamente
document.getElementById('year').textContent = new Date().getFullYear();

// Destaca o link do menu correspondente à seção visível na tela
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--green-bright)'
            : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach((section) => navObserver.observe(section));

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

// Cards de tecnologia: no toque (mobile) alterna o flip com um tap,
// já que hover não existe de verdade em telas touch
document.querySelectorAll('.tech-card').forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
});
// Carrossel de projetos — looping automático e contínuo, com setas para acelerar manualmente
const projectsViewport = document.getElementById('projectsViewport');
const projectsTrack = document.getElementById('projectsTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

if (projectsViewport && projectsTrack && carouselPrev && carouselNext) {
  const totalCards = projectsTrack.children.length;
  const originalCount = totalCards / 2; // a trilha tem os cards originais + uma cópia pro loop

  let cardStep = 0;   // largura de 1 card + gap, em px
  let setWidth = 0;   // largura de um "conjunto" completo (metade da trilha)
  let offset = 0;      // posição atual de rolagem
  let targetOffset = null; // usado só durante um clique manual nas setas
  let paused = prefersReducedMotion; // não roda sozinho se o usuário prefere menos movimento
  let lastTime = null;

  const AUTO_SPEED = 26; // px por segundo — bem devagar, dá pra ler com calma
  const MANUAL_EASE = 0.12; // velocidade da animação ao clicar nas setas

  function measure() {
    if (originalCount === 0) return;
    const first = projectsTrack.children[0];
    const second = projectsTrack.children[1];
    cardStep = second.offsetLeft - first.offsetLeft;
    setWidth = cardStep * originalCount;
  }

  function wrap() {
    if (setWidth <= 0) return;
    if (offset >= setWidth) {
      offset -= setWidth;
      if (targetOffset !== null) targetOffset -= setWidth;
    }
    if (offset < 0) {
      offset += setWidth;
      if (targetOffset !== null) targetOffset += setWidth;
    }
  }

  function frame(time) {
    if (lastTime === null) lastTime = time;
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    if (targetOffset !== null) {
      const diff = targetOffset - offset;
      offset += diff * Math.min(MANUAL_EASE * (dt * 60), 1);
      if (Math.abs(diff) < 0.5) {
        offset = targetOffset;
        targetOffset = null;
      }
    } else if (!paused) {
      offset += AUTO_SPEED * dt;
    }

    wrap();
    projectsTrack.style.transform = `translateX(${-offset}px)`;
    requestAnimationFrame(frame);
  }

  measure();
  requestAnimationFrame(frame);
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);

  carouselNext.addEventListener('click', () => {
    const base = targetOffset !== null ? targetOffset : offset;
    targetOffset = base + cardStep;
  });

  carouselPrev.addEventListener('click', () => {
    const base = targetOffset !== null ? targetOffset : offset;
    targetOffset = base - cardStep;
  });

  // Pausa o avanço automático enquanto o mouse estiver sobre os cards
  projectsViewport.addEventListener('mouseenter', () => { paused = true; });
  projectsViewport.addEventListener('mouseleave', () => { paused = false; });
}