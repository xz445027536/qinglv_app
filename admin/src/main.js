import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import Router from 'vue-router'
// import router from './router'
import { constantRouterMap, asyncRouterMap } from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import CAS from './utils/casLogin'

import { getCurrentUserRole$, currentUserRole$ } from './mixin/auth-mixin'
import roleInfo$ from './mixin/auth-mixin'

import { dbClick } from './directives/double-click'

Vue.use(Router)
Vue.use(ElementUI, { locale }, dbClick)
Vue.mixin(roleInfo$)

// import vuePicturePreview from 'vue-picture-preview'

// Vue.use(vuePicturePreview)

Vue.config.productionTip = false

// import { constantRouterMap } from './router'

const casConfig = process.env.CAS_CONFIG
CAS.init(casConfig.BASE_URL, casConfig.APP_KEY, casConfig.APP_SECRET, casConfig.ENV, function() {
  initVue()
})
CAS.casLogin()

// initVue()

function initVue() {
  console.log('envConfig: ', process.env)
  getCurrentUserRole$(sessionStorage.username).then(() => {
    // 在 then() 方法里调用确保此时 currentUserRole$ 已经有值
    const fullRouterMap = constantRouterMap.concat(asyncRouterMap
      .filter(route => route.meta.role.includes(currentUserRole$))
      .map(route => {
        if (!route.children) return route
        route.children = route.children.filter(childRoute => {
          if (!childRoute.meta.role) return true
          return childRoute.meta.role.includes(currentUserRole$)
        })
        return route
      })
    )

    const router = new Router({
      // mode: 'history', //后端支持可开
      scrollBehavior: () => ({ y: 0 }),
      routes: fullRouterMap
    })

    new Vue({
      el: '#app',
      router: router,
      store,
      template: '<App/>',
      components: { App }
    })
  })
}
