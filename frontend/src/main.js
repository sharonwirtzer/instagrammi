import Vue from 'vue'
import app from './app.vue'
import {router} from './router'
import './assets/styles/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(app)
}).$mount('#app')


