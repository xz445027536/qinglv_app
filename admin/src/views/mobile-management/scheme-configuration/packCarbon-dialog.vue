<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    style="padding: 10px 20px;"
    :visible.sync="dialogVisible"
    @open="onDialogOpen"
    @close="onDialogClose"
    :before-close="onCancelClick"
    :show-close="!isSubmitting"
    width="55%"
  >
    <el-form
      label-position="right"
      ref="packCarbonForm"
      label-width="25%"
      :model="packCarbonForm"
      :rules="rules"
      status-icon
    >
      <el-form-item label="物料类别" prop="matCategory">
        <el-input style="width: 75%;" v-model="packCarbonForm.matCategory" placeholder="请输入物料类别"></el-input>
      </el-form-item>

      <el-form-item label="物料编码" prop="matCode">
        <el-input
          ref="matNamematCode"
          type="number"
          min="1"
          :readonly="actionType === 1"
          style="width: 75%;"
          v-model="packCarbonForm.matCode"
          placeholder="请输入材料的物料编码"
        ></el-input>
      </el-form-item>

      <el-form-item label="物料名称" prop="matName">
        <el-input style="width: 75%;" v-model="packCarbonForm.matName" placeholder="请输入物料名称"></el-input>
      </el-form-item>

      <el-form-item label="规格尺寸" prop="matName">
        <el-input
          style="width: 75%"
          v-model="packCarbonForm.matDimension"
          placeholder="请输入物料的规格尺寸，输入数据时如有单位请带上单位"
        ></el-input>
      </el-form-item>

      <el-form-item label="材料材质" prop="matTexture">
        <el-input style="width: 75%" v-model="packCarbonForm.matTexture" placeholder="请输入材料材质"></el-input>
      </el-form-item>

      <el-form-item label="材料重量（KG）" prop="matWeightKg">
        <el-input
          type="number"
          min="0"
          style="width: 30%"
          v-model="packCarbonForm.matWeightKg"
          placeholder="请输入材料重量"
        ></el-input>
      </el-form-item>

      <el-form-item label="主包装碳排放值" prop="matMainCarbon">
        <el-input
          type="number"
          min="0"
          style="width: 30%"
          v-model="packCarbonForm.matMainCarbon"
          placeholder="请输入主包装碳排放值"
        ></el-input>
      </el-form-item>

      <el-form-item label="电子运单" prop="elecWaybill">
        <el-input type="number" min="1" style="width: 30%;" v-model="packCarbonForm.elecWaybill" placeholder="请输入电子运单的数量,默认为1"></el-input>
      </el-form-item>

      <el-form-item label="电子运单碳排放值" prop="elecWaybillCarbon">
        <el-input
          type="number"
          min="0"
          style="width: 30%;"
          v-model="packCarbonForm.elecWaybillCarbon"
          placeholder="请输入电子运单碳排放值"
        ></el-input>
      </el-form-item>

      <el-form-item label="透明胶纸（M）" prop="scotchTapeLength">
        <el-input
          style="width: 75%;"
          v-model.trim="packCarbonForm.scotchTapeLength"
          placeholder="请输入使用透明胶纸的长度,可为空"
        ></el-input>
      </el-form-item>

      <el-form-item label="透明胶纸碳排放值" prop="scotchTapeCarbon">
        <el-input
          type="number"
          min="0"
          style="width: 50%;"
          v-model.trim="packCarbonForm.scotchTapeCarbon"
          placeholder="如透明胶纸不为空，请输入使用透明胶纸的碳排值"
        ></el-input>
      </el-form-item>

      <el-form-item label="数量">
        <el-input-number v-model="packCarbonForm.total" :min="1" :step="1"></el-input-number>
      </el-form-item>

      <el-form-item label="碳排放值">
        <el-input type="number" disabled="disabled" min="0" style="width: 30%;" v-model="packCarbonForm.carbonValue" placeholder="此值由系统自动计算"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button v-if="!isSubmitting" size="medium" @click="onCancelClick" >{{actionType === 0 ? '关 闭' : '取 消'}}</el-button>
      <el-button :loading="isSubmitting" v-if="actionType !== 0" size="medium" type="primary" @click="onOkClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// const VIEW = 0
const EDIT = 1
const ADD = 2

import { getPackCarbonDetail } from '../../../api/scheme-and-material'

