<template>
    <div class="test-div">
        <button @click="increment">增加</button>
        <span>原始:{{ counter }}</span>
        <span>附加:{{ getcounter }}</span>
    </div>
</template>
<script>
import {mapState,mapActions} from 'pinia'
import storeId from '@/store/pinia_test'  //storeId就是导出的那个值

export default {
    methods: {
        ...mapActions(storeId,['increment'])//不把函数补充完整的时候页面会报错
    },
    computed:{
        ...mapState(storeId,['counter','getcounter'])
    }
};
</script>

<style scoped>

.test-div{
    width: 800px;
    height: 500px;
    padding: 50px;
    display: flex;
    flex-direction: column;
}

</style>