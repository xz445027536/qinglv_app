import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import QS from 'qs'
import './assets/css/reset.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.prototype.axios=axios
Vue.prototype.qs=QS
Vue.config.productionTip = false
//axios.defaults.baseURL="http://127.0.0.1:3300"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
