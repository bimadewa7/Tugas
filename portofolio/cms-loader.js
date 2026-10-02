/**
 * Bima Arya Dewa: Static Portfolio CMS Client Loader
 * 
 * Automatically loads content from data/content.json (or localStorage draft),
 * binds text and attributes to elements matching data-cms attributes,
 * and dynamically renders list sections across all portfolio pages.
 */

(function () {
  'use strict';

  const DRAFT_KEY = 'cms_draft_content';
  const DATA_URL = 'data/content.json';

  // Helper to extract nested properties: getVal(obj, "profile.name")
  function getVal(obj, path) {
    if (!obj || !path) return undefined;
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      current = current[part];
    }
    return current;
  }

  // Load content (either from localStorage draft or fetch JSON)
  async function loadData() {
    let data = null;
    let isDraft = false;

    // Check for local storage draft
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        data = JSON.parse(draft);
        isDraft = true;
      }
    } catch (err) {
      console.warn('[CMS Loader] Error reading draft from localStorage:', err);
    }

    if (!data) {
      try {
        const res = await fetch(DATA_URL + '?t=' + Date.now());
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
      } catch (err) {
        console.warn('[CMS Loader] Failed to fetch data/content.json:', err);
        return null;
      }
    }

    return { data, isDraft };
  }

  // Bind single text, attributes, images, links
  function bindAttributes(data) {
    // 1. Text elements: data-cms="profile.name"
    document.querySelectorAll('[data-cms]').forEach((el) => {
      const path = el.getAttribute('data-cms');
      const val = getVal(data, path);
      if (val !== undefined && val !== null) {
        el.textContent = val;
      }
    });

    // 2. Counter elements: data-cms-counter="stats.semesters"
    document.querySelectorAll('[data-cms-counter]').forEach((el) => {
      const path = el.getAttribute('data-cms-counter');
      const val = getVal(data, path);
      if (val !== undefined && val !== null) {
        el.setAttribute('data-target', val);
        el.textContent = val;
      }
    });

    // 3. Href links: data-cms-href="contact.phoneTel"
    document.querySelectorAll('[data-cms-href]').forEach((el) => {
      const path = el.getAttribute('data-cms-href');
      const val = getVal(data, path);
      if (val !== undefined && val !== null) {
        el.setAttribute('href', val);
      }
    });

    // 4. Image src: data-cms-src="profile.avatar"
    document.querySelectorAll('[data-cms-src]').forEach((el) => {
      const path = el.getAttribute('data-cms-src');
      const val = getVal(data, path);
      if (val !== undefined && val !== null) {
        el.setAttribute('src', val);
      }
    });

    // 5. Image alt: data-cms-alt="profile.name"
    document.querySelectorAll('[data-cms-alt]').forEach((el) => {
      const path = el.getAttribute('data-cms-alt');
      const val = getVal(data, path);
      if (val !== undefined && val !== null) {
        el.setAttribute('alt', val);
      }
    });
  }

  // Render dynamic list elements based on page
  function renderLists(data) {
    // 1. Bio Page: Coursework List
    const courseworkContainer = document.querySelector('[data-cms-list="education.coursework"]');
    if (courseworkContainer && data.education && Array.isArray(data.education.coursework)) {
      courseworkContainer.innerHTML = data.education.coursework.map((c, index) => {
        const id = c.id || String(index + 1).padStart(2, '0');
        const isLast = index === data.education.coursework.length - 1;
        return `
          <li class="flex items-baseline gap-4 border-b border-border/60 pb-4 ${isLast ? 'last:border-0 last:pb-0' : ''}">
            <span class="font-mono text-xs text-gold font-bold">${id}</span>
            <span class="text-foreground/85 font-medium">${c.name}</span>
          </li>
        `;
      }).join('');
    }

    // 2. Expertise Page: 4 Domains Grid
    const domainsContainer = document.querySelector('[data-cms-list="expertise.domains"]');
    if (domainsContainer && data.expertise && Array.isArray(data.expertise.domains)) {
      domainsContainer.innerHTML = data.expertise.domains.map((dom, i) => {
        const delay = (0.05 + i * 0.1).toFixed(2);
        const skillsHtml = (dom.skills || []).map((s) => `
          <li class="flex gap-2.5 text-[#F2F2F0]">
            <span class="mt-2 size-1.5 shrink-0 rounded-full bg-[#A0938A]"></span>
            ${s}
          </li>
        `).join('');

        return `
          <div class="reveal is-visible" style="--delay: ${delay}s">
            <div class="h-full border-t border-[#2E2E30] pt-6 text-left flex flex-col justify-between">
              <div>
                <h3 class="font-display text-xl text-[#F2F2F0] font-semibold">${dom.title}</h3>
                <p class="mt-3 text-sm leading-relaxed text-[#9A9A9E]">
                  ${dom.description}
                </p>
              </div>
              <ul class="mt-5 space-y-2 border-t border-[#2E2E30] pt-5 text-sm">
                ${skillsHtml}
              </ul>
            </div>
          </div>
        `;
      }).join('');
    }

    // 3. Expertise Page: Technical Proficiency
    const techContainer = document.querySelector('[data-cms-list="expertise.technicalProficiency"]');
    if (techContainer && data.expertise && Array.isArray(data.expertise.technicalProficiency)) {
      techContainer.innerHTML = data.expertise.technicalProficiency.map((item) => `
        <div>
          <div class="mb-2 flex items-center justify-between text-sm">
            <span class="flex items-center gap-2 text-[#F2F2F0] font-medium">
              <svg class="size-4 text-[#C7C7C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="16" height="20" x="4" y="2" rx="2" stroke-width="2" />
                <line x1="8" x2="16" y1="6" y2="6" stroke-width="2" />
              </svg>
              ${item.name}
            </span>
            <span class="font-mono text-xs text-[#C7C7C9] font-semibold">${item.percent}%</span>
          </div>
          <div class="h-2 overflow-hidden rounded-full bg-[#2E2E30]">
            <div class="h-full rounded-full bg-[#F2F2F0] transition-all duration-1000" style="width: ${item.percent}%;"></div>
          </div>
        </div>
      `).join('');
    }

    // 4. Expertise Page: Certifications
    const certsContainer = document.querySelector('[data-cms-list="expertise.certifications"]');
    if (certsContainer && data.expertise && Array.isArray(data.expertise.certifications)) {
      certsContainer.innerHTML = data.expertise.certifications.map((cert) => `
        <div class="border-l-2 border-[#C7C7C9] pl-4 py-1">
          <p class="font-medium text-[#F2F2F0]">${cert.title}</p>
          <p class="mt-1 text-sm text-[#9A9A9E]">${cert.issuer}</p>
          ${cert.score ? `<p class="mt-1 font-mono text-sm text-[#F2F2F0] font-semibold">${cert.score}</p>` : ''}
        </div>
      `).join('');
    }

    // 5. Expertise Page: Languages
    const langContainer = document.querySelector('[data-cms-list="expertise.languages"]');
    if (langContainer && data.expertise && Array.isArray(data.expertise.languages)) {
      langContainer.innerHTML = data.expertise.languages.map((l) => `
        <div>
          <div class="mb-2 flex items-baseline justify-between text-sm">
            <span class="text-[#F2F2F0] font-medium">${l.name}</span>
            <span class="text-sm text-[#9A9A9E]">${l.level}</span>
          </div>
          <div class="h-2 overflow-hidden rounded-full bg-[#2E2E30]">
            <div class="h-full rounded-full bg-[#F2F2F0] transition-all duration-1000" style="width: ${l.percent}%;"></div>
          </div>
        </div>
      `).join('');
    }

    // 6. Achievements Page: Timeline Items
    const timelineContainer = document.querySelector('[data-cms-list="achievements.items"]');
    if (timelineContainer && data.achievements && Array.isArray(data.achievements.items)) {
      if (data.achievements.items.length === 0) {
        timelineContainer.innerHTML = `
          <li class="rounded-3xl border border-dashed border-[#2E2E30] bg-[#141416]/50 p-8 text-center text-muted-foreground">
            <svg class="size-8 mx-auto text-[#A0938A] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            <p class="font-medium text-[#F2F2F0]">Belum ada data pencapaian.</p>
            <p class="text-xs text-[#9A9A9E] mt-1">Kelola dan tambahkan pencapaian melalui <a href="admin.html#achievements" class="underline text-gold hover:text-white">Admin Dashboard</a>.</p>
          </li>
        `;
      } else {
        timelineContainer.innerHTML = data.achievements.items.map((item, index) => {
          const delay = (0.05 + index * 0.1).toFixed(2);
          const isFirst = index === 0;
          const iconSvg = item.category === 'Training'
            ? `<circle cx="12" cy="8" r="6" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.477 12.89L17 21.416a.5.5 0 01-.81.47l-3.58-2.687a1 1 0 00-1.197 0l-3.586 2.686a.5.5 0 01-.81-.469l1.514-8.526"/>`
            : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9H4.5a1 1 0 010-5H6M18 9h1.5a1 1 0 000-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0012 0V2z"/>`;

          return `
            <li class="timeline-item reveal is-visible relative" data-category="${item.category}" style="--delay: ${delay}s">
              <span class="absolute -left-[1.9rem] top-7 grid size-8 place-items-center rounded-sm border border-border bg-[#141416] text-[#F2F2F0] sm:-left-[3.15rem]">
                <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">${iconSvg}</svg>
              </span>
              <div onclick="toggleAccordion('${item.id || 'item-' + index}')" class="cursor-pointer w-full rounded-sm border border-border bg-[#141416] p-6 text-left card-hover-effect">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <span class="inline-flex rounded-sm bg-[#1C1C1E] px-3 py-1 text-xs font-semibold text-[#F2F2F0]">
                      ${item.badge}
                    </span>
                    <h3 class="mt-3 font-display text-xl leading-snug text-primary font-semibold">
                      ${item.title}
                    </h3>
                    <p class="mt-2 text-sm text-muted-foreground font-medium">
                      ${item.organizer}
                    </p>
                    <p class="mt-1 font-mono text-xs text-leaf font-semibold">
                      ${item.period}
                    </p>
                  </div>
                  <svg id="chevron-${item.id || 'item-' + index}" class="chevron-icon mt-1 size-5 shrink-0 text-muted-foreground transition-transform ${isFirst ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
                <div id="content-${item.id || 'item-' + index}" class="accordion-content mt-4 ${isFirst ? 'block' : 'hidden'}">
                  <p class="text-sm leading-relaxed text-foreground/80 border-t border-border/70 pt-3">
                    ${item.description}
                  </p>
                </div>
              </div>
            </li>
          `;
        }).join('');
      }
    }

    // 7. Gallery Page: Bento Grid & window.photos update
    const galleryContainer = document.querySelector('[data-cms-list="gallery.photos"]');
    if (galleryContainer && Array.isArray(data.gallery)) {
      window.photos = data.gallery;
      galleryContainer.innerHTML = data.gallery.map((photo, index) => {
        const delay = (0.05 + (index % 6) * 0.05).toFixed(2);
        // Special bento spans: 0 is row-span-2, 3 is col-span-2
        const spanClass = index === 0 ? 'sm:row-span-2' : (index === 3 ? 'sm:col-span-2' : '');

        return `
          <div class="reveal is-visible ${spanClass}" style="--delay: ${delay}s">
            <button type="button" onclick="openLightbox(${index})" class="card-hover-effect group relative h-full w-full overflow-hidden rounded-sm border border-border bg-[#141416] focus:outline-none">
              <img src="${photo.src}" alt="${photo.alt || photo.caption || ''}" class="h-full w-full object-cover" style="filter: none !important; -webkit-filter: none !important;" loading="lazy" />
              <span class="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/85 via-[#0B0B0C]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span class="absolute bottom-4 left-5 flex items-center gap-2 text-sm font-medium text-[#F2F2F0] opacity-0 transition-all duration-300 group-hover:opacity-100">
                <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                ${photo.caption || photo.alt || 'View photo'}
              </span>
            </button>
          </div>
        `;
      }).join('');
    }
  }

  // Toast notification in client page
  function showCmsToast(message, type = 'success') {
    let toast = document.getElementById('cms-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cms-toast';
      toast.className = 'fixed top-6 right-6 z-[10000] flex items-center gap-2.5 rounded-xl border border-white/15 bg-[#141416]/95 px-4 py-3 shadow-2xl backdrop-blur-md text-xs font-medium text-white transition-all duration-300 transform -translate-y-2 opacity-0 pointer-events-none';
      document.body.appendChild(toast);
    }
    const dotColor = type === 'error' ? 'bg-red-400' : (type === 'amber' ? 'bg-amber-400' : 'bg-emerald-400');
    toast.innerHTML = `
      <span class="size-2 rounded-full ${dotColor}"></span>
      <span>${message}</span>
    `;
    toast.classList.remove('-translate-y-2', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.add('-translate-y-2', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2800);
  }

  // Show floating draft badge if viewing draft
  function showDraftBadge() {
    let badge = document.getElementById('cms-draft-indicator');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'cms-draft-indicator';
      badge.className = 'fixed bottom-5 left-5 z-[9999] flex items-center gap-3 rounded-2xl border border-amber-500/40 bg-[#141416]/95 px-4 py-2.5 shadow-2xl backdrop-blur-md text-xs text-white transition-all';
      document.body.appendChild(badge);
    }
    badge.innerHTML = `
      <span class="size-2.5 rounded-full bg-amber-400 animate-pulse"></span>
      <span class="font-medium tracking-wide">CMS Draft Preview</span>
      <a href="admin.html#achievements" class="rounded-lg bg-white/10 px-2.5 py-1 text-white hover:bg-white/20 transition-colors font-medium">Edit in Admin</a>
      <button id="cmsClearDraftBtn" class="text-[#9A9A9E] hover:text-white transition-colors ml-1" title="Reset ke data awal">✕</button>
    `;

    document.getElementById('cmsClearDraftBtn')?.addEventListener('click', () => {
      if (confirm('Batalkan draft pratinjau dan kembali ke konten data/content.json asli?')) {
        localStorage.removeItem(DRAFT_KEY);
        location.reload();
      }
    });
  }

  // Main init function
  async function initCMS() {
    const result = await loadData();
    if (!result || !result.data) return;

    window.CMS_DATA = result.data;
    window.CMS_IS_DRAFT = result.isDraft;

    bindAttributes(result.data);
    renderLists(result.data);

    if (result.isDraft) {
      showDraftBadge();
    }

    // Expose utility functions
    window.CMS = {
      data: result.data,
      isDraft: result.isDraft,
      clearDraft: function () {
        localStorage.removeItem(DRAFT_KEY);
        location.reload();
      }
    };

    window.dispatchEvent(new CustomEvent('cms:loaded', { detail: result.data }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCMS);
  } else {
    initCMS();
  }
})();
