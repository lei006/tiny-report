<template>
  <div class="attr-list">
      <template>
      <div class="attr-title tiny-report-no-select">报告模板</div>
      <ul>
        <li v-if="paper.width !== undefined"  class="attr-item">
            <div class="label">宽度:</div>
            <div class="item"><el-input-number size="mini" v-model="paper.width"></el-input-number></div>
        </li>
        <li v-if="paper.height !== undefined"  class="attr-item">
            <div class="label">高度:</div>
            <div class="item"><el-input-number size="mini" v-model="paper.height"></el-input-number></div>
        </li>
      </ul>
      </template>

      <template>
      <div class="attr-title tiny-report-no-select">选中项属性</div>
      <ul>
        <li v-if="properties['id']" class="attr-item">
            <div class="label">id:</div>
            <div class="item"><el-input size="mini" v-model="properties['id']"></el-input></div>
        </li>
        <li v-if="properties['class']" class="attr-item">
            <div class="label">类型:</div>
            <div class="item"><el-input size="mini" v-model="properties['class']"></el-input></div>
        </li>
        <li v-if="properties['friend_name']" class="attr-item">
            <div class="label">别称:</div>
            <div class="item"><el-input size="mini" v-model="properties['friend_name']"></el-input></div>
        </li>
        <li v-if="properties['left']!==undefined" class="attr-item">
            <div class="label">距左:</div>
            <div class="item"><el-input-number size="mini" v-model="properties['left']"></el-input-number></div>
        </li>
        <li v-if="properties['top']!==undefined" class="attr-item">
            <div class="label">距顶:</div>
            <div class="item"><el-input-number size="mini" v-model="properties['top']"></el-input-number></div>
        </li>
        <li v-if="properties['width']!==undefined" class="attr-item">
            <div class="label">宽度:</div>
            <div class="item"><el-input-number size="mini" v-model="properties['width']"></el-input-number></div>
        </li>
        <li v-if="properties['height']!==undefined" class="attr-item">
            <div class="label">高度:</div>
            <div class="item"><el-input-number size="mini" v-model="properties['height']"></el-input-number></div>
        </li>
        <li v-if="properties['tab']!==undefined" class="attr-item">
            <div class="label">Tab:</div>
            <div class="item"><el-input-number size="mini" v-model="properties['tab']"></el-input-number></div>
        </li>

        <li v-if="properties['radius'] !== undefined" class="attr-item">
            <div class="label">半径:</div>
            <div class="item"><el-input-number size="mini" v-model="properties['radius']"></el-input-number></div>
        </li>

        <li v-if="properties['fontsize']" class="attr-item">
            <div class="label">字号:</div>
            <div class="item"><el-input-number size="mini" v-model="properties['fontsize']"></el-input-number></div>
        </li>
        <li v-if="properties['fontfamily']" class="attr-item">
            <div class="label">字体:</div>
            <div class="item">
              <el-select size="mini" filterable allow-create default-first-option v-model="properties['fontfamily']" placeholder="请选择">
                <el-option v-for="item in fontfamily" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
        </li>
        <li v-if="properties['fontweight']" class="attr-item">
            <div class="label">粗细:</div>
            <div class="item">
              <el-select size="mini" filterable allow-create default-first-option v-model="properties['fontweight']" placeholder="请选择">
                <el-option v-for="item in fontweight" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
        </li>

        <li v-if="properties['linewidth']" class="attr-item">
            <div class="label">粗细:</div>
            <div class="item">
              <el-select size="mini" filterable allow-create default-first-option v-model="properties['linewidth']" placeholder="请选择">
                <el-option v-for="item in linewidths" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
        </li>

        
        <li v-if="properties['def_now'] !== undefined" class="attr-item">
            <div class="label">默认今天:</div>
            <div class="item">
              <el-checkbox size="mini" v-model="properties['def_now']"></el-checkbox>
            </div>
        </li>

        <li v-if="properties['multiple'] !== undefined" class="attr-item">
            <div class="label">允许多选:</div>
            <div class="item">
              <el-checkbox size="mini" v-model="properties['multiple']"></el-checkbox>
            </div>
        </li>




        <li v-if="properties['showall'] !== undefined" class="attr-item">
            <div class="label">显示所有:</div>
            <div class="item">
              <el-checkbox size="mini" v-model="properties['showall']"></el-checkbox>
            </div>
        </li>
        
        <li v-if="properties['dateformat'] !== undefined" class="attr-item">
            <div class="label">时间格式:</div>
            <div class="item">
              <el-select size="mini" filterable allow-create default-first-option v-model="properties['dateformat']" placeholder="请选择">
                <el-option v-for="item in dateformats" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
        </li>

        <li v-if="properties['sync_id'] !== undefined" class="attr-item">
            <div class="label">同步ID:</div>
            <div class="item"><el-input size="mini" v-model="properties['sync_id']"></el-input></div>
        </li>

        <!--数据-->
        <li v-if="properties['class'] == 'label_text'" class="attr-item">
            <div class="label">数据:</div>
            <div class="item"><el-input size="mini" v-model="properties['data']"></el-input></div>
        </li>
        <li v-if="properties['class'] == 'input-text'" class="attr-item">
            <div class="label">数据:</div>
            <div class="item"><el-input size="mini" v-model="properties['data']"></el-input></div>
        </li>
        <li v-if="properties['class'] == 'select-date'" class="attr-item">
            <div class="label">数据:</div>
            <div class="item"><el-input size="mini" v-model="properties['data']"></el-input></div>
        </li>
        <li v-if="properties['class'] == 'qr_code'" class="attr-item">
            <div class="label">数据:</div>
            <div class="item"><el-input size="mini" v-model="properties['data']"></el-input></div>
        </li>
        
        <li v-if="properties['class'] == 'image'" class="attr-item">
            <div class="label">图像:</div>
            <div class="item">
                <input class="tiny-report--select-file-input" type="file" name="" id="" @change="onImageselect(properties, $event)" >
            </div>
        </li>



        <!--扩展数据-->
        <li v-if="properties['class'] == 'select-item'" class="attr-item">
            <div class="label">预置数据:</div>
            <div class="item"><el-input size="mini" v-model="properties['preset_data']"></el-input></div>
        </li>
        <li v-if="properties['class'] == 'select-cascader'" class="attr-item">
            <div class="label">预置数据:</div>
            <div class="item">  <el-button size="mini" @click="onBtnTreeEdit(properties['preset_data'])">点我编辑</el-button></div>
        </li>


        <!--扩展数据-->
        <li v-if="properties['class'] == 'input-text'" class="attr-item">
            <div class="label">扩展数据:</div>
            <div class="item"><el-input size="mini" v-model="properties['ex_data']"></el-input></div>
        </li>
        <li v-if="properties['class'] == 'image'" class="attr-item">
            <div class="label">扩展数据:</div>
            <div class="item"><el-input size="mini" v-model="properties['ex_data']"></el-input></div>
        </li>





        <li v-if="properties['color'] !== undefined" class="attr-item">
            <div class="label">显示颜色:</div>
            <div class="item">  <el-color-picker size="mini" v-model="properties['color']"></el-color-picker></div>
        </li>
        <li v-if="properties['fontcolor'] !== undefined" class="attr-item">
            <div class="label">字体颜色:</div>
            <div class="item">  <el-color-picker size="mini" v-model="properties['fontcolor']"></el-color-picker></div>
        </li>

        <li v-if="properties['backgroundcolor'] !== undefined" class="attr-item">
            <div class="label">背景:</div>
            <div class="item">  <el-color-picker size="mini" v-model="properties['backgroundcolor']"></el-color-picker></div>
        </li>

        <li v-for="(item, key) of properties" :key="key" class="attr-item">

          <!--单选-->
          <template v-if="key === 'select'">
            <div class="label">选项条目:</div>
            <div class="item">
              <el-select size="mini" v-model="properties[key].data" filterable allow-create default-first-option placeholder="请选择" @change="onSelectChange(properties[key], $event)">
                <el-option v-for="item in properties[key].items" :key="key + '--' + item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </template>

          <template v-if="key === 'backgroundcolor'">
            <div class="label">背景颜色:</div>
            <div class="item">  <el-color-picker size="mini" v-model="properties[key]"></el-color-picker></div>
          </template>
          
          <template v-if="key === 'align'">
            <div class="label">对齐:</div>
            <div class="item"> 
              <el-select size="mini" v-model="properties[key]" style="width:130px;">
                  <el-option value="left" label="靠左" key="left">靠左</el-option>
                  <el-option value="right" label="靠右" key="right">靠右</el-option>
                  <el-option value="center" label="居中" key="center">居中</el-option>
                  <el-option value="justify" label="分散" key="justify">分散</el-option>
              </el-select>
            </div>
          </template>
          <template v-if="key === 'image'">
            <div class="label">图像:</div>
            <div class="item">
                <input class="tiny-report--select-file-input" type="file" name="" id="" @change="onImageselect(properties[key], $event)" >
            </div>
          </template>
        </li>
      </ul>
      </template>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="550px" :before-close="handleClose">
      <div style="height:320px; overflow: auto;">
        <TinyTreeEdit v-model="editTreeData"></TinyTreeEdit>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onBtnEditTreeOK">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>



