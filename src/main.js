import { createApp } from 'vue';
import App from './App.vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';

import './assets/main.scss';

const app = createApp(App);
app.component(VueQrcode.name, VueQrcode);
app.mount('#app');