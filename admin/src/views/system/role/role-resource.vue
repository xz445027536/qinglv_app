<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @open="onDialogOpen"
    :before-close="onCancelClick"
    width="33%">

    <el-tree
      :data="resourceData"
      default-expand-all
      node-key="id"
      show-checkbox
      ref="tree"
      highlight-current
      :props="defaultProps"
      :expand-on-click-node="false">
    </el-tree>

    <!--<div>{{this.checkedNodes}}</div>-->

    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="onCancelClick">取 消</el-button>
      <el-button size="medium" type="primary" @click="onOkClick">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import { getRoleResourceList } from '../../../api/system'

  export default {
    name: 'role-resource',
    props: {
      dialogVisible: {
        type: Boolean
      },
      selectedRoleId: {
        type: String,
        required: true
      },
      selectedName: {
        type: String
      }
    },
    data() {
      return {
        resourceData: [],
        checkedNodes: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    computed: {
      visible: {
        get() {
          return this.dialogVisible
        }
      },
      title: {
        get() {
          return `分配页面节点资源 - ${this.selectedName}`
        }
      },
      roleId: {
        get() {
          return this.selectedRoleId
        }
      }
    },
    methods: {
      fetchData() {
        getRoleResourceList(this.roleId).then(response => {
          this.resourceData = response.obj
          this.resourceData.forEach(node => {
            if (node.checked) {
              // this.checkedNodes.push({ id: node.id, uid: node.uid })
              if (node.isParent) {
                node.children.forEach(child => {
                  if (child.checked) {
                    this.checkedNodes.push({ id: child.id, uid: child.uid })
                  }
                })
              }
            }
          })
          this.setCheckedKeys()
        })
      },

      onDialogOpen() {
        this.resourceData = []
        this.checkedNodes = []
        this.fetchData()
      },

      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys(this.checkedNodes.map(item => item.id))
      },

      onOkClick() {
        const resList =
          this.$refs.tree.getCheckedNodes()
            .concat(this.$refs.tree.getHalfCheckedNodes())
            .map(node => node.uid)
        const params = {}
        Object.assign(params, { roleId: this.roleId, resList: resList.toString() })
        this.$emit('ok', params)
      },

      onCancelClick() {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>

</style>
