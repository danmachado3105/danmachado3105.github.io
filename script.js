// Atualiza o ano no rodapé automaticamente
document.getElementById('year').textContent = new Date().getFullYear();

// Destaca o link do menu correspondente à seção visível na tela
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
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

sections.forEach((section) => observer.observe(section));