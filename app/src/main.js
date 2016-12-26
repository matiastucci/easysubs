import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import routes from './routes'

import Helpers from 'services/helpers'

Vue.use(Router)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes,
  linkActiveClass: 'active',
})

new Vue({
  router,
  ...App,
}).$mount('#app')

Helpers.setupExternalLinks()
Helpers.listenToPing()
