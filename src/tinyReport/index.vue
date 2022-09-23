<template>
    <div class="tiny-paper-box">
      <div class="tiny-paper rd-f5" ref="report" :style="{'width':report.paper.width + 'px','height':report.paper.height + 'px', fontSize:report.paper.fontsize + 'px'}">
        <div class="tiny-paper-content input-text" :class="{'tiny-paper-border':(model!=='preview')}"  @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @dragover="onDragOver" @drop="onDrag">
              <report-base-item
                  v-for="(item, key) in report.items"
                  :key='key'
  
                  :left='item.left' 
                  :top='item.top' 
                  :width='item.width'  
                  :height='item.height' 
                  :selectted="item.selectted"
  
                  @dragging="dragging(report, item, $event)" 
                  @dragstop="dragstop(report, item, $event)"
                  @mousedown="onItemMouseDown(report, item, $event)"
                  @mouseup="onItemMouseUp(report, item, $event)"
                  @resize="onItemResize(report,item,$event)"
  
                  :model="model"
                  :options="options"
                  :fontfamily="item.fontfamily + ''"
                  :fontsize="item.fontsize"
                  :fontcolor="item.fontcolor"
                  :backgroundcolor="item.backgroundcolor"
                  :fontweight="item.fontweight  + ''"
                > 
                        <TinyLabelText :options="options" :model="model" v-if="item.class == 'label_text'" :align="report.items[key].align" :label="report.items[key].data"/>
                        <TinyLabelData :options="options" :model="model" v-if="item.class == 'label_data'" :align="report.items[key].align" :label="report.items[key].data"/>
                        <TinyInputText :options="options" :model="model" :tabindex="item.tab + ''"  v-if="item.class == 'input-text'" v-model="report.items[key].data" @eventItemData="eventInputTextChange($event, report.items[key])"/>
                        <TinyImage :options="options" :model="model" v-if="item.class == 'image'" v-model="report.items[key].data"/>
                        <TinyQrcode :options="options" :model="model" v-if="item.class == 'qr_code'" v-model="report.items[key].data" :color="report.items[key].color"/>
                        <TinyRect :options="options" :model="model" v-if="item.class == 'rect'"  :radius="report.items[key].radius" :color="report.items[key].color"/>
                        <TinyEllipse :options="options" :model="model" v-if="item.class == 'ellipse'" :color="report.items[key].color"/>
                        <TinyTextarea :options="options" :model="model" :tabindex="item.tab + ''" v-if="item.class == 'textarea'" v-model="report.items[key].data"/>
                        <TinyRich :options="options" :model="model" :tabindex="item.tab + ''" v-if="item.class == 'rich-text'" v-model="report.items[key].data"/>
                        <TinySelectDate :options="options" :model="model" :tabindex="item.tab + ''" v-if="item.class == 'select-date'" :def_now="item.def_now" :format="item.dateformat" v-model="report.items[key].data"/>
                        <TinySelectItem :options="options" :model="model" :tabindex="item.tab + ''" :multiple="item.multiple" v-if="item.class == 'select-item'" v-model="report.items[key].data" :preset_data="item.preset_data" />
                        <TinySelectCascader :options="options" :model="model" :tabindex="item.tab + ''" :showAll="item.showall" v-if="item.class == 'select-cascader'" v-model="report.items[key].data" :preset_data="item.preset_data" />
  
                      <div v-if="model==='tab' && item.tab" class="report-tab" @click="onBtnTabClick(report, item)">{{item.tab}}</div>
                      <div v-if="model==='design' && item.friend_name && friendname===true " class="report-tab">{{item.friend_name}}</div>
  
              </report-base-item>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
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
    name: 'YmTinyReport',
    components:{ReportBaseItem, TinyRich, TinyImage, TinyQrcode,TinyEllipse, TinySelectItem, TinyRect, TinyLabelText, TinyLabelData, TinyInputText, TinyTextarea, TinySelectDate, TinySelectCascader},
    props: {
        readOnly: {
            type: Boolean,
            default: function() {
                return false;
            },
        },
        //设计
        design: {
            type: Boolean,
            default: function() {
                return false;
            },
        },
        model:{
          type: String,
          default: function(){
            return "write"
          }
        },
        friendname:{
          type: Boolean,
          default: function(){
            return true
          }
        },
    },
    data () {
      return {
        report:{
          paper:{
            width:640,
            height:720,
          },
          items:[]
        },
        data_items:{},
        tab_index:1,
        options:{
          isAllowResize:true, 
          isAllowDrag:true,
          isItemEnable:false,
          isShowBackArea:true,
          isShowBorder:true,
          topItemId:"",
          isTest:false,
        },
        activeItem:null,
        hitItem:false,    //鼠标点击中了一个item
        // 同步拖动....
        drag:{
          sync: false,
          draggingId: null,
          prevOffsetX: -1,
          prevOffsetY: -1,
        },
        mousedown:{offsetX:0,offsetY:0},
        old_select_items:[],
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
                //_self.$emit('reportChange', JSON.stringify(newVal));
                _self.report_change_timer = undefined
            }, 1500);
        },
        deep:true,
        immediate:false,
      },
      activeItem:{
        handler(newVal, oldVal){
          this.$emit('activeItemChange', this.report, newVal)        
        },
        deep:true,
        immediate:false,
      },
      model:{
        handler(newVal){
          this.SetModel(newVal);
        },
        deep:true,
        immediate:false,
      }
    },
  
    mounted(){
      /*
      this.AddItemByType("input", 150, 30);
      this.AddItemByType("label", 120, 30);
      this.AddItemByType("image", 180, 80);
      this.AddItemByType("ellipse", 130, 40);
      this.AddItemByType("rect", 110, 20);
      */
      //this.AddItemByType("rich-text", 130, 40);
  
  
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
        if(this.model === Var.TINY_REPORT__DESIGN) {
  
          //if( (ev.ctrlKey == true) || (ev.shiftKey == true) )
          {
            this.options.topItemId = item.id;
            item.selectted = true;
            this.activeItem = item;
  
            this.selectItemsChange();
          }
        }
      },
      onItemMouseUp(report, item){
        //console.log("0000", item.id, item.selectted);
        //item.selectted = !item.selectted;
        //console.log("11111", item.id, item.selectted);
      },
      onItemResize(report,item,ev){
        if(this.model === Var.TINY_REPORT__DESIGN) {
          item.left = ev.left;
          item.top = ev.top;
          item.width = ev.width;
          item.height = ev.height;
        }
      },
      
      onMouseDown(ev){
        this.mousedown.offsetX = ev.offsetX;
        this.mousedown.offsetY = ev.offsetY;
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
  
        var src = ev.dataTransfer.getData("report_item");//获取src
        if(!src || src=== "") {
          return;
        }
  
  
        let new_item = JSON.parse(src)
        console.log("onDrag", new_item);
        ev.preventDefault();
        this.AddItemByType(new_item, ev.offsetX, ev.offsetY);
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
  
      SetSize(width, height){
        this.report.paper.width = width;
        this.report.paper.height = height;
      },
      SetModel(model){
  
        if (model == Var.TINY_REPORT__DESIGN) {
          this.options.isAllowResize = true;
          this.options.isItemEnable = false;
          this.options.isAllowDrag = true;
          this.options.isShowBackArea = true;
          this.options.isShowBorder = false;
  
        }
  
        if (model == Var.TINY_REPORT__PREVIEW) {
          this.options.isItemEnable = false;
          this.options.isAllowResize = false;
          this.options.isAllowDrag = false;
          this.options.isShowBackArea = false;
          this.options.isShowBorder = false;
        }
  
        if (model == Var.TINY_REPORT__WRITE) {
          this.options.isAllowResize = false;
          this.options.isItemEnable = true;
          this.options.isAllowDrag = false;
          this.options.isShowBackArea = true;
        }
  
        if (model == Var.TINY_REPORT__TAB) {
          this.options.isAllowResize = false;
          this.options.isItemEnable = false;
          this.options.isAllowDrag = false;
          this.options.isShowBackArea = true;
          this.options.isShowBorder = true;
  
          this.tab_index = 1;
        }
      },
      onCancelAllSelectted(){
        for (let i = 0; i < this.report.items.length; i++) {
          this.report.items[i].selectted = false;
        }
        this.activeItem = undefined;
      },
      AddItemByType(report_item, x, y) {
  
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
        /*
        let report_item = {
            id:new_id,
            class:field_type,
            friend_name:"",
            //data:element.data,
        };
        */
  
        if(type_name === "image") {
            this.addItem({id:new_id, class:type_name, friend_name, left:x,top:y,width:100,height:100, isActive:true, zindex:0, selectted:false, data: "", ex_data}); 
        }
        else if(type_name === "rect") {
            this.addItem({id:new_id, class:type_name,friend_name, left:x,top:y,width:100,height:100, radius:0, color:'rgb(238, 0, 0)',isActive:true, zindex:0, selectted:false});
        }
        else if(type_name === "qr_code") {
            this.addItem({id:new_id, class:type_name,friend_name, left:x,top:y,width:100,height:100, isActive:true, zindex:0, selectted:false, data: preset_data, ex_data,sync_id}); 
        }
        else if(type_name === "label_text") {
            this.addItem({id:new_id, class: type_name,friend_name, left:x,top:y,width:60,height:20, align,isActive:true, fontfamily,fontweight,fontcolor, fontsize, zindex:0, selectted:false, data:preset_data, ex_data}); 
        }
        else if(type_name === "label_data") {
            this.addItem({id:new_id, class: type_name,friend_name, left:x,top:y,width:60,height:20, align,isActive:true, fontfamily,fontweight,fontcolor, fontsize, zindex:0, selectted:false, data:preset_data, ex_data, sync_id}); 
        }
        else if(type_name === "ellipse") {
            this.addItem({id:new_id, class: type_name,friend_name, left:x,top:y,width:100,height:100, color:'rgb(238, 0, 0)',isActive:true, zindex:0, selectted:false}); 
        }
        else if(type_name === "input-text") {
            this.addItem({id:new_id, class:type_name,friend_name, tab:def_tab, left:x,top:y,width:100,height:30, fontfamily,fontweight,fontcolor, align, fontsize,isActive:true, zindex:0, selectted:false, data: preset_data, ex_data,sync_id}); 
        }
        else if(type_name === "textarea") {
            this.addItem({id:new_id, class:type_name,friend_name, tab:def_tab, left:x,top:y,width:160,height:50, fontfamily,fontweight,fontcolor, fontsize,isActive:true, zindex:0, selectted:false, data: preset_data, ex_data }); 
        }
        else if(type_name === "rich-text") {
            this.addItem({id:new_id, class:type_name,friend_name, tab:def_tab, left:x,top:y,width:260,height:150, isActive:true, zindex:0, selectted:false, data:preset_data + " ", ex_data}); 
        }
        else if(type_name === "select-date") {
            this.addItem({id:new_id, class:type_name,friend_name, tab:def_tab, left:x,top:y,width:202,height:30, fontfamily,fontweight,fontcolor, align, fontsize,isActive:true, zindex:0, selectted:false, data: "", dateformat:"yyyyMMdd", def_now:true, ex_data}); 
        }
        else if(type_name === "select-item") {
            this.addItem({id:new_id, class:type_name, friend_name, tab:def_tab, left:x,top:y,width:160,height:30, fontfamily,fontweight,fontcolor, align, fontsize,isActive:true, zindex:0, selectted:false, multiple:false, data: "", preset_data, ex_data });
        }
        else if(type_name === "select-cascader") {
            this.addItem({id:new_id, class:type_name, friend_name, tab:def_tab, left:x,top:y,width:160,height:30, fontfamily,fontweight,fontcolor, align, fontsize,isActive:true, zindex:0, selectted:false, data: "", showall:true, preset_data, ex_data }); 
        }
        else{
          console.error("尝试增加一个不支持的类型", type_name);
        }
      },
      addItem(item){
        this.report.items.push(item);
        this.layoutChange(this.report);
      },
  
      Print(callback){
          let _self = this;
  
          let old_model = _self.model;
          _self.model = Var.TINY_REPORT__PREVIEW;
  
          setTimeout(() => {
              html2canvas(_self.$refs.report, {scale: 3,allowTaint: true,taintTest: true,}).then(canvas => {
                let dataURL = canvas.toDataURL("image/png");
                printJS(dataURL, 'image')
  
                _self.model = old_model;
  
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
        let select_items = [];
        for (let i = 0; i < this.report.items.length; i++) {
          const paper_item = this.report.items[i];
          if(paper_item.selectted) {
            select_items.push(paper_item.id);
          }
        }
        this.report.items = this.report.items.filter(item => !select_items.includes(item.id))
        this.layoutChange(this.report);
      },
  
      //检查选择项改变-并通知外部...
      checkSelecttedChange(newPaper) {
        
        if (this.model !== Var.TINY_REPORT__DESIGN) {
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
      Test(){
        this.options.isTest = !this.options.isTest;
      },
      getLayout(){
        let report_str = JSON.stringify(this.report);
        return report_str;
      },
      setLayout(layout_str){
  
        try {
          let layout = JSON.parse(layout_str);
          this.report = {};
          this.report = layout;
          console.log("this.report==>", this.report);
          this.layoutChange(this.report);
        } catch (error) {
          console.error(error);
        }
  
  
      },
      resetLayout(){
        this.report = {paper:{width:800,height:600,},items:[]};
        this.layoutChange(this.report);
      },
      layoutChange(report){
        this.$emit("layoutChange", report)
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
  