<template>
    <div class="block">
        <el-button type="primary" @click="onBtnAddRoot">增加根节点</el-button>
        <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="defaultProps"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
            <el-button
                type="text"
                size="mini"
                @click="() => append(data)">
                Append
            </el-button>
            <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)">
                Delete
            </el-button>
            </span>
        </span>
        </el-tree>
    </div>

</template>

<script>
  let id = 1000;

export default {
    name: 'tinyTreeEdit',
    model: {
        prop: "reportItem",
        event: "eventReportItem"
    },
    props:{
        reportItem:{
            type: Array
        },
    },
    data(){
        return {
            data: this.reportItem,
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        append(data) {
            const newChild = { id: id++, label: 'testtest' + id};
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        onBtnAddRoot(){
            const newChild = { id: id++, label: '根节点' + id};
            this.data.push(newChild);
        },
    },    
}

</script>
<style scoped>

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }

</style>
