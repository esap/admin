import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

//axios.defaults.baseURL = store.state.appUrl;
Vue.prototype.$http = axios
axios.defaults.headers={'Authorization':store.getters.tokens};
Vue.use(ElementUI)
Vue.use(iView)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
