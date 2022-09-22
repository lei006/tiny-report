<template>
    
    <el-cascader v-if="model==='write' || model=='design' || model=='tab'" size="mini" 
          v-model="inputData" 
          :disabled="!options.isItemEnable"  
          :props="defaultProps"
          clearable
          :show-all-levels="showAll"
          :options="select_options" 
          @change="handleChange">
    </el-cascader>
    <div v-else>{{inputData | selectDataFilter}}</div>

</template>

<script>

export default {
  name: 'TinyItemSelectCascader',
  components:{},
  model: {
      prop: "itemData",
      event: "eventItemData"
  },
  props: {
      itemData: {
          type: String
      },
      options:{
        type: Object,
        default: ()=>{
          return {
            isAllowResize:false,  //允许调整大小
            isAllowDrag:true,     //允许拖动
            isItemEnable:true,    //是否有效
            isShowBackArea:true,  //显示背景
          }
        }
      },
      model:{
        type:String
      },
      zindex:{
        type:Number,
        default:0,
      },
      preset_data:{
        type:String,
        default:"",
      },
      showAll:{
        type:Boolean,
        default:true,
      },
  },
  data () {
    return {
      inputData:"",
      defaultProps: {
          children: 'children',
          label: 'label',
          value: 'label',
          expandTrigger: 'hover'
      },
      selectOptions: [],
      select_options: [{
          value: 'zhinan',
          label: '指南',
          disabled: true,
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],


    }
  },

  watch:{
    preset_data:{
      handler(newVal, oldVal){

        try {
          this.selectOptions = JSON.parse(newVal);
        } catch (error) {
          this.selectOptions = [];
        }
        console.log("-->",newVal, this.selectOptions);
      },
      deep:true,
      immediate:true,
    },

    inputData:{
      handler(newVal, oldVal){
        let val_str = JSON.stringify(newVal);
        this.$emit('eventItemData', val_str);
      },
      deep:true,
      immediate:false,
    },
    itemData:{
      handler(newVal, oldVal){

        try {
          let val_array = JSON.parse(newVal);
          this.inputData = val_array;
        } catch (error) {
          this.inputData = [];
        }
      },
      deep:true,
      immediate:true,
    },
    


  },
  filters: {
    selectDataFilter(data) {
      if (data.constructor == Array) {
        return data.join(",")
      }
      return data;
    },

  },
  methods:{
    handleChange(value) {
        console.log(value);
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-report-label{
  width: 100%;
  height: 100%;
  margin: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.el-cascader {
  width:100%;
}


</style>
