
// export {default as TinyReport} from "./TinyReport"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import TinyReport from './TinyReport.vue'
import TinyDesign from './TinyDesign.vue'
import TinyRichEdit from './TinyRichEdit.vue'
import TinyTreeEdit from './TinyTreeEdit.vue'

import './Resource/iconfont.css'
import './Resource/iconfont.js'

// 富文本
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/languages/zh_cn.js'
import 'froala-editor/js/plugins.pkgd.min.js'
import VueFroala from 'vue-froala-wysiwyg'

const VueResizeObserver = require('vue-resize-observer')

//import resizeDirective from './directives/resize.directive'

const components = {
  install: function(Vue) {
    Vue.use(ElementUI, { locale })

    //Vue.use(resizeDirective)

    Vue.component(TinyReport.name, TinyReport)
    Vue.component(TinyDesign.name, TinyDesign)
    Vue.component(TinyRichEdit.name, TinyRichEdit)
    Vue.component(TinyTreeEdit.name, TinyTreeEdit)
    
    Vue.use(VueFroala)
    Vue.use(VueResizeObserver) // use is a static method
  }
}

// 导出该组件
export default components
