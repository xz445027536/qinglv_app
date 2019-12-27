import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import './styles/common.less' //公共样式（包括覆盖iview默认样式）
import CAS from './utils/casLogin'
import { getCurrentUserRole$ } from './mixin/auth-mixin'
import roleInfo$ from './mixin/auth-mixin'

Vue.use(iView)
Vue.mixin(roleInfo$)
Vue.config.productionTip = false
CAS.init(
  process.env.VUE_APP_CAS_URL,
  process.env.VUE_APP_APP_KEY,
  process.env.VUE_APP_APP_SECRET,
  process.env.VUE_APP_CAS_ENV,
  function () {
    initVue()
  })
CAS.casLogin()

// initVue()

function initVue() {
  getCurrentUserRole$().then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
}
