<template>
  <div class="page-content">
    <div>
      <h2><b>人员管理</b></h2>
      <div>
        <el-button size="small" type="primary" @click="addPersonnel">新增</el-button>
      </div>
      <app-table
        :data="tableData"
        :isLoading="isLoading"
        :colConfigs="colConfigs">
        <el-table-column slot="action" label="操作" align="left">
          <template slot-scope="scope">
            <div id="action">
              <!--<el-button type="primary" @click="viewInfo(scope.row.id)">查看</el-button>-->
              <el-button type="primary" @click="editPersonnel(scope.row.id)">编辑</el-button>
              <el-button type="primary" @click="roleAssign(scope.row.sysUserUid, scope.row.sysName)">分配角色</el-button>
              <el-button type="danger" @click="deletePersonnel(scope.row.id)">删除</el-button>
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
    </div>

    <app-personnel-dialog
      :dialogVisible="dialogVisible"
      :actionType="actionType"
      :selectedId="selectedId"
      @ok="onOkClick($event)"
      @cancel="onCancelClick">
    </app-personnel-dialog>

    <app-personnel-role-dialog
      :dialogVisible="personnelRoleVisible"
      :selectedUserUid="selectedUserUid"
      :selectedName="selectedName"
      @roleChanged="roleHasChanged=true"
      @cancel="onRoleAssignCancel">
    </app-personnel-role-dialog>
  </div>

</template>

<script>
  import { getPersonnelList, updatePersonnel, insertPersonnel, deletePersonnel } from '../../../api/system'
  import MyTable from '../../../components/MyTable/my-table'
  import PersonnelDialog from './personnel-edit'
  import PersonnelRoleDialog from './personnel-role'

  export default {
    components: {
      'app-table': MyTable,
      'app-personnel-dialog': PersonnelDialog,
      'app-personnel-role-dialog': PersonnelRoleDialog
    },
    name: 'personnel',
    data() {
      return {
        tableData: [],
        colConfigs: [
          {
            prop: 'sysUsername',
            label: '工号',
            sortable: true
          }, {
            prop: 'sysName',
            label: '姓名',
            sortable: false
          }, {
            slot: 'action'
          }
        ],
        isLoading: false,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        dialogVisible: false,
        actionType: -1, /* actionType { 0: '查看', 1: '编辑', 2: '新增'} 目前把 '查看' 去掉了 */
        selectedId: -1,
        /* 人员角色分配相关 */
        personnelRoleVisible: false,
        selectedUserUid: '',
        selectedName: '',
        roleHasChanged: false
      }
    },
    created() {
      this.fetchData(1)
    },
    methods: {
      fetchData(page = 1) {
        this.isLoading = true
        getPersonnelList((page - 1) * this.pageSize, this.pageSize).then(response => {
          this.isLoading = false
          this.tableData = response.obj.rows
          this.total = response.obj.totalRecord
        })
      },

      handleCurrentChange(currentPage) {
        this.fetchData(currentPage)
      },

      // viewInfo(id) {
      //   this.selectedId = id
      //   this.actionType = 0
      //   this.dialogVisible = true
      // },

      addPersonnel() {
        this.actionType = 2
        this.dialogVisible = true
      },

      editPersonnel(id) {
        this.selectedId = id
        this.actionType = 1
        this.dialogVisible = true
      },

      onOkClick(params) {
        if (this.actionType === 1) { // 此时为编辑
          updatePersonnel(params).then(response => {
            if (response.obj) {
              this.dialogVisible = false
              this.$message.success('编辑人员成功!')
            } else {
              this.$message.error('编辑人员失败!')
            }
            this.fetchData(this.currentPage)
          })
        } else if (this.actionType === 2) { // 此时为新增
          insertPersonnel(params).then(response => {
            if (response.obj) {
              this.dialogVisible = false
              this.$message.success('新增人员成功!')
            } else {
              this.$message.error('新增人员失败!')
            }
            this.fetchData(this.currentPage)
          })
        }
      },

      onCancelClick() {
        this.dialogVisible = false
      },

      roleAssign(sysUserUid, sysName) {
        this.selectedUserUid = sysUserUid
        this.selectedName = sysName
        this.personnelRoleVisible = true
      },

      // onRoleAssignClick(params) {
      //   console.log('roleAssign: ', params)
      // },

      onRoleAssignCancel() {
        this.personnelRoleVisible = false
        if (this.roleHasChanged) {
          this.$store.commit('SET_NEED_RELOAD', true)
          // this.$router.push({ name: '事件定义' })
        }
      },

      deletePersonnel(id) {
        this.$confirm('确定要删除该人员吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePersonnel(id).then(response => {
            if (response.success) {
              this.fetchData(this.currentPage)
              this.$message.success('成功删除该人员!')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
