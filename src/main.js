import Vue from 'vue'
import App from './App.vue'

import { Cascader,DatePicker,InputNumber,Button,Tree,Dialog,Radio,RadioGroup, RadioButton, Popover, Input, Image, Select,Checkbox,Option,ColorPicker } from 'element-ui';
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
import 'element-ui/lib/theme-chalk/scrollbar.css';
import 'element-ui/lib/theme-chalk/progress.css';
import 'element-ui/lib/theme-chalk/cascader-panel.css';



Vue.component(Cascader.name, Cascader);
Vue.component(DatePicker.name, DatePicker);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Button.name, Button);
Vue.component(Tree.name, Tree);
Vue.component(Dialog.name, Dialog);
Vue.component(Image.name, Image);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(RadioButton.name, RadioButton);
Vue.component(Popover.name, Popover);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Option.name, Option);
Vue.component(ColorPicker.name, ColorPicker );


new Vue({
  el: '#app',
  render: h => h(App)
})
