import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Meta = (titles) => ({ title: titles })
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/home/index.vue'),
    meta: Meta('首页')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detail/index.vue'),
    meta: Meta('详情页')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/list/index.vue'),
    meta: Meta('列表')
  }
]

export default new VueRouter({
  mode: 'history',
  base: '/mytest',
  routes
})
