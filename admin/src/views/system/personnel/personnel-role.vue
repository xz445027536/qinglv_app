<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @open="onDialogOpen"
    :before-close="onCancelClick"
    width="33%">

    <app-table
      :data="tableData"
      :colConfigs="colConfigs">
      <el-table-column slot="bindState" label="绑定状态" align="left">
        <template slot-scope="{ row }">
          <span :class="row.bindState ? 'green' : 'red'">{{row.bindState ? '已绑定' : '未绑定' }}</span>
        </template>
      </el-table-column>
      <el-table-column slot="action" label="操作" align="left">
        <template slot-scope="{ row }">
          <div id="action">
            <el-button size="small" type="primary" @click="roleBind(row.sysRoleUid, !row.bindState)">{{row.bindState ? '取消绑定' : '绑定角色'}}</el-button>
          </div>
        </template>
      </el-table-column>
    </app-table>

    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="onCancelClick">返回</el-button>
      <!--<el-button size="medium" type="primary" @click="onOkClick">确 定</el-button>-->
    </div>

  </el-dialog>
</template>

<script>
  import MyTable from '../../../components/MyTable/my-table'
  import { changeBindState, getRolesByUserUid } from '../../../api/system'

  export default {
    components: {
      'app-table': MyTable
    },
    name: 'personnel-role',
    props: {
      dialogVisible: {
        type: Boolean
      },
      selectedUserUid: {
        type: String,
        required: true
      },
      selectedName: {
        type: String
      }
    },
    data() {
      return {
        tableData: [],
        colConfigs: [
          {
            prop: 'id',
            label: 'id',
            width: 60,
            sortable: true
          }, {
            prop: 'sysRoleName',
            label: '角色名',
            sortable: false
          }, {
            prop: 'sysRoleDesc',
            label: '角色描述',
            sortable: false
          }, {
            slot: 'bindState'
          }, {
            slot: 'action'
          }
        ],
        currentPage: 1,
        pageSize: 20,
        total: 0
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
          return `分配用户角色 - ${this.selectedName}`
        }
      },
      userUid: {
        get() {
          return this.selectedUserUid
        }
      }
    },
    methods: {
      onDialogOpen() {
        this.fetchData()
      },
      fetchData() {
        getRolesByUserUid(this.userUid).then(response => {
          this.tableData = response.obj
        })
      },

      roleBind(roleUid, state) {
        const params = {
          roleUid,
          state,
          userUid: this.userUid
        }
        changeBindState(params).then(response => {
          if (response.success) {
            this.$emit('roleChanged')
            const message = state ? '已绑定该角色!' : '已取消绑定该角色!'
            this.$message.success(message)
          }
          this.fetchData()
        })
      },

      onCancelClick() {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>
  .green {
    color: green;
    font-weight: bold;
  }

  .red {
    color: red;
    font-weight: bold;
  }

</style>
