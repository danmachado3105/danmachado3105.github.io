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