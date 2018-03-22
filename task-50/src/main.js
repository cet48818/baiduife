// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './store'
import newResearch from 'components/NewResearch'
// import 'common/scss/index.scss'

Vue.use(ElementUI)
Vue.use(VueRouter)

console.log(ElementUI)
const routes = [
  {path: '/', redirect: '/newresearch'},
  {path: '/newresearch', component: newResearch}
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
