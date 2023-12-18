import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@assets/base.css'
import '@assets/tailwind.css'
import 'nes.css/css/nes.min.css'
import VueTypedJs from 'vue-typed-js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTypedJs)

app.mount('#app')
