<template>
  <div class="page-content">
    <div>
      <h2>角色管理</h2>
      <div>
        <el-button size="small" type="primary" @click="addPersonnel">新增</el-button>
      </div>
      <app-table
        :data="tableData"
        :colConfigs="colConfigs">
        <el-table-column slot="action" label="操作" min-width="240">
          <template slot-scope="scope">
            <div id="action">
              <!--<el-button type="primary" @click="viewInfo(scope.row.id)">查看</el-button>-->
              <el-button type="primary" @click="editRole(scope.row.id)">编辑</el-button>
              <el-button type="primary" @click="resourceAssign(scope.row.sysRoleUid, scope.row.sysRoleName)">分配资源</el-button>
              <!--<el-button type="primary" @click="enableQuery(scope.row.id)">启用查询</el-button>-->
              <el-button type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
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

    <app-role-dialog
      :dialogVisible="dialogVisible"
      :actionType="actionType"
      :selectedId="selectedId"
      @ok="onOkClick($event)"
      @cancel="onCancelClick">
    </app-role-dialog>

    <app-role-resource-dialog
      :dialogVisible="roleResourceVisible"
      :selectedName="selectedName"
      :selectedRoleId="selectedRoleId"
      @ok="onResourceAssignClick($event)"
      @cancel="onResourceAssignCancel">
    </app-role-resource-dialog>

  </div>

</template>

<script>
  import { getRoleList, updateRoleResource, insertRole, updateRole, deleteRole } from '../../../api/system'
  import MyTable from '../../../components/MyTable/my-table'
  import RoleDialog from './role-edit'
  import RoleResourceDialog from './role-resource'

  export default {
    components: {
      'app-table': MyTable,
      'app-role-dialog': RoleDialog,
      'app-role-resource-dialog': RoleResourceDialog
    },
    name: 'personnel',
    data() {
      return {
        tableData: [],
        colConfigs: [
          {
            prop: 'sysRoleName',
            label: '角色名字',
            sortable: false
          }, {
            prop: 'sysRoleDesc',
            label: '角色描述',
            sortable: false
          }, {
            prop: 'isDefault',
            label: '默认角色',
            sortable: false
          }, {
            prop: 'isDefault',
            label: '查询控制',
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
        actionType: -1, // actionType { 0: '查看', 1: '编辑', 2: '新增'} 目前把 '查看' 去掉了
        selectedId: -1,
        /* 分配资源相关 */
        selectedRoleId: '',
        roleResourceVisible: false,
        selectedName: ''
      }
    },
    created() {
      this.fetchData(1)
    },
    methods: {
      fetchData(page = 1) {
        this.isLoading = true
        getRoleList((page - 1) * this.pageSize, this.pageSize).then(response => {
          this.isLoading = false
          this.tableData = response.obj.rows.map(item => {
            item.isDefault = item.isDefault ? '是' : '否'
            return item
          })
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

      editRole(id) {
        this.selectedId = id
        this.actionType = 1
        this.dialogVisible = true
      },

      onOkClick(params) {
        if (this.actionType === 1) { // 此时为编辑
          updateRole(params).then(response => {
            if (response.success) {
              this.dialogVisible = false
              this.$message.success('编辑角色成功!')
            }
          })
        } else if (this.actionType === 2) { // 此时为新增
          insertRole(params).then(response => {
            if (response.success) {
              this.dialogVisible = false
              this.$message.success('新增角色成功!')
            }
          })
        }
        this.fetchData()
      },

      onCancelClick() {
        this.dialogVisible = false
      },

      resourceAssign(sysRoleUid, sysRoleName) {
        this.selectedRoleId = sysRoleUid
        this.selectedName = sysRoleName
        this.roleResourceVisible = true
      },

      deleteRole(id) {
        this.$confirm('确定要删除该角色吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole(id).then(response => {
            if (response.success) {
              this.$message.success('成功删除该角色!')
            }
            this.fetchData(this.currentPage)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },

      enableQuery(id) {},

      onResourceAssignClick(params) {
        updateRoleResource(params).then(response => {
          if (response.success) {
            this.roleResourceVisible = false
            this.$message.success('分配资源节点成功!')
            this.$store.commit('SET_NEED_RELOAD', true)
            // this.$router.push({ name: '事件定义' })
          }
        })
      },

      onResourceAssignCancel() {
        this.roleResourceVisible = false
      }
    }
  }
</script>

<style scoped>

</style>
