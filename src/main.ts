
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores/index.ts'
import router from './router/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.less'


const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')