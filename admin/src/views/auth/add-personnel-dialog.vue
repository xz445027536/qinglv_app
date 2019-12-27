<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @open="onDialogOpen"
    @close="onDialogClose"
    :before-close="onCancelClick"
    width="33%">
    <el-form label-position="right" ref="personnelForm" label-width="25%" :model="personnelForm" :rules="rules"
      status-icon>
      <el-form-item label="工号" prop="userCode">
        <el-input ref="userCodeInput" style="width: 75%;" :maxlength="10" v-model.trim="personnelForm.userCode" placeholder="请输入工号">
        </el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input style="width: 75%;" :maxlength="16" v-model="personnelForm.userName" placeholder="请输入姓名">
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
  export default {
    name: 'add-personnel-dialog',
    props: {
      dialogVisible: {
        type: Boolean
      },
      dialogTitle: {
        type: String,
        required: true
      },
      roleCode: {
        type: String,
        required: true
      },
      actionType: {
        // type { 0: '查看', 1: '编辑', 2: '新增'} 目前把 '查看' 去掉了
        type: Number,
        required: true
      },
      selectedId: {
        type: Number,
        required: true
      }
    },
    data() {
      const userCodeReg = (rule, value, callback) => {
        const reg = /^\d{6,8}$/
        if (!reg.test(value)) {
          callback(new Error('工号需为 6-8 位数字'))
          return
        }
        callback()
      }
      return {
        personnelForm: {
          userName: '',
          userCode: ''
        },
        rules: {
          userName: [
            { required: true, message: '姓名不能为空!', trigger: 'change' }
          ],
          userCode: [
            { required: true, message: '工号不能为空!', trigger: 'change' },
            { validator: userCodeReg, trigger: 'blur' }
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
          return this.dialogTitle
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
        this.$nextTick(() => {
          this.$refs['personnelForm'].resetFields()
          this.$refs['userCodeInput'].focus()
        })
      },

      onDialogClose() {
      },

      // updateValue(e) {
      //   console.log('blur: ', e.target.value)
      //   const regexp = /[^\d，,]]*/g
      //   this.form.sysUsername = e.target.value.trim().replace(regexp, '')
      //   // this.form.sysUsername = value.trim().replace(regexp, '')
      //   console.log(this.form.sysUsername)
      //   // this.$emit('input', this.form.sysUsername)
      // },

      validate() {
        this.$refs['personnelForm'].validate(valid => {
          if (valid) {
            Object.assign(this.personnelForm, { roleCode: this.roleCode })
            // this.$emit('ok', this.roleCode)
            this.$emit('ok', this.personnelForm)
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
