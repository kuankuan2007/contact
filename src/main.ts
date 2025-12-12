import '@/styles/main.scss';
import '@/scripts/theme.ts';
import { i18n } from './i18n';

import { createApp } from 'vue';
import App from './App.vue';
import { emitEvent } from './scripts/event';
import { theme, themeValue } from '@/scripts/theme.ts';

window.addEventListener('error', (e) => {
  emitEvent(e.toString(), 'warn');
});

const app = createApp(App);
app.use(i18n);

app.mount('#app');
