<template>
  <div>
    <div style="width: 40%">
      <el-form size="small" :inline="true" :model="classificationForm">
        <el-form-item>
          <el-button type="primary" @click="addFirstClassification">新增 1 级分类</el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="filterText" placeholder="请输入分类名称进行筛选"></el-input>
        </el-form-item>
      </el-form>

      <el-tree
        ref="tree"
        :indent="32"
        :data="treeData"
        default-expand-all
        :props="defaultProps"
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        highlight-current
        node-key="catId"
        @node-click="handleNodeClick">
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <img style="width: 26px; height: 26px;" v-if="data.catLevel === 1 && data.catImg" :src="data.catImg" alt="1 级分类图片">
          <img style="width: 24px; height: 24px;" v-if="data.catLevel === 3 && data.goodsUrl" :src="data.goodsUrl" alt="3 级分类图片">
          <div :style="{ color: data.isDisable === 1 ? '#c0c4cc' : ''}" style="margin-left: 6px;" class="fill-remain"><b>{{node.label}}</b></div>
          <span>
            <el-button
              v-if="data.catLevel !== 3"
              type="text"
              size="mini"
              @click="() => append(data)">
              新增
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => edit(data)">
              编辑
            </el-button>
            <el-button
              style="color: #c0c4cc"
              v-if="!data.isDisable"
              type="text"
              size="mini"
              @click="() => disable(node, data)">
              禁用
            </el-button>
            <el-button
              v-else
              type="text"
              size="mini"
              @click="() => enable(node, data)">
              启用
            </el-button>
          </span>
        </div>
      </el-tree>

      <!--<div>{{classificationData}}</div>-->

    </div>

    <app-classification-dialog
      :selectedId="selectedId"
      :classLevel="currentClassLevel"
      :dialogVisible="dialogVisible"
      :actionType="actionType"
      :dialogTitle="dialogTitle"
      @ok="onOkClick($event)"
      @cancel="onCancelClick">
    </app-classification-dialog>
  </div>
</template>

<script>
  import {
    addFirstAndSecondClassification, addThirdClassification, disableClassification, enableClassification,
    getClassificationTree,
    updateFirstAndSecondClassification, updateThirdClassification
  } from '../../../api/scheme-and-material'

  const EDIT = 1
  const ADD = 2

  import ClassificationDialog from './classification-dialog'

  export default {
    name: 'classification',
    components: {
      'app-classification-dialog': ClassificationDialog
    },
    props: {
      classificationObject: {
        type: Object,
        required: true
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    computed: {
      treeData: {
        get() {
          return this.classificationObject.treeData
        },
        set(newData) {
          this.classificationObject.treeData = newData
        }
      }
    },
    data() {
      return {
        classificationForm: {
          classificationName: ''
        },
        filterText: '',
        defaultProps: {
          children: 'childCatalog',
          label: 'catalogName'
        },

        dialogVisible: false,
        dialogTitle: '',
        selectedId: '',
        currentClassLevel: -1,
        currentClassParentId: -1, // 新增 2，3 级分类时需要
        actionType: -1
      }
    },
    created() {
    },
    methods: {
      fetchClassificationData() {
        getClassificationTree().then(res => {
          this.treeData = res.data
        }).catch(err => {
          console.log('获取分类树出错: ', err)
        })
      },

      filterNode(value, data) {
        if (!value) return true
        return data.catalogName.indexOf(value) !== -1
      },

      /**
       * 新增 1 级分类
       */
      addFirstClassification() {
        this.actionType = ADD
        this.currentClassLevel = 1
        this.selectedId = ''
        this.dialogVisible = true
        this.dialogTitle = '新增 1 级分类'
      },

      handleNodeClick() {
      },

      /**
       * 新增 2，3 级分类
       * @param data
       */
      append(data) {
        console.log(data)
        this.actionType = ADD
        this.dialogVisible = true
        this.dialogTitle = `新增 ${data.catLevel + 1} 级分类`
        this.selectedId = data.catId
        // this.currentClassParentId = data.catId
        this.currentClassLevel = data.catLevel + 1
      },

      edit(data) {
        this.actionType = EDIT
        this.dialogVisible = true
        this.dialogTitle = `编辑 ${data.catLevel} 级分类`
        this.selectedId = data.catId
        this.currentClassLevel = data.catLevel
      },

      disable(node, data) {
        this.$confirm('此操作将禁用该类别及其包含的子类别（APP端不再显示），是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          disableClassification(data.catId, data.catLevel).then(res => {
            this.$message.success(res.message)
            this.fetchClassificationData()
          }).catch(err => {
            console.log('禁用分类出错: ', err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          })
        })
      },

      enable(node, data) {
        this.$confirm('此操作将启用该类别及其包含的子类别（将在APP端显示），是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          enableClassification(data.catId, data.catLevel).then(res => {
            this.$message.success(res.message)
            this.fetchClassificationData()
          }).catch(err => {
            console.log('启用分类出错: ', err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          })
        })
      },

      onOkClick(val) {
        console.log(this.currentClassLevel)
        if (this.actionType === ADD) { // 新增
          if (this.currentClassLevel === 3) { // 新增 3 级分类
            console.log('新增 third', val)
            addThirdClassification(val).then(res => {
              this.$message.success(res.message)
              this.dialogVisible = false
              this.fetchClassificationData()
            }).catch(err => {
              console.log('新增 3 级分类出错: ', err)
            })
          } else { // 新增 1，2 级分类
            addFirstAndSecondClassification(val).then(res => {
              console.log('addFirstAndSecondClassification: ', res)
              this.$message.success(res.message)
              this.dialogVisible = false
              this.fetchClassificationData()
            }).catch(err => {
              console.log('新增 1,2 级分类出错', err)
            })
          }
        } else if (this.actionType === EDIT) {
          if (this.currentClassLevel === 3) {
            console.log('更新 third', val)
            updateThirdClassification(val).then(res => {
              this.$message.success(res.message)
              this.dialogVisible = false
              this.fetchClassificationData()
            }).catch(err => {
              console.log('更新分类出错: ', err)
            })
          } else {
            console.log('else', this.currentClassLevel)
            updateFirstAndSecondClassification(val).then(res => {
              console.log('updateFirstAndSecondClassification: ', res)
              this.$message.success(res.message)
              this.dialogVisible = false
              this.fetchClassificationData()
            }).catch(err => {
              console.log('更新 1,2 级分类出错: ', err)
            })
          }
        }
      },

      onCancelClick() {
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
    font-size: 14px;
    padding-right: 8px;
  }

</style>