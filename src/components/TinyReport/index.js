import VueReportPlugin from './ReportPaper.vue'
const tinyReportPlugin = {
  install: function(Vue) {
    Vue.component(VueReportPlugin.name, VueReportPlugin)
  }
}
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) { 
    window.Vue.use(tinyReportPlugin) 
}
// 导出模块
export default tinyReportPlugin