export default {
  name: 'packCarbon-dialog',
  props: {
    dialogVisible: {
      type: Boolean
    },
    isSubmitting: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      required: true
    },
    actionType: {
      // type { 0: '查看(详情)', 1: '编辑', 2: '新增'}
      type: Number,
      required: true
    },
    selectedPackCarbonId: {
      // type: Number,
      required: true
    }
  },
  data() {
    const validateNumber = (rule, value, callback) => {
      const scotchTapeLength = this.packCarbonForm.scotchTapeLength
      const scotchTapeCarbon = this.packCarbonForm.scotchTapeCarbon
      if (scotchTapeLength !== '' && scotchTapeCarbon === '') {
        callback(new Error('请输入透明胶纸的使用量'))
      } else {
        callback()
      }
    }
    return {
      count: 1,
      submitControl: this.isSubmitting,
      packCarbonForm: {
        matCategory: '',
        matCode: '',
        matName: '',
        matDimension: '',
        matTexture: '',
        matWeightKg: '',
        matMainCarbon: '',
        elecWaybill: '1',
        elecWaybillCarbon: '',
        scotchTapeLength: '0',
        scotchTapeCarbon: '0',
        total: '1',
        carbonValue: ''
      },
      packCarbonFormInit: {
        matCategory: '',
        matCode: '',
        matName: '',
        matDimension: '',
        matTexture: '',
        matWeightKg: '',
        matMainCarbon: '',
        elecWaybill: '1',
        elecWaybillCarbon: '',
        scotchTapeLength: '',
        scotchTapeCarbon: '',
        total: '1',
        carbonValue: ''
      },
      inputVisible: false,
      rules: {
        matCategory: [
          { required: true, message: '物料类别不能为空!', trigger: 'change' }
        ],
        matCode: [
          { required: true, message: '物料编码不能为空!', trigger: 'change' }
        ],
        matName: [
          { required: true, message: '物料名称不能为空!', trigger: 'change' }
        ],
        matDimension: [
          { required: true, message: '规格尺寸不能为空!', trigger: 'change' }
        ],
        matTexture: [
          { required: true, message: '材料材质不能为空!', trigger: 'change' }
        ],
        matWeightKg: [
          {
            required: true,
            message: '材料重量（Kg）不能为空!',
            trigger: 'change'
          }
        ],
        matMainCarbon: [
          {
            required: true,
            message: '主包装碳排放值不能为空!',
            trigger: 'change'
          }
        ],
        elecWaybill: [
          {
            required: true,
            message: '电子运单个数不能为空!',
            trigger: 'change'
          }
        ],
        elecWaybillCarbon: [
          {
            required: true,
            message: '电子运单碳排放值不能为空!',
            trigger: 'change'
          }
        ],
        scotchTapeLength: [{ validator: validateNumber, trigger: 'change' }],
        scotchTapeCarbon: [{ validator: validateNumber, trigger: 'change' }]
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
    PackCarbonId: {
      get() {
        return this.selectedPackCarbonId
      }
    }
  },
  created() {},
  methods: {
    onDialogOpen() {
      this.$nextTick(() => {
        if (this.actionType === ADD) {
          this.packCarbonForm = JSON.parse(JSON.stringify(this.packCarbonFormInit))
          this.$refs['matNamematCode'].focus()
        }
        this.$refs['packCarbonForm'].resetFields()
      })
      if (this.actionType === EDIT) {
        getPackCarbonDetail(this.PackCarbonId)
          .then(res => {
            const formData = res.data
            this.packCarbonForm = formData
          })
          .catch(err => {
            console.log('获取材料配置详情出错: ', err)
          })
      }
    },

    onDialogClose() {
      console.log('onDialogClose')
    },

    handleTagClose(label) {
      this.packCarbonForm.labels.splice(
        this.packCarbonForm.labels.indexOf(label),
        1
      )
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    onChosenSizeChange(val) {
      console.log('onChosenSizeChange: ', val)
    },

    handleSizeValueChange(sizeValue) {
      console.log('handleSizeValueChange: ', sizeValue)
    },

    beforeUpload(file) {
      // this.imageFile = file
      // console.log(file)
    },

    handleUploadSuccess() {},

    onCancelClick() {
      this.$emit('cancel')
    },

    validate() {
      this.$refs['packCarbonForm'].validate(valid => {
        if (valid) {
          this.$emit('ok', this.packCarbonForm)
        } else {
          this.$message.error('请补全信息通过表单校验!')
          this.$emit('submittingStatus', false)
        }
      })
    },

    onOkClick() {
      console.log(this.$store.getters.name)
      if (this.submitControl === true) {
        return
      }
      this.submitControl = true
      this.$emit('submittingStatus', true)
      console.log(`you click ok for ${this.count++} times`, +new Date())
      setTimeout(() => {
        this.submitControl = false
      }, 200)
      this.validate()
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.size-flex-container {
  width: 80%;
  display: flex;
  flex-flow: row wrap;
  /*justify-content: space-between;*/
}
</style>