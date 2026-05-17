/**
 * Jubapp,Main application logic
 * Calm/Headspace-inspired UI patterns
 */
(function () {
  'use strict';

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const app = $('#app');

  function initTabs() {
    $$('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => { haptic(); Router.navigate('/' + btn.dataset.tab); });
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
        return `<div class="safety-badge">${icon('warning', 18)} <span>${flag.label}: ${flag.warning}</span></div>`;
      }).join('');
  }

  function starBtn(recipeId) {
    const isFav = Store.getFavorites().includes(recipeId);
    return `<button class="fav-btn ${isFav ? 'is-fav' : ''}" data-recipe="${recipeId}" aria-label="Favorite">
      ${isFav ? icon('starFilled', 22) : icon('star', 22)}
    </button>`;
  }

  const DAILY_TIPS = [
    'A pinch of black pepper makes turmeric 2,000% more absorbable. Never take one without the other.',
    'Ginger tea before bed relaxes your intestinal muscles,less gas, less bloating by morning.',
    'Honey loses its healing enzymes above 140°F. Always add it after the water cools a little.',
    'Cinnamon in your morning coffee stabilizes blood sugar for up to 4 hours.',
    'Garlic is most powerful when crushed and left to sit for 10 minutes before cooking.',
    'Rosemary isn\'t just for cooking,smelling it improves memory by up to 75%.',
    'Chamomile tea works better if you steep it for 5 full minutes, not 2.',
    'Your body absorbs nutrients better in the morning. Take your tonics before 10am.',
    'Apple cider vinegar before meals increases stomach acid,which actually reduces bloating.',
    'Lemon water first thing in the morning helps your kidneys flush sodium while you slept.',
    'Walnuts are shaped like a brain for a reason,they\'re the richest nut in omega-3s.',
    'Fennel seeds after a heavy meal can calm bloating in under 20 minutes.',
    'Warm water absorbs faster than cold water. Always use warm for your tonics.',
    'Coconut oil in your morning drink gives your brain fuel that lasts 4-5 hours.',
    'Celery contains phthalides,compounds that relax artery walls and lower blood pressure naturally.',
    'Tart cherry juice before bed increases melatonin production. Nature\'s sleeping pill.',
    'Flaxseed must be ground to be absorbed. Whole seeds pass straight through.',
    'Hibiscus tea acts like a gentle ACE inhibitor,the same mechanism as BP medication.',
    'Sage tea improves word recall within hours. Shakespeare knew,he called it the herb of remembrance.',
    'Your grandmother was right: chicken broth heals. The gelatin repairs your gut lining.',
    'Lavender under your pillow isn\'t folklore,linalool measurably lowers cortisol.',
    'Cayenne pepper applied to skin tricks pain receptors into calming down. Ancient knowledge.',
    'Bananas before bed deliver tryptophan and magnesium,both precursors to melatonin.',
    'A tablespoon of olive oil in the morning coats your stomach and improves nutrient absorption.',
    'Cumin stimulates your pancreas to release digestive enzymes. Add it to heavy meals.',
    'Peppermint is a natural antispasmodic,it calms the muscles in your gut lining.',
    'Raw honey has over 200 active compounds. Processed honey has almost none.',
    'Ginger increases blood flow to the brain. That\'s why it clears fog so fast.',
    'Cloves contain eugenol,one of the strongest natural painkillers known.',
    'Your body heals fastest between 10pm and 2am. What you eat before bed matters.'
  ];

  function getDailyTip() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
  }

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }

  // ─── HOME ───
  function renderHome() {
    setActiveTab('home');
    const profile = Store.getProfile();
    const name = profile.name || 'Friend';

    // Streak
    const streak = Store.getStreak();

    // Weekly check-in
    const checkins = Store.getCheckins();
    const today = new Date().toISOString().slice(0, 10);
    const checkedToday = checkins.find(c => c.date === today);

    // Program
    const prog = Store.getProgram();
    const hasProgram = !!prog.startDate;
    const programDay = hasProgram ? Store.getProgramDay() : 0;
    const todayProg = hasProgram ? PROGRAM_30.find(p => p.day === programDay) : null;
    const todayDone = hasProgram && prog.completedDays.includes(programDay);

    app.innerHTML = `
      <div class="page page-home">
        <div class="home-hero home-hero-compact">
          <img class="home-hero-bg" src="img/hero-banner.webp" alt="">
          <div class="home-hero-overlay"></div>
          <div class="home-hero-content">
            <p class="home-hero-greeting">${getGreeting()}, ${name}.</p>
            <h1 class="home-hero-title">Your Healing Protocol</h1>
          </div>
          <button class="home-hero-settings" onclick="Router.navigate('/settings')">${icon('settings', 18)}</button>
          ${streak.count > 0 ? `<div class="home-hero-streak">${icon('flame', 14)} <strong>${streak.count}</strong></div>` : ''}
        </div>

        <div class="page-body page-body-compact">

          <!-- 1 central card: program or start -->
          ${!hasProgram ? `
            <div class="program-start-card" onclick="startProgram()">
              <div class="program-start-left">
                <span class="program-start-badge">30-DAY PROTOCOL</span>
                <h3 class="program-start-title">Start your healing journey</h3>
                <p class="program-start-sub">One recipe a day. Mama Juba walks with you.</p>
              </div>
              <span class="program-start-arrow">${icon('arrowRight', 20)}</span>
            </div>
          ` : todayProg ? `
            <div class="program-today-card ${todayDone ? 'done' : ''}">
              <div class="program-today-header">
                <span class="program-today-day">Day ${programDay} of 30</span>
                <span class="program-today-dots-wrap">
                  ${PROGRAM_30.slice(0, 30).map((_, i) => `<span class="pdot ${prog.completedDays.includes(i+1) ? 'filled' : ''} ${i+1 === programDay ? 'current' : ''}"></span>`).join('')}
                </span>
              </div>
              <p class="program-today-msg">"${todayProg.message}"</p>
              ${todayProg.recipeId && !todayDone ? `
                <button class="program-today-btn" onclick="Router.navigate('/recipe/${todayProg.recipeId}')">
                  Open today's recipe ${icon('arrowRight', 16)}
                </button>
              ` : todayDone ? `
                <div class="program-today-done">${icon('check', 16)} Completed,see you tomorrow</div>
              ` : `
                <div class="program-today-rest">${icon('leaf', 16)} Rest day,let your body absorb</div>
              `}
            </div>
          ` : `
            <div class="program-today-card done">
              <p class="program-today-msg">"You did it. 30 days. Your body is not the same."</p>
              <div class="program-today-done">${icon('check', 16)} Protocol Complete</div>
            </div>
          `}

          <!-- Categories -->
          <div class="section-label">By symptom</div>
          <div class="cat-grid">
            ${CATEGORIES.map(c => `
              <button class="cat-card" onclick="Router.navigate('/recipes/${c.id}')" style="--cat-color:${c.color}">
                <span class="cat-icon">${icon(c.svgIcon, 22)}</span>
                <span class="cat-name">${c.label}</span>
              </button>
            `).join('')}
          </div>

        </div>
      </div>`;
  }

  function recipeCard(r) {
    const cat = CATEGORIES.find(c => c.id === r.category);
    const hasImg = r.image;
    return `
      <article class="recipe-card ${hasImg ? 'has-image' : ''}" onclick="Router.navigate('/recipe/${r.id}')" style="--cat-color:${cat?.color || '#888'}">
        ${hasImg
          ? `<div class="recipe-card-thumb"><img src="${r.image}" alt="" loading="lazy"></div>`
          : `<div class="recipe-card-icon">${icon(cat?.svgIcon || 'leaf', 22)}</div>`}
        <div class="recipe-card-body">
          <h3 class="recipe-card-title">${r.title}</h3>
          <p class="recipe-card-sub">${r.subtitle}</p>
          <span class="recipe-card-meta">${icon('clock', 12)} ${r.prepTime}</span>
        </div>
        ${starBtn(r.id)}
      </article>`;
  }

  // ─── RECIPES BY CATEGORY ───
  function renderRecipes(catId) {
    setActiveTab('home');
    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat) return renderHome();
    const filtered = RECIPES.filter(r => r.category === catId);

    app.innerHTML = `
      <div class="page">
        <div class="inner-header">
          <button class="back-btn-big" onclick="Router.navigate('/')">${icon('arrowLeft', 18)} <span>Back</span></button>
          <h1 class="inner-header-title">${icon(cat.svgIcon, 20)} ${cat.label}</h1>
        </div>
        <div class="page-body">
          <div class="recipe-list">
            ${filtered.length
              ? filtered.map(r => recipeCard(r)).join('')
              : '<p class="empty-msg">Recipes coming soon for this category.</p>'}
          </div>
        </div>
      </div>`;
  }

  // ─── SINGLE RECIPE ───
  function renderRecipe(recipeId) {
    setActiveTab('home');
    const r = RECIPES.find(x => x.id === recipeId);
    if (!r) return renderHome();
    const cat = CATEGORIES.find(c => c.id === r.category);
    const alreadyMade = Store.getVisited().includes(recipeId);

    app.innerHTML = `
      <div class="page page-recipe">
        <div class="recipe-detail-hero ${r.image ? 'has-bg' : ''}" style="--cat-color:${cat?.color || '#2D5A30'}">
          ${r.image ? `<img class="recipe-detail-bg" src="${r.image}" alt="">` : ''}
          <div class="recipe-detail-hero-overlay"></div>
          <button class="back-btn-hero" onclick="history.back()">${icon('arrowLeft', 18)} <span>Back</span></button>
          <div style="position:absolute;top:16px;right:16px;z-index:2">${starBtn(r.id)}</div>
          <div class="recipe-detail-hero-content">
            <div class="recipe-detail-icon">${icon(cat?.svgIcon || 'leaf', 32)}</div>
            <h1 class="recipe-detail-title">${r.title}</h1>
            <p class="recipe-detail-sub">${r.subtitle}</p>
            <span class="recipe-detail-time">${icon('clock', 14)} ${r.prepTime}</span>
          </div>
        </div>

        <div class="recipe-detail-body">
          ${safetyBadges(r)}

          <div class="detail-section">
            <h2 class="detail-section-header">Ingredients</h2>
            <ul class="ingredient-list">
              ${r.ingredients.map(i => `<li><span class="ing-amount">${i.amount}</span> ${i.name}</li>`).join('')}
            </ul>
          </div>

          <div class="detail-section">
            <h2 class="detail-section-header">How to Prepare</h2>
            <ol class="steps-list">
              ${r.steps.map(s => `<li>${s}</li>`).join('')}
            </ol>
          </div>

          <div class="detail-section">
            <h2 class="detail-section-header">Why It Works</h2>
            <div class="why-card">
              <p>${r.why}</p>
            </div>
          </div>

          ${r.videoId ? `
            <div class="detail-section">
              <h2 class="detail-section-header">Watch Mama Juba</h2>
              <div class="video-embed">
                <iframe src="https://www.youtube.com/embed/${r.videoId}" frameborder="0" allowfullscreen loading="lazy"></iframe>
              </div>
            </div>` : ''}

          <div class="made-it-wrap">
            ${alreadyMade
              ? `<div class="made-it-done">${icon('check', 18)} You've made this recipe</div>`
              : `<button class="made-it-btn" onclick="markMade('${r.id}')">${icon('check', 18)} I made this recipe</button>`}
          </div>
        </div>
      </div>`;
  }

  window.markMade = function(recipeId) {
    haptic();
    Store.markVisited(recipeId);
    Store.bumpStreak();
    // Check if this is today's program recipe
    const prog = Store.getProgram();
    if (prog.startDate) {
      const day = Store.getProgramDay();
      const todayProg = PROGRAM_30.find(p => p.day === day);
      if (todayProg && todayProg.recipeId === recipeId) {
        Store.completeProgramDay(day);
        showToast('Day ' + day + ' complete! Keep going!');
      } else {
        showToast('Recipe done!');
      }
    } else {
      showToast('Recipe done!');
    }
    renderRecipe(recipeId);
  };

  // ─── VIDEOS ───
  function renderVideos() {
    setActiveTab('videos');
    app.innerHTML = `
      <div class="page">
        <div class="inner-header">
          <h1 class="inner-header-title">${icon('play', 20)} Video Library</h1>
        </div>
        <div class="video-list">
          ${VIDEOS.map(v => {
            return `
              <article class="video-card" ${v.youtubeId ? `onclick="Router.navigate('/video/${v.id}')"` : ''}>
                <div class="video-thumb ${!v.youtubeId ? 'coming-soon' : ''}">
                  ${v.youtubeId
                    ? `<img src="https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg" alt="" loading="lazy">`
                    : `<span class="coming-label">${icon('play', 20)}<br>Soon</span>`}
                </div>
                <div class="video-info">
                  <h3>${v.title}</h3>
                  <p>${v.description}</p>
                  <span class="video-meta">${v.duration}</span>
                </div>
              </article>`;
          }).join('')}
        </div>
      </div>`;
  }

  function renderVideo(videoId) {
    setActiveTab('videos');
    const v = VIDEOS.find(x => x.id === videoId);
    if (!v || !v.youtubeId) return renderVideos();
    app.innerHTML = `
      <div class="page">
        <div class="inner-header">
          <button class="back-btn" onclick="Router.navigate('/videos')">${icon('arrowLeft', 18)}</button>
          <h1 class="inner-header-title">${v.title}</h1>
        </div>
        <div class="video-embed">
          <iframe src="https://www.youtube.com/embed/${v.youtubeId}" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="video-desc">
          <p>${v.description}</p>
          <span class="video-meta">${v.duration}</span>
        </div>
      </div>`;
  }

  // ─── COMMUNITY ───
  const DAILY_QUESTIONS = [
    { q: 'What recipe did you try today?', type: 'recipe' },
    { q: 'How did you sleep last night?', type: 'stars' },
    { q: 'Share one thing your body thanked you for this week.', type: 'text' },
    { q: 'Which ingredient do you always have in your kitchen?', type: 'text' },
    { q: 'How are your joints feeling today?', type: 'stars' },
    { q: 'What is one small change you noticed since starting?', type: 'text' },
    { q: 'Did you drink enough water today?', type: 'yesno' },
    { q: 'How is your energy level right now?', type: 'stars' },
    { q: 'What recipe are you most curious about?', type: 'text' },
    { q: 'Have you shared a recipe with someone you love?', type: 'yesno' },
    { q: 'Which part of your body feels better than last week?', type: 'text' },
    { q: 'How clearly is your mind thinking today?', type: 'stars' },
    { q: 'What is one thing you are grateful for today?', type: 'text' },
    { q: 'Did you try something new from the Almanac this week?', type: 'yesno' }
  ];

  const SEED_POSTS = [
    { author: 'Martha R.', text: 'I tried the Golden Joint Tea this morning. My knees feel different already. Day 3.', likes: 12, liked: false, daysAgo: 1 },
    { author: 'Dorothy L.', text: 'The Cinnamon Sleep Milk is now my evening ritual. I slept through the whole night for the first time in months.', likes: 24, liked: false, daysAgo: 2 },
    { author: 'James W.', text: 'My wife and I are doing the 30-day protocol together. Day 8. She says her brain fog is lifting.', likes: 18, liked: false, daysAgo: 3 },
    { author: 'Patricia M.', text: 'Started the Hibiscus Heart Tea. My numbers went from 148 to 132 in two weeks. My doctor noticed.', likes: 31, liked: false, daysAgo: 5 },
    { author: 'Helen K.', text: 'I was skeptical. I admit it. But the Belly Ease Brew stopped my bloating after every meal. Simple ginger and peppermint.', likes: 15, liked: false, daysAgo: 4 },
    { author: 'Robert S.', text: 'The Rosemary Memory Tea. I can remember my grandchildren\'s phone numbers again. Small thing, but it means everything.', likes: 22, liked: false, daysAgo: 6 }
  ];

  function getDailyQuestion() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return DAILY_QUESTIONS[dayOfYear % DAILY_QUESTIONS.length];
  }

  function renderCommunity() {
    setActiveTab('community');
    const profile = Store.getProfile();
    const posts = Store.getPosts();
    const dq = getDailyQuestion();
    const dailyAnswer = Store.getDailyAnswer();

    // Combine seed posts + user posts
    const allPosts = [...posts];
    SEED_POSTS.forEach(sp => {
      if (!allPosts.find(p => p.author === sp.author && p.text === sp.text)) {
        allPosts.push({
          ...sp,
          id: sp.author + sp.daysAgo,
          timestamp: new Date(Date.now() - sp.daysAgo * 86400000).toISOString()
        });
      }
    });
    allPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Daily question input
    let dqHTML = '';
    if (dailyAnswer) {
      dqHTML = `
        <div class="dq-answered">
          <span class="dq-check">${icon('check', 16)}</span>
          <div>
            <p class="dq-q">${dq.q}</p>
            <p class="dq-a">${escapeHtml(dailyAnswer)}</p>
          </div>
        </div>`;
    } else if (dq.type === 'stars') {
      dqHTML = `
        <div class="dq-card">
          <p class="dq-q">${dq.q}</p>
          <div class="dq-stars">
            ${[1,2,3,4,5].map(n => `<button class="dq-star" onclick="answerDaily('${n}/5')">${n <= 3 ? '☆' : '★'}</button>`).join('')}
          </div>
        </div>`;
    } else if (dq.type === 'yesno') {
      dqHTML = `
        <div class="dq-card">
          <p class="dq-q">${dq.q}</p>
          <div class="dq-yesno">
            <button class="dq-yn-btn" onclick="answerDaily('Yes')">Yes</button>
            <button class="dq-yn-btn" onclick="answerDaily('No')">Not yet</button>
          </div>
        </div>`;
    } else if (dq.type === 'recipe') {
      dqHTML = `
        <div class="dq-card">
          <p class="dq-q">${dq.q}</p>
          <div class="dq-recipes">
            ${RECIPES.slice(0, 6).map(r => `<button class="dq-recipe-btn" onclick="answerDaily('${escapeHtml(r.title)}')">${r.title}</button>`).join('')}
          </div>
        </div>`;
    } else {
      dqHTML = `
        <div class="dq-card">
          <p class="dq-q">${dq.q}</p>
          <form class="dq-text-form" id="dqForm">
            <input type="text" id="dqInput" placeholder="Type your answer..." autocomplete="off">
            <button type="submit" class="dq-submit">${icon('send', 16)}</button>
          </form>
        </div>`;
    }

    // Prompt buttons
    const prompts = [
      'I tried a recipe today!',
      'Feeling better this week.',
      'Need encouragement.',
      'Just saying hello.'
    ];

    app.innerHTML = `
      <div class="page">
        <div class="inner-header">
          <h1 class="inner-header-title">${icon('users', 20)} Community</h1>
        </div>
        <div class="community-body">

          <!-- Daily Question -->
          <div class="community-section">
            <h2 class="community-section-label">Today's Question</h2>
            ${dqHTML}
          </div>

          <!-- Share -->
          <div class="community-section">
            <h2 class="community-section-label">Share with the community</h2>
            <div class="post-prompts">
              ${prompts.map(p => `<button class="post-prompt-btn" onclick="postFromPrompt('${escapeHtml(p)}')">${p}</button>`).join('')}
            </div>
            <form class="post-form" id="postForm">
              <input type="text" id="postInput" placeholder="Write something..." autocomplete="off">
              <button type="submit" class="post-submit-btn">${icon('send', 16)} Post</button>
            </form>
          </div>

          <!-- Feed -->
          <div class="community-section">
            <h2 class="community-section-label">Healing Stories</h2>
            <div class="post-feed">
              ${allPosts.map(p => `
                <div class="post-card">
                  <div class="post-header">
                    <div class="post-avatar">${(p.author || 'A').charAt(0)}</div>
                    <div class="post-meta">
                      <span class="post-author">${escapeHtml(p.author)}</span>
                      <span class="post-time">${timeAgo(p.timestamp)}</span>
                    </div>
                  </div>
                  <p class="post-text">${escapeHtml(p.text)}</p>
                  <button class="post-like-btn ${p.liked ? 'liked' : ''}" onclick="likePost(${p.id})">
                    ${icon('heart', 16)} <span>${p.likes || ''}</span>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>`;

    // Post form
    const postForm = $('#postForm');
    if (postForm) {
      postForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = $('#postInput');
        const text = input.value.trim();
        if (!text) return;
        Store.addPost({ author: profile.name || 'Anonymous', text });
        haptic();
        showToast('Posted!');
        renderCommunity();
      });
    }

    // Daily question text form
    const dqForm = $('#dqForm');
    if (dqForm) {
      dqForm.addEventListener('submit', e => {
        e.preventDefault();
        const val = $('#dqInput').value.trim();
        if (!val) return;
        Store.setDailyAnswer(val);
        haptic();
        showToast('Thank you for sharing.');
        renderCommunity();
      });
    }
  }

  window.answerDaily = function(answer) {
    Store.setDailyAnswer(answer);
    haptic();
    showToast('Thank you for sharing.');
    renderCommunity();
  };

  window.postFromPrompt = function(text) {
    const profile = Store.getProfile();
    Store.addPost({ author: profile.name || 'Anonymous', text });
    haptic();
    showToast('Posted!');
    renderCommunity();
  };

  window.likePost = function(postId) {
    Store.toggleLike(postId);
    haptic();
    renderCommunity();
  };

  // ─── SETTINGS ───
  function renderSettings() {
    setActiveTab('settings');
    const profile = Store.getProfile();
    const reminder = Store.getReminder();

    app.innerHTML = `
      <div class="page">
        <div class="inner-header">
          <button class="back-btn" onclick="Router.navigate('/')">${icon('arrowLeft', 18)}</button>
          <h1 class="inner-header-title">${icon('settings', 20)} Settings</h1>
        </div>
        <div class="page-settings">
          <section class="settings-group">
            <h2>Your Profile</h2>

            <div class="profile-display-card" id="profileNameCard">
              <div class="profile-display-info">
                <span class="profile-display-label">Name</span>
                <span class="profile-display-value" id="profileNameValue">${escapeHtml(profile.name)}</span>
              </div>
              <button class="profile-edit-btn" id="editNameBtn" aria-label="Edit name">${icon('pen', 16)}</button>
            </div>
            <div class="profile-edit-field" id="profileNameEdit" style="display:none">
              <input type="text" id="settingName" value="${escapeHtml(profile.name)}" placeholder="Your first name">
              <button class="profile-done-btn" id="doneNameBtn">${icon('check', 16)} Done</button>
            </div>

            <div class="profile-display-card" id="profileEmailCard">
              <div class="profile-display-info">
                <span class="profile-display-label">Email</span>
                <span class="profile-display-value" id="profileEmailValue">${escapeHtml(profile.email || '')}</span>
              </div>
              <button class="profile-edit-btn" id="editEmailBtn" aria-label="Edit email">${icon('pen', 16)}</button>
            </div>
            <div class="profile-edit-field" id="profileEmailEdit" style="display:none">
              <input type="email" id="settingEmail" value="${escapeHtml(profile.email || '')}" placeholder="your.email@example.com">
              <button class="profile-done-btn" id="doneEmailBtn">${icon('check', 16)} Done</button>
            </div>

            <h3 class="field-sublabel" style="margin-top:20px">Safety Alerts</h3>
            <p class="field-hint">Check any that apply. Recipes with these ingredients will show a warning.</p>
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

          <section class="settings-group">
            <h2>Text Size</h2>
            <div class="font-size-row">
              <button class="font-size-btn" id="fontSmall">A-</button>
              <button class="font-size-btn" id="fontNormal">Normal</button>
              <button class="font-size-btn" id="fontLarge">A+</button>
            </div>
          </section>

          <button class="btn-primary" id="saveSettings">Save Settings</button>

          <section class="settings-group">
            <h2>Subscription</h2>
            <p class="field-hint">Manage your plan on Hotmart.</p>
            <a href="https://app-vlc.hotmart.com/my-account" target="_blank" class="btn-outline">Manage Subscription ${icon('arrowRight', 16)}</a>
          </section>
        </div>
      </div>`;

    // Profile edit toggles
    $('#editNameBtn').addEventListener('click', () => {
      $('#profileNameCard').style.display = 'none';
      $('#profileNameEdit').style.display = 'flex';
      $('#settingName').focus();
    });
    $('#doneNameBtn').addEventListener('click', () => {
      const val = $('#settingName').value.trim();
      $('#profileNameValue').textContent = val;
      $('#profileNameEdit').style.display = 'none';
      $('#profileNameCard').style.display = 'flex';
    });
    $('#editEmailBtn').addEventListener('click', () => {
      $('#profileEmailCard').style.display = 'none';
      $('#profileEmailEdit').style.display = 'flex';
      $('#settingEmail').focus();
    });
    $('#doneEmailBtn').addEventListener('click', () => {
      const val = $('#settingEmail').value.trim();
      $('#profileEmailValue').textContent = val;
      $('#profileEmailEdit').style.display = 'none';
      $('#profileEmailCard').style.display = 'flex';
    });

    $('#saveSettings').addEventListener('click', () => {
      const warnings = [];
      if ($('#flagBlood').checked) warnings.push('bloodThinners');
      if ($('#flagPregnancy').checked) warnings.push('pregnancy');
      Store.setProfile({ name: $('#settingName').value.trim(), email: $('#settingEmail').value.trim(), warnings });

      const enabled = $('#reminderToggle').checked;
      const intervalHrs = parseInt($('#reminderInterval').value);
      Store.setReminder({ enabled, intervalHrs });

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

    $('#fontSmall').addEventListener('click', () => {
      Store.set('fontSize', 0.9);
      document.documentElement.style.setProperty('--font-scale', 0.9);
      showToast('Text size: small');
    });
    $('#fontNormal').addEventListener('click', () => {
      Store.set('fontSize', 1);
      document.documentElement.style.setProperty('--font-scale', 1);
      showToast('Text size: normal');
    });
    $('#fontLarge').addEventListener('click', () => {
      Store.set('fontSize', 1.12);
      document.documentElement.style.setProperty('--font-scale', 1.12);
      showToast('Text size: large');
    });
  }

  // ─── Utilities ───
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

  // ─── Haptic feedback ───
  function haptic() {
    navigator.vibrate && navigator.vibrate(12);
  }

  // ─── Visual tap feedback ───
  document.addEventListener('click', e => {
    const tappable = e.target.closest('.recipe-card, .cat-card, .program-start-card, .program-today-btn, .video-card');
    if (tappable) { tappable.classList.add('tapped'); setTimeout(() => tappable.classList.remove('tapped'), 250); }
  });

  // ─── Check-in (moved to settings, kept for future use) ───
  window.submitCheckin = function(score) {
    haptic();
    Store.addCheckin(score);
    Store.bumpStreak();
    showToast(['', 'Hang in there.', 'Tomorrow will be better.', 'Steady.', 'Keep going!', 'Wonderful!'][score]);
  };

  window.startProgram = function() {
    haptic();
    Store.startProgram();
    Store.bumpStreak();
    showToast('Your 30-day journey begins today!');
    renderHome();
  };

  // ─── Global fav click delegate ───
  document.addEventListener('click', e => {
    const btn = e.target.closest('.fav-btn');
    if (!btn) return;
    e.stopPropagation();
    haptic();
    const id = btn.dataset.recipe;
    const isFav = Store.toggleFavorite(id);
    btn.classList.toggle('is-fav', isFav);
    btn.innerHTML = isFav ? icon('starFilled', 22) : icon('star', 22);
  });

  // ─── ONBOARDING ───
  function renderOnboarding() {
    // Hide tab bar during onboarding
    const tabBar = document.querySelector('.tab-bar');
    if (tabBar) tabBar.style.display = 'none';

    app.innerHTML = `
      <div class="onboarding">
        <div class="onboarding-hero">
          <img src="img/hero-banner.webp" alt="">
          <div class="onboarding-hero-overlay"></div>
          <div class="onboarding-hero-text">
            <h1>Mama Juba's<br>Almanac</h1>
            <p>Six generations of healing wisdom</p>
          </div>
        </div>

        <div class="onboarding-form" id="onboardingForm">
          <p class="onboarding-step-label">Let's get started</p>

          <div class="onboarding-field">
            <label for="obName">What's your first name?</label>
            <input type="text" id="obName" placeholder="Your first name" autocomplete="given-name">
          </div>

          <div class="onboarding-field">
            <label for="obEmail">What's your email?</label>
            <input type="email" id="obEmail" placeholder="your.email@example.com" autocomplete="email">
          </div>

          <p class="onboarding-hint">${icon('check', 14)} You only need to do this once. Your access stays saved on this device.</p>

          <button class="onboarding-btn" id="obSubmit" disabled>Continue</button>
        </div>
      </div>`;

    const nameInput = $('#obName');
    const emailInput = $('#obEmail');
    const submitBtn = $('#obSubmit');

    function validate() {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      submitBtn.disabled = !(name.length >= 1 && emailOk);
    }

    nameInput.addEventListener('input', validate);
    emailInput.addEventListener('input', validate);

    submitBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      Store.setProfile({ name, email, warnings: [] });
      showTutorial(name, email);
    });
  }

  function showTutorial(name, email) {
    // Render the real app behind the coach marks
    Store.setProfile({ name, email, warnings: [] });
    const tabBar = document.querySelector('.tab-bar');
    if (tabBar) tabBar.style.display = 'flex';
    initTabs();
    renderHome();

    const steps = [
      { target: '.home-hero', text: 'This is your daily greeting. Open the app every day to see your protocol.', arrow: 'down' },
      { target: '.program-start-card, .program-today-card', text: 'Your 30-day guided journey. Mama Juba picks one recipe for you each day.', arrow: 'down' },
      { target: '.cat-grid', text: 'Tap any symptom to browse all recipes for that area.', arrow: 'up' },
      { target: '.tab-bar', text: 'Use these tabs to switch between recipes, videos, community, and settings.', arrow: 'up' }
    ];
    let step = 0;

    function showStep() {
      const prev = document.querySelector('.coach-overlay');
      if (prev) prev.remove();
      if (step >= steps.length) return;

      const s = steps[step];
      const el = document.querySelector(s.target);
      if (!el) { step++; showStep(); return; }

      const rect = el.getBoundingClientRect();
      const isLast = step === steps.length - 1;

      const overlay = document.createElement('div');
      overlay.className = 'coach-overlay';

      // Tooltip position
      let tooltipStyle;
      if (s.arrow === 'up') {
        tooltipStyle = `bottom:${window.innerHeight - rect.top + 20}px;left:20px;right:20px;`;
      } else {
        tooltipStyle = `top:${rect.bottom + 20}px;left:20px;right:20px;`;
      }

      overlay.innerHTML = `
        <div class="coach-backdrop" id="coachBackdrop"></div>
        <div class="coach-spotlight" style="top:${rect.top - 8}px;left:${rect.left - 8}px;width:${rect.width + 16}px;height:${rect.height + 16}px;border-radius:16px"></div>
        <div class="coach-tooltip coach-arrow-${s.arrow}" style="${tooltipStyle}">
          <p class="coach-text">${s.text}</p>
          <div class="coach-bottom">
            <span class="coach-counter">${step + 1} of ${steps.length}</span>
            <button class="coach-btn" id="coachNext">${isLast ? 'Got it!' : 'Next'}</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      document.getElementById('coachNext').addEventListener('click', () => {
        haptic();
        overlay.remove();
        step++;
        if (step < steps.length) showStep();
      });

      document.getElementById('coachBackdrop').addEventListener('click', () => {
        haptic();
        overlay.remove();
        step++;
        if (step < steps.length) showStep();
      });
    }

    setTimeout(showStep, 500);
  }

  function showWelcomeSplash(name) {
    const tabBar = document.querySelector('.tab-bar');
    if (tabBar) tabBar.style.display = 'none';

    app.innerHTML = `
      <div class="welcome-splash">
        <div class="welcome-splash-icon">${icon('leaf', 32)}</div>
        <h1>Welcome, ${escapeHtml(name)}.</h1>
        <p>Your healing protocol is ready.</p>
      </div>`;

    setTimeout(() => {
      if (tabBar) tabBar.style.display = 'flex';
      Router.navigate('/');
    }, 2200);
  }

  // ─── Routes ───
  Router.register('/', renderHome);
  Router.register('/recipes', renderRecipes);
  Router.register('/recipe', renderRecipe);
  Router.register('/videos', renderVideos);
  Router.register('/video', renderVideo);
  Router.register('/community', renderCommunity);
  Router.register('/settings', renderSettings);

  // ─── Boot ───
  if (Store.isLoggedIn()) {
    initTabs();
    Router.start();
  } else {
    renderOnboarding();
    // After onboarding, boot the router
    const origNavigate = Router.navigate.bind(Router);
    Router.navigate = function(path) {
      initTabs();
      Router.navigate = origNavigate;
      Router.start();
    };
  }

  // Apply saved font size
  document.documentElement.style.setProperty('--font-scale', Store.get('fontSize') || 1);


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  // Push notification (daily morning)
  if ('Notification' in window && Notification.permission === 'default') {
    setTimeout(() => {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted' && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ type: 'SCHEDULE_DAILY' });
        }
      });
    }, 10000);
  } else if ('Notification' in window && Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(reg => {
      reg.active.postMessage({ type: 'SCHEDULE_DAILY' });
    });
  }
})();
