import tinyReport from './src/tinyReport/index'
import tinyDesign from './src/tinyDesign/index'
import tinyRichEditor from './src/tinyRichEditor/index'

/*
import { Cascader,DatePicker,InputNumber,Button,Tree,Dialog,Radio,RadioGroup, RadioButton, Popover, Input, Select,Checkbox,Option,ColorPicker,Image } from 'element-ui';
import 'element-ui/lib/theme-chalk/cascader.css';
import 'element-ui/lib/theme-chalk/date-picker.css';
import 'element-ui/lib/theme-chalk/input-number.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/tree.css';
import 'element-ui/lib/theme-chalk/dialog.css';
import 'element-ui/lib/theme-chalk/radio.css';
import 'element-ui/lib/theme-chalk/radio-group.css';
import 'element-ui/lib/theme-chalk/popover.css';
import 'element-ui/lib/theme-chalk/input.css';
import 'element-ui/lib/theme-chalk/select.css';
import 'element-ui/lib/theme-chalk/checkbox.css';
import 'element-ui/lib/theme-chalk/option.css';
import 'element-ui/lib/theme-chalk/color-picker.css';
import 'element-ui/lib/theme-chalk/Image.css';
*/

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'



// 富文本
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/languages/zh_cn.js'
import 'froala-editor/js/plugins.pkgd.min.js'
import VueFroala from 'vue-froala-wysiwyg'



const components = {
    install: function(Vue) {

        Vue.use(ElementUI, { locale })
        /*
        Vue.component(Cascader.name, Cascader);
        Vue.component(DatePicker.name, DatePicker);
        Vue.component(Input.name, Input);
        Vue.component(InputNumber.name, InputNumber);
        Vue.component(Button.name, Button);
        Vue.component(Tree.name, Tree);
        Vue.component(Dialog.name, Dialog);
        Vue.component(Radio.name, Radio);
        Vue.component(RadioGroup.name, RadioGroup);
        Vue.component(RadioButton.name, RadioButton);
        Vue.component(Popover.name, Popover);
        Vue.component(Input.name, Input);
        Vue.component(Select.name, Select);
        Vue.component(Checkbox.name, Checkbox);
        Vue.component(Option.name, Option);
        Vue.component(ColorPicker.name, ColorPicker );
        Vue.component(Image.name, Image);
        */
        Vue.component(tinyReport.name, tinyReport)
        Vue.component(tinyDesign.name, tinyDesign)
        Vue.component(tinyRichEditor.name, tinyRichEditor)
        console.log(tinyRichEditor.name);
        Vue.use(VueFroala)

    }
}

// 导出该组件
export default components

