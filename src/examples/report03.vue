<template>
  <div class="report-box">
    <div class="left">
      <div class="report-ev-item">
        <div class="title">控件</div>
        <div class="data">
          <el-row class="components-list">
            <ul>
              <li v-for="(item, index) in report_items" class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,item)" @click="onClickItem(item)"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>{{item.friend_name}}</span></a></li>
            </ul>
          </el-row>
          <el-input type="textarea" size="mini" :rows="4" placeholder="请输入内容" v-model="item_data"> </el-input>
          <el-button size="tiny">增加</el-button>
        </div>
      </div>
      <div class="report-ev-item">
        <div class="title">回调:焦点</div>
        <div class="data">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="active_item"> </el-input>
        </div>
      </div>
      <div class="report-ev-item">
        <div class="title">回调:点击</div>
        <div class="data">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="click_item"> </el-input>
        </div>
      </div>
      <div class="report-ev-item">
        <div class="title">回调:删除</div>
        <div class="data">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="delete_items"> </el-input>
        </div>
      </div>
      <div class="report-ev-item">
        <div class="title">属性</div>
        <div class="data">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"> </el-input>
        </div>
      </div>


    </div>
    <div class="right">
      <YcTinyReport ref="tinyReport"
          @activeItem="onReportActiveItemChange"
          @clickItem="onReportClickItemChange"
          @reportChange="onEventLayoutChange"
          @drag="onDrag"
          @deleteItems="onReportDeleteItems"
          >
      </YcTinyReport>
    </div>

  </div>
</template>

<script>

export default {
    data(){
      return {
        initData: 'hello 你好',
        textarea:"111111111",
        radio4:"",
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        report_items:{},
        item_data:"",
        active_item:"",
        click_item:"",
        delete_items:"",

      }
    },
    mounted(){
      this.report_items = this.$refs.tinyReport.def_items();
      console.log("tiny-report", this.report_items);
    },
    methods:{
      onReportClickItemChange(item){
        this.click_item = JSON.stringify(item);
      },
      onReportActiveItemChange(item){
        this.active_item = JSON.stringify(item);
      },
      onEventLayoutChange(data){
        console.log("onEventLayoutChange", data);
      },
      onDrag(event){
        var src = event.dataTransfer.getData("tiny-report-drag");//获取src
        let tmp = JSON.parse(src);
        this.$set(tmp, "left", event.offsetX);
        this.$set(tmp, "top", event.offsetY);
        this.$refs.tinyReport.add(JSON.stringify(tmp));
      },
      onReportActive(data){
        this.active_item = data;
      },
      onReportDeleteItems(data){
        this.delete_items = JSON.stringify(data);
      },
      onClickItem(item){
        console.log("add ", item);

        this.item_data = JSON.stringify(item);

      },
      onDragStart(event, item){

        event.dataTransfer.setData("tiny-report-drag",JSON.stringify(item) );//存储图片的src


      },
    }
}
</script>

<style scoped>

.report-box {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
}


.report-box .left{
  width: 650px;
  height:100%;
  padding: 20px;
}

.report-box .right{
  flex: 1;
  height:100%;
  overflow: auto;
}



.report-ev-item {
  width: 100%;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
}

.report-ev-item .title{
  width: 90px;
}
.report-ev-item .data{
  flex: 1;
}




.components-list ul {
  position: relative;
  overflow: hidden;
  padding: 0 0px 0px 0;
  margin: 0;    
}


.components-list .form-edit-widget-label {
  font-size: 13px;
  display: block;
  width: 94px;
  line-height: 24px;
  position: relative;
  float: left;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 2px;
  color: #333;
  border: 1px solid #f4f6fc;
}


.components-list .form-edit-widget-label>a {
  display: block;
  cursor: move;
  background: #f4f6fc;
  border: 1px solid #f4f6fc;
}
.components-list .form-edit-widget-label a {
  color: #333;
  display: flex;
  align-items: center;
}
.components-list .form-edit-widget-label span {
  height: 100%;
}


.components-list .form-edit-widget-label:hover a {
  color: #409eff;
}


.components-list .form-edit-widget-label:hover {
  color: #409eff;
  border: 1px dashed #409eff;
}

.components-list .form-edit-widget-label>a .icon {
  margin-right: 6px;
  margin-left: 8px;
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
}




</style>
