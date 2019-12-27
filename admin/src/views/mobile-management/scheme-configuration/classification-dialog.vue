<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    style="padding: 10px 20px;"
    :visible.sync="visible"
    @open="onDialogOpen"
    @close="onDialogClose"
    :before-close="onCancelClick"
    width="45%">

    <el-form
      label-position="right"
      ref="classificationForm"
      label-width="25%"
      :model="classificationForm"
      :rules="rules"
      status-icon>
      <el-form-item label="类别名称" prop="catalogName">
        <el-input ref="catalogNameInput" style="width: 75%;" v-model="classificationForm.catalogName" placeholder="请输入类别名称">
        </el-input>
      </el-form-item>
      <el-form-item class="is-required" v-if="classLevel === 1 || classLevel === 3" label="类别图片" prop="photo">
        <el-upload
          class="classification-image-size image-uploader"
          ref="upload"
          accept="image/jpeg,image/jpg,image/png"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onClassificationFileChange"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload">
          <img ref="img" v-if="imageUrl" :src="imageUrl" class="classification-image-size">
          <div v-else class="classification-image-size image-uploader-tip-container">
            <div class="el-upload__tip">限单张 大小需为</div>
            <i class="el-icon-plus" style="font-size: 20px;"></i>
            <div class="el-upload__tip">148*148</div>
          </div>
        </el-upload>

        <div v-if="imageUrl" class="el-upload__tip">点击图片更换新图，大小需为 <b>148*148</b></div>
      </el-form-item>

      <el-form-item v-if="classLevel === 3" label="包含方案" prop="solutions">
        <!--<el-input style="width: 75%;" v-model="classificationForm.includedScheme" placeholder="请选择包含的方案">-->
        <!--</el-input>-->
        <el-select
          @change="onSolutionChange"
          multiple
          filterable
          value-key="solutionId"
          style="width: 75%;"
          v-model="classificationForm.solutions"
          placeholder="请选择包含的方案">
          <el-option
            v-for="item in solutionOptions"
            :value="item"
            :key="item.solutionId"
            :label="item.solutionName">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="onCancelClick">取 消</el-button>
      <el-button size="medium" type="primary" @click="onOkClick">确 定</el-button>
    </div>

    <!--<div>{{classLevel}}</div>-->
    <!--<div>{{id}}</div>-->

  </el-dialog>
</template>

