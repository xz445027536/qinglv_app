<template>
  <div>
    <div class="card-title" style="margin: 0 1%">
      <b>特色包材</b>
      <el-button type="primary" plain size="small" @click="showAddDialog">新增特色包材</el-button>
    </div>
    <div>
      <el-card class="box-card" v-for="(data,index) in matData" :key="matData.id">
        <div slot="header" class="card-title">
          <span>特色包材{{index + 1}}</span>
          <el-button style="float: right" type="danger" size="small" plain @click="onDeleteClick(data.id,data.matId)">
            删除当前包材
          </el-button>
        </div>
        <el-form>
          <el-form-item label="包材名称:">
            <el-select v-model="matData[index]" filterable placeholder="请选择" @change="changeMat(index)"
                       value-key="matId">
              <el-option
                v-for="item in options"
                :key="item.matId"
                :label="item.matName"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="包材亮点:">
            <el-input style="width: 200px" v-model="data.feature"></el-input>
          </el-form-item>
          <el-form-item label="包材标签:">
            <el-tag
              v-for="label in data.matLables"
              closable
              :key="label.labelName"
              @close="handleTagClose(data.matLables,label)">
              {{label.labelName}}
            </el-tag>
            <el-tooltip v-if="data.inputVisible!=1" effect="dark" content="最多添加 3 个标签" placement="top">
              <el-input
                class="input-new-tag"
                :disabled="data.matLables.length >= 3"
                v-model="data.inputValue"
                placeholder="+ New Tag"
                size="small"
                @keyup.enter.native.trim="handleInputConfirm(data)"
                :maxlength="5"
                @blur="handleInputConfirm(data)">
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="包材图片:">
            <img :src="data.matImg" style="width: 260px;height: 196px"/>
            <el-upload action="" class="change-button"
                       :auto-upload="false"
                       :on-change="onImgChange"
                       :show-file-list="false">
              <el-button size="medium" type="primary" @click="clickUpload(data)">修改图片</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="新增特色包材"
      :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="包材名称:">
          <el-select v-model="newMat" filterable placeholder="请选择" value-key="matId">
            <el-option
              v-for="item in options"
              :key="item.matId"
              :label="item.matName"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包材标签:">
          <el-tag
            v-for="label in newMat.matLables"
            :key="label.labelName">
            {{label.labelName}}
          </el-tag>
        </el-form-item>
        <el-form-item label="包材图片:">
          <img :src="newMat.matImg" style="width: 260px;height: 196px" v-if="newMat.matImg"/>
          <el-upload action="" class="change-button"
                     v-if="newMat.matImg"
                     :auto-upload="false"
                     :on-change="onImgChange"
                     :show-file-list="false">
            <el-button size="medium" type="primary" @click="clickUpload(newMat)">修改图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMat">确 定</el-button>
      </span>
    </el-dialog>
    <el-button type="primary" @click="saveAndUpdate" style="float: right;margin-top: 20px">同步至APP</el-button>
  </div>
</template>

<script>
  /* eslint-disable */
  import {
    getBannerMats,
    deleteBannerMats,
    saveAndUpdateBannerMats,
    getPackMats
  } from '@/api/homepage.js'
  import { readImageInfo } from '@/utils/index.js'

  export default {
    name: 'material',
    directives: {
      focus: {
        inserted: function (el, { value }) {
          if (value) {
            el.focus();
          }
        }
      }
    },
    data() {
      return {
        matData: [],
        newMat: {},
        options: [],
        dialogVisible: false,
        uploadImageData: {},
        imageArr: [],
        ids: []
      }
    },
    created() {
      this.getMataData()
      getPackMats().then(res => {
        this.options = res.data
      })
    },
    methods: {
      getMataData() {
        getBannerMats().then(res => {
          this.ids = []
          this.matData = res.data
          this.matData.forEach(item => {
            this.ids.push(item.id)
          })
        })
      },
      handleInputConfirm(data) {
        if (data.inputValue) {
          if (data.inputValue.length > 5) {
            this.$message.warning('标签名称长度不得超过 5')
            return
          }
          if (data.matLables.map(item => item.labelName).includes(data.inputValue)) {
            this.$message.warning('标签已存在')
            return
          }
          data.matLables.push({
            labelId: '',
            labelName: data.inputValue
          })
          data.inputValue = ''
        }

      },
      showInput(data) {
        data.inputVisible = '1'
        data.inputFocus = true
      },
      handleTagClose(lables, label) {
        lables.splice(lables.indexOf(label), 1)
      },
      showAddDialog() {
        if (this.matData.length === 7) {
          this.$message('特色包材数量不能多于7')
          return
        }
        this.newMat = {}
        this.dialogVisible = true
      },
      onDeleteClick(id, matId) {
        if (this.matData.length === 2) {
          this.$message('特色包材数量不能少于2')
          return
        }
        this.$msgbox({
          title: '删除当前特色包材？',
          message: '包材数量将会减少，且删除整条特色包材内容，是否确定？',
          type: 'error',
          showCancelButton: true
        }).then(() => {
          if (!id) { // 删除临时新增方案数据
            for (var i in this.matData) {
              if (this.matData[i].matId === matId && !this.matData[i].id) {
                this.matData.splice(i, 1)
              }
            }
          } else {
            deleteBannerMats([id]).then(() => {
              this.getMataData()
            })
          }
        }).catch(() => {
        })
      },
      addMat() {
        this.dialogVisible = false
        this.matData.push(this.newMat)
      },
      onImgChange(file, fileList) {
        readImageInfo(file).then(res => {
          if (res.width === 260 && res.height === 196) {
            this.setImageArr(file)
          } else {
            this.$msgbox({
              title: '图片大小错误',
              message: '图片像素大小为260*196 ',
              type: 'error'
            })
          }
        })
      },
      clickUpload(data) {
        this.uploadImageData = data
      },
      setImageArr(file) {
        var data = {}
        this.uploadImageData.matImg = file.url
        data.seqNum = this.uploadImageData.seqNum
        data.file = file.raw
        for (var i in this.imageArr) {
          if (this.imageArr[i].seqNum === data.seqNum) {
            this.imageArr.splice(i, 1)
          }
        }
        this.imageArr.push(data)
      },
      changeMat(data) {
        this.matData[data].id = this.ids[data]
      },
      saveAndUpdate() {
        this.$msgbox({
          title: '同步特色包材修改？',
          message: '确认后APP将会实时同步更改',
          type: 'warning',
          showCancelButton: true
        }).then(() => {
          var form = new FormData()
          form.append('params', JSON.stringify(this.matData))
          if (this.imageArr.length > 0) {
            for (var i in this.imageArr) {
              form.append(this.imageArr[i].seqNum.toString(), this.imageArr[i].file)
            }
          }
          saveAndUpdateBannerMats(form).then(() => {
            this.getMataData()
            getPackMats().then(res => {
              this.options = res.data
            })
            this.$message({
              type: 'success',
              message: '同步成功'
            })
          })
        })
      }
    }
  }
</script>

<style scoped>
  .el-tag {
    margin-left: 10px;
  }

  .card-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between
  }

  .box-card {
    display: inline-block;
    width: 48%;
    margin: 1%
  }

  .change-button {
    position: absolute;
    bottom: 0;
    right: 0
  }

  .input-new-tag {
    width: 100px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .tag-length-alert {
    height: 32px;
    width: 75%;
    margin-top: 6px;
  }

</style>