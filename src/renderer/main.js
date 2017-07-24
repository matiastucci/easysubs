import Vue from 'vue'

import App from './App'
import router from './router'

import Helpers from '@/services/helpers'

Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')

Helpers.setupExternalLinks()
Helpers.listenToPing()
