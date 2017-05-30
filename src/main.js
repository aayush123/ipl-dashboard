// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import storePlugin from '@/store/storePlugin'
Vue.use(storePlugin)
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueCharts from 'vue-charts'
// import Store from './store/index'
Vue.use(BootstrapVue)
Vue.use(VueCharts)
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
