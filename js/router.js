/**
 * Router — simple hash-based SPA router
 */
const Router = {
  routes: {},
  currentRoute: null,

  register(path, handler) {
    this.routes[path] = handler;
  },

  navigate(path) {
    window.location.hash = path;
  },

  _resolve() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, ...rest] = hash.split('/').filter(Boolean);
    const route = '/' + (path || '');
    const param = rest.join('/');

    if (this.routes[route]) {
      this.currentRoute = route;
      this.routes[route](param);
    } else {
      this.routes['/'] && this.routes['/']();
    }
  },

  start() {
    window.addEventListener('hashchange', () => this._resolve());
    this._resolve();
  }
};
