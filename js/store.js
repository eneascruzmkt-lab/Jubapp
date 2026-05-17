/**
 * Store — localStorage wrapper for app state
 */
const Store = {
  _key: 'jubapp_data',

  _read() {
    try { return JSON.parse(localStorage.getItem(this._key)) || {}; }
    catch { return {}; }
  },

  _write(data) {
    localStorage.setItem(this._key, JSON.stringify(data));
  },

  get(key) {
    return this._read()[key] ?? null;
  },

  set(key, value) {
    const data = this._read();
    data[key] = value;
    this._write(data);
  },

  // User profile
  getProfile() {
    return this.get('profile') || { name: '', email: '', warnings: [] };
  },

  setProfile(profile) {
    this.set('profile', profile);
  },

  isLoggedIn() {
    const p = this.getProfile();
    return !!(p.name && p.email);
  },

  // Favorites
  getFavorites() {
    return this.get('favorites') || [];
  },

  toggleFavorite(recipeId) {
    const favs = this.getFavorites();
    const idx = favs.indexOf(recipeId);
    if (idx > -1) favs.splice(idx, 1);
    else favs.push(recipeId);
    this.set('favorites', favs);
    return favs.includes(recipeId);
  },

  // Water reminder
  getReminder() {
    return this.get('waterReminder') || { enabled: false, intervalHrs: 2 };
  },

  setReminder(config) {
    this.set('waterReminder', config);
  },

  // Visited recipes (tracks which categories user has explored)
  getVisited() {
    return this.get('visitedRecipes') || [];
  },

  markVisited(recipeId) {
    const visited = this.getVisited();
    if (!visited.includes(recipeId)) {
      visited.push(recipeId);
      this.set('visitedRecipes', visited);
    }
  },

  // Weekly check-ins
  getCheckins() {
    return this.get('checkins') || [];
  },

  addCheckin(score) {
    const checkins = this.getCheckins();
    const today = new Date().toISOString().slice(0, 10);
    // Replace if already checked in today
    const idx = checkins.findIndex(c => c.date === today);
    if (idx > -1) checkins[idx].score = score;
    else checkins.push({ date: today, score });
    this.set('checkins', checkins);
  },

  // Streak tracking
  getStreak() {
    const data = this.get('streak') || { count: 0, lastDate: null };
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (data.lastDate === today) return data;
    if (data.lastDate === yesterday) return { count: data.count, lastDate: data.lastDate };
    // Streak broken
    return { count: 0, lastDate: null };
  },

  bumpStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const current = this.getStreak();
    if (current.lastDate === today) return current; // already bumped today
    const newCount = current.count + 1;
    const streak = { count: newCount, lastDate: today };
    this.set('streak', streak);
    return streak;
  },

  // 30-day program
  getProgram() {
    return this.get('program') || { startDate: null, completedDays: [] };
  },

  startProgram() {
    const today = new Date().toISOString().slice(0, 10);
    this.set('program', { startDate: today, completedDays: [] });
  },

  completeProgramDay(dayNum) {
    const prog = this.getProgram();
    if (!prog.completedDays.includes(dayNum)) {
      prog.completedDays.push(dayNum);
      this.set('program', prog);
    }
  },

  getProgramDay() {
    const prog = this.getProgram();
    if (!prog.startDate) return 0;
    const start = new Date(prog.startDate);
    const now = new Date();
    const diff = Math.floor((now - start) / 86400000);
    return Math.min(diff + 1, 30); // day 1 to 30
  },

  // Community posts (mural)
  getPosts() {
    return this.get('communityPosts') || [];
  },

  initSeedPosts(seedPosts) {
    if (this.get('seedPostsInit')) return;
    const posts = this.getPosts();
    seedPosts.forEach(sp => {
      posts.push({
        id: 'seed-' + sp.daysAgo,
        author: sp.author,
        text: sp.text,
        likes: sp.likes,
        liked: false,
        timestamp: new Date(Date.now() - sp.daysAgo * 86400000).toISOString()
      });
    });
    this.set('communityPosts', posts);
    this.set('seedPostsInit', true);
  },

  addPost(post) {
    const posts = this.getPosts();
    posts.unshift({ ...post, id: 'u-' + Date.now(), timestamp: new Date().toISOString(), likes: 0, liked: false });
    this.set('communityPosts', posts);
  },

  toggleLike(postId) {
    const posts = this.getPosts();
    const p = posts.find(x => x.id === postId);
    if (!p) return;
    p.liked = !p.liked;
    p.likes += p.liked ? 1 : -1;
    this.set('communityPosts', posts);
  },

  // Daily question answered
  getDailyAnswer() {
    const today = new Date().toISOString().slice(0, 10);
    const data = this.get('dailyAnswer') || {};
    return data.date === today ? data.answer : null;
  },

  setDailyAnswer(answer) {
    const today = new Date().toISOString().slice(0, 10);
    this.set('dailyAnswer', { date: today, answer });
  }
};
