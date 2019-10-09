import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './components/index/Index'
import City from './components/city/City'
import Details from './components/details/Details'
 
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home},
    {path:'/index',name:'index',component:Index},
    {path:'/city',name:'city',component:City},
    {path:'/details/:id',name:'details',component:Details}
  ]
})
