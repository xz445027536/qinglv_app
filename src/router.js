import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './components/Index'
import Header from './components/Header'
 
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home},
    {path:'/header',name:'header',component:Header}
  ]
})
