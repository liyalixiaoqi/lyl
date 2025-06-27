import { createApp } from 'vue';
import App from './App.vue';
import pinia from '@/stores/index';
import router from '@/router/index';

import 'element-plus/dist/index.css';
import '@/styles/index.less';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
