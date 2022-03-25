// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//本地的包--用来开发
import TinyReport from '../src/index'

//从NPM下载的包--用来测试
//import TinyReport from 'tiny-report'    

Vue.config.productionTip = false


Vue.use(TinyReport)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
