/**
 * Jubapp — Main application logic
 */
(function () {
  'use strict';

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const app = $('#app');

  // ─── Tab navigation ───
  function initTabs() {
    $$('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        Router.navigate('/' + target);
      });
    });
  }

  function setActiveTab(tab) {
    $$('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  }

  // ─── Render helpers ───
  function safetyBadges(recipe) {
    const profile = Store.getProfile();
    const userWarnings = profile.warnings || [];
    return recipe.safetyFlags
      .filter(f => userWarnings.includes(f))
      .map(f => {
        const flag = SAFETY_FLAGS[f];
        return `<div class="safety-badge">${icon('warning', 16)} <span>${flag.label}: ${flag.warning}</span></div>`;
      }).join('');
  }

  function starBtn(recipeId) {
    const isFav = Store.getFavorites().includes(recipeId);
    return `<button class="fav-btn ${isFav ? 'is-fav' : ''}" data-recipe="${recipeId}" aria-label="Favorite">
      ${isFav ? icon('starFilled', 20) : icon('star', 20)}
    </button>`;
  }

  // ─── Pages ───

  // HOME
  function renderHome() {
    setActiveTab('home');
    const profile = Store.getProfile();
    const name = profile.name || 'Friend';
    const favs = Store.getFavorites();

    let favSection = '';
    if (favs.length) {
      const favRecipes = RECIPES.filter(r => favs.includes(r.id));
      favSection = `
        <section class="section">
          <h2 class="section-label">Your Favorites</h2>
          <div class="recipe-scroll">
            ${favRecipes.map(r => recipeCard(r)).join('')}
          </div>
        </section>`;
    }

    app.innerHTML = `
      <div class="page page-home">
        <header class="page-header">
          <div>
            <p class="greeting">Good ${getGreeting()}, ${name}.</p>
            <h1 class="page-title">Your Healing Protocol</h1>
          </div>
          <button class="icon-btn" onclick="Router.navigate('/settings')">${icon('settings', 22)}</button>
        </header>

        <section class="section">
          <h2 class="section-label">By Symptom</h2>
          <div class="cat-grid">
            ${CATEGORIES.map(c => `
              <button class="cat-card" onclick="Router.navigate('/recipes/${c.id}')" style="--cat-color:${c.color}">
                <span class="cat-icon">${icon(c.svgIcon, 26)}</span>
                <span class="cat-name">${c.label}</span>
              </button>
            `).join('')}
          </div>
        </section>

        ${favSection}

        <section class="section">
          <h2 class="section-label">All Recipes</h2>
          <div class="recipe-list">
            ${RECIPES.map(r => recipeCard(r)).join('')}
          </div>
        </section>
      </div>`;
  }

  function recipeCard(r) {
    const cat = CATEGORIES.find(c => c.id === r.category);
    return `
      <article class="recipe-card" onclick="Router.navigate('/recipe/${r.id}')">
        <div class="recipe-card-icon" style="--cat-color:${cat?.color || '#888'}">${icon(cat?.svgIcon || 'leaf', 22)}</div>
        <div class="recipe-card-body">
          <h3 class="recipe-card-title">${r.title}</h3>
          <p class="recipe-card-sub">${r.subtitle}</p>
          <span class="recipe-card-meta">${icon('clock', 13)} ${r.prepTime}</span>
        </div>
        ${starBtn(r.id)}
      </article>`;
  }

  // RECIPES BY CATEGORY
  function renderRecipes(catId) {
    setActiveTab('home');
    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat) return renderHome();

    const filtered = RECIPES.filter(r => r.category === catId);
    app.innerHTML = `
      <div class="page">
        <header class="page-header">
          <button class="icon-btn" onclick="Router.navigate('/')">${icon('arrowLeft', 20)}</button>
          <h1 class="page-title">${icon(cat.svgIcon, 22)} ${cat.label}</h1>
          <div></div>
        </header>
        <div class="recipe-list">
          ${filtered.length
            ? filtered.map(r => recipeCard(r)).join('')
            : '<p class="empty-msg">Recipes coming soon for this category.</p>'}
        </div>
      </div>`;
  }

  // SINGLE RECIPE
  function renderRecipe(recipeId) {
    setActiveTab('home');
    const r = RECIPES.find(x => x.id === recipeId);
    if (!r) return renderHome();
    const cat = CATEGORIES.find(c => c.id === r.category);

    app.innerHTML = `
      <div class="page page-recipe">
        <header class="page-header">
          <button class="icon-btn" onclick="history.back()">${icon('arrowLeft', 20)}</button>
          <h1 class="page-title">${r.title}</h1>
          ${starBtn(r.id)}
        </header>

        <div class="recipe-hero" style="--cat-color:${cat?.color || '#888'}">
          <span class="recipe-hero-icon">${icon(cat?.svgIcon || 'leaf', 40)}</span>
          <p class="recipe-hero-sub">${r.subtitle}</p>
          <span class="recipe-hero-time">${icon('clock', 14)} ${r.prepTime}</span>
        </div>

        ${safetyBadges(r)}

        <section class="recipe-section">
          <h2>Ingredients</h2>
          <ul class="ingredient-list">
            ${r.ingredients.map(i => `<li><span class="ing-amount">${i.amount}</span> ${i.name}</li>`).join('')}
          </ul>
        </section>

        <section class="recipe-section">
          <h2>How to Prepare</h2>
          <ol class="steps-list">
            ${r.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
        </section>

        <section class="recipe-section why-section">
          <h2>Why It Works</h2>
          <p>${r.why}</p>
        </section>

        ${r.videoId ? `
          <section class="recipe-section">
            <h2>Watch Mama Juba Make This</h2>
            <div class="video-embed">
              <iframe src="https://www.youtube.com/embed/${r.videoId}" frameborder="0" allowfullscreen loading="lazy"></iframe>
            </div>
          </section>` : ''}
      </div>`;

    // Fav button handler
    // fav handled by global delegate
  }

  // VIDEOS
  function renderVideos() {
    setActiveTab('videos');
    app.innerHTML = `
      <div class="page">
        <header class="page-header">
          <h1 class="page-title">${icon('play', 22)} Video Library</h1>
        </header>
        <div class="video-list">
          ${VIDEOS.map(v => {
            const vcat = CATEGORIES.find(c => c.id === v.category);
            return `
              <article class="video-card" ${v.youtubeId ? `onclick="Router.navigate('/video/${v.id}')"` : ''}>
                <div class="video-thumb ${!v.youtubeId ? 'coming-soon' : ''}">
                  ${v.youtubeId
                    ? `<img src="https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg" alt="" loading="lazy">`
                    : `<span class="coming-label">${icon('play', 24)}<br>Coming Soon</span>`}
                </div>
                <div class="video-info">
                  <h3>${v.title}</h3>
                  <p>${v.description}</p>
                  <span class="video-meta">${v.duration}${vcat ? ' · ' + vcat.label : ''}</span>
                </div>
              </article>`;
          }).join('')}
        </div>
      </div>`;
  }

  // SINGLE VIDEO
  function renderVideo(videoId) {
    setActiveTab('videos');
    const v = VIDEOS.find(x => x.id === videoId);
    if (!v || !v.youtubeId) return renderVideos();

    app.innerHTML = `
      <div class="page">
        <header class="page-header">
          <button class="icon-btn" onclick="Router.navigate('/videos')">${icon('arrowLeft', 20)}</button>
          <h1 class="page-title">${v.title}</h1>
          <div></div>
        </header>
        <div class="video-embed">
          <iframe src="https://www.youtube.com/embed/${v.youtubeId}" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="video-desc">
          <p>${v.description}</p>
          <span class="video-meta">${v.duration}</span>
        </div>
      </div>`;
  }

  // COMMUNITY
  function renderCommunity() {
    setActiveTab('community');
    const msgs = Store.getMessages();
    const profile = Store.getProfile();

    app.innerHTML = `
      <div class="page page-community">
        <header class="page-header">
          <h1 class="page-title">${icon('users', 22)} Community</h1>
        </header>

        <div class="chat-container" id="chatContainer">
          ${msgs.length
            ? msgs.map(m => `
                <div class="chat-bubble ${m.author === profile.name ? 'mine' : ''}">
                  <span class="chat-author">${m.author}</span>
                  <p>${escapeHtml(m.text)}</p>
                  <span class="chat-time">${timeAgo(m.timestamp)}</span>
                </div>`).join('')
            : `<div class="empty-community">
                <p class="empty-icon">${icon('leaf', 40)}</p>
                <p>The community is just getting started.</p>
                <p>Share what you're trying, ask a question, or just say hello.</p>
              </div>`
          }
        </div>

        <form class="chat-form" id="chatForm">
          <input type="text" id="chatInput" placeholder="Share something with the community..." autocomplete="off" required>
          <button type="submit" class="send-btn">${icon('send', 18)}</button>
        </form>
      </div>`;

    // Scroll to bottom
    const container = $('#chatContainer');
    container.scrollTop = container.scrollHeight;

    // Submit handler
    $('#chatForm').addEventListener('submit', e => {
      e.preventDefault();
      const input = $('#chatInput');
      const text = input.value.trim();
      if (!text) return;
      Store.addMessage({ author: profile.name || 'Anonymous', text });
      input.value = '';
      renderCommunity();
    });
  }

  // SETTINGS
  function renderSettings() {
    setActiveTab('settings');
    const profile = Store.getProfile();
    const reminder = Store.getReminder();

    app.innerHTML = `
      <div class="page page-settings">
        <header class="page-header">
          <h1 class="page-title">${icon('settings', 22)} Settings</h1>
        </header>

        <section class="settings-group">
          <h2>Your Profile</h2>
          <label class="field-label">Your Name
            <input type="text" id="settingName" value="${escapeHtml(profile.name)}" placeholder="How should Mama Juba call you?">
          </label>

          <h3 class="field-sublabel">Safety Alerts</h3>
          <p class="field-hint">Check any that apply to you. Recipes with these ingredients will show a warning.</p>
          <label class="checkbox-row">
            <input type="checkbox" id="flagBlood" ${profile.warnings?.includes('bloodThinners') ? 'checked' : ''}>
            I take blood thinners
          </label>
          <label class="checkbox-row">
            <input type="checkbox" id="flagPregnancy" ${profile.warnings?.includes('pregnancy') ? 'checked' : ''}>
            I am pregnant or may be pregnant
          </label>
        </section>

        <section class="settings-group">
          <h2>Water Reminder</h2>
          <label class="checkbox-row">
            <input type="checkbox" id="reminderToggle" ${reminder.enabled ? 'checked' : ''}>
            Remind me to drink water
          </label>
          <label class="field-label">Every
            <select id="reminderInterval">
              <option value="1" ${reminder.intervalHrs === 1 ? 'selected' : ''}>1 hour</option>
              <option value="2" ${reminder.intervalHrs === 2 ? 'selected' : ''}>2 hours</option>
              <option value="3" ${reminder.intervalHrs === 3 ? 'selected' : ''}>3 hours</option>
            </select>
          </label>
        </section>

        <button class="btn-save" id="saveSettings">Save Settings</button>

        <section class="settings-group">
          <h2>Subscription</h2>
          <p class="field-hint">Manage your plan on Hotmart.</p>
          <a href="https://app-vlc.hotmart.com/my-account" target="_blank" class="btn-outline-settings">Manage Subscription →</a>
        </section>
      </div>`;

    $('#saveSettings').addEventListener('click', () => {
      const warnings = [];
      if ($('#flagBlood').checked) warnings.push('bloodThinners');
      if ($('#flagPregnancy').checked) warnings.push('pregnancy');

      Store.setProfile({ name: $('#settingName').value.trim(), warnings });

      const enabled = $('#reminderToggle').checked;
      const intervalHrs = parseInt($('#reminderInterval').value);
      Store.setReminder({ enabled, intervalHrs });

      // Schedule notification
      if (enabled && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted' && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: 'SCHEDULE_REMINDER',
              intervalMs: intervalHrs * 3600000
            });
          }
        });
      }

      showToast('Settings saved!');
    });
  }

  // ─── Utilities ───
  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 18) return 'afternoon';
    return 'evening';
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    return Math.floor(hrs / 24) + 'd ago';
  }

  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2000);
  }

  // ─── Delegate fav clicks globally ───
  document.addEventListener('click', e => {
    const btn = e.target.closest('.fav-btn');
    if (!btn) return;
    e.stopPropagation();
    const id = btn.dataset.recipe;
    const isFav = Store.toggleFavorite(id);
    btn.classList.toggle('is-fav', isFav);
    btn.innerHTML = isFav ? icon('starFilled', 20) : icon('star', 20);
  });

  // ─── Routes ───
  Router.register('/', renderHome);
  Router.register('/recipes', renderRecipes);
  Router.register('/recipe', renderRecipe);
  Router.register('/videos', renderVideos);
  Router.register('/video', renderVideo);
  Router.register('/community', renderCommunity);
  Router.register('/settings', renderSettings);

  // ─── Boot ───
  initTabs();
  Router.start();

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

})();