<script>
  const EDIT = 1
  const ADD = 2

  import { getClassificationDetail, getSchemeOptions } from '../../../api/scheme-and-material'

  export default {
    name: 'classification-dialog',
    props: {
      dialogVisible: {
        type: Boolean
      },
      dialogTitle: {
        type: String,
        required: true
      },
      actionType: {
        // type { 1: '编辑', 2: '新增'}
        type: Number,
        required: true
      },
      selectedId: {
        // type: Number,
        required: true
      },
      classLevel: {
        required: true
      }
    },
    data() {
      const nameValidator = (rule, value, callback) => {
        if (this.classLevel === 2) {
          if (value.length > 15) {
            callback(new Error('二级类别名称长度不得超过 15'))
            return
          }
        } else {
          if (value.length > 6) {
            callback(new Error('类别名称长度不得超过 6'))
            return
          }
        }
        callback()
      }
      return {
        classificationForm: {
          catId: '',
          catLevel: '',
          catalogName: '',
          // parentId: -1,
          solutions: []
        },
        rules: {
          catalogName: [
            { required: true, message: '类别名称不能为空!', trigger: 'change' },
            { validator: nameValidator, trigger: 'blur' }
          ]
        },
        imageUrl: '',
        classificationFile: '',
        hasClassificationFile: false,
        solutionOptions: []
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
      },
      parentId: {
        get() {
          return this.parentCatId
        }
      }
    },
    created() {
    },
    methods: {
      onDialogOpen() {
        this.$nextTick(() => {
          this.classificationForm = {
            catId: '',
            catLevel: '',
            catalogName: '',
            // parentId: -1,
            solutions: []
          }
          this.$refs['classificationForm'].resetFields()
          this.$refs['catalogNameInput'].focus()
        })
        // console.log('id: ', this.id)
        // console.log('classLevel: ', this.classLevel)
        getSchemeOptions().then(res => {
          this.solutionOptions = res.data
        }).catch(err => {
          console.log('启用方案列表出错: ', err)
        })
        if (this.actionType === EDIT) { // 编辑
          getClassificationDetail(this.id, this.classLevel).then(res => {
            this.classificationForm = res.data
            if (this.classLevel === 1) {
              this.imageUrl = this.classificationForm.catImg
            } else if (this.classLevel === 3) {
              this.imageUrl = this.classificationForm.goodsUrl
            }
          }).catch(err => {
            console.log('启用分类详情出错: ', err)
          })
        } else { // 新增
          // console.log('新增 parentId: ', this.id)
          // Object.assign(this.classificationForm, { parentId: this.id })
          // console.log('classificationForm: ', this.classificationForm)
          // this.classificationForm.parentId = this.id
        }
      },

      onDialogClose() {
        this.hasClassificationFile = false
        this.imageUrl = ''
        console.log('onDialogClose')
      },

      beforeUpload(file) {
        console.log('file: ', file)
        this.classificationFile = file
      },

      handleUploadSuccess() {},

      onClassificationFileChange(file, fileList) {
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
            if (this.classLevel === 3) {
              if (image.width !== 148) {
                this.$message.warning('图片宽度不符合要求')
              } else if (image.height !== 148) {
                this.$message.warning('图片长度不符合要求')
              } else {
                console.log(file)
                this.$message.success('图片符合要求 点击图片可进行更换')
                this.classificationFile = file.raw
                this.hasClassificationFile = true
                this.imageUrl = file.url
              }
            } else if (this.classLevel === 1) {
              console.log(file)
              this.$message.success('图片符合要求 点击图片可进行更换')
              this.classificationFile = file.raw
              this.hasClassificationFile = true
              this.imageUrl = file.url
            }
          }
          image.src = data
        }
        reader.readAsDataURL(file.raw)
      },

      onSolutionChange(val) {
        console.log(this.classificationForm)
      },

      validate() {
        this.$refs['classificationForm'].validate(valid => {
          if (valid) {
            if (this.classLevel !== 2 && this.actionType === ADD && !this.hasClassificationFile) {
              this.$message.warning('请上传类别图片')
              return
            }
            this.emitFormData()
          } else {
            this.$message.error('请修改信息通过表单校验!')
          }
        })
      },

      emitFormData() {
        if (this.classLevel === 1 || this.classLevel === 3) { // 3 级分类 emit 的都是 formData
          console.log('classLevel: ', this.classLevel)
          const formData = new FormData()
          formData.append('catId', this.classificationForm.catId)
          formData.append('catalogName', this.classificationForm.catalogName)
          if (this.classLevel === 3) {
            formData.append('solutionIds', JSON.stringify(this.classificationForm.solutions.map(item => {
              return { solutionId: item.solutionId }
            })))
          }
          if (this.actionType === ADD) {
            formData.append('parentCatId', this.id)
          } else {
            formData.append('parentCatId', this.classificationForm.parentId)
          }
          if (this.hasClassificationFile) { // 添加图片文件
            formData.append('image', this.classificationFile)
          } else { // 添加图片 url
            formData.append('goodsImgUrl', this.imageUrl)
          }
          console.log('before OK: ', formData)
          this.$emit('ok', formData)
        } else { // 2 级分类 emit formData
          if (this.actionType === ADD) {
            const formData = new FormData()
            formData.append('parentCatId', this.id)
            formData.append('catalogName', this.classificationForm.catalogName)
            // const form = {}
            // Object.assign(form,
            //   { catalogName: this.classificationForm.catalogName },
            //   { parentCatId: this.id },
            // )
            this.$emit('ok', formData)
          } else {
            const formData = new FormData()
            formData.append('catId', this.classificationForm.catId)
            formData.append('parentCatId', this.classificationForm.parentId)
            formData.append('catalogName', this.classificationForm.catalogName)
            this.$emit('ok', formData)
          }
        }
      },

      onCancelClick() {
        this.$emit('cancel')
      },

      onOkClick() {
        this.validate()
      }
    }
  }
</script>

<style scoped>
  .classification-image-size {
    width: 148px;
    height: 148px;
  }
</style>