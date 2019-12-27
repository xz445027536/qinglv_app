<template>
  <div>
    <div>
      <el-form size="small" :inline="true" :model="materialForm">
        <el-form-item label="物料编号">
          <el-input v-model.trim="materialForm.matCode" placeholder="请输入物料编码"></el-input>
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input v-model.trim="materialForm.matName" placeholder="请输入物料名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchMaterial">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="refreshMaterial">刷新</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addMaterial">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportMaterial">导出 CSV</el-button>
        </el-form-item>
      </el-form>
    </div>

    <app-table
      :data="tableData"
      :colConfigs="materialColConfigs">
      <el-table-column
        type="index"
        slot="index"
        width="80"
        label="序号"
        sortable
        align="center">
      </el-table-column>
      <el-table-column fixed="right" slot="action" label="操作" align="center" min-width="150">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="materialDetail(scope.row.matId)">详情</el-button>
            <el-button type="text" @click="editMaterial(scope.row.matId)">编辑</el-button>
            <el-button type="text" @click="deleteMaterial(scope.row.matId)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </app-table>

    <div>
      <el-pagination
        class="pagination-style"
        @current-change="handleMaterialChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <app-material-dialog
      :selectedMaterialId="selectedMaterialId"
      :dialogVisible="dialogVisible"
      :isSubmitting="isSubmitting"
      :actionType="actionType"
      :dialogTitle="dialogTitle"
      @submittingStatus="handleSubmittingStatus($event)"
      @changeToEdit="changeToEdit"
      @delete="deleteMaterialFromDialog($event)"
      @ok="onOkClick($event)"
      @cancel="onCancelClick">
    </app-material-dialog>
  </div>
</template>

<script>
  // type { 0: '查看(详情)', 1: '编辑', 2: '新增'}
  import {
    deleteMaterial,
    exportMaterialToFile,
    getMaterialList,
    saveMaterial,
    updateMaterial
  } from '../../../api/scheme-and-material'

  const VIEW = 0
  const EDIT = 1
  const ADD = 2

  import MyTable from '../../../components/MyTable/my-table'
  import MaterialDialog from './material-dialog'

  export default {
    name: 'material',
    components: {
      'app-table': MyTable,
      'app-material-dialog': MaterialDialog
    },
    props: {
      materialObject: {
        type: Object,
        required: true
      }
    },
    computed: {
      tableData: {
        get() {
          return this.materialObject.materialData
        },
        set(newData) {
          this.materialObject.materialData = newData
        }
      },
      total: {
        get() {
          return this.materialObject.totalMaterial
        },
        set(newValue) {
          this.materialObject.totalMaterial = newValue
        }
      }
    },
    data() {
      return {
        isSubmitting: false,
        currentPage: 1,
        pageSize: 10,
        materialForm: {
          matCode: '',
          matName: ''
        },
        materialColConfigs: [
          {
            slot: 'index'
          },
          {
            prop: 'matCode',
            label: '物料编码',
            width: 120
          },
          {
            prop: 'matCatalog',
            label: '品名'
          },
          {
            prop: 'matName',
            label: '物料名称'
          },
          {
            prop: 'unitPrice',
            label: '单价'
          },
          {
            prop: 'matUnit',
            label: '单位'
          },
          {
            prop: 'size',
            label: '规格尺寸',
            width: 180
          },
          {
            prop: 'configArea',
            label: '配置地区'
          },
          {
            prop: 'configPosition',
            label: '配置岗位'
          },
          {
            prop: 'label',
            label: '标签',
            width: 180
          },
          {
            prop: 'applyScene',
            label: '应用场景/用法说明',
            minWidth: 200
          },
          {
            slot: 'action'
          }
        ],

        dialogVisible: false,
        dialogTitle: '',
        selectedMaterialId: '',
        actionType: -1
      }
    },
    created() {},
    methods: {
      searchMaterial() {
        this.currentPage = 1
        this.handleMaterialChange(this.currentPage)
      },

      refreshMaterial() {
        this.materialForm = {
          matCode: '',
          matName: ''
        }
        this.currentPage = 1
        this.handleMaterialChange(this.currentPage)
      },

      addMaterial() {
        this.actionType = ADD
        this.dialogVisible = true
        this.dialogTitle = '新增材料'
      },

      exportMaterial() {
        // 拦截器中判断了 header 这里的 res 是直接返回的 response 而非 response.data
        exportMaterialToFile()
        //   .then(res => {
        //   // const content = res attachment;filename=
        //   const fileName = res.headers['content-disposition'].replace('attachment;filename=', '')
        //   const blob = new Blob([res.data])
        //   const elink = document.createElement('a')
        //   elink.download = fileName
        //   elink.style.display = 'none'
        //   elink.href = URL.createObjectURL(blob)
        //   document.body.appendChild(elink)
        //   elink.click()
        //   URL.revokeObjectURL(elink.href) // 释放URL 对象
        //   document.body.removeChild(elink)
        // })
      },

      materialDetail(materialId) {
        this.selectedMaterialId = materialId
        this.actionType = VIEW
        this.dialogVisible = true
        this.dialogTitle = '材料详情'
      },

      editMaterial(materialId) {
        this.selectedMaterialId = materialId
        this.actionType = EDIT
        this.dialogVisible = true
        this.dialogTitle = '编辑材料'
      },

      deleteMaterial(materialId) {
        this.$confirm('材料删除后不可恢复，是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMaterial(materialId).then(res => {
            this.dialogVisible = false
            this.$message.success(res.message)
            this.handleMaterialChange(this.currentPage)
          }).catch(err => {
            console.log('删除材料出错: ', err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
      },

      handleMaterialChange(currentPage) {
        const params = {
          jumpPage: currentPage,
          pageSize: this.pageSize
        }
        if (this.materialForm.matCode) {
          Object.assign(params, { matCode: this.materialForm.matCode })
        }
        if (this.materialForm.matName) {
          Object.assign(params, { matName: this.materialForm.matName })
        }
        getMaterialList(params).then(res => {
          this.tableData = res.data.recoreds
          this.total = res.data.total
        }).catch(err => {
          console.log('获取材料配置列表出错: ', err)
        })
      },

      onOkClick(val) {
        // this.isSubmitting = true
        if (this.actionType === ADD) {
          saveMaterial(val).then(res => {
            this.$message.success(res.message)
            this.handleMaterialChange(1)
            this.dialogVisible = false
            this.isSubmitting = false
          }).catch(err => {
            this.isSubmitting = false
            console.log('保存材料出错: ', err)
          })
        } else if (this.actionType === EDIT) {
          updateMaterial(val).then(res => {
            this.$message.success(res.message)
            this.handleMaterialChange(1)
            this.dialogVisible = false
            this.isSubmitting = false
          }).catch(err => {
            this.isSubmitting = false
            console.log('更新材料出错: ', err)
          })
        }
      },

      onCancelClick() {
        this.dialogVisible = false
      },

      handleSubmittingStatus(isSubmitting) {
        this.isSubmitting = isSubmitting
      },

      changeToEdit() {
        this.actionType = EDIT
        this.dialogTitle = '编辑材料'
      },

      deleteMaterialFromDialog(materialId) {
        this.deleteMaterial(materialId)
      }
    }
  }
</script>

<style scoped>

</style>