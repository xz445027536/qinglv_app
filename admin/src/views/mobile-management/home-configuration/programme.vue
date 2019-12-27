<template>
  <!--eslint-disable-->
  <div>
    <div class="card-title" style="margin: 0 1%">
      <b>热门方案</b>
      <el-button type="primary" plain size="small" @click="showAddDialog">新增方案</el-button>
    </div>
    <div>
      <el-card class="box-card" v-for="(data,index) in solutionData" :key="solutionData.id">
        <div slot="header" class="card-title">
          <span>热门方案{{index + 1}}</span>
          <el-button type="danger" size="small" plain @click="onDeleteClick(data.id,data.solutionId)">删除当前方案
          </el-button>
        </div>
        <el-form>
          <el-form-item label="方案名称:">
            <el-select v-model="solutionData[index]" filterable placeholder="请选择" value-key="solutionId"
                       @change="changeSolution(index)">
              <el-option
                v-for="item in options"
                :key="item.solutionId"
                :label="item.solutionName"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="方案简介:">
            <el-input style="width: 200px" v-model="data.solutionDesc" placeholder="请输入方案简介"></el-input>
          </el-form-item>
          <el-form-item label="方案图片:">
            <img :src="data.goodsSolImg" v-if="data.goodsSolImg" style="width: 148px;height: 148px"/>
            <span v-else>无配图</span>
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
    <el-button type="primary" @click="saveAndUpdate" style="float: right;margin-top: 20px">同步至APP</el-button>
    <el-dialog
      :close-on-click-modal="false"
      title="新增方案"
      :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="方案名称:">
          <el-select v-model="newSolution" filterable placeholder="请选择" value-key="solutionId">
            <el-option
              v-for="item in options"
              :key="item.solutionId"
              :label="item.solutionName"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方案简介:">
          <el-input style="width: 200px" v-model="newSolution.solutionDesc" placeholder="请输入方案简介"></el-input>
        </el-form-item>
        <el-form-item label="方案图片:">
          <img :src="newSolution.goodsSolImg" style="width: 148px;height: 148px" v-if="newSolution.goodsSolImg">
          <span v-else>无配图</span>
          <el-upload action="" class="change-button"
                     v-if="newSolution.goodsSolImg"
                     :auto-upload="false"
                     :on-change="onImgChange"
                     :show-file-list="false">
            <el-button size="medium" type="primary" @click="clickUpload(newSolution)">修改图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSolution">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable */
  import {
    getBannerSolutions,
    deleteBannerSolution,
    saveAndUpdateBannerSolution,
    queryBannerSolutionData
  } from '@/api/homepage.js'

  import { readImageInfo } from '@/utils/index.js'

  export default {
    name: 'programme',
    data() {
      return {
        solutionData: [],
        options: [],
        dialogVisible: false,
        newSolution: {},
        uploadImageData: {},
        imageArr: [],
        ids: []
      }
    },
    created() {
      this.getSolutionsData()
      queryBannerSolutionData().then(res => {
        this.options = res.data
      })
    },
    methods: {
      getSolutionsData() {
        getBannerSolutions().then(res => {
          this.ids = []
          this.solutionData = res.data
          this.solutionData.forEach(item => {
            this.ids.push(item.id)
          })
        })
      },
      showAddDialog() {
        if (this.solutionData.length === 6) {
          this.$message('热门方案数量不能多于6')
          return
        }
        this.newSolution = {}
        this.dialogVisible = true
      },
      onDeleteClick(id, solutionId) {
        if (this.solutionData.length === 2) {
          this.$message('热门方案数量不能少于2')
          return
        }
        this.$msgbox({
          title: '删除当前热门方案？',
          message: '热门方案数量减少1，且删除整条热门方案内容，是否确定？',
          type: 'error',
          showCancelButton: true
        }).then(() => {
          if (!id) { // 删除临时新增方案数据
            for (var i in this.solutionData) {
              if (this.solutionData[i].solutionId === solutionId && !this.solutionData[i].id) {
                this.solutionData.splice(i, 1)
              }
            }
          } else { // 删除服务器数据
            deleteBannerSolution([id]).then(() => {
              this.getSolutionsData()
            })
          }
        }).catch(() => {
        })
      },
      addSolution() {
        this.dialogVisible = false
        this.solutionData.push(this.newSolution)
      },
      saveAndUpdate() {
        this.$msgbox({
          title: '同步热门方案修改？',
          message: '确认后APP将会实时同步更改',
          type: 'warning',
          showCancelButton: true
        }).then(() => {
          //热门方案无配图时不能同步
          for (var i in this.solutionData) {
            if(!this.solutionData[i].goodsSolImg){
              this.$message({
                type: 'error',
                message: '存在无配图方案，同步失败'
              })
              return
            }
          }
          var form = new FormData()
          form.append('params', JSON.stringify(this.solutionData))
          if (this.imageArr.length > 0) {
            for (var i in this.imageArr) {
              form.append(this.imageArr[i].seqNum.toString(), this.imageArr[i].file)
            }
          }
          saveAndUpdateBannerSolution(form).then(() => {
            this.getSolutionsData()
            queryBannerSolutionData().then(res => {
              this.options = res.data
            })
            this.$message({
              type: 'success',
              message: '同步成功'
            })
          })
        }).catch(() => {
        })
      },
      onImgChange(file, fileList) {
        readImageInfo(file).then(res => {
          if (res.width === 148 && res.height === 148) {
            this.setImageArr(file)
          } else {
            this.$msgbox({
              title: '图片大小错误',
              message: '图片像素大小为148*148 ',
              type: 'error'
            })
          }
        })
      },
      setImageArr(file) {
        var data = {}
        this.uploadImageData.goodsSolImg = file.url
        data.seqNum = this.uploadImageData.seqNum
        data.file = file.raw
        for (var i in this.imageArr) {
          if (this.imageArr[i].seqNum === data.seqNum) {
            this.imageArr.splice(i, 1)
          }
        }
        this.imageArr.push(data)
      },
      clickUpload(data) {
        this.uploadImageData = data
      },
      changeSolution(data) {
        this.solutionData[data].id = this.ids[data]
      }
    }
  }
</script>

<style scoped>
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
</style>