import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css' // 全局样式表
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8082/api/private/v1' //配置请求根路径
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
