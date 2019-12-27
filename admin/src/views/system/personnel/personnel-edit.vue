<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @open="onDialogOpen"
    @close="onDialogClose"
    :before-close="onCancelClick"
    width="33%">
    <el-form label-position="right" ref="form" label-width="25%" :model="form" :rules="rules" status-icon>
      <el-form-item label="工号" prop="sysUsername">
        <el-input style="width: 75%;" :maxlength="10" v-model.trim="form.sysUsername" placeholder="请输入工号">
        </el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="sysName">
        <el-input style="width: 75%;" :maxlength="16" v-model="form.sysName" placeholder="请输入姓名">
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
  import { getPersonnelDetail } from '../../../api/system'

  const titleList = ['查看人员', '编辑人员', '新增人员']

  export default {
    name: 'personnel-edit',
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
        type: Number,
        required: true
      }
    },
    data() {
      return {
        form: {
          sysUsername: ''
        },
        rules: {
          sysName: [
            { required: true, message: '姓名不能为空!', trigger: 'change' }
          ],
          sysUsername: [
            { required: true, message: '工号不能为空!', trigger: 'change' }
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
      }
    },
    methods: {
      onDialogOpen() {
        if (this.type === 1) {
          getPersonnelDetail(this.id).then(response => {
            const { id, sysUsername, sysName } = response.obj
            this.form = { id, sysUsername, sysName }
          })
        }
      },

      onDialogClose() {
        this.$refs['form'].resetFields()
      },

      updateValue(e) {
        console.log('blur: ', e.target.value)
        const regexp = /[^\d，,]]*/g
        this.form.sysUsername = e.target.value.trim().replace(regexp, '')
        // this.form.sysUsername = value.trim().replace(regexp, '')
        console.log(this.form.sysUsername)
        // this.$emit('input', this.form.sysUsername)
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
