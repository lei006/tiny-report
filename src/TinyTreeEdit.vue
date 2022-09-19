<template>

    <div class="block">
        <p>使用 scoped slot</p>
        <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
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
        prop: "treeData",
        event: "eventTreeData"
    },
    props:{
        treeData:{
            type: Array
        },        
    },
    data(){
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        append(data) {
            const newChild = { id: id++, label: 'testtest'};
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