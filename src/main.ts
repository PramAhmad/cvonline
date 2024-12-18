import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createBootstrap } from 'bootstrap-vue-next'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import Toast, { type PluginOptions } from 'vue-toastification'
import { FcGoogle } from 'oh-vue-icons/icons'
import PrimeVue from 'primevue/config'
import 'bs-stepper/dist/css/bs-stepper.min.css'
import 'swiper/swiper-bundle.css'
import 'glightbox/dist/css/glightbox.min.css'
import 'aos/dist/aos.css'
import 'bootstrap/dist/css/bootstrap.min.css'  // Use only one of these.
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@/assets/scss/style.scss'
import 'vue-toastification/dist/index.css'
import '@/index.css'
import { createGtm } from '@gtm-support/vue-gtm';


const toastOptions: PluginOptions = {}
addIcons(FcGoogle)
const app = createApp(App)
app.use(createGtm({
    id: 'G-J59E55YPM6',
    vueRouter: router,
    debug: true,
    enabled: true,
    
  }));

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('v-icon', OhVueIcon)
app.use(createPinia())
app.use(router)
app.use(createBootstrap())
app.use(BootstrapIconsPlugin)
app.use(Toast, toastOptions)
app.use(PrimeVue, {
    unstyled: true
})

app.mount('#app')
