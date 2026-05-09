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
    return this.get('profile') || { name: '', warnings: [] };
  },

  setProfile(profile) {
    this.set('profile', profile);
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

  // Community messages
  getMessages() {
    return this.get('communityMessages') || [];
  },

  addMessage(msg) {
    const msgs = this.getMessages();
    msgs.push({ ...msg, id: Date.now(), timestamp: new Date().toISOString() });
    this.set('communityMessages', msgs);
  }
};
