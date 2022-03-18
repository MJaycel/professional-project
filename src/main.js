import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue,  BootstrapVueIcons } from 'bootstrap-vue'
import VueYouTubeEmbed from 'vue-youtube-embed'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee)

Vue.use('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue )
Vue.use(VueYouTubeEmbed)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
