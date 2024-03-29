import Vue from 'vue'
import App from './App.vue'



import TinyReport from '../index'
Vue.use(TinyReport)


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })


new Vue({
  el: '#app',
  render: h => h(App)
})
