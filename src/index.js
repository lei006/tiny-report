
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n


import TinyPaper from './TinyPaper.vue'
import TinyReport from './TinyReport.vue'
import TinyDesigner from './TinyDesigner.vue'
import TinyTitle from './TinyTitle.vue'
import TinyInput from './TinyInput.vue'
import TinyRich from './TinyRich.vue'
import TinyRect from './TinyRect.vue'
import TinyImage from './TinyImage.vue'
import ReportBaseItem from './ReportItem/index.vue'


const components = {
    install:function(Vue){
        Vue.component(TinyPaper.name, TinyPaper)
        Vue.component(TinyReport.name, TinyReport)
        Vue.component(TinyDesigner.name, TinyDesigner)
        Vue.component(TinyTitle.name, TinyTitle)
        Vue.component(TinyInput.name, TinyInput)
        Vue.component(TinyRich.name, TinyRich)
        Vue.component(TinyRect.name, TinyRect)
        Vue.component(TinyImage.name, TinyImage)
        Vue.component(ReportBaseItem.name, ReportBaseItem)


        // set ElementUI lang to EN
        Vue.use(ElementUI, { locale })
        // 如果想要中文版 element-ui，按如下方式声明
        // Vue.use(ElementUI)


    }
}

// 导出该组件
export default components 
