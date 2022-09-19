<!--
label:用于给富文本赋予默认值,清空值label=" ",必须加空格,负责不会清空
v-model:单向绑定，由于富文本监听问题，不能用v-model赋予默认值
  -->
<template>
    <froala :tag="'textarea'" :config="froalaConfig" v-model="editData"></froala>
</template>
<script>
export default {
    name: 'rich-edit-froala',
    model: {
        prop: "modelData",
        event: "eventModelData"
    },
    props: {
        modelData: {
            type: String,
            default: () =>{
                return "";
            },
        },
    },
    data() {
        return {
            editData:"",
            froalaConfig: {
                toolbarInline: true,
                charCounterCount: false,
                language:"zh_cn",
            },
            
        }
    },
    watch: {
        editData(val) {
            this.$emit("eventModelData", val);
        },
        modelData(val) {
            this.editData = val;
        }
    },


    mounted() {


    },
    methods: {
        //重置富文本
        resetValue(val) {
            this.body = val || ''
        }
    }
}
</script>
<style>

.fr-box{
    width:100%;
}

.fr-box p{
    margin: 0px;
    padding: 0px;
}

</style>
