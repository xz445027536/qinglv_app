<template>
  <div class="page-content">
    <div>
      <el-button size="small" type="primary" @click="appendPersonnel">新增</el-button>
    </div>
    <app-table
      :data="personnelData"
      :colConfigs="personnelColConfigs">
      <el-table-column
        type="index"
        slot="index"
        width="80"
        label="序号"
        sortable
        align="center">
      </el-table-column>
      <el-table-column slot="action" label="操作" align="center">
        <template slot-scope="scope">
          <div id="action">
            <!--<el-button type="text" @click="editPersonnel(scope.row.id)">编辑</el-button>-->
            <el-button type="text" @click="deletePersonnel(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </app-table>

    <div>
      <el-pagination
        class="pagination-style"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <app-personnel-dialog
      roleCode="-1"
      :selectedId="selectedId"
      :dialogVisible="dialogVisible"
      :actionType="actionType"
      :dialogTitle="dialogTitle"
      @ok="onOkClick($event)"
      @cancel="onCancelClick">
    </app-personnel-dialog>
  </div>
</template>

<script>
  // type { 0: '查看(详情)', 1: '编辑', 2: '新增'}
  // const VIEW = 0
  // const EDIT = 1
  const ADD = 2

  import MyTable from '../../components/MyTable/my-table'
  import PersonnelDialog from './add-personnel-dialog'
  import { addPersonnel, deletePersonnelById, getPersonnelList } from '../../api/auth'

  export default {
    name: 'auth',
    components: {
      'app-table': MyTable,
      'app-personnel-dialog': PersonnelDialog
    },
    data() {
      return {
        personnelData: [],
        personnelColConfigs: [
          {
            slot: 'index'
          },
          {
            prop: 'userName',
            label: '用户名'
          },
          {
            prop: 'userCode',
            label: '工号'
          },
          {
            slot: 'action'
          }
        ],
        pageSize: 10,
        currentPage: 1,
        total: 0,

        dialogVisible: false,
        dialogTitle: '',
        actionType: -1,
        selectedId: 1
      }
    },
    created() {
      this.fetchPersonnelData(this.currentPage)
    },
    methods: {
      fetchPersonnelData(currentPage) {
        const params = {
          pageSize: this.pageSize,
          jumpPage: currentPage
        }
        getPersonnelList(params).then(res => {
          this.personnelData = res.data.recoreds
          this.total = res.data.total
        }).catch(err => {
          console.log('获取管理员列表出错: ', err)
        })
      },

      appendPersonnel() {
        this.dialogTitle = '新增用户'
        this.actionType = ADD
        this.dialogVisible = true
      },

      editPersonnel() {},

      deletePersonnel(id) {
        this.$confirm('确实要删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePersonnelById(id).then(res => {
            this.$message.success(res.message)
            this.fetchPersonnelData(this.currentPage)
          }).catch(err => {
            console.log('删除用户出错: ', err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
      },

      handleCurrentChange(currentPage) {
        this.fetchPersonnelData(currentPage)
      },

      onOkClick(val) {
        addPersonnel(val).then(res => {
          this.$message.success(res.message)
          this.fetchPersonnelData(this.currentPage)
          this.dialogVisible = false
        }).catch(err => {
          console.log('新增管理员出错: ', err)
        })
      },

      onCancelClick() {
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped>

</style>