import { defineStore } from 'pinia' //引入

const useStore = defineStore('storeId', {
    // 状态管理器 核心部分 return要存储的数据
    state: () => {
        return {
            counter: 0,
        }
    },

    persist: {
        enabled: true,
        // 自定义持久化参数
        strategies: [
            {
                // 自定义key
                key: 'login_store',
                // 自定义存储方式，默认sessionStorage
                storage: localStorage,
                // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
                paths: ['counter'],
            }
        ]
    },

    // 相当于 vue 中的 computed 计算属性 返回一个数值
    getters: {
        getcounter(){
            return this.counter+1;
        }
    },
    // 相当于 vue 中的 methods 方法
    actions:{
        increment(){
            this.counter++
        }
    }
})
export default useStore //导出
