import Vue from 'vue'

import App from './App'
import router from './router'

import Analytics from '@/services/analytics'
import Helpers from '@/services/helpers'

Vue.config.productionTip = false

Analytics.init()

new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')

Helpers.setupExternalLinks()
Helpers.listenToPing()
