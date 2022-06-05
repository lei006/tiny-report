<!--
label:用于给富文本赋予默认值,清空值label=" ",必须加空格,负责不会清空
v-model:单向绑定，由于富文本监听问题，不能用v-model赋予默认值
  -->
<template>
    <div class="editor-wrap">
        <quillEditor v-model="content" 
                        ref="quillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)" 
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">                        
                        
        </quillEditor>
    </div>
</template>
<script>

import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器


import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import * as Quill from 'quill'; // 富文本基于quill


export default {
    components:{ quillEditor },
    model: {
        prop: "data",
        event: "eventData"
    },
    props: {
        data: {
            type: String,
            default :  () =>{
                return "";
            },
        },
    },
    name: 'quill-editor',
    data() {
        var that = this
        return {
            content:"",
            editorOption: {
                theme: 'bubble',
                placeholder: "请输入内容",
                modules: {
                    toolbar: [
                    ['bold', 'italic'],
                    //[{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{'size': ['small', false, 'large', 'huge']}], 
                    //[{ 'color': [] }, { 'background': [] }],
                    [{ 'color': [] }],
                    [{ 'font': ['SimSun', 'Microsoft-YaHei','SimHei','KaiTi','Arial','Times-New-Roman'] }],
                    //[{ 'align': [] }],
                    //['link', 'image'],
                    ['clean']
                    ],
                }
            },            
        }
    },

    computed: {
        editor() {
            return this.$refs.quillEditor.quill;
        },
    },

    mounted:{

        onEditorReady(editor) { // 准备编辑器

        },
        onEditorBlur(){

        }, // 失去焦点事件
        onEditorFocus(){

        }, // 获得焦点事件
        onEditorChange(){

        }, // 内容改变事件
    },
}
</script>
<style>


</style>
