
import TinyPaper from './TinyPaper.vue'
import TinyTitle from './TinyTitle.vue'
import TinyInput from './TinyInput.vue'
import TinyRich from './TinyRich.vue'
import TinyRect from './TinyRect.vue'
const components = {
    install:function(Vue){
        Vue.component(TinyPaper.name, TinyPaper)
        Vue.component(TinyTitle.name, TinyTitle)
        Vue.component(TinyInput.name, TinyInput)
        Vue.component(TinyRich.name, TinyRich)
        Vue.component(TinyRect.name, TinyRect)
    }
}

// 导出该组件
export default components 