<template>
    <div class="tiny-paper-box">
      <div class="tiny-paper rd-f5" ref="report" :style="{'width':report.paper.width + 'px','height':report.paper.width*report.paper.ratio + 'px', fontSize:report.paper.fontsize + 'px'}">
        <div class="tiny-paper-content input-text" :class="{'tiny-paper-border':(paperModel!=='preview')}"  @mousedown="onMouseDown($event, report.paper)" @mousemove="onMouseMove" @mouseup="onMouseUp" @dragover="onDragOver" @drop="onDrag">
              <report-base-item
                  v-for="(item, key) in report.items"
                  :key='key'
  
                  :left='item.left' 
                  :top='item.top' 
                  :width='item.width'  
                  :height='item.height' 
                  :selectted="item.selectted"

                  v-show="((paperModel === 'preview') && (item.is_no_print === true)) === false"

                  @dragging="dragging(report, item, $event)" 
                  @dragstop="dragstop(report, item, $event)"
                  @mousedown="onItemMouseDown(report, item, $event)"
                  @mouseup="onItemMouseUp(report, item, $event)"
                  @resize="onItemResize(report,item,$event)"
  
                  :options="options"
                  :fontfamily="item.fontfamily + ''"
                  :fontsize="item.fontsize"
                  :fontcolor="item.fontcolor"
                  :backgroundcolor="item.backgroundcolor"
                  :fontweight="item.fontweight  + ''"
                > 
                        <TinyLabelText :options="options" v-if="item.class == 'label-text'" :align="report.items[key].align" :label="report.items[key].data"/>
                        <TinyLabelData :options="options" v-else-if="item.class == 'label-data'" :align="report.items[key].align" :label="report.items[key].data"/>
                        <TinyInputText :options="options" :tabindex="item.tab + ''"  v-else-if="item.class == 'input-text'" v-model="report.items[key].data" @eventItemData="eventInputTextChange($event, report.items[key])"/>
                        <TinyImage :options="options" v-else-if="item.class == 'image'" v-model="report.items[key].data"/>
                        <TinyQrcode :options="options" v-else-if="item.class == 'qr-code'" v-model="report.items[key].data" :color="report.items[key].color"/>
                        <TinyRect :options="options" v-else-if="item.class == 'rect'"  :radius="report.items[key].radius" :color="report.items[key].color"/>
                        <TinyEllipse :options="options" v-else-if="item.class == 'ellipse'" :color="report.items[key].color"/>
                        <TinyTextarea :options="options" :tabindex="item.tab + ''" v-else-if="item.class == 'text-area'" v-model="report.items[key].data"/>
                        <TinyRich :options="options" :tabindex="item.tab + ''" v-else-if="item.class == 'rich-text'" v-model="report.items[key].data"/>
                        <TinySelectDate :options="options" :tabindex="item.tab + ''" v-else-if="item.class == 'select-date'" :def_now="item.def_now" v-model="report.items[key].data"/>
                        <TinySelectItem :options="options" :tabindex="item.tab + ''" :multiple="item.multiple" v-else-if="item.class == 'select-item'" v-model="report.items[key].data" :preset_data="item.preset_data" />
                        <TinySelectCascader :options="options" :tabindex="item.tab + ''" :showAll="item.showall" v-else-if="item.class == 'select-cascader'" v-model="report.items[key].data" :preset_data="item.preset_data" />
                        <div v-else>不支持组件:{{item.class}}</div>

                      <div v-if="paperModel==='tab' && item.tab" class="report-tab" @click="onBtnTabClick(report, item)">{{item.tab}}</div>
                      <div v-if="paperModel==='design' && item.friend_name && friendName===true " class="report-tab">{{item.friend_name}}</div>
  
              </report-base-item>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  const stringRandom = require('string-random');

  import printJS from 'print-js'
  import html2canvas from "html2canvas"
  
  
  import TinyImage from './components/TinyImage.vue'
  import TinyEllipse from './components/TinyEllipse.vue'
  import TinyRect from './components/TinyRect.vue'
  import TinyLabelText from './components/TinyLabelText.vue'
  import TinyLabelData from './components/TinyLabelData.vue'
  import TinyInputText from './components/TinyInputText.vue'
  import TinyTextarea from './components/TinyTextarea.vue'
  import TinySelectDate from './components/TinySelectDate.vue'
  import TinySelectCascader from './components/TinySelectCascader.vue'
  import TinyRich from './components/TinyRich.vue'
  import TinyQrcode from './components/TinyQrcode.vue'
  import TinySelectItem from './components/TinyItemSelect.vue'
  

  import Var from '../tinyVariable'

  import ReportBaseItem from './components/index.vue'
  

  export default {
    name: 'YcTinyReport',
    components:{ReportBaseItem, TinyRich, TinyImage, TinyQrcode,TinyEllipse, TinySelectItem, TinyRect, TinyLabelText, TinyLabelData, TinyInputText, TinyTextarea, TinySelectDate, TinySelectCascader},

    model: {
        prop: "reportData",
        event: "eventReportData"
    },    
    props: {
        reportData:{
            type: Object,
            default:function(){
                return {
                    test:"",
                }
            }
        },
        friendName:{
          type: Boolean,
          default:function(){
            return true;
          }
        },
        paperModel:{
          type: String,
          default:function(){
            return "design";
          }
        },
    },
    data () {
      return {
        report:{
          paper:{
            width:640,
            ratio:1.43,
          },
          items:[]
        },
        tab_index:1,
        activeItem:null,
        clickItem:null,   //点中的
        hitItem:false,    //鼠标点击中了一个report_item
        // 同步拖动....
        drag:{
          sync: false,
          draggingId: null,
          prevOffsetX: -1,
          prevOffsetY: -1,
        },
        mousedown:{offsetX:0,offsetY:0},
        old_select_items:[],
        options:{
          isAllowResize:false,  //允许调整大小
          isAllowDrag:true,     //允许拖动
          isItemEnable:true,    //是否有效
          isShowBackArea:true,  //显示背景
          isShowBorder:true,  //显示边框
        },
        tmp_add_index:1,
      }
    },
  
    watch:{
      report:{
        handler(newVal, oldVal){
          let _self = this;
  
            // 1.清除上次延时..
            if (_self.report_change_timer !== undefined) {
                clearTimeout(_self.report_change_timer);   
            }
            
            // 2.新建延时..
            _self.report_change_timer = setTimeout(() => {
                _self.$emit('reportChange', newVal);
            }, 500);
        },
        deep:true,
        immediate:false,
      },
      activeItem:{
        handler(newVal, oldVal){
          this.$emit('activeItem', newVal)
        },
        deep:true,
        immediate:false,
      },
      clickItem:{
        handler(newVal, oldVal){
          this.$emit('clickItem', newVal)
        },
        deep:true,
        immediate:false,
      },


      paperModel:{
        handler(newVal){
          console.log("============>newVal", newVal);
          this.SetModel(newVal);
        },
        deep:true,
        immediate:true,
      },
    },
  
    mounted(){
      

  
      window.addEventListener('keydown', ev => {
        if (ev.key === "Control") {
          this.drag.sync = true;
        }
      });
      window.addEventListener('keyup', ev => {
        if (ev.key === "Control") {
          this.drag.sync = false;
        }
        if (ev.key === "Delete") {
          this.deleteSelected();
        }
        if(ev.key === "Escape") {
          this.onCancelAllSelectted();
          this.selectItemsChange();
        }
      });
      window.addEventListener('mouseup', ()=>{
  
      });
  
    },
    methods:{
      dragging(report, item, ev){
  
          item.left = ev.left;
          item.top = ev.top;
  
          this.drag.draggingId = item.id;
  
          if (! this.drag.sync) return;
  
          const deltaX = this.deltaX(item.left);
          const deltaY = this.deltaY(item.top);
          console.log("delta : ", deltaX, deltaY);
  
          this.report.items.map(el => {
            if ( (el.selectted) && (el.id !== item.id) ) {
              el.left += deltaX;
              el.top += deltaY;
            }
            return el;
          });
          
      },
      dragstop(report, item, ev){
          item.left = ev.left;
          item.top = ev.top;
  
          this.report.items.map(el => {
              if ( el.id === item.id) {
              el.left = ev.left;
              el.top = ev.top;
            }
            return el;
          });
          this.drag.draggingId = null;
          this.drag.prevOffsetX = -1;
          this.drag.prevOffsetY = -1;
      },
      deltaX(offsetX) {
        
        if(this.drag.prevOffsetX < 0 ){
          this.drag.prevOffsetX = offsetX;
          return 0;
        }
  
        const ret = offsetX - this.drag.prevOffsetX;
        this.drag.prevOffsetX = offsetX;
        return ret;
      },
      deltaY(offsetY) {
        if(this.drag.prevOffsetY < 0 ){
          this.drag.prevOffsetY = offsetY;
          return 0;
        }
        const ret = offsetY - this.drag.prevOffsetY;
        this.drag.prevOffsetY = offsetY;
        return ret;
      },
      // 对齐--
      align(mode){
  
        if(!this.activeItem) return;
  
  
        if(mode === "align_left") {
          // 找到最左的..
          let report_layout_items = this.report.items;
          let left_pos = this.activeItem.left;
          for (let i = 0; i < report_layout_items.length; i++) {
            const element = report_layout_items[i];
            if(element.selectted===true){
              report_layout_items[i].left = left_pos;
            }
          }
        }
        
        if(mode === "align_right") {
          // 找到最左的..
          let report_layout_items = this.report.items;
          let right_pos = this.activeItem.left + this.activeItem.width;
          for (let i = 0; i < report_layout_items.length; i++) {
            const element = report_layout_items[i];
            if(element.selectted===true){
              report_layout_items[i].left = right_pos - report_layout_items[i].width;
            }
          }
        }
  
        if(mode === "align_top") {
  
          let report_layout_items = this.report.items;
          let top_pos = this.activeItem.top;
          for (let i = 0; i < report_layout_items.length; i++) {
            const element = report_layout_items[i];
            if(element.selectted===true){
              report_layout_items[i].top = top_pos;
            }
          }
  
        }
  
        if(mode === "align_bottom") {
          let report_layout_items = this.report.items;
          let bottom_pos = this.activeItem.top + this.activeItem.height;
  
          for (let i = 0; i < report_layout_items.length; i++) {
            const element = report_layout_items[i];
            if(element.selectted===true){
              report_layout_items[i].top = bottom_pos - report_layout_items[i].height;
            }
          }
        }
  
        if(mode === "align_width") {
  
            let report_layout_items = this.report.items;
  
            let item_width = this.activeItem.width;
            for (let i = 0; i < report_layout_items.length; i++) {
              const element = report_layout_items[i];
              if(element.selectted===true){
                report_layout_items[i].width = item_width;
              }
            }
        }
        if(mode === "align_height") {
  
            let report_layout_items = this.report.items;
            let item_height = this.activeItem.height;
            for (let i = 0; i < report_layout_items.length; i++) {
              const element = report_layout_items[i];
              if(element.selectted===true){
                report_layout_items[i].height = item_height;
              }
            }
        }
  
  
      },
      onItemMouseDown(report, item, ev){
        this.hitItem = true;
        if(this.paperModel === Var.TINY_REPORT__DESIGN) {
            item.selectted = true;
            this.activeItem = item;
            this.clickItem = item;
            this.selectItemsChange();
        }
      },
      onItemMouseUp(report, item){
        //console.log("0000", item.id, item.selectted);
        //item.selectted = !item.selectted;
        //console.log("11111", item.id, item.selectted);
      },
      onItemResize(report,item,ev){
        if(this.paperModel === Var.TINY_REPORT__DESIGN) {
          item.left = ev.left;
          item.top = ev.top;
          item.width = ev.width;
          item.height = ev.height;
        }
      },
      
      onMouseDown(ev, report){
        this.mousedown.offsetX = ev.offsetX;
        this.mousedown.offsetY = ev.offsetY;

        if(this.hitItem == false) {
          this.clickItem = report;
        }
      },
      onMouseMove(ev){
   
      },
      onMouseUp(ev){
        //没有按下ctrl 或 shift ，则取消全部选中
        if( (ev.ctrlKey == false) && (ev.shiftKey == false) )
        {
          //this.onCancelAllSelectted();
          //this.selectItemsChange();
        }
          //this.onCancelAllSelectted();
  
        if(this.hitItem == false){
          //如果没有点中任何item则.
          this.onCancelAllSelectted();
        }
  
        this.hitItem = false;
      },
      onDragOver(ev){
          ev.preventDefault();
      },
      onDrag(ev){
        this.$emit("drag", ev);
      },
      eventInputTextChange(data, item){
  
        if( (item.sync_id != undefined) && (item.sync_id != "") ){
            for (let i = 0; i < this.report.items.length; i++) {
              let tmp_item = this.report.items[i];
              
              if( (tmp_item.sync_id === item.sync_id) && (tmp_item.id !== item.id) && (tmp_item.data !== item.data) ) {
                tmp_item.data = item.data;
              }
            }
        }
  
        console.log("eventInputTextChange -->", data, item);
      },
  
      SetSize(width){
        this.report.paper.width = width;
      },
      SetModel(model){
  
        if (model == Var.TINY_REPORT__DESIGN) {
          this.options.isAllowResize = true;  //允许调整大小
          this.options.isAllowDrag = true;     //允许拖动
          this.options.isItemEnable = false;    //是否有效
          this.options.isShowBackArea = true;  //显示背景
          this.options.isShowBorder = true;  //显示边框
        }
        else if (model == Var.TINY_REPORT__WRITE) {
          this.options.isAllowResize = false;  //允许调整大小
          this.options.isAllowDrag = false;     //允许拖动
          this.options.isItemEnable = true;    //是否有效
          this.options.isShowBackArea = true;  //显示背景
          this.options.isShowBorder = true;  //显示边框
        }
        else if (model == Var.TINY_REPORT__TAB) {
          this.options.isAllowResize = false;  //允许调整大小
          this.options.isAllowDrag = false;     //允许拖动
          this.options.isItemEnable = false;    //是否有效
          this.options.isShowBackArea = true;  //显示背景
          this.options.isShowBorder = true;  //显示边框
        }else {
          this.options.isAllowResize = false;  //允许调整大小
          this.options.isAllowDrag = false;     //允许拖动
          this.options.isItemEnable = false;    //是否有效
          this.options.isShowBackArea = false;  //显示背景
          this.options.isShowBorder = false;  //显示边框
        }

        
        if (model == Var.TINY_REPORT__TAB) {
          this.tab_index = 1;
        }
      },
      onCancelAllSelectted(){
        for (let i = 0; i < this.report.items.length; i++) {
          this.report.items[i].selectted = false;
        }
        this.activeItem = undefined;
        this.clickItem = undefined;
      },

      AddItemByType(item_type, x, y) {
        let new_item = {};
        new_item.id = "custom_" + stringRandom();
        new_item.class = item_type;
        this.AddReportItem(new_item, x, y);
      },

      AddReportItem(report_item, x, y) {
  
        let new_id = report_item.id;
        let type_name = report_item.class;
        let friend_name = report_item.friend_name;
        let preset_data = report_item.data;
        let ex_data = report_item.ex_data;
        let def_tab = 1;
        let fontfamily = "宋体";
        let fontweight = 400;
        let fontcolor = "#444";
        let fontsize = 14;
        let align="right";
        let sync_id = "";
        let is_no_print = false;    //不打印
        /*
        let report_item = {
            id:new_id,
            class:field_type,
            friend_name:"",
            //data:element.data,
        };
        */
  
        if(type_name === "image") {
            friend_name = friend_name || "图像";
            this._add_item({id:new_id, class:type_name, friend_name, left:x,top:y,width:100,height:100, isActive:true, zindex:0, selectted:false, data: "", ex_data}); 
        }
        else if(type_name === "rect") {
            this._add_item({id:new_id, class:type_name,friend_name, left:x,top:y,width:100,height:100, radius:0, color:'rgb(238, 0, 0)',isActive:true, zindex:0, selectted:false});
        }
        else if(type_name === "qr-code") {
            this._add_item({id:new_id, class:type_name,friend_name, left:x,top:y,width:100,height:100, isActive:true, zindex:0, selectted:false, data: preset_data, ex_data,sync_id}); 
        }
        else if(type_name === "label-text") {
            friend_name = friend_name || "标签文本";
            this._add_item({id:new_id, class: type_name,friend_name, is_no_print, left:x,top:y,width:60,height:20, align,isActive:true, fontfamily,fontweight,fontcolor, fontsize, zindex:0, selectted:false, data:preset_data, ex_data}); 
        }
        else if(type_name === "label-data") {
            friend_name = friend_name || "标签数据";
            this._add_item({id:new_id, class: type_name,friend_name, is_no_print, left:x,top:y,width:60,height:20, align,isActive:true, fontfamily,fontweight,fontcolor, fontsize, zindex:0, selectted:false, data:preset_data, ex_data, sync_id}); 
        }
        else if(type_name === "ellipse") {
            this._add_item({id:new_id, class: type_name,friend_name, left:x,top:y,width:100,height:100, color:'rgb(238, 0, 0)',isActive:true, zindex:0, selectted:false}); 
        }
        else if(type_name === "input-text") {
            friend_name = friend_name || "单行输入";
            this._add_item({id:new_id, class:type_name,friend_name, is_no_print, tab:def_tab, left:x,top:y,width:100,height:30, fontfamily,fontweight,fontcolor, align, fontsize,isActive:true, zindex:0, selectted:false, data: "", ex_data,sync_id}); 
        }
        else if(type_name === "text-area") {
            friend_name = friend_name || "多行输入";
            this._add_item({id:new_id, class:type_name,friend_name, tab:def_tab, left:x,top:y,width:160,height:50, fontfamily,fontweight,fontcolor, fontsize,isActive:true, zindex:0, selectted:false, data: preset_data, ex_data }); 
        }
        else if(type_name === "rich-text") {
            friend_name = friend_name || "富文本";
            this._add_item({id:new_id, class:type_name,friend_name, tab:def_tab, left:x,top:y,width:260,height:150, isActive:true, zindex:0, selectted:false, data:preset_data + " ", ex_data}); 
        }
        else if(type_name === "select-date") {
            this._add_item({id:new_id, class:type_name,friend_name, is_no_print, tab:def_tab, left:x,top:y,width:202,height:30, fontfamily,fontweight,fontcolor, align, fontsize,isActive:true, zindex:0, selectted:false, data: "", dateformat:"yyyyMMdd", def_now:true, ex_data}); 
        }
        else if(type_name === "select-item") {
            this._add_item({id:new_id, class:type_name, friend_name, is_no_print, tab:def_tab, left:x,top:y,width:160,height:30, fontfamily,fontweight,fontcolor, align, fontsize,isActive:true, zindex:0, selectted:false, multiple:false, data: "", preset_data, ex_data });
        }
        else if(type_name === "select-cascader") {
            this._add_item({id:new_id, class:type_name, friend_name, is_no_print, tab:def_tab, left:x,top:y,width:160,height:30, fontfamily,fontweight,fontcolor, align, fontsize,isActive:true, zindex:0, selectted:false, data: "", showall:true, preset_data, ex_data }); 
        }
        else{
          console.error("尝试增加一个不支持的类型", type_name);
        }
      },

      add(item_str){
        try {
          let item = JSON.parse(item_str);
          this._add_item(item);
        } catch (error) {
          console.log("add  ",error);
        }
      },
      
      _add_item(item){

        item.id = item.id || "custom_" + stringRandom();
        item.left = item.left || 20;
        item.top = item.top || 20;
        

        //增加选择标记
        this.$set(item, "selectted", false);

        //增加焦点标记
        this.$set(item, "isActive", false);

        this.$emit("addItem", item)

        this.report.items.push(item);
      },
      def_items(){

        let def_tab = 1;
        let fontfamily = "宋体";
        let fontweight = 400;
        let backcolor = "#444";
        let fontcolor = "#444";
        let fontsize = 14;
        let align="right";
        let sync_id = "";
        let is_no_print = false;    //不打印

        let def_items = {};
        def_items['image']            = {width:100,height:100, class:"image", friend_name:"图像", is_no_print, data:"", ex_data:""};
        def_items['rect']             = {width:100,height:100, class:"rect", friend_name:"矩形", is_no_print, radius:0, backcolor};
        def_items['ellipse']          = {width:100,height:100, class:"ellipse", friend_name:"椭圆", is_no_print, radius:0, backcolor};
        def_items['qr-code']          = {width:100,height:100, class:"qr-code", friend_name:"二维码", is_no_print, data:"", ex_data:"", sync_id};
        def_items['label-text']       = {width:100,height:30,  class:"label-text", friend_name:"静态标签", is_no_print, data:"", ex_data:"", fontfamily,fontweight,fontcolor, fontsize, sync_id, align};
        def_items['label-data']       = {width:100,height:30,  class:"label-data", friend_name:"数据标签", is_no_print, data:"", ex_data:"", fontfamily,fontweight,fontcolor, fontsize, sync_id, align};
        def_items['input-text']       = {width:100,height:30,  class:"input-text", friend_name:"单行输入", is_no_print, data:"", ex_data:"", fontfamily,fontweight,fontcolor, fontsize, sync_id, tab:def_tab, align};
        def_items['text-area']        = {width:160,height:50,  class:"text-area", friend_name:"多行输入", is_no_print, data:"", ex_data:"", fontfamily,fontweight,fontcolor, fontsize, tab:def_tab};
        def_items['rich-text']        = {width:260,height:160, class:"rich-text", friend_name:"富文本", is_no_print, data:"", ex_data:"", fontfamily,fontweight,fontcolor, fontsize, tab:def_tab};
        def_items['select-date']      = {width:210,height:30,  class:"select-date", friend_name:"选择日期", is_no_print, data:"", ex_data:"", fontfamily,fontweight,fontcolor, fontsize, tab:def_tab, align};
        def_items['select-item']      = {width:160,height:30,  class:"select-item", friend_name:"远择项", is_no_print, data:"", ex_data:"", fontfamily,fontweight,fontcolor, fontsize, tab:def_tab, align, multiple:false};
        def_items['select-cascader']  = {width:160,height:30,  class:"select-cascader", friend_name:"级连选择", is_no_print, data:"", ex_data:"", fontfamily,fontweight,fontcolor, fontsize, tab:def_tab, align};

        return def_items;
      },
      Print(callback){
          let _self = this;
  
          let old_model = _self.paperModel;
          this.SetModel(Var.TINY_REPORT__PREVIEW)
  
          setTimeout(() => {
              html2canvas(_self.$refs.report, {scale: 3,allowTaint: true,taintTest: true,}).then(canvas => {
                let dataURL = canvas.toDataURL("image/png");
                printJS(dataURL, 'image')
  
                _self.SetModel(old_model)
  
                if(callback){
                  callback(dataURL);
                }
              });          
          }, 200);

      },
  
      selectItemsChange(){
        let select_items = [];
        for (let i = 0; i < this.report.items.length; i++) {
          const paper_item = this.report.items[i];
          if(paper_item.selectted) {
            select_items.push(paper_item);
          }
        }
        this.$emit("selectItems", this.report, select_items);
      },
      deleteSelected(){
        let select_item_ids = [];
        for (let i = 0; i < this.report.items.length; i++) {
          const paper_item = this.report.items[i];
          if(paper_item.selectted) {
            select_item_ids.push(paper_item.id);
          }
        }
        this.report.items = this.report.items.filter(item => !select_item_ids.includes(item.id))
        this.$emit("deleteItems", select_item_ids);
      },
  
      //检查选择项改变-并通知外部...
      checkSelecttedChange(newPaper) {
        
        if (this.paperModel !== Var.TINY_REPORT__DESIGN) {
          return;
        }
  
        // 1. 找出当前所有选中项..
        let new_select_items = [];
        for (let i = 0; i < newPaper.items.length; i++) {
          const paper_item = newPaper.items[i];
          if(paper_item.selectted) {
            new_select_items.push(paper_item);
          }
        }
  
        let old_select_items = this.old_select_items;
  
        // 2. 与上次选中相比较，判断选择是否改变. (在new的中找不存在的)
        for (let i = 0; i < new_select_items.length; i++) {
          const new_item = new_select_items[i];
  
          let is_exist = false;
          for (let j = 0; j < old_select_items.length; j++) {
            const old_item = old_select_items[j];
            if(new_item.id === old_item.id) {
              is_exist = true;
              break;
            }
          }
          
          //如果不存在...
          if(is_exist === false) {
            this.$emit("selectchange", new_select_items);
            break;
          }
        }
  
        // 3. 与上次选中相比较，判断选择是否改变.(在old的中找不存在的)
        for (let i = 0; i < old_select_items.length; i++) {
          const old_item = old_select_items[i];
  
          let is_exist = false;
          for (let j = 0; j < new_select_items.length; j++) {
            const new_item = new_select_items[j];
            if(new_item.id === old_item.id) {
              is_exist = true;
              break;
            }
          }
          
          //如果不存在...
          if(is_exist === false) {
            this.$emit("selectchange", new_select_items);
            break;
          }
        }
  
  
        // 4. 保存本次比较，以便下次比较使用...
        this.old_select_items = [];
        for (let i = 0; i < new_select_items.length; i++) {
          const paper_item = new_select_items[i];
          this.old_select_items.push({id:paper_item.id});
        }
  
      },

      getLayout(){
        let report_str = JSON.stringify(this.report);
        return report_str;
      },
      setLayout(layout_str){
  
        try {
          let layout = JSON.parse(layout_str);
          this.report = layout;
        } catch (error) {
          console.error("输入必需为json 当前输入: ", layout_str, "   出错信息:", error);
          this.resetLayout();
        }
      },
      resetLayout(){
        this.report = {paper:{width:640,ratio:1.43,pagenum:1},items:[]};
      },
      onBtnTabClick(report, item){
        if(item.tab != undefined) {
          item.tab = this.tab_index++;
        }
      },
      updateReportItem(new_item){
  
        for (let i = 0; i < this.report.items.length; i++) {
          let tmp_item = this.report.items[i];
          if(tmp_item.id === new_item.id) {
            Object.assign(tmp_item, new_item)
          }
        }
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  
  
  
    .tiny-paper-box {
        padding: 10px;
        background-color: #edeef3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
  
  
  
  .rd-f5 {
      background-color: #fff;
      box-shadow: 0 3px 6px 0 rgba(0,0,0,.3);
  }
  
  
  .tiny-paper {
    padding: 15px;
    position: relative;
  }
  
  
  .tiny-paper-content {
    width: 100%;
    height: 100%;
  
  
    position: relative;
  }
  
  .tiny-paper-border {
    border:1px dashed #cccccc;
  }
  
  
  .tiny-paper-selected-rect {
    position:absolute;
    width: 0px;
    height: 0px;
    background-color: #ccfcccaa;
    z-index: 5000;
  }
  
  
  .report-tab {
    position:absolute;
    min-width: 20px;
    min-height: 20px;
    background-color: #aaf;
    font-size: 9px;
    color: red;
    padding: 2px;
  
    left: -5px;
    top: -5px;
  
    font-weight:400;
  }
  
    input::-webkit-input-placeholder{
      color:#cccccc;
    }
  
  
  </style>
  
  <style>
  
  
  
  .tiny-report-no-select{
  
  /* Chrome all / Safari all /opera15+*/ 
  -webkit-user-select: none;   
  /* Firefox all */  
  -moz-user-select: none;     
  /* IE 10+ */ 
  -ms-user-select: none;       
  /* 通用 */
  user-select: none; 
  
  }
  
  
  
  </style>
  