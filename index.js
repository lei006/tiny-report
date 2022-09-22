import tinyReport from './src/tinyReport/index'
import _Vue from 'vue'

tinyReport.install = Vue => {
    if (!Vue) {
        window.Vue = Vue = _Vue
    }
    Vue.component(tinyReport.name, Main)
}

export default tinyReport;