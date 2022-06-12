<template>
  <div class="attr-list">
      <div class="attr-title tiny-report-no-select">报告模板</div>
      <ul>
        <li v-for="(item, key) of paper" :key="key" class="attr-item">

          <template v-if="key === 'title'">
            <div class="label">名称:</div>
            <div class="item"><el-input size="mini" v-model="items[key]"></el-input></div>
          </template>
          <template v-if="key === 'width'">
            <div class="label">宽度:</div>
            <div class="item"><el-input-number size="mini" v-model="paper[key]"></el-input-number></div>
          </template>
          <template v-if="key === 'height'">
            <div class="label">高度:</div>
            <div class="item"><el-input-number size="mini" v-model="paper[key]"></el-input-number></div>
          </template>
          <template v-if="key === 'fontsize'">
            <div class="label">字体:</div>
            <div class="item"><el-input-number size="mini" v-model="paper[key]"></el-input-number></div>
          </template>
          
        </li>
      </ul>

      <div class="attr-title tiny-report-no-select">选中项属性</div>
      <ul>
        <li v-for="(item, key) of items" :key="key" class="attr-item">
          <template v-if="key === 'id'">
            <div class="label">ID:</div>
            <div class="item"><el-input size="mini" v-model="items[key]"></el-input></div>
          </template>
          <template v-if="key === 'class'">
            <div class="label">类型:</div>
            <div class="item"><el-input size="mini" v-model="items[key]"></el-input></div>
          </template>
          <template v-if="key === 'nickname'">
            <div class="label">别称:</div>
            <div class="item"><el-input size="mini" v-model="items[key]"></el-input></div>
          </template>
          <template v-if="key === 'width'">
            <div class="label">宽度:</div>
            <div class="item"><el-input-number size="mini" v-model="items[key]"></el-input-number></div>
          </template>
          <template v-if="key === 'height'">
            <div class="label">高度:</div>
            <div class="item"><el-input-number size="mini" v-model="items[key]"></el-input-number></div>
          </template>
          <template v-if="key === 'fontsize'">
            <div class="label">字体:</div>
            <div class="item"><el-input-number size="mini" v-model="items[key]"></el-input-number></div>
          </template>
          <template v-if="key === 'data'">
            <div class="label">数据:</div>
            <div class="item"><el-input size="mini" v-model="items[key]"></el-input></div>
          </template>
          
          <!--单选-->
          <template v-if="key === 'select'">
            <div class="label">选项条目:</div>
            <div class="item">
              <el-select size="mini" v-model="items[key].data" filterable allow-create default-first-option placeholder="请选择" @change="onSelectChange(items[key], $event)">
                <el-option v-for="item in items[key].items" :key="key + '--' + item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </template>


          <template v-if="key === 'color'">
            <div class="label">字体颜色:</div>
            <div class="item">  <el-color-picker size="mini" v-model="items[key]"></el-color-picker></div>
          </template>

          <template v-if="key === 'backgroundcolor'">
            <div class="label">背景颜色:</div>
            <div class="item">  <el-color-picker size="mini" v-model="items[key]"></el-color-picker></div>
          </template>
          
          <template v-if="key === 'align'">
            <div class="label">对齐:</div>
            <div class="item"> 
              <el-select size="mini" v-model="items[key]" style="width:130px;">
                  <el-option value="left" label="靠左" key="left">靠左</el-option>
                  <el-option value="right" label="靠右" key="right">靠右</el-option>
                  <el-option value="center" label="居中" key="center">居中</el-option>
                  <el-option value="justify" label="分散" key="justify">分散</el-option>
              </el-select>
            </div>
          </template>
          
        </li>
      </ul>

  </div>
</template>

<script>
export default {
    name: 'TinyProperties',
    data() {
      return {
        activeNames: ['1'],
        paper:{
          width: 1500,
          height: 324,
          fontsize:14,
          title:"这是TinyReport",
        },
        items:{
          id:"",
          class:"",
          nickname:"助记名",
          left:0,
          top:0,
          width:100,
          height:200,
          data:200,
          items:[],
          select:{
            data:"",
            items:[]
          },
          color:"",
          backgroundcolor:"rgba(238, 0, 0, 1)",
          fontfamily:"宋体",
          fontsize:16,
          fontweight:200,
          align:"",
        }
      };
    },

    methods: {
      handleChange(val) {
        console.log(val);
      },
      onSelectChange(select, ev){
        select.items.push(ev);
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

    display: flex;
    flex-direction: column;

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
  width: 95px;
  height: 28px;
  line-height: 28px;
  padding-left: 15px;
}

.attr-item .item {
  flex:1,
}


</style>