<script>

import TinyTreeEdit from './TinyTreeEdit.vue'


export default {
    name: 'TinyProperties',
    components:{TinyTreeEdit},
    data() {
      return {
        dialogVisible:false,
        editTreeData:[],
        activeNames: ['1'],
        paper:{
        },
        item:{

        },
        properties:{
          
        },
        fontfamily:["宋体","黑体","微软雅黑"],
        fontweight:[200,400,500,600,800],
        linewidths:[1,2,3],
        dateformats:["yyyy年MM月dd日","yyyy-MM-dd","yyyyMMdd"]
      };
    },
    watch:{
      paper:{
        handler(newVal, oldVal){
          //console.log(newVal.width)
        },
        deep:true,
        immediate:true,
      },
      properties:{
        handler(newVal, oldVal){
          this.$emit("propertyChange", newVal)
        },
        deep:true,
        immediate:false,
      },


    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      onSelectChange(select, ev){
        select.items.push(ev);
      },
      onImageselect(properties, ev) {
        var reader = new FileReader();
        reader.onload = function(evt){
          properties["data"] = evt.target.result;
        }
        reader.readAsDataURL(ev.target.files[0]);
      },
      onChange(){

      },

      setItem(report, item){

        if(item) {
          let item_clone = JSON.parse(JSON.stringify(item))
          this.properties = item_clone;
        }else{
          this.properties = {};
        }

        this.paper = report.paper;
      },
      onEventFontfamilyChange(val){
        console.log('onEventFontfamilyChange',val);
      },

      handleClose(){
        this.dialogVisible = false;

        this.editTreeEdit = JSON.stringify(this.editTreeData);
      },
      onBtnEditTreeOK(){
        let edit_str = JSON.stringify(this.editTreeData);


        this.properties['preset_data'] = edit_str;

        this.dialogVisible = false;
      },
      onBtnTreeEdit(preset_data){
        if(preset_data === undefined) {
          this.editTreeData = [];
        }else{
          this.editTreeData = JSON.parse(preset_data);
        }
        
        this.dialogVisible = true;
      },

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.attr-list{
    padding: 0px;
    width: 100%;
    border:0px solid #cccccc;
    overflow:auto;
    background-color: #fff;
    
    display: flex;
    flex-direction: column;

}

.attr-list .label {
  font-size: 0.8em;
}



.attr-title {
    box-sizing: border-box;
    padding: 8px;
    font-weight: 400;
    font-size: 14px;
    background: #eee;
    line-height: 14px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.attr-list ul {
    position: relative;
    overflow: hidden;
    padding: 0 0px 0px 0;
    margin: 0;
}


.attr-item{
  display: flex;
  margin: 2px;
}

.attr-item .label {
  width: 90px;
  height: 28px;
  line-height: 28px;
  padding-left: 15px;
}

.attr-item .item {
  flex:1;
  max-width:200px;
}


.tiny-report--select-file-input{
  width: 100px;
  
}



input {
    overflow: hidden;
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: -internal-light-dark(black, white);
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: textfield;
    background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
}








</style>
