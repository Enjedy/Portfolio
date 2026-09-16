/* ─── Particles ─── */
(function initParticles() {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  c.classList.add('hero-particles');
  document.getElementById('home').appendChild(c);

  let w, h, particles = [];

  function resize() {
    const hero = document.getElementById('home');
    w = c.width = hero.offsetWidth;
    h = c.height = hero.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      o: Math.random() * 0.3 + 0.05,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,245,66,${p.o})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }

  draw();
})();

/* ─── Nav scroll + mobile menu ─── */
(function initNav() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      links.classList.toggle('open');
      burger.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        burger.classList.remove('active');
      });
    });
  }
})();

/* ─── Animated counters ─── */
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    if (el.dataset.animated) return;
    const raw = el.dataset.target;
    const target = parseFloat(raw);
    const suffix = raw.replace(/[\d.]+/, '');
    const isFloat = raw.includes('.');
    const dur = 1800;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = isFloat ? (target * ease).toFixed(1) : Math.floor(target * ease);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.dataset.animated = '1';
    }
    requestAnimationFrame(tick);
  });
}

/* ─── Scroll reveal ─── */
(function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        if (e.target.querySelectorAll('[data-target]').length) {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ─── Scroll progress bar ─── */
(function initProgress() {
  const bar = document.createElement('div');
  bar.classList.add('scroll-progress');
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / h) * 100 + '%';
  });
})();

/* ─── Smooth anchor offset ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
