import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyIndex from './components/MyIndex'
import MyHeader from './components/MyHeader'
import Swiper from './components/Swiper.vue'
import Hot from './components/Hot.vue'
 
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home},
    {path:'/myindex',name:'myindex',component:MyIndex},
    {path:'/myheader',name:'myheader',component:MyHeader},
    {path:'/swiper',name:'swiper',component:Swiper},
    {path:'/hot',name:'hot',component:Hot}
  ]
})
