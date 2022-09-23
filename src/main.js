import Vue from 'vue'
import App from './App.vue'



import TinyReport from '../index'
Vue.use(TinyReport)




new Vue({
  el: '#app',
  render: h => h(App)
})
