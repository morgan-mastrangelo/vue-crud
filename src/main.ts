import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/@line-awesome/css/line-awesome.css'
import './assets/main.css'

createApp(App).use(router).mount('#app')
