<template>
  <div>
    <div>
      <el-form size="small" :inline="true" :model="packCarbonForm">
        <el-form-item label="物料编码">
          <el-input v-model.trim="packCarbonForm.matCode" placeholder="请输入物料编码"></el-input>
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input v-model.trim="packCarbonForm.matName" placeholder="请输入物料名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchPackCarbon">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="refreshPackCarbon">刷新</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addPackCarbon">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportPackCarbon">导出 CSV</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-packcarbon"
            :action="importUrl"
            accept="xls/xlsx"
            :with-credentials="true"
            :on-error="handleError"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">导入 CSV</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <app-table :data="tableData" :colConfigs="packCarbonColConfigs">
      <el-table-column fixed="right" slot="action" label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <!-- <el-button type="text" @click="materialDetail(scope.row.matId)">详情</el-button> -->
            <el-button type="text" @click="editPackCarbon(scope.row.id)">编辑</el-button>
            <!-- <el-button type="text" @click="deleteMaterial(scope.row.matId)">删除</el-button> -->
          </div>
        </template>
      </el-table-column>
    </app-table>

    <div>
      <el-pagination
        class="pagination-style"
        @current-change="handlePackCarbonChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <app-packCarbon-dialog
      :selectedPackCarbonId="selectedPackCarbonId"
      :dialogVisible="dialogVisible"
      :isSubmitting="isSubmitting"
      :actionType="actionType"
      :dialogTitle="dialogTitle"
      @submittingStatus="handleSubmittingStatus($event)"
      @changeToEdit="changeToEdit"
      @ok="onOkClick($event)"
      @cancel="onCancelClick"
    ></app-packCarbon-dialog>
  </div>
</template>

<script>
// type { 0: '查看(详情)', 1: '编辑', 2: '新增'}
import {
  exportPackCarbonToFile,
  getPackCarbonList,
  updatePackCarbon,
  savePackCarbon
} from '../../../api/scheme-and-material'

const VIEW = 0
const EDIT = 1
const ADD = 2

import MyTable from '../../../components/MyTable/my-table'
import packCarbonDialog from './packCarbon-dialog'

export default {
  name: 'packcarbon',
  components: {
    'app-table': MyTable,
    'app-packCarbon-dialog': packCarbonDialog
  },
  props: {
    packCarbonObject: {
      type: Object,
      required: true
    }
  },
  computed: {
    importUrl() {
      return process.env.GW_API + '/matconfig/import'
    },
    tableData: {
      get() {
        return this.packCarbonObject.packCarbonData
      },
      set(newData) {
        this.packCarbonObject.packCarbonData = newData
      }
    },
    total: {
      get() {
        return this.packCarbonObject.totalPackCarbon
      },
      set(newValue) {
        this.packCarbonObject.totalPackCarbon = newValue
      }
    },
    Myheaders() {
      return {
        'content-type': 'application/json;charset=utf-8'
      }
    }
  },
  data() {
    return {
      isSubmitting: false,
      currentPage: 1,
      pageSize: 10,
      packCarbonForm: {
        matCode: '',
        matName: ''
      },
      packCarbonColConfigs: [
        {
          prop: 'matCategory',
          label: '物料类别'
        },
        {
          prop: 'matCode',
          label: '物料编码',
          width: 120
        },
        {
          prop: 'matName',
          label: '物料名称',
          width: 170
        },
        {
          prop: 'matDimension',
          label: '规格尺寸',
          width: 150
        },
        {
          prop: 'matTexture',
          label: '材料材质'
        },
        {
          prop: 'matWeightKg',
          label: '材料重量（KG）',
          width: 100
        },
        {
          prop: 'matMainCarbon',
          label: '主包装碳排放值'
        },
        {
          prop: 'elecWaybill',
          label: '电子运单',
          width: 80
        },
        {
          prop: 'elecWaybillCarbon',
          label: '电子运单碳排放值'
        },
        {
          prop: 'scotchTapeLength',
          label: '透明胶纸（M）'
        },
        {
          prop: 'scotchTapeCarbon',
          label: '透明胶纸碳排放值'
        },
        {
          prop: 'total',
          label: '数量',
          width: 60
        },
        {
          prop: 'carbonValue',
          label: '包装材料总碳排放值'
        },
        {
          slot: 'action'
        }
      ],

      dialogVisible: false,
      dialogTitle: '',
      selectedPackCarbonId: '',
      actionType: -1
    }
  },
  methods: {
    searchPackCarbon() {
      this.currentPage = 1
      this.handlePackCarbonChange(this.currentPage)
    },

    refreshPackCarbon() {
      this.packCarbonForm = {
        matCode: '',
        matName: ''
      }
      this.currentPage = 1
      this.handlePackCarbonChange(this.currentPage)
    },

    addPackCarbon() {
      this.actionType = ADD
      this.dialogVisible = true
      this.dialogTitle = '新增包装材料碳排值配置'
    },

    exportPackCarbon() {
      // 拦截器中判断了 header 这里的 res 是直接返回的 response 而非 response.data
      exportPackCarbonToFile()
    },

    importPackCarbon() {},
    materialDetail(PackCarbonId) {
      this.selectedPackCarbonId = PackCarbonId
      this.actionType = VIEW
      this.dialogVisible = true
      this.dialogTitle = '材料详情'
    },

    editPackCarbon(PackCarbonId) {
      this.selectedPackCarbonId = PackCarbonId
      this.actionType = EDIT
      this.dialogVisible = true
      this.dialogTitle = '修改包装材料碳排值配置'
    },

    handlePackCarbonChange(currentPage) {
      const params = {
        jumpPage: currentPage,
        pageSize: this.pageSize
      }
      if (this.packCarbonForm.matName) {
        Object.assign(params, { matName: this.packCarbonForm.matName })
      }
      if (this.packCarbonForm.matCode) {
        Object.assign(params, { matCode: this.packCarbonForm.matCode })
      }
      getPackCarbonList(params)
        .then(res => {
          this.tableData = res.data.recoreds
          this.total = res.data.total
        })
        .catch(err => {
          console.log('获取包装碳排配置列表出错:', err)
        })
    },

    onOkClick(val) {
      if (this.actionType === ADD) {
        savePackCarbon(val)
          .then(res => {
            this.$message.success(res.message)
            this.handlePackCarbonChange(1)
            this.dialogVisible = false
            this.isSubmitting = false
          })
          .catch(err => {
            this.isSubmitting = false
            console.log('保存数据出错: ', err)
          })
      } else if (this.actionType === EDIT) {
        updatePackCarbon(val)
          .then(res => {
            this.$message.success(res.message)
            this.handlePackCarbonChange(1)
            this.dialogVisible = false
            this.isSubmitting = false
          })
          .catch(err => {
            this.isSubmitting = false
            console.log('更新数据出错: ', err)
          })
      } else {
        this.packCarbonForm = {
          matCategory: '',
          matCode: '',
          matName: '',
          matDimension: '',
          matTexture: '',
          matWeightKg: '',
          matMainCarbon: '',
          elecWaybill: '1',
          elecWaybillCarbon: '',
          scotchTapeCarbon: '',
          total: '1',
          carbonValue: ''
        }
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

    handleSuccess(res) {
      if (res.status === 'ERROR') {
        alert(res.message)
      } else {
        alert('导入成功！')
      }
    },
    handleError() {
      alert('导入失败，请重新导入！')
    }
  }
}
</script>

<style scoped>
</style>