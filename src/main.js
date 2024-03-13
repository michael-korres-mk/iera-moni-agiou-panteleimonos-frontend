// import '@/@iconify/icons-bundle'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import mixins from './mixins'

import App from '@/App.vue'
import i18n from '@/plugins/i18n'
import router from '@/router'
// import VueProgressBar from '@aacassandra/vue3-progressbar'
import '@core/scss/template/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import '@styles/styles.scss'
import Toast, { useToast } from 'vue-toastification'
import useJwt from './libs/jwt/useJwt'
import { useSessionStore } from './stores/session'

library.add(fas, far)

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mixin(mixins)
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(i18n)
// app.use(VueProgressBar, {
//   color: '#A7844E',
//   failedColor: '#874b4b',
//   thickness: '5px',
// })
app.use(Toast, {
  shareAppContext: true,
  position: 'top-right',
  hideProgressBar: true,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: 3000,
  transition: 'Vue-Toastification__fade',
})
app.config.globalProperties.$store = useSessionStore()
app.config.globalProperties.$toast = useToast()
app.mount('#app')

const jwtToken = useJwt.getToken()
if (jwtToken) {
  useJwt.setToken(jwtToken)
}

export default app
