import Vue from 'vue'
import App from './App'
import router from '@/router'


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
