<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @open="onDialogOpen"
    @close="onCloseOpen"
    :before-close="onCancelClick"
    width="33%">
    <el-form label-position="right" ref="form" label-width="25%" :model="form" :rules="rules" status-icon>
      <el-form-item label="角色名字" prop="sysRoleName">
        <el-input style="width: 75%;" v-model="form.sysRoleName" placeholder="请输入角色名字">
        </el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="sysRoleDesc">
        <el-input style="width: 75%;" v-model="form.sysRoleDesc" placeholder="请输入角色描述">
        </el-input>
      </el-form-item>
      <el-form-item label="是否默认">
        <el-radio-group size="small" v-model="form.isDefault">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="onCancelClick">取 消</el-button>
      <el-button size="medium" type="primary" @click="onOkClick">确 定</el-button>
    </div>

    <!--<div>{{this.form}}</div>-->
  </el-dialog>
</template>

<script>
  import { getRoleDetail } from '../../../api/system'

  const titleList = ['查看角色', '编辑角色', '新增角色']

  export default {
    name: 'role-edit',
    props: {
      dialogVisible: {
        type: Boolean
      },
      actionType: {
        /* type { 0: '查看', 1: '编辑', 2: '新增'} 目前把 '查看' 去掉了 */
        type: Number,
        required: true
      },
      selectedId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        form: {
          sysRoleName: '',
          sysRoleDesc: '',
          isDefault: false
        },
        rules: {
          sysRoleName: [
            { required: true, message: '角色名字不能为空!', trigger: 'change' }
          ],
          sysRoleDesc: [
            { required: true, message: '角色描述不能为空!', trigger: 'change' }
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
      }
    },
    methods: {
      onDialogOpen() {
        if (this.type === 1) { /* 此时为新增 */
          getRoleDetail(this.id).then(response => {
            const { id, sysRoleName, sysRoleDesc, isDefault } = response.obj
            this.form = { id, sysRoleName, sysRoleDesc, isDefault }
          })
        }
      },

      onCloseOpen() {
        this.$refs['form'].resetFields()
      },

      validate() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.$emit('ok', this.form)
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
