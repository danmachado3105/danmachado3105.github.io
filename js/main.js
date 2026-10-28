(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, '0');
  const html = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  let lenis = null;

  /* ============ PROJETOS (edite aqui: para mais fotos, adicione caminhos em imgs) ============ */
  const projects = [
    { t: 'Duet', tags: ['React', 'Vite', 'JavaScript', "API TMDB"],
      d: 'Aplicação web criada para ajudar duas pessoas a encontrar filmes, séries e animações que combinem com os gostos de ambas. A proposta é tornar a escolha do que assistir mais simples, interativa e divertida, transformando a indecisão em uma experiência compartilhada.',
      hl: ['Encontra filmes, séries e animações que agradam às duas pessoas', 'Torna a escolha do que assistir simples, interativa e divertida', 'Transforma a indecisão em uma experiência compartilhada'],
      l: 'https://duet-phi-mauve.vercel.app/', c: 'Ver site', imgs: ['assets/Duet.png', 'assets/duet2.png', 'assets/duet3.png', 'assets/duet4.png', 'assets/duet5.png', 'assets/duet6.png', 'assets/duet7.png', 'assets/duet8.png'] },

    { t: 'ConectaCDD', tags: ['Javascript', 'CSS', 'HTML'],
      d: 'Plataforma web desenvolvida para aproximar os moradores da Cidade de Deus dos órgãos competentes, permitindo o registro ágil e o acompanhamento transparente de ocorrências de saneamento básico e infraestrutura urbana. O projeto foi estruturado com base nos Objetivos de Desenvolvimento Sustentável (ODS 11) da ONU.',
      hl: ['Canal direto e intuitivo para reporte de demandas urbanas pelos cidadãos', 'Alinhamento direto com os Objetivos de Desenvolvimento Sustentável (ODS 11 da ONU)', 'Painel de gestão integrado para acompanhamento de chamados e controle de status'],
      l: 'https://conectacdd.vercel.app/', c: 'Ver site', imgs: ['assets/conectacdd.png', 'assets/conectacdd2.png', 'assets/conectacdd3.png', 'assets/conectacdd4.png', 'assets/conectacdd5.png', 'assets/conectacdd6.png', 'assets/conectacdd7.png', 'assets/conectacdd8.png', 'assets/conectacdd9.png'] },

    { t: 'Workzen', tags: ['React', 'TypeScript', 'Python', 'PostgreSQL'],
      d: 'MVP de SaaS para profissionais que atendem por horário. Centraliza clientes, serviços, agenda e acompanhamento de pagamentos em uma interface web responsiva, com API própria e banco PostgreSQL.',
      hl: ['Centraliza clientes, serviços, agenda e pagamentos', 'Interface web responsiva', 'API própria e banco PostgreSQL'],
      l: 'https://github.com/danmachado3105/workzen', c: 'Ver repositório', imgs: ['assets/workzen.png', 'assets/workzen2.png', 'assets/workzen3.png', 'assets/workzen4.png', 'assets/workzen5.png', 'assets/workzen6.png'] },

    { t: 'Redify', tags: ['Python-FastAPI', 'JavaScript', 'Anthropic Api'],
      d: 'Plataforma de correção de redações do ENEM com IA. Avalia as 5 competências oficiais, calibrada nos critérios reais de correção, com paywall e pagamento integrado via Mercado Pago.',
      hl: ['Avalia as 5 competências oficiais do ENEM', 'Calibrada nos critérios reais de correção', 'Paywall com pagamento integrado via Mercado Pago'],
      l: 'https://github.com/danmachado3105/Redify-app', c: 'Ver repositório', imgs: ['assets/Redify.png', 'assets/Redify2.png', 'assets/Redify3.png', 'assets/Redify4.png', 'assets/Redify5.png'] },

    { t: 'Velun Tech', tags: ['JavaScript', 'CSS', 'HTML'],
      d: 'Site institucional para uma agência de desenvolvimento web voltada a pequenos negócios, com diagrama animado do processo, comparativo antes/depois e planos de investimento.',
      hl: ['Diagrama animado do processo', 'Comparativo antes/depois', 'Planos de investimento'],
      l: 'https://veluntech.netlify.app', c: 'Ver site', imgs: ['assets/Velun-tech.png', 'assets/Velun-tech2.png', 'assets/Velun-tech3.png', 'assets/Velun-tech4.png', 'assets/Velun-tech5.png', 'assets/Velun-tech6.png', 'assets/Velun-tech7.png', 'assets/Velun-tech8.png'] },

    { t: 'FP Selection', tags: ['Javascript', 'CSS', 'HTML'],
      d: 'Projeto front-end focado em design, animações e experiência do usuário, desenvolvido a partir de uma ideia de vitrine automotiva e posteriormente aprimorado com identidade visual própria.',
      hl: ['Foco em design, animações e experiência do usuário', 'Nasceu de uma ideia de vitrine automotiva', 'Aprimorado com identidade visual própria'],
      l: 'https://fpselection.netlify.app/', c: 'Ver site', imgs: ['assets/fp-sellection.png', 'assets/fp-sellection2.png', 'assets/fp-sellection3.png'] },

    { t: 'Velun AI', tags: ['React', 'TypeScript', 'SQLAlchemy', 'Ollama'],
      d: 'Assistente de IA local com memória de conversas via busca semântica (RAG) e leitura de documentos enviados pelo usuário (PDF e Word).',
      hl: ['Memória de conversas via busca semântica (RAG)', 'Leitura de documentos enviados (PDF e Word)', 'Assistente de IA local'],
      l: 'https://github.com/danmachado3105/Velun-AI', c: 'Ver repositório', imgs: ['assets/velun-ai.png', 'assets/venulai-conversa.png', 'assets/velunai-branco.png', 'assets/velunai-conversa-br.png'] },

    { t: 'Velun ZAP', tags: ['JavaScript', 'CSS', 'HTML'],
      d: 'Landing page de um assistente com IA para atendimento automático no WhatsApp, simulando conversas reais de qualificação de clientes para pequenos negócios.',
      hl: ['Atendimento automático no WhatsApp com IA', 'Simula conversas reais de qualificação de clientes', 'Pensado para pequenos negócios'],
      l: 'https://velunzap.netlify.app', c: 'Ver site', imgs: ['assets/Velun-zap.png', 'assets/Velun-zap2.png', 'assets/Velun-zap3.png', 'assets/Velun-zap4.png'] },

    { t: 'Taskflow', tags: ['Javascript', 'CSS', 'HTML'],
      d: 'Gerenciador de tarefas moderno, com organização por status e acompanhamento de progresso.',
      hl: ['Organização por status', 'Acompanhamento de progresso', 'Interface moderna'],
      l: 'https://task-flow-six-topaz.vercel.app', c: 'Ver site', imgs: ['assets/Taskflow.png', 'assets/Taskflow2.png'] }
  ];
  const N = projects.length;

  const track = $('#pTrack'), view = $('#pView'), dotsEl = $('#pDots');
  track.innerHTML = projects.map((p, i) => `
    <article class="card" role="button" tabindex="0" aria-haspopup="dialog" aria-label="Abrir detalhes: ${p.t}" data-i="${i}">
      <div class="card-img">
        <img src="${p.imgs[0]}" alt="Tela do ${p.t}" loading="lazy" draggable="false">
        <span class="card-n">${pad(i + 1)}</span>
        <span class="card-open">↗</span>
      </div>
      <div class="card-body">
        <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        <h3>${p.t}</h3>
        <p class="card-desc">${p.d}</p>
        <div class="card-more"><span>Ver detalhes</span><i>→</i></div>
      </div>
    </article>`).join('');

  dotsEl.innerHTML = projects.map((p, i) =>
    `<button type="button" data-i="${i}" data-d="${Math.min(i, 3)}" aria-label="Ir para ${p.t}"></button>`).join('');

  let goToCard = null;

  /* ============ Painel de detalhes ============ */
  const pm = $('#pm'), pmInner = $('#pmInner'), pmImg = $('#pmImg'), pmThumbs = $('#pmThumbs'), pmClose = $('#pmClose');
  let current = -1, lastCard = null;

  function cardEl(i) {
    const mid = innerWidth / 2;
    const d = (el) => { const r = el.getBoundingClientRect(); return Math.abs(r.left + r.width / 2 - mid); };
    return $$(`.card[data-i="${i}"]`).sort((a, b) => d(a) - d(b))[0];
  }

  function fill(i) {
    const p = projects[i];
    current = i;
    $('#pmN').textContent = `${pad(i + 1)} / ${pad(N)}`;
    $('#pmTitle').textContent = p.t;
    $('#pmTags').innerHTML = p.tags.map((t) => `<span>${t}</span>`).join('');
    $('#pmDesc').textContent = p.d;
    $('#pmList').innerHTML = p.hl.map((h) => `<li>${h}</li>`).join('');
    const a = $('#pmLink');
    a.href = p.l;
    a.textContent = `${p.c} ↗`;
    pmImg.src = p.imgs[0];
    pmImg.alt = `Tela do ${p.t}`;
    pmThumbs.innerHTML = p.imgs.length > 1
      ? p.imgs.map((src, k) => `<button type="button" class="${k ? '' : 'on'}" data-src="${src}" aria-label="Imagem ${k + 1}"><img src="${src}" alt=""></button>`).join('')
      : '';
    pmInner.scrollTop = 0;
  }

  pmThumbs.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    $$('button', pmThumbs).forEach((x) => x.classList.toggle('on', x === b));
    if (hasGsap) {
      gsap.to(pmImg, { opacity: 0, duration: 0.2, onComplete: () => { pmImg.src = b.dataset.src; gsap.to(pmImg, { opacity: 1, duration: 0.35 }); } });
    } else pmImg.src = b.dataset.src;
  });

  function openProject(i, card) {
    lastCard = card;
    fill(i);
    lenis && lenis.stop();
    html.classList.add('no-scroll');
    pm.classList.add('open');
    pm.setAttribute('aria-hidden', 'false');
    if (!hasGsap) { pmClose.focus(); return; }
    const r = card.getBoundingClientRect();
    const from = `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px round 28px)`;
    gsap.killTweensOf(pm);
    gsap.set(pm, { opacity: 1 });
    gsap.fromTo(pm, { clipPath: from }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: reduce ? 0 : 0.9, ease: 'power4.inOut' });
    if (!reduce) {
      gsap.from('.pm-main', { scale: 1.15, opacity: 0, duration: 1, delay: 0.35, ease: 'power3.out', clearProps: 'all' });
      gsap.from('.pm-info > *', { y: 40, opacity: 0, duration: 0.8, stagger: 0.07, delay: 0.45, ease: 'power3.out', clearProps: 'all' });
    }
    pmClose.focus({ preventScroll: true });
  }

  function finishClose() {
    const el = current >= 0 ? cardEl(current) : lastCard;
    pm.classList.remove('open');
    pm.setAttribute('aria-hidden', 'true');
    hasGsap && gsap.set(pm, { clearProps: 'clipPath,opacity' });
    html.classList.remove('no-scroll');
    lenis && lenis.start();
    el && el.focus({ preventScroll: true });
    current = -1;
  }

  function closeProject() {
    if (current < 0) return;
    if (!hasGsap || reduce) return finishClose();
    const card = cardEl(current);
    const r = card ? card.getBoundingClientRect() : null;
    const visible = r && r.width > 0 && r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight;
    if (visible) {
      const to = `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px round 28px)`;
      gsap.to(pm, { clipPath: to, duration: 0.7, ease: 'power4.inOut', onComplete: finishClose });
    } else {
      gsap.to(pm, { opacity: 0, duration: 0.4, onComplete: finishClose });
    }
  }

  function swapProject(dir) {
    const next = (current + dir + N) % N;
    goToCard && goToCard(next);
    if (!hasGsap || reduce) return fill(next);
    gsap.to(pmInner, { opacity: 0, y: 20, duration: 0.25, onComplete: () => {
      fill(next);
      gsap.fromTo(pmInner, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    } });
  }

  pmClose.addEventListener('click', closeProject);
  $('#pmNext').addEventListener('click', () => swapProject(1));
  document.addEventListener('keydown', (e) => {
    if (current < 0) return;
    if (e.key === 'Escape') closeProject();
    if (e.key === 'ArrowRight') swapProject(1);
    if (e.key === 'ArrowLeft') swapProject(-1);
  });
  track.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) openProject(+card.dataset.i, card);
  });
  track.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.card');
    if (!card) return;
    e.preventDefault();
    openProject(+card.dataset.i, card);
  });
  dotsEl.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b && goToCard) goToCard(+b.dataset.i);
  });

  /* ============ Detalhes da formação ============ */
  const eduModal = $('#eduModal'), eduClose = $('#eduClose');
  $$('.tl li:not(.ghost) .tc-desc').forEach((desc) => {
    desc.dataset.fullText = desc.textContent.trim();
    const limit = 165;
    if (desc.dataset.fullText.length > limit) desc.textContent = `${desc.dataset.fullText.slice(0, limit).trimEnd()}...`;
  });
  const eduDetails = [
    {
      status: 'Concluído',
      skills: ['Lógica e algoritmos', 'Programação estruturada', 'Desenvolvimento web', 'Programação orientada a objetos', 'Modelagem de dados', 'Fundamentos de sistemas e redes'],
      subjects: ['Algoritmos e programação estruturada', 'Programação web', 'Programação orientada a objetos', 'Banco de dados', 'Sistemas operacionais', 'Redes de computadores']
    },
    {
      status: 'Em andamento · 1º período',
      skills: ['Estruturação de projetos', 'Metodologias ágeis (Scrum)', 'Fundamentos de programação com C', 'Cálculo de uma variável'],
      subjects: ['Engenharia da Ideia à Concepção', 'Análise Espacial', 'Base de Programação', 'Cálculo de uma variável']
    }
  ];
  let eduTrigger = null, eduAnimatingClose = false;
  function openEducation(button) {
    const card = button.closest('.tc'), index = [...card.closest('.tl').querySelectorAll('.tc')].indexOf(card);
    const details = eduDetails[index];
    if (!details) return;
    eduTrigger = button;
    eduAnimatingClose = false;
    $('#eduLogo').src = card.querySelector('.tc-img-logo').src;
    $('#eduLogo').alt = card.querySelector('.tc-img-logo').alt;
    $('#eduStatus').textContent = details.status;
    $('#eduSchool').textContent = card.querySelector('h3').textContent;
    $('#eduTitle').textContent = card.querySelector('.tc-role').textContent.replace(/\s*·\s*Bolsista ProUni/i, '');
    $('#eduPeriod').textContent = card.querySelector('.date').textContent;
    $('#eduDesc').textContent = card.querySelector('.tc-desc').dataset.fullText;
    $('#eduSkills').innerHTML = details.skills.map((skill) => `<li>${skill}</li>`).join('');
    $('#eduSubjects').innerHTML = details.subjects.map((subject) => `<li>${subject}</li>`).join('');
    eduModal.classList.add('open');
    eduModal.setAttribute('aria-hidden', 'false');
    html.classList.add('no-scroll');
    lenis && lenis.stop();
    if (hasGsap && !reduce) {
      const r = card.getBoundingClientRect();
      const from = `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px round 24px)`;
      gsap.killTweensOf(eduModal);
      gsap.set(eduModal, { opacity: 1 });
      gsap.fromTo(eduModal, { clipPath: from }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 0.9, ease: 'power4.inOut' });
    }
    eduClose.focus({ preventScroll: true });
  }
  function closeEducation() {
    if (!eduModal.classList.contains('open') || eduAnimatingClose) return;
    eduAnimatingClose = true;
    const finishClose = () => {
      eduModal.classList.remove('open');
      eduModal.setAttribute('aria-hidden', 'true');
      hasGsap && gsap.set(eduModal, { clearProps: 'clipPath,opacity' });
      html.classList.remove('no-scroll');
      lenis && lenis.start();
      eduTrigger && eduTrigger.focus({ preventScroll: true });
      eduAnimatingClose = false;
    };
    if (!hasGsap || reduce) return finishClose();
    gsap.killTweensOf(eduModal);
    const r = eduTrigger.getBoundingClientRect();
    const visible = r.width > 0 && r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight;
    if (!visible) return gsap.to(eduModal, { opacity: 0, duration: 0.35, onComplete: finishClose });
    const to = `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px round 24px)`;
    gsap.to(eduModal, { clipPath: to, duration: 0.7, ease: 'power4.inOut', onComplete: finishClose });
  }
  $$('.tl li:not(.ghost) .tc').slice(0, 2).forEach((card) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', `Ler mais sobre ${card.querySelector('.tc-role').textContent}`);
    card.addEventListener('click', (e) => {
      if (!e.target.closest('a, button')) openEducation(card);
    });
    card.addEventListener('keydown', (e) => {
      if (e.target !== card || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault();
      openEducation(card);
    });
  });
  eduClose.addEventListener('click', closeEducation);
  eduModal.addEventListener('click', (e) => { if (e.target === eduModal) closeEducation(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeEducation(); });

  /* ============ Menu mobile ============ */
  const menu = $('#mobileMenu'), menuBtn = $('#menuBtn');
  function closeMenu() {
    if (!menu.classList.contains('open')) return;
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = 'Menu';
    html.classList.remove('no-scroll');
    lenis && lenis.start();
  }
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Fechar' : 'Menu';
    html.classList.toggle('no-scroll', open);
    if (lenis) open ? lenis.stop() : lenis.start();
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', closeMenu));

  /* ============ Extras simples ============ */
  $('#year').textContent = new Date().getFullYear();
  const clock = $('#clock');
  if (clock) {
    const tick = () => { clock.textContent = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date()); };
    tick();
    setInterval(tick, 30000);
  }

  if (reduce || !hasGsap) {
    view.style.overflowX = 'auto';
    dotsEl.hidden = true;
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* ============ Scroll suave ============ */
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.09 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id.startsWith('#') || id.length < 2) return;
      e.preventDefault();
      lenis.scrollTo(id, { duration: 1.4 });
    }));
  }

  /* ============ Cores que mudam por seção ============ */
  const themes = {
    hero:     { fg: '#f5efe6', line: '#2c2724', on: '#140f0c' },
    sobre:    { bg: '#efe8dc', fg: '#1a1512', mut: '#6b6258', line: '#d5ccbd', ac: '#e8452c', ac2: '#ff9a62', on: '#fff6ea' },
    stack:    { bg: '#0f1a14', fg: '#eaf3e6', mut: '#8fa597', line: '#25382c', ac: '#c8f560', ac2: '#7be0a8', on: '#0f1a14' },
    formacao: { bg: '#f4dfe3', fg: '#2a1219', mut: '#7a5560', line: '#e2c3cb', ac: '#e0306a', ac2: '#ff8aa8', on: '#fff0f3' },
    projetos: { bg: '#111010', fg: '#f6f1e7', mut: '#a39d92', line: '#2c2926', ac: '#ffd23f', ac2: '#ff7a45', on: '#171208' },
    contato:  { bg: '#0e4a47', fg: '#effff6', mut: '#9fd3c4', line: '#1f6560', ac: '#ffdf6b', ac2: '#9bf2d0', on: '#0b2f2d' }
  };
  const setTheme = (key) => {
    const heroTheme = key === 'hero' ? {
      ...themes.hero,
      bg: getComputedStyle(html).getPropertyValue('--hero-bg').trim(),
      mut: getComputedStyle(html).getPropertyValue('--hero-muted').trim(),
      ac: getComputedStyle(html).getPropertyValue('--hero-brown').trim(),
      ac2: getComputedStyle(html).getPropertyValue('--hero-brown-hover').trim()
    } : themes[key];
    const vars = Object.fromEntries(Object.entries(heroTheme).map(([k, v]) => ['--' + k, v]));
    gsap.to(html, { ...vars, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
  };

  /* ============ Header: indicador deslizante + esconder ao descer ============ */
  const nav = $('#nav'), ind = $('.nav-ind'), links = $$('a', nav);
  let activeLink = null;
  gsap.set(ind, { x: 0, width: 0, opacity: 0 });
  function moveInd(el) {
    links.forEach((l) => l.classList.toggle('is-on', l === el));
    if (!el) return gsap.to(ind, { opacity: 0, duration: 0.3 });
    gsap.to(ind, { x: el.offsetLeft, width: el.offsetWidth, opacity: 1, duration: 0.5, ease: 'power3.out' });
  }
  links.forEach((l) => l.addEventListener('mouseenter', () => moveInd(l)));
  nav.addEventListener('mouseleave', () => moveInd(activeLink));

  $$('[data-theme]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onToggle: (s) => {
        if (!s.isActive) return;
        setTheme(sec.dataset.theme);
        activeLink = links.find((l) => l.dataset.sec === sec.id) || null;
        moveInd(activeLink);
      }
    });
  });

  const header = $('#header');
  let hidden = false;
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: (s) => {
      if (menu.classList.contains('open')) return;
      const hide = s.direction === 1 && s.scroll() > 200;
      if (hide !== hidden) {
        hidden = hide;
        gsap.to(header, { yPercent: hide ? -140 : 0, duration: 0.45, ease: 'power2.out' });
      }
    }
  });

  /* ============ Intro do hero ============ */
  gsap.set('.hero-photo', { rotation: 4 });
  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .from('.hero-top', { opacity: 0, y: -20, duration: 0.8 })
    .from('.hero-title .ln > *', { yPercent: 110, duration: 1.3, stagger: 0.12 }, '-=0.5')
    .fromTo('.hero-photo', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut', clearProps: 'clipPath' }, '-=1.1')
    .from('.badge', { scale: 0, duration: 0.9, ease: 'back.out(1.7)' }, '-=0.5')
    .from('.hero-copy > *', { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, '-=1')
    .from('.status', { opacity: 0, duration: 0.8 }, '-=0.8')
    .from(header, { yPercent: -140, opacity: 0, duration: 1 }, '-=1.2');

  $$('.blob').forEach((b) => gsap.to(b, { x: 'random(-80,80)', y: 'random(-60,60)', duration: 'random(6,10)', repeat: -1, yoyo: true, repeatRefresh: true, ease: 'sine.inOut' }));

  if (fine) {
    const px = gsap.quickTo('.hero-photo', 'x', { duration: 0.9 });
    const py = gsap.quickTo('.hero-photo', 'y', { duration: 0.9 });
    $('.hero').addEventListener('pointermove', (e) => {
      px((e.clientX / innerWidth - 0.5) * 36);
      py((e.clientY / innerHeight - 0.5) * 36);
    });
  }

  /* ============ Faixa, frase, títulos, blocos ============ */
  const mq = $('.marquee-track');
  mq.innerHTML += mq.innerHTML;
  gsap.to(mq, { xPercent: -50, repeat: -1, duration: 28, ease: 'none' });

  $$('[data-words]').forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
    gsap.fromTo($$('.w', el), { opacity: 0.15 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
  });

  $$('.ttl').forEach((h) => gsap.from($$('.ln > *', h), { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 88%' } }));
  $$('.about-text p').forEach((p) => gsap.fromTo(p, { color: '#77716a' }, {
    color: '#000000', ease: 'none',
    scrollTrigger: { trigger: p, start: 'top 82%', end: 'top 48%', scrub: true }
  }));
  $$('.label, .hint, .about-text p, .stack-list li, .contact .hero-sub, .c-card').forEach((el) =>
    gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 90%' } }));

  gsap.fromTo('.ph img', { yPercent: 0 }, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.about-grid', scrub: true } });

  /* ============ Linha do tempo central ============ */
  gsap.fromTo('.tl-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.tl', start: 'top 60%', end: 'bottom 60%', scrub: true } });
  $$('.tl li').forEach((li, i) => {
    const dir = i % 2 === 0 ? -1 : 1;
    gsap.from($('.tc', li), {
      x: innerWidth < 768 ? 0 : dir * 80, y: 40, opacity: 0, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity',
      scrollTrigger: { trigger: li, start: 'top 85%' }
    });
    ScrollTrigger.create({ trigger: li, start: 'top 60%', toggleClass: { targets: li, className: 'on' } });
  });

  /* ============ Projetos: carrossel em loop infinito ============ */
  $$('.card', track).forEach((c) => {
    const k = c.cloneNode(true);
    k.setAttribute('aria-hidden', 'true');
    k.removeAttribute('role');
    k.removeAttribute('aria-label');
    k.tabIndex = -1;
    track.append(k);
  });

  const SPEED = 52; // px por segundo
  let offset = 0, step = 0, loopW = 0, cardW = 0;
  let hold = false, hover = false, down = false, dragging = false, suppress = false, inView = true, activeIdx = -1;
  let tw = null;
  const proxy = { o: 0 };
  const dotBtns = $$('button', dotsEl);

  const measure = () => {
    const cs = track.children;
    step = cs[1].offsetLeft - cs[0].offsetLeft;
    cardW = cs[0].offsetWidth;
    loopW = step * N;
  };

  const render = () => {
    offset = ((offset % loopW) + loopW) % loopW;
    track.style.transform = `translate3d(${-offset}px,0,0)`;
  };

  const updateDots = () => {
    const centerLeft = offset + view.clientWidth / 2 - cardW / 2;
    const idx = (((Math.round(centerLeft / step)) % N) + N) % N;
    if (idx === activeIdx) return;
    activeIdx = idx;
    dotBtns.forEach((d, k) => {
      let dist = Math.abs(k - idx);
      dist = Math.min(dist, N - dist);
      d.dataset.d = Math.min(dist, 3);
      d.setAttribute('aria-current', k === idx ? 'true' : 'false');
    });
    $$('.card', track).forEach((c) => c.classList.toggle('is-active', +c.dataset.i === idx));
  };

  goToCard = (i, instant) => {
    if (!loopW) return;
    let diff = (i * step + cardW / 2 - view.clientWidth / 2) - offset;
    diff = ((((diff + loopW / 2) % loopW) + loopW) % loopW) - loopW / 2;
    tw && tw.kill();
    if (instant) { offset += diff; render(); updateDots(); return; }
    hold = true;
    proxy.o = offset;
    tw = gsap.to(proxy, {
      o: offset + diff, duration: 1.1, ease: 'power3.inOut',
      onUpdate: () => { offset = proxy.o; },
      onComplete: () => { hold = false; }
    });
  };

  measure();
  goToCard(0, true);
  addEventListener('resize', () => { measure(); render(); });
  addEventListener('load', () => { measure(); render(); ScrollTrigger.refresh(); });

  ScrollTrigger.create({ trigger: view, start: 'top bottom', end: 'bottom top', onToggle: (s) => { inView = s.isActive; } });

  gsap.ticker.add((t, dt) => {
    if (!loopW || !inView) return;
    if (!hold && !hover && !down && current < 0) offset += SPEED * Math.min(dt, 50) / 1000;
    render();
    updateDots();
  });

  gsap.from(view, { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: view, start: 'top 90%' } });

  if (fine) {
    view.addEventListener('pointerenter', () => { hover = true; });
    view.addEventListener('pointerleave', () => { hover = false; });
  }

  let startX = 0, startOffset = 0, pid = null;
  view.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    tw && tw.kill();
    hold = false;
    down = true;
    dragging = false;
    suppress = false;
    startX = e.clientX;
    startOffset = offset;
    pid = e.pointerId;
  });
  view.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!dragging && Math.abs(dx) > 6) {
      dragging = true;
      view.classList.add('drag');
      try { view.setPointerCapture(pid); } catch (_) {}
    }
    if (dragging) offset = startOffset - dx;
  });
  const endDrag = () => {
    if (!down) return;
    down = false;
    suppress = dragging;
    dragging = false;
    view.classList.remove('drag');
  };
  view.addEventListener('pointerup', endDrag);
  view.addEventListener('pointercancel', endDrag);
  view.addEventListener('click', (e) => {
    if (!suppress) return;
    e.stopPropagation();
    e.preventDefault();
    suppress = false;
  }, true);

  /* ============ Interações com mouse ============ */
  if (fine) {
    $$('.card').forEach((card) => {
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' });
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' });
      gsap.set(card, { transformPerspective: 900 });
      card.addEventListener('pointermove', (e) => {
        if (down) return;
        const r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx((0.5 - (e.clientY - r.top) / r.height) * 10);
      });
      card.addEventListener('pointerleave', () => { rx(0); ry(0); });
    });

    $$('[data-magnetic]').forEach((el) => {
      const qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1,.5)' });
      const qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1,.5)' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        qx((e.clientX - r.left - r.width / 2) * 0.3);
        qy((e.clientY - r.top - r.height / 2) * 0.3);
      });
      el.addEventListener('pointerleave', () => { qx(0); qy(0); });
    });

    const c = $('.cursor');
    const SMALL = 0.1667;
    gsap.set(c, { xPercent: -50, yPercent: -50, scale: SMALL });
    const cx = gsap.quickTo(c, 'x', { duration: 0.25, ease: 'power3' });
    const cy = gsap.quickTo(c, 'y', { duration: 0.25, ease: 'power3' });
    addEventListener('pointermove', (e) => { cx(e.clientX); cy(e.clientY); });
    $$('a, button').forEach((el) => {
      el.addEventListener('pointerenter', () => gsap.to(c, { scale: 0.6, duration: 0.3 }));
      el.addEventListener('pointerleave', () => gsap.to(c, { scale: SMALL, duration: 0.3 }));
    });
    $$('.card').forEach((el) => {
      el.addEventListener('pointerenter', () => { c.classList.add('view'); gsap.to(c, { scale: 1, duration: 0.4, ease: 'power3.out' }); });
      el.addEventListener('pointerleave', () => { c.classList.remove('view'); gsap.to(c, { scale: SMALL, duration: 0.3 }); });
    });
  }

  addEventListener('load', () => ScrollTrigger.refresh());
})();
