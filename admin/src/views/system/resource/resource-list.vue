<template>
  <div class="page-content">
    <h2>资源管理</h2>
    <div>
      <el-button @click="addFirstLevelNode" style="margin-bottom: 16px;" type="primary" size="small">新增一级资源节点</el-button>

      <el-tree
        style="width: 40%;"
        :data="resourceData"
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps"
        :expand-on-click-node="false"
        :render-content="renderContent">
      </el-tree>

      <app-resource-dialog
        :dialogVisible="dialogVisible"
        :actionType="actionType"
        :selectedId="selectedId"
        :selectedLevel="selectedLevel"
        :selectedName="selectedName"
        :selectedPath="selectedPath"
        :selectedUid="selectedUid"
        @ok="onOkClick($event)"
        @cancel="onCancelClick">

      </app-resource-dialog>
    </div>
  </div>
</template>

<script>
  import { getResourceList, updateResourceNode, insertResourceNode, deleteNodeById } from '../../../api/system'
  import ResourceDialog from './resource-node-edit'

  export default {
    components: {
      'app-resource-dialog': ResourceDialog
    },
    name: 'resource-list',
    data() {
      return {
        resourceData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        dialogVisible: false,
        actionType: -1, // actionType { 0: '查看', 1: '编辑', 2: '新增'} 目前把 '查看' 去掉了
        selectedId: -1,
        selectedUid: '',
        selectedLevel: -1,
        selectedName: '',
        selectedPath: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getResourceList().then(response => {
          this.resourceData = response.obj
        })
      },

      addFirstLevelNode() {
        this.actionType = 2
        this.selectedLevel = 1
        this.dialogVisible = true
      },

      edit(data) {
        this.actionType = 1
        this.selectedUid = data.uid
        this.selectedId = data.id
        this.selectedName = data.name
        this.selectedPath = data.resourceUrl
        this.selectedLevel = data.resourceLevel
        this.dialogVisible = true
      },

      append(data) {
        this.actionType = 2
        this.selectedUid = data.uid // 添加节点时的 Uid 是父节点(当前节点)的 Uid
        this.selectedLevel = data.resourceLevel + 1
        this.dialogVisible = true
      },

      remove(data) {
        console.log('id: ', data.id)
        this.$confirm(
          '请慎重, 本次操作不可撤回! 删除后所有用户都不可访问当前资源及下级资源!',
          '是否确定要删除该节点', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          deleteNodeById(data.id).then(response => {
            if (response.success) {
              this.$message.success('删除资源节点成功!')
            }
            this.fetchData()
          })
        }).catch(() => {
          this.$message.info('取消删除操作')
        })
      },

      onOkClick(params) {
        if (this.actionType === 1) { // 此时为编辑
          updateResourceNode(params).then(response => {
            if (response.success) {
              this.$message.success('编辑资源节点成功!')
              this.dialogVisible = false
            }
            this.fetchData()
          })
        } else if (this.actionType === 2) {
          insertResourceNode(params).then(response => {
            if (response.success) {
              this.$message.success('添加资源节点成功!')
              this.dialogVisible = false
            }
            this.fetchData()
          })
          this.clearData()
        }
      },

      onCancelClick() {
        this.clearData()
        this.dialogVisible = false
      },

      clearData() {
        this.selectedUid = ''
      },

      /* eslint-disable */
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
        {data.isParent? <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加子节点</el-button> : ''}
              <el-button size="mini" type="text" on-click={ () => this.edit(data) }>编辑该节点</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(data) }>删除该节点</el-button>
            </span>
          </span>)
      }
    }
  }
</script>

<style scoped>

</style>
