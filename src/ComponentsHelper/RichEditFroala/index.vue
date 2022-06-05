<!--
label:用于给富文本赋予默认值,清空值label=" ",必须加空格,负责不会清空
v-model:单向绑定，由于富文本监听问题，不能用v-model赋予默认值
  -->
<template>
        <froala
            id="froala-editor"
            :tag="'textarea'"
            :config="froalaConfig"
            v-model="body"
        ></froala>
</template>
<script>
export default {
    props: {
        // 显示的工具列表
        tool:{
        type:Array,
        default : () => [
            'undo',
            'redo',
            'clearFormatting',
            'bold',
            'italic',
            'underline',
            //'strikeThrough',
            'fontFamily',
            'fontSize',
            'color',
            'inlineStyle',
            'paragraphFormat',
            'align',
            //'formatOL',
            //'formatUL',
            //'outdent',
            //'indent',
            //'quote',
            //'insertLink',
            //'insertImage',
            //'insertVideo',
            //'embedly',
            //'insertFile',
            'insertTable',
            //'emoticons',
            'specialCharacters',
            'insertHR',
            'selectAll',
            //'print',
            //'spellChecker',
            //'html',
            //'help',
            //'fullscreen'
            ]
        },

    },
    name: 'froala-editor',
    data() {
        var that = this
        return {
            editor: null,
            body: "aaaaaaaaaa",
            froalaConfig: {
                //自定义工具栏
                    // toolbarButtons: [
                    //   'undo',
                    //   'redo',
                    //   'clearFormatting',
                    //   'bold',
                    //   'italic',
                    //   'underline',
                    //   'strikeThrough',
                    //   'fontFamily',
                    //   'fontSize',
                    //   'color',
                    //   'inlineStyle',
                    //   'paragraphFormat',
                    //   'align',
                    //   'formatOL',
                    //   'formatUL',
                    //   'outdent',
                    //   'indent',
                    //   'quote',
                    //   'insertLink',
                    //   'insertImage',
                    //   'insertVideo',
                    //   'embedly',
                    //   'insertFile',
                    //   'insertTable',
                    //   'emoticons',
                    //   'specialCharacters',
                    //   'insertHR',
                    //   'selectAll',
                    //   'print',
                    //   'spellChecker',
                    //   'html',
                    //   'help',
                    //   'fullscreen',
                    // ],
                    // theme: "dark",//主题
                    placeholderText: '请在此输入',
                    language: 'zh_cn', //语言
                    //imageUploadURL: 'http://i.froala.com/upload', //上传url
                    //imageUploadParams: { token: '', i: '', ak: '', f: 9 },
                    //fileUploadURL: 'http://i.froala.com/upload',
                    //fileUploadParams: { token: '', i: '', ak: '', f: 9 },
                    //videoUploadURL: 'http://i.froala.com/upload',
                    videoUploadParams: { token: '', i: '', ak: '', f: 9 },
                    quickInsertButtons: ['image','table', 'ul', 'ol', 'hr'], //快速插入项
                    // toolbarVisibleWithoutSelection: true,//是否开启 不选中模式
                    // disableRightClick: true,//是否屏蔽右击
                    colorsHEXInput: true, //关闭16进制色值
                    toolbarSticky: false, //操作栏是否自动吸顶,
                    zIndex: 2501,
                    // autofocus: true,
                    events: {
                        initialized: function () {
                            console.log(1)
                        },
                        blur: () => {
                            console.log(123)
                        },
                        contentChanged: () => {},
                    },
            },
            
        }
    },

    mounted() {

    },
    methods: {
        //更改富文本层级
        setIndex(val) {
            this.$nextTick(() => {
                let dv = document.getElementsByClassName('fr-box')
                for (let i in dv) {
                    if (!dv[i].style) {
                        return
                    }
                    dv[i].style.cssText = 'z-index:' + val
                }
            })
        },
        //富文本中提取纯文本
        getSimpleText: (html) => {
            var re1 = new RegExp('<p data-f-id="pbf".+?</p>', 'g') //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
            var msg = html.replace(re1, '') //执行替换成空字符
            return msg
        },
        //重置富文本
        resetValue(val) {
            this.body = val || ''
        }
    }
}
</script>
<style>

.editor-wrap > div {
    width: 100%;
}
.fr-wrapper > div[style*='z-index:9999;'],
.fr-wrapper > div[style*='z-index: 9999;'] {
    height: 0;
    overflow: hidden;
}
.fr-box .second-toolbar #logo {
    width: 0 !important;
    height: 0 !important;
    overflow: hidden;
}
.fr-box .fr-toolbar {
    border-radius: 4px 4px 0 0;
    border-color: #dcdfe6;
}
.fr-box .second-toolbar {
    border-radius: 0 0 4px 4px;
    border-color: #dcdfe6;
}
.fr-box .fr-wrapper {
    border-color: #dcdfe6 !important;
}


</style>
