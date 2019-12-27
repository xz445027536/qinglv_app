<template>
  <div>
    <div>
      <el-form size="small" :inline="true" :model="schemeForm">
        <el-form-item label="方案编号">
          <el-input v-model.trim="schemeForm.solutionCode" placeholder="请输入方案编号"></el-input>
        </el-form-item>
        <el-form-item label="方案名称">
          <el-input v-model.trim="schemeForm.solutionName" placeholder="请输入方案名称"></el-input>
        </el-form-item>
        <el-form-item label="包含材料">
          <el-input v-model.trim="schemeForm.materials" placeholder="请输入包含材料"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchScheme">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="refreshScheme">刷新</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="appendScheme">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportScheme">导出 CSV</el-button>
        </el-form-item>
      </el-form>
    </div>

    <app-table
      :data="tableData"
      :rowStyle="rowStyle"
      :colConfigs="schemeColConfigs">
      <el-table-column
        type="index"
        slot="index"
        label="序号"
        sortable
        align="center">
      </el-table-column>
      <el-table-column fixed="right" slot="action" label="操作" align="center" min-width="150">
        <template slot-scope="scope">
          <div class="link">
            <el-button type="text" @click="schemeDetail(scope.row.solutionId)">详情</el-button>
            <el-button type="text" @click="editScheme(scope.row.solutionId)">编辑</el-button>
            <el-button type="text" @click="deleteScheme(scope.row.solutionId)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </app-table>

    <div>
      <el-pagination
        class="pagination-style"
        @current-change="handleSchemeChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <app-scheme-dialog
      :selectedSchemeId="selectedSchemeId"
      :dialogVisible="dialogVisible"
      :isSubmitting="isSubmitting"
      :actionType="actionType"
      :dialogTitle="dialogTitle"
      @changeToEdit="changeToEdit"
      @submittingStatus="handleSubmittingStatus($event)"
      @delete="deleteMaterialFromDialog($event)"
      @ok="onOkClick($event)"
      @cancel="onCancelClick">
    </app-scheme-dialog>
  </div>
</template>

<script>
  // type { 0: '查看(详情)', 1: '编辑', 2: '新增'}
  import { deleteScheme, exportSchemeToFile, getSchemeList, updateScheme, addScheme } from '../../../api/scheme-and-material'

  const VIEW = 0
  const EDIT = 1
  const ADD = 2

  import MyTable from '../../../components/MyTable/my-table'
  import SchemeDialog from './scheme-dialog'

  export default {
    name: 'scheme',
    components: {
      'app-table': MyTable,
      'app-scheme-dialog': SchemeDialog
    },
    props: {
      schemeObject: {
        type: Object,
        required: true
      }
    },
    computed: {
      tableData: {
        get() {
          return this.schemeObject.schemeData
        },
        set(newData) {
          this.schemeObject.schemeData = newData
        }
      },
      total: {
        get() {
          return this.schemeObject.totalScheme
        },
        set(newValue) {
          this.schemeObject.totalScheme = newValue
        }
      }
    },
    data() {
      return {
        isSubmitting: false,
        currentPage: 1,
        pageSize: 10,
        schemeForm: {
          solutionCode: '',
          solutionName: '',
          materials: ''
        },
        schemeColConfigs: [
          {
            slot: 'index',
            width: 60
          },
          {
            prop: 'solutionCode',
            label: '方案编号',
            width: 120
          },
          {
            prop: 'solutionName',
            label: '方案名称',
            width: 160
          },
          {
            prop: 'material',
            label: '包含材料',
            minWidth: 240
          },
          {
            prop: 'unitPrice',
            label: '单套价格'
          },
          {
            prop: 'goodsSolImgCount',
            label: '热门方案图片'
          },
          {
            prop: 'packCmpltImgCount',
            label: '爆炸图'
          },
          {
            prop: 'processImgCount',
            label: '包装过程图'
          },
          {
            slot: 'action'
          }
        ],

        dialogVisible: false,
        dialogTitle: '',
        selectedSchemeId: '',
        actionType: -1
      }
    },
    created() {},
    methods: {
      rowStyle({ row, rowIndex }) {
        if (row.isBannerSol === '1') {
          return {
            background: '#f0f9eb',
            fontWeight: 'bold'
          }
        }
        return {}
      },

      searchScheme() {
        this.currentPage = 1
        this.handleSchemeChange(this.currentPage)
      },

      refreshScheme() {
        this.schemeForm = {
          solutionCode: '',
          solutionName: '',
          materials: ''
        }
        this.currentPage = 1
        this.handleSchemeChange(this.currentPage)
      },

      appendScheme() {
        this.actionType = ADD
        this.dialogVisible = true
        this.dialogTitle = '新增方案'
      },

      exportScheme() {
        exportSchemeToFile()
      },

      schemeDetail(solutionId) {
        this.selectedSchemeId = solutionId
        this.actionType = VIEW
        this.dialogVisible = true
        this.dialogTitle = '方案详情'
      },

      editScheme(solutionId) {
        this.selectedSchemeId = solutionId
        this.actionType = EDIT
        this.dialogVisible = true
        this.dialogTitle = '编辑方案'
      },

      deleteScheme(solutionId) {
        this.$confirm('方案删除后不可恢复，是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteScheme(solutionId).then(res => {
            this.dialogVisible = false
            this.$message.success(res.message)
            this.handleSchemeChange(this.currentPage)
          }).catch(err => {
            console.log('方案删除出错: ', err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
      },

      handleSchemeChange(currentPage) {
        const params = {
          jumpPage: currentPage,
          pageSize: this.pageSize
        }
        if (this.schemeForm.solutionCode) {
          Object.assign(params, { solutionCode: this.schemeForm.solutionCode })
        }
        if (this.schemeForm.solutionName) {
          Object.assign(params, { solutionName: this.schemeForm.solutionName })
        }
        if (this.schemeForm.materials) {
          Object.assign(params, { materials: this.schemeForm.materials })
        }
        getSchemeList(params).then(res => {
          this.tableData = res.data.recoreds
          this.total = res.data.total
        }).catch(err => {
          console.log('获取方案配置列表出错: ', err)
        })
      },

      onOkClick(formData) {
        // this.isSubmitting = true
        if (this.actionType === ADD) {
          console.log('add')
          addScheme(formData).then(res => {
            this.$message.success(res.message)
            this.handleSchemeChange(this.currentPage)
            this.dialogVisible = false
            this.isSubmitting = false
          }).catch(err => {
            this.isSubmitting = false
            console.log('新增方案出错: ', err)
          })
        } else if (this.actionType === EDIT) {
          updateScheme(formData).then(res => {
            this.$message.success(res.message)
            this.handleSchemeChange(this.currentPage)
            this.dialogVisible = false
            this.isSubmitting = false
          }).catch(err => {
            this.isSubmitting = false
            console.log('更新方案出错', err)
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
        this.dialogTitle = '编辑方案'
      },

      deleteMaterialFromDialog(solutionId) {
        this.deleteScheme(solutionId)
      }
    }
  }
</script>

<style scoped>

</style>