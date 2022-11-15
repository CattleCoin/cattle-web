import Vue from 'vue'
import App from './App'
import router from './router'
import Web3 from 'web3'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueClipboard from 'vue-clipboard2'

Vue.prototype.Web3 = Web3
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
