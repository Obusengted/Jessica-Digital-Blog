/* ==========================================================================
   Jessica Keneo Letsapa | Reflective Blog & Portfolio
   Scripts
   --------------------------------------------------------------------------
   1. Helpers
   2. Mobile menu
   3. Scroll reveal + counters
   4. Active nav link on scroll
   5. Copy buttons (letter & email)
   6. "Open in email app" link
   ========================================================================== */

/* 1. HELPERS */
const $  = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function countUp(el, target) {
  let i = 0;
  const timer = setInterval(() => {
    el.textContent = ++i;
    if (i >= target) clearInterval(timer);
  }, 150);
}


/* 2. MOBILE MENU */
$('#burger').onclick = () => $('#links').classList.toggle('open');
$$('#links a').forEach((a) => {
  a.onclick = () => $('#links').classList.remove('open');
});


/* 3. SCROLL REVEAL + COUNTERS */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    el.classList.add('in');
    revealObserver.unobserve(el);

    el.querySelectorAll('[data-n]').forEach((c) => countUp(c, +c.dataset.n));
    if (el.dataset.n) countUp(el, +el.dataset.n);
  });
}, { threshold: .12 });

$$('.rv').forEach((el) => revealObserver.observe(el));


/* 4. ACTIVE NAV LINK ON SCROLL */
const sections = [...$$('main section, #home')];

addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach((s) => {
    if (s.getBoundingClientRect().top < 140 && s.id) current = s.id;
  });
  $$('#links a').forEach((a) => {
    a.classList.toggle('on', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });


/* 5. COPY BUTTONS */
$$('.copy').forEach((btn) => {
  btn.onclick = async () => {
    const text = document.getElementById(btn.dataset.copy).innerText;
    const original = btn.textContent;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied ✓';
    } catch (e) {
      btn.textContent = 'Select & copy manually';
    }
    setTimeout(() => (btn.textContent = original), 1800);
  };
});


/* 6. "OPEN IN EMAIL APP" LINK */
$('#mailto').onclick = (e) => {
  e.preventDefault();
  const text = $('#emailText').innerText;
  const subject = 'Internship/Attachment Application: Jessica Keneo Letsapa';
  const body = text.split('\n').slice(3).join('\n').trim();
  location.href = 'mailto:?subject=' + encodeURIComponent(subject) +
                  '&body=' + encodeURIComponent(body);
};
