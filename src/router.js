import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyIndex from './components/myindex/MyIndex'
import City from './components/city/City'
 
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home},
    {path:'/myindex',name:'myindex',component:MyIndex},
    {path:'/city',name:'city',component:City}
  ]
})
