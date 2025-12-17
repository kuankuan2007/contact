import '@/styles/main.scss';
import '@/scripts/theme.ts';
import { i18n } from './i18n';

import { createApp } from 'vue';
import App from './App.vue';
import { emitEvent } from './scripts/event';

window.addEventListener('error', (e) => {
  emitEvent(e.toString(), 'warn');
});

(() => {
  try {
    const path = window.location.pathname;
    if (path !== '/') {
      const hash = path.replace(/^\//, '#');
      const search = window.location.search;
      const newUrl = `/${search}${hash}`;
      history.replaceState(null, '', newUrl);
    }
  } catch {}
})();

const app = createApp(App);
app.use(i18n);

app.mount('#app');
