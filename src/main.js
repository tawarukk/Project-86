import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css' 
import 'bootstrap/dist/js/bootstrap.js' 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
// createApp(App).use(router).use(Vuesax).mount('#app')
