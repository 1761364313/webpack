import Vue from 'vue'
import APP from './app.vue'
import router from './router/index.js'
import store from './store/index.js'
import 'common/css/reset.css'
new Vue({
  router,
  store,
  render: h => h(APP)
}).$mount('#app')
