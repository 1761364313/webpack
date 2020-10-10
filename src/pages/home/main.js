import Vue from 'vue'
import APP from './app.vue'
import router from './router/index.js'
import store from './store/index.js'
import 'common/css/reset.css'
import 'common/js/test.js'
new Vue({
  router,
  store,
  render: h => h(APP)
}).$mount('#app')
