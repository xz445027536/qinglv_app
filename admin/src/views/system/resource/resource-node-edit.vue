<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @open="onDialogOpen"
    @close="onCloseOpen"
    :before-close="onCancelClick"
    width="33%">
    <el-form label-position="right" ref="form" label-width="25%" :model="form" :rules="rules" status-icon>
      <el-form-item label="资源节点名称" prop="sysResourceName">
        <el-input style="width: 75%;" v-model="form.sysResourceName" placeholder="请输入节点名称">
        </el-input>
      </el-form-item>
      <el-form-item v-if="!isPathNeedless" label="资源路径" prop="sysResourcePath">
        <el-input style="width: 75%;" v-model="form.sysResourcePath" placeholder="请输入路径">
        </el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="onCancelClick">取 消</el-button>
      <el-button size="medium" type="primary" @click="onOkClick">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  const titleList = ['查看资源节点', '编辑资源节点', '新增资源节点']

  export default {
    name: 'resource-node-edit',
    props: {
      dialogVisible: {
        type: Boolean
      },
      actionType: {
        // type { 0: '查看', 1: '编辑', 2: '新增'} 目前把 '查看' 去掉了
        type: Number,
        required: true
      },
      selectedId: {
        type: Number
      },
      selectedUid: {
        type: String,
        required: true
      },
      selectedName: {
        type: String
      },
      selectedPath: {
        type: String
      },
      selectedLevel: {
        type: Number
      }
    },
    data() {
      return {
        form: {},
        rules: {
          sysResourceName: [
            { required: true, message: '资源节点名称不能为空!', trigger: 'change' }
          ],
          sysResourcePath: [
            { required: true, message: '资源路径不能为空!', trigger: 'change' }
            // { type: 'number', message: '工号必须为数字值!' }
          ]
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
          return titleList[this.actionType]
        }
      },
      type: {
        get() {
          return this.actionType
        }
      },
      id: {
        get() {
          return this.selectedId
        }
      },
      sysResourceUid: {
        get() {
          return this.selectedUid
        }
      },
      isPathNeedless: {
        get() {
          return this.selectedLevel === 1
        }
      },
      sysResourceName: {
        get() {
          return this.selectedName
        }
      },
      sysResourcePath: {
        get() {
          return this.selectedPath
        }
      },
      sysResourceLevel: {
        get() {
          return this.selectedLevel
        }
      }
    },
    methods: {
      onDialogOpen() {
        if (this.type === 1) {
          this.form = {
            sysResourceName: this.sysResourceName,
            sysResourcePath: this.sysResourcePath
          }
        }
      },

      onCloseOpen() {
        this.$refs['form'].resetFields()
      },

      validate() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.type === 1) { // 此时为编辑
              const params = {}
              Object.assign(params, this.form, { id: this.id, sysResourceUid: this.sysResourceUid })
              this.$emit('ok', params)
            } else if (this.type === 2) { // 此时为新增
              const params = {}
              Object.assign(params, this.form, { sysResourceLevel: this.sysResourceLevel, sysParentUid: this.sysResourceUid })
              this.$emit('ok', params)
            }
          } else {
            this.$message.error('请修改信息通过表单验证!')
          }
        })
      },

      onOkClick() {
        this.validate()
      },

      onCancelClick() {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>

</style>
