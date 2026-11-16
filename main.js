/* Maison Cèdre — site de démonstration Alto Studio. Toutes les données sont fictives. */
(() => {
  'use strict';

  const U = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=85`;
  const FALLBACK = U('1512917774080-9991f1c4c750');

  // ─── Données des biens (source unique du carrousel et des fiches)
  const PROPERTIES = [
    {
      id: 'prop1', ref: 'MC-001', deal: 'Vente', kind: 'Villa', district: 'Champel',
      name: 'Villa des Tilleuls',
      short: '280 m² · 5,5 pièces · Terrasse 250 m²',
      price: "CHF 3'850'000", priceLabel: 'Prix de vente', priceNote: 'Disponible immédiatement',
      hero: '1600596542815-ffad4c1539a9',
      headline: 'Une villa d\'architecte au cœur de Champel.',
      desc: [
        'Nichée dans l\'un des quartiers les plus recherchés de Genève, cette villa contemporaine réunit lignes épurées et confort absolu. Livrée en 2018, elle associe béton clair, chêne massif et grandes baies vitrées.',
        'Le rez-de-chaussée s\'ouvre sur un double séjour baigné de lumière, une cuisine entièrement équipée et une terrasse de 250 m² orientée plein sud, prolongée par une piscine chauffée. L\'étage accueille trois suites avec dressing et salle de bain en pierre naturelle.',
        'Domotique complète, garage double avec borne de recharge et cave à vins climatisée. Transports et écoles internationales à quelques minutes à pied.'
      ],
      specs: [['Surface', '280 m²'], ['Pièces', '5,5'], ['Chambres', '3'], ['Terrasse', '250 m²'], ['Parking', '2 places'], ['Année', '2018'], ['Charges', 'CHF 580 / mois'], ['Énergie', 'Classe A']],
      gallery: [['1600210492493-0946911123ea', 'Salon lumineux'], ['1600607687939-ce8a6c25118c', 'Cuisine ouverte'], ['1583847268964-b28dc8f51f92', 'Chambre'], ['1584622650111-993a426fbf0a', 'Salle de bain'], ['1600566753151-384129cf4e3e', 'Séjour et terrasse']]
    },
    {
      id: 'prop2', ref: 'MC-002', deal: 'Vente', kind: 'Maison de maître', district: 'Carouge',
      name: 'Domaine des Glycines',
      short: '340 m² · 7 pièces · Jardin 1 200 m²',
      price: "CHF 5'400'000", priceLabel: 'Prix de vente', priceNote: 'Visites sur rendez-vous',
      hero: '1580587771525-78b9dba3b914',
      headline: 'Une maison de maître aux portes de Carouge.',
      desc: [
        'Rare sur le marché genevois, ce domaine privé conjugue le charme d\'une maison de maître et les standards actuels les plus exigeants. Son jardin de 1 200 m², à l\'abri des regards, en fait une retraite paisible à dix minutes du centre.',
        'La rénovation complète menée en 2020 a préservé les éléments d\'origine — parquet en chêne, cheminées en marbre, hauts plafonds moulurés — tout en intégrant une cuisine de chef et des menuiseries sur mesure.',
        'Le jardin paysager comprend un bassin de nage de 14 mètres, un pavillon d\'été et une terrasse couverte. Le sous-sol offre 80 m² supplémentaires : cave, cellier et salle de sport.'
      ],
      specs: [['Surface', '340 m²'], ['Pièces', '7'], ['Chambres', '5'], ['Jardin', '1 200 m²'], ['Parking', '3 places'], ['Rénovation', '2020'], ['Charges', 'CHF 840 / mois'], ['Énergie', 'Classe B']],
      gallery: [['1600585154340-be6161a56a0c', 'Façade et jardin'], ['1600607687644-c7171b42498f', 'Salon'], ['1617104551722-3b2d51366400', 'Espace de vie'], ['1600566753151-384129cf4e3e', 'Séjour'], ['1583847268964-b28dc8f51f92', 'Chambre']]
    },
    {
      id: 'prop3', ref: 'MC-003', deal: 'Location', kind: 'Attique', district: 'Eaux-Vives',
      name: 'Attique du Lac',
      short: '160 m² · 4,5 pièces · Vue lac',
      price: "CHF 8'900", priceLabel: 'Loyer mensuel', priceNote: 'Charges comprises · libre au 1er février 2027',
      hero: '1502672260266-1c1ef2d93688',
      headline: 'Le lac pour horizon, la ville à vos pieds.',
      desc: [
        'Au dernier étage d\'un immeuble de standing des Eaux-Vives, cet attique traversant offre une vue dégagée sur la rade et le Jura. La terrasse de 40 m² se vit comme une pièce supplémentaire, du petit-déjeuner au coucher du soleil.',
        'Séjour de 55 m² avec cheminée, cuisine ouverte, deux chambres avec salle d\'eau et un bureau. Parquet point de Hongrie, climatisation réversible et rangements intégrés dans toutes les pièces.',
        'Conciergerie, ascenseur privatif, cave et place de parc en sous-sol. Les quais, les commerces et le parc La Grange sont à moins de cinq minutes à pied.'
      ],
      specs: [['Surface', '160 m²'], ['Pièces', '4,5'], ['Chambres', '2'], ['Terrasse', '40 m²'], ['Parking', '1 place'], ['Étage', '7e et dernier'], ['Bail', '12 mois min.'], ['Énergie', 'Classe B']],
      gallery: [['1560448204-e02f11c3d0e2', 'Séjour'], ['1560185007-cde436f6a4d0', 'Pièce de vie'], ['1600210492493-0946911123ea', 'Salon'], ['1584622650111-993a426fbf0a', 'Salle de bain'], ['1600607687939-ce8a6c25118c', 'Cuisine']]
    }
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const hasGsap = typeof window.gsap !== 'undefined';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = hasGsap && !reduced;
  const imgErr = `onerror="this.onerror=null;this.src='${FALLBACK}'"`;
  const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;

  // ─── Rendu : carrousel
  const track = $('#carousel-track');
  track.innerHTML = PROPERTIES.map((p, i) => `
    <button type="button" class="slide" data-open="${p.id}" aria-label="${p.name}, ${p.district} — voir le bien" ${i ? 'tabindex="-1"' : ''}>
      <img src="${U(p.hero, 1800)}" alt="${p.kind} — ${p.name}, ${p.district}" ${i ? 'loading="lazy"' : ''} ${imgErr}>
      <span class="slide-info">
        <span>
          <span class="slide-badge">${p.deal} · ${p.ref}</span>
          <span class="slide-name" style="display:block">${p.name}</span>
          <span class="slide-meta" style="display:block">${p.kind} · ${p.district} — ${p.short}</span>
        </span>
        <span class="slide-side">
          <span class="slide-price" style="display:block">${p.price}${p.deal === 'Location' ? ' / mois' : ''}</span>
          <span class="slide-link">Voir le bien ${icon('arrow')}</span>
        </span>
      </span>
    </button>`).join('');

  // ─── Rendu : fiches
  $('#prop-pages').innerHTML = PROPERTIES.map(p => `
    <div class="page" id="page-${p.id}" role="dialog" aria-modal="true" aria-label="${p.name}" inert>
      <div class="page-nav">
        <button type="button" class="back-btn" data-close>${icon('left')}<span>Retour aux biens</span></button>
        <span class="logo">${icon('logo')}<span>Maison Cèdre</span></span>
        <button type="button" class="btn" data-visit>Demander une visite</button>
      </div>
      <div class="wrap detail-head">
        <p class="detail-ref">${icon('star')} Réf. ${p.ref} · ${p.deal} · ${p.district}</p>
        <h2 class="display detail-title">${p.name}</h2>
        <p class="detail-sub">${p.kind} · ${p.short}</p>
        <div class="detail-hero"><img src="${U(p.hero, 1800)}" alt="${p.name}, ${p.district}" loading="lazy" ${imgErr}></div>
      </div>
      <div class="wrap detail-body">
        <div class="detail-desc">
          <h3 class="display h3">${p.headline}</h3>
          ${p.desc.map(t => `<p>${t}</p>`).join('')}
          <div class="gallery">
            ${p.gallery.map(([id, alt]) => `<figure><img src="${U(id, 900)}" alt="${alt}" loading="lazy" ${imgErr}></figure>`).join('')}
          </div>
        </div>
        <aside class="detail-side">
          <div class="price-card">
            <p class="price-label">${p.priceLabel}</p>
            <p class="price-value">${p.price}</p>
            <p class="price-note">${p.priceNote}</p>
            <button type="button" class="btn" data-visit>Demander une visite</button>
            <button type="button" class="btn-ghost" data-visit>Recevoir la brochure</button>
          </div>
          <dl class="spec-grid">
            ${p.specs.map(([k, v]) => `<div class="spec"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
          </dl>
          <div class="loc-card">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.800 7 12 7 12Z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.6" fill="currentColor"/></svg>
            <div><strong>${p.district}, Genève</strong><span>Adresse communiquée lors de la visite</span></div>
          </div>
        </aside>
      </div>
    </div>`).join('');

  // ─── Carrousel
  const slides = $$('.slide', track);
  const countEl = $('#car-count');
  let current = 0;
  const pad = n => String(n).padStart(2, '0');
  function goTo(i) {
    current = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-100 * current}%)`;
    slides.forEach((s, k) => s.tabIndex = k === current ? 0 : -1);
    countEl.textContent = `${pad(current + 1)} / ${pad(slides.length)}`;
  }
  $('#car-prev').addEventListener('click', () => goTo(current - 1));
  $('#car-next').addEventListener('click', () => goTo(current + 1));
  $('#carousel').addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });
  // Balayage tactile
  let touchX = null;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });
  goTo(0);

  // ─── Navigation principale
  const nav = $('#top-nav');
  const burger = $('#burger');
  const menu = $('#nav-menu');
  const setMenu = open => {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
  onScroll();

  // Lien actif selon la section visible
  const navLinks = $$('a[href^="#"]', menu);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['top', 'biens', 'apropos', 'services', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });

  // ─── Apparitions au scroll
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('vis'); revObs.unobserve(en.target); } });
  }, { threshold: .12 });
  $$('.rev').forEach(el => revObs.observe(el));

  // ─── Compteurs
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      countObs.unobserve(en.target);
      const el = en.target, target = parseInt(el.dataset.count, 10);
      if (reduced) { el.textContent = target; return; }
      const t0 = performance.now(), dur = 1400;
      const tick = now => {
        const k = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: .6 });
  $$('[data-count]').forEach(el => countObs.observe(el));

  // ─── Animations GSAP (entrée du hero, parallaxe légère)
  if (animate) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-title .line > span', { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: .12, delay: .1 });
    gsap.from('.hero-media', { opacity: 0, x: 80, duration: 1.2, ease: 'power3.out', delay: .45 });
    gsap.from('.hero-left > *', { opacity: 0, y: 24, duration: .9, ease: 'power2.out', stagger: .12, delay: .7 });
    gsap.to('.hero-media .pill-img img', { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.fromTo('.dream-img img', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.dream', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('.dream-word', { yPercent: 40 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.dream', start: 'top 80%', end: 'bottom 80%', scrub: true } });
  }

  // ─── Fiches biens : ouverture, fermeture, historique
  const overlay = $('#transition-overlay');
  const mainPage = $('#page-main');
  let currentPage = null, isNavigating = false, lastFocus = null;

  function show(page) {
    page.classList.add('active');
    page.removeAttribute('inert');
    page.scrollTop = 0;
    mainPage.setAttribute('inert', '');
    document.body.classList.add('no-scroll');
    $('.back-btn', page).focus({ preventScroll: true });
  }
  function hide(page) {
    page.classList.remove('active');
    page.setAttribute('inert', '');
    mainPage.removeAttribute('inert');
    document.body.classList.remove('no-scroll');
  }
  // Rideau : monte, exécute `swap` à mi-course, puis se retire.
  function curtain(swap, done) {
    if (!animate) { swap(); done && done(); return; }
    isNavigating = true;
    gsap.timeline({ onComplete: () => { isNavigating = false; done && done(); } })
      .set(overlay, { scaleY: 0, transformOrigin: 'bottom' })
      .to(overlay, { scaleY: 1, duration: .45, ease: 'power3.in' })
      .call(swap)
      .set(overlay, { transformOrigin: 'top' })
      .to(overlay, { scaleY: 0, duration: .45, ease: 'power3.out', delay: .05 });
  }

  function openProperty(id, push = true) {
    const page = document.getElementById('page-' + id);
    if (!page || isNavigating || currentPage === id) return;
    lastFocus = document.activeElement;
    if (push) history.pushState({ property: id }, '', '#' + id);
    curtain(() => {
      if (currentPage) hide(document.getElementById('page-' + currentPage));
      currentPage = id;
      show(page);
      if (animate) {
        gsap.fromTo($('.detail-title', page), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: .25 });
        gsap.fromTo($('.detail-hero img', page), { scale: 1.12 }, { scale: 1, duration: 1.6, ease: 'power3.out', delay: .1 });
      }
    });
  }

  function closeProperty(push = true, after) {
    if (!currentPage || isNavigating) return;
    const page = document.getElementById('page-' + currentPage);
    if (push) history.pushState({}, '', location.pathname + location.search);
    curtain(() => {
      hide(page);
      currentPage = null;
      if (after) after();
      else if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    });
  }

  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open]');
    if (opener) { openProperty(opener.dataset.open); return; }
    if (e.target.closest('[data-close]')) { closeProperty(); return; }
    if (e.target.closest('[data-visit]')) {
      const p = PROPERTIES.find(x => x.id === currentPage);
      closeProperty(true, () => {
        const form = $('#form');
        if (p) {
          form.projet.value = p.deal === 'Location' ? 'Louer un bien' : 'Acheter un bien';
          if (!form.message.value) form.message.value = `Bonjour, je souhaite visiter le bien ${p.ref} — ${p.name} (${p.district}).`;
        }
        $('#contact-form').scrollIntoView({ behavior: 'auto', block: 'start' });
        form.prenom.focus({ preventScroll: true });
      });
    }
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape' && currentPage) closeProperty(); });

  window.addEventListener('popstate', e => {
    const id = e.state && e.state.property;
    if (id) openProperty(id, false);
    else if (currentPage) closeProperty(false);
  });

  $$('.page').forEach(pg => {
    const bar = $('.page-nav', pg);
    pg.addEventListener('scroll', () => bar.classList.toggle('solid', pg.scrollTop > 40), { passive: true });
  });

  // Lien direct vers une fiche (#prop2) : ouverture immédiate, sans rideau
  const initial = location.hash.slice(1);
  if (PROPERTIES.some(p => p.id === initial)) {
    currentPage = initial;
    history.replaceState({ property: initial }, '', '#' + initial);
    show(document.getElementById('page-' + initial));
  }

  // ─── Formulaire (démonstration : rien n'est envoyé)
  const form = $('#form');
  const status = $('#form-status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const required = $$('[required]', form);
    required.forEach(f => f.classList.toggle('invalid', !f.checkValidity()));
    const firstBad = required.find(f => !f.checkValidity());
    if (firstBad) {
      status.className = 'f-status error';
      status.textContent = 'Merci de renseigner votre prénom, votre nom et un e-mail valide.';
      firstBad.focus();
      return;
    }
    const prenom = form.prenom.value.trim();
    form.reset();
    status.className = 'f-status';
    status.textContent = `Merci ${prenom}, votre demande est bien notée. (Site de démonstration : aucun message n'est réellement envoyé.)`;
  });
  form.addEventListener('input', e => e.target.classList.remove('invalid'));
})();
