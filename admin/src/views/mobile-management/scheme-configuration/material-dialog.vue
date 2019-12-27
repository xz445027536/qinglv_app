<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    style="padding: 10px 20px;"
    :visible.sync="visible"
    @open="onDialogOpen"
    @close="onDialogClose"
    :before-close="onCancelClick"
    width="55%">

    <el-form
      label-position="right"
      ref="materialForm"
      label-width="25%"
      :model="materialForm"
      :rules="rules"
      status-icon>
      <el-form-item label="物料名称" prop="matName">
        <el-input ref="matNameInput" :readonly="actionType === 0" style="width: 75%;" v-model="materialForm.matName" placeholder="请输入材料的物料名称">
        </el-input>
      </el-form-item>

      <el-form-item label="物料编码">
        <el-input :readonly="actionType === 0" style="width: 75%;" v-model="materialForm.matCode" placeholder="请输入材料的物料编码">
        </el-input>
      </el-form-item>

      <el-form-item label="品名" prop="matCatalog">
        <el-input :readonly="actionType === 0" style="width: 75%;" v-model="materialForm.matCatalog" placeholder="请输入材料的品名">
        </el-input>
      </el-form-item>

      <el-form-item label="材料标签">
        <el-tag
          v-for="label in materialForm.labels"
          :key="label.labelName"
          :closable="actionType !== 0"
          :disable-transitions="false"
          @close="handleTagClose(label)">
          {{label.labelName}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          :maxlength="5"
          @keyup.enter.native.trim="handleInputConfirm"
          @blur="handleInputConfirm">
        </el-input>
        <el-tooltip v-else class="item" effect="dark" content="最多添加 3 个标签" placement="top">
          <el-button
            v-if="actionType !== 0"
            :disabled="materialForm.labels.length >= 3"
            class="button-new-tag"
            size="small"
            @click="showInput">+ New Tag</el-button>
        </el-tooltip>
        <el-alert
          class="tag-length-alert"
          v-if="showTagLengthAlert || showTagRepeatAlert"
          :title="alertText"
          type="warning"
          center
          :closable="false"
          show-icon>
        </el-alert>
      </el-form-item>

      <el-form-item label="单价" prop="unitPrice">
        <el-input-number
          :disabled="actionType === 0"
          v-model="materialForm.unitPrice"
          :min="0"
          :precision="2"
          :step="0.1"
          placeholder="请输入材料的单价">
        </el-input-number>
        元
      </el-form-item>

      <el-form-item label="单位" prop="matUnit">
        <el-input :maxlength="4" :readonly="actionType === 0" style="width: 75%;" v-model="materialForm.matUnit" placeholder="请输入材料的单位">
        </el-input>
        <!--<el-select-->
          <!--:disabled="actionType === 0"-->
          <!--style="width: 45%;"-->
          <!--v-model="materialForm.matUnit"-->
          <!--placeholder="请选择材料的单位">-->
          <!--<el-option-->
            <!--v-for="option in unitOptions"-->
            <!--:key="option.value"-->
            <!--:label="option.label"-->
            <!--:value="option.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
      </el-form-item>

      <el-form-item label="规格尺寸">
        <el-select
          v-if="actionType !== 0"
          @change="onChosenSizeChange"
          multiple
          value-key="id"
          style="width: 75%;"
          v-model="sizeInfo"
          placeholder="请选择材料材料尺寸维度">
          <el-option
            v-for="item in sizeOptions"
            :value="item"
            :key="item.id"
            :label="item.label">
          </el-option>
        </el-select>
        <div class="size-flex-container">
          <div style="margin-top: 12px; width: 50%;" v-for="item in sizeInfo">
            <span style="margin-right: 6px;">{{item.label}}</span>
            <el-input-number
              :disabled="actionType === 0"
              v-model="item.sizeValue"
              @change="handleSizeValueChange"
              size="small"
              :min="0"
              :precision="2"
              :step="0.1"></el-input-number>
          </div>
          <div v-if="sizeInfo.length > 0" style="width: 50%; margin-top: 12px;">
            <span>单位</span>
            <el-select :disabled="actionType === 0" style="width: 40%;" v-model="materialForm.sizeUnit" placeholder="请选择单位">
              <el-option label="mm" value="mm"></el-option>
              <el-option label="cm" value="cm"></el-option>
              <el-option label="m" value="m"></el-option>
            </el-select>
          </div>

        </div>
        <!--<div>{{sizeInfo}}</div>-->
      </el-form-item>

      <el-form-item label="备注说明" prop="diyFieldName">
        <el-input :maxlength="500" :readonly="actionType === 0" style="width: 75%;" v-model="materialForm.diyFieldName" placeholder="请输入原“规格尺寸”中除长宽高以外信息">
        </el-input>
      </el-form-item>

      <el-form-item label="配置地区" prop="configArea">
        <el-radio-group :disabled="actionType === 0" v-model="materialForm.configArea">
          <el-radio label="全网">全网</el-radio>
          <el-radio label="大陆">大陆</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="配置岗位" prop="configPosition">
        <el-radio-group :disabled="actionType === 0" v-model="materialForm.configPosition">
          <el-radio label="收派员">收派员</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="应用场景" prop="applyScene">
        <el-input
          :readonly="actionType === 0"
          style="width: 75%;"
          :maxlength="150"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入材料的应用场景"
          v-model="materialForm.applyScene"></el-input>
      </el-form-item>

      <el-form-item class="is-required" label="材料配图" prop="image">
        <el-upload
          :disabled="actionType === 0"
          class="material-image-size image-uploader"
          ref="upload"
          accept="image/jpeg,image/jpg,image/png"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onImageFileChange"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload">
          <img
            v-if="imageUrl"
            :src="imageUrl"
            :style="{ cursor: actionType === 0 ? 'not-allowed' : ''}"
            class="material-image-size">
          <div v-else class="material-image-size image-uploader-tip-container">
            <div class="el-upload__tip">限单张 大小需为</div>
            <i class="el-icon-plus" style="font-size: 24px;"></i>
            <div class="el-upload__tip">260*196</div>
          </div>
        </el-upload>

        <div v-if="imageUrl" class="el-upload__tip">点击图片更换新图，大小需为 <b>260*196</b></div>
      </el-form-item>

      <el-form-item label="碳排放值" prop="matCarbon">
        <el-input :disabled="actionType === 0" type="text" style="width: 30%;" placeholder="请输入材料的碳排值" v-model="materialForm.matCarbon"></el-input>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button v-if="actionType === 0" size="medium" type="primary" @click="onEditClick">编 辑</el-button>
      <el-button v-if="actionType === 0" size="medium" type="primary" @click="onDeleteClick">删 除</el-button>
      <el-button size="medium" @click="onCancelClick">{{actionType === 0 ? '关 闭' : '取 消'}}</el-button>
      <el-button :loading="submitting" v-if="actionType !== 0" size="medium" type="primary" @click="onOkClick">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  const VIEW = 0
  const EDIT = 1
  const ADD = 2

  import { getMaterialDetail } from '../../../api/scheme-and-material'

  export default {
    name: 'material-dialog',
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
      selectedMaterialId: {
        // type: Number,
        required: true
      }
    },
    data() {
      return {
        count: 1,
        submitControl: false,
        materialForm: {
          matCode: '',
          matCatalog: '',
          matName: '',
          unitPrice: 0,
          matUnit: '',
          // size: '',
          sizeUnit: '',
          diyFieldName: '',
          configArea: '全网',
          configPosition: '收派员',
          labels: [],
          applyScene: '',
          matCarbon: ''
        },
        inputVisible: false,
        alertText: '',
        showTagLengthAlert: false,
        showTagRepeatAlert: false,
        inputValue: '',
        rules: {
          matCode: [
            { required: true, message: '物料编码不能为空!', trigger: 'change' }
          ],
          matCatalog: [
            { required: true, message: '品名不能为空!', trigger: 'change' }
          ],
          matName: [
            { required: true, message: '物料名称不能为空!', trigger: 'change' }
          ],
          unitPrice: [
            { required: true, message: '单价不能为空!', trigger: 'change' }
          ],
          matUnit: [
            { required: true, message: '材料单位不能为空!', trigger: 'change' }
          ],
          configArea: [
            { required: true, message: '配置地区不能为空!', trigger: 'change' }
          ],
          configPosition: [
            { required: true, message: '配置岗位不能为空!', trigger: 'change' }
          ],
          applyScene: [
            { required: true, message: '应用场景不能为空!', trigger: 'change' }
          ],
          matCarbon: [
            { required: true, message: '碳排值不能为空!', trigger: 'change' }
          ],
          labels: [
            { required: true, message: '材料标签不能为空!', trigger: 'blur' }
          ]
        },
        unitOptions: [
          {
            value: 'PCS',
            label: 'PCS'
          },
          {
            value: '个',
            label: '个'
          },
          {
            value: '/',
            label: '/'
          }
        ],
        imageUrl: '',
        imageFile: '',
        hasImageFile: false,
        sizeOptions: [
          {
            id: 'matLength',
            label: '长',
            sizeValue: 0
          },
          {
            id: 'matWidth',
            label: '宽',
            sizeValue: 0
          },
          {
            id: 'matHeight',
            label: '高',
            sizeValue: 0
          }
        ],
        sizeInfo: []
      }
    },
    computed: {
      visible: {
        get() {
          return this.dialogVisible
        }
      },
      submitting: {
        get() {
          return this.isSubmitting
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
      materialId: {
        get() {
          return this.selectedMaterialId
        }
      }
    },
    created() {
    },
    methods: {
      onDialogOpen() {
        this.$nextTick(() => {
          this.$refs['materialForm'].resetFields()
          if (this.actionType === ADD) {
            this.$refs['matNameInput'].focus()
          }
        })
        if (this.actionType === VIEW || this.actionType === EDIT) {
          getMaterialDetail(this.materialId).then(res => {
            // eslint-disable-next-line
            const { matLength, matWidth, matHeight, ...formData } = res.data
            this.materialForm = formData
            this.imageUrl = res.data.matImg
            console.log('getMaterialSizeDetail: ', { matLength, matWidth, matHeight })
            this.handleSizeInfo({ matLength, matWidth, matHeight })
          }).catch(err => {
            console.log('获取材料配置详情出错: ', err)
          })
        } else {
          this.materialForm = {
            matCode: '',
            matCatalog: '',
            matName: '',
            unitPrice: 0,
            matUnit: '',
            // size: '',
            sizeUnit: '',
            diyFieldName: '',
            configArea: '全网',
            configPosition: '收派员',
            labels: [],
            applyScene: '',
            matCarbon: ''
          }
        }
      },

      onDialogClose() {
        this.showTagLengthAlert = false
        this.showTagRepeatAlert = false
        this.inputVisible = false
        this.inputValue = ''
        this.sizeInfo = []
        this.sizeOptions = this.sizeOptions.map(item => {
          item.sizeValue = 0
          return item
        })
        this.imageUrl = ''
        this.imageFile = ''
        this.hasImageFile = false
        console.log('onDialogClose')
      },

      handleSizeInfo(size) {
        if (size.matLength) {
          this.sizeInfo.push({
            id: 'matLength',
            label: '长',
            sizeValue: size.matLength
          })
        }
        if (size.matWidth) {
          this.sizeInfo.push({
            id: 'matWidth',
            label: '宽',
            sizeValue: size.matWidth
          })
        }
        if (size.matHeight) {
          this.sizeInfo.push({
            id: 'matHeight',
            label: '高',
            sizeValue: size.matHeight
          })
        }
      },

      handleTagClose(label) {
        console.log(label)
        this.materialForm.labels.splice(this.materialForm.labels.indexOf(label), 1)
      },

      handleInputConfirm() {
        const inputValue = this.inputValue
        if (inputValue) {
          if (inputValue.length > 5) {
            this.showTagLengthAlert = true
            this.alertText = '标签名称长度不得超过 5'
            this.$refs.saveTagInput.$refs.input.focus()
            return
          }
          if (this.materialForm.labels.map(item => item.labelName).includes(inputValue)) {
            this.showTagRepeatAlert = true
            this.alertText = '标签已存在'
            this.$refs.saveTagInput.$refs.input.focus()
            return
          }
          this.showTagLengthAlert = false
          this.showTagRepeatAlert = false
          this.materialForm.labels.push({
            labelId: '',
            labelName: inputValue
          })
        }
        this.inputVisible = false
        this.inputValue = ''
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

      onImageFileChange(file, fileList) {
        console.log('onImageFileChange: ', file)
        const isImage = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png')
        if (!isImage) {
          this.$message.warning('文件格式不符合要求')
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const image = new Image()
          image.onload = () => {
            console.log('width:', image.width)
            console.log('height:', image.height)
            if (image.width !== 260) {
              this.$message.warning('图片宽度不符合要求')
            } else if (image.height !== 196) {
              this.$message.warning('图片长度不符合要求')
            } else {
              this.$message.success('图片符合要求 点击图片可进行更换')
              this.hasImageFile = true
              const blobUrl = URL.createObjectURL(file.raw)
              console.log('blobUrl: ', blobUrl)
              this.imageUrl = blobUrl
              this.imageFile = file.raw
              console.log('this.imageUrl: ', this.imageUrl)
            }
          }
          image.src = data
        }
        reader.readAsDataURL(file.raw)
      },

      validate() {
        this.$refs['materialForm'].validate(valid => {
          if (valid) {
            console.log('hasImageFile: ', this.hasImageFile)
            if (this.actionType === ADD) {
              if (this.hasImageFile) {
                // this.$refs.upload.submit() // 调用 this.saveMaterialWithFile()
                this.saveMaterialWithFile()
              } else {
                this.$message.warning('请上传材料配图')
                this.$emit('submittingStatus', false)
              }
            } else if (this.actionType === EDIT) {
              if (this.hasImageFile) {
                // this.$refs.upload.submit() // 调用 this.saveMaterialWithFile()
                this.saveMaterialWithFile()
              } else {
                this.saveMaterialWithUrl()
              }
            }
          } else {
            this.$message.error('请补全信息通过表单校验!')
            this.$emit('submittingStatus', false)
          }
        })
      },

      saveMaterialWithFile() {
        console.log('saveMaterialWithFile')
        delete this.materialForm.matImg
        Object.assign(this.materialForm, { image: this.imageFile })
        this.$emit('ok', this.materialForm)
      },

      saveMaterialWithUrl() {
        console.log('saveMaterialWithUrl')
        Object.assign(this.materialForm, { matImg: this.imageUrl })
        this.$emit('ok', this.materialForm)
      },

      onCancelClick() {
        this.$emit('cancel')
      },

      onOkClick() {
        if (this.submitControl === true) {
          return
        }
        this.submitControl = true
        this.$emit('submittingStatus', true)
        console.log(`you click ok for ${this.count++} times`, +new Date())
        setTimeout(() => {
          this.submitControl = false
        }, 200)
        this.sizeInfo.forEach(item => {
          this.materialForm[item.id] = item.sizeValue
        })
        this.validate()
      },

      onEditClick() {
        this.$emit('changeToEdit')
      },

      onDeleteClick() {
        this.$emit('delete', this.materialId)
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

  .tag-length-alert {
    height: 32px;
    width: 75%;
    margin-top: 6px;
  }

  .material-image-size {
    width: 195px;
    height: 147px;
  }

  .size-flex-container {
    width: 80%;
    display: flex;
    flex-flow: row wrap;
    /*justify-content: space-between;*/
  }

</style>