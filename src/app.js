import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './components/App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './helpers/axios'
import './helpers/pusher'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')