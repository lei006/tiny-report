import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control


// 增加 pinia 的支持
import {createPinia, PiniaVuePlugin, setMapStoreSuffix } from 'pinia' //导入pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //持久化插件

const pinia = createPinia(); //调用创建pinia
pinia.use(piniaPluginPersistedstate);
setMapStoreSuffix('_pinia');


 Vue.use(PiniaVuePlugin)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { zhLocale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  pinia,
  store,
  render: h => h(App)
})
