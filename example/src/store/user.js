import { defineStore } from 'pinia' //引入

const userStore = defineStore('storeUser', {
    // 状态管理器 核心部分 return要存储的数据
    state: () => {
        return {
            token:"",
        }
    },

    persist: {
        enabled: true,
        // 自定义持久化参数
        strategies: [
            {
                // 自定义key
                key: 'user_store',
                // 自定义存储方式，默认sessionStorage
                storage: localStorage,
                // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
                paths: ['token'],
            }
        ]
    },

    // 相当于 vue 中的 methods 方法
    actions:{
        logout(){

        },
        getInfo(){

        },
        login(){

        }
    }
})
export default userStore //导出
