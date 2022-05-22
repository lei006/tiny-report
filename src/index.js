
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n



import TinyPaper from './TinyPaper.vue'
import TinyDesigner from './TinyDesigner.vue'



const components = {
    install:function(Vue){

        Vue.use(ElementUI, { locale })

        Vue.component(TinyPaper.name, TinyPaper)
        Vue.component(TinyDesigner.name, TinyDesigner)

    }
}

// 导出该组件
export default components 
