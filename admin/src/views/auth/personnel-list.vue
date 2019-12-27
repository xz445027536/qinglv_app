<template>
  <div class="page-content">
    <div>
      <app-role-card
        roleCode="0"
        :title="'全局管理员'"
        :cardData="globalAdminList"
        @delete="deletePersonnel"
        @add="appendPersonnel"></app-role-card>
    </div>

    <div>
      <app-role-card
        roleCode="1"
        :title="' app 管理员'"
        :cardData="appAdminList"
        @delete="deletePersonnel"
        @add="appendPersonnel"></app-role-card>
    </div>

    <div>
      <app-role-card
        roleCode="2"
        :title="'接口人'"
        :cardData="interfacePersonList"
        @delete="deletePersonnel"
        @add="appendPersonnel"></app-role-card>
    </div>

    <div>
      <app-role-card
        roleCode="3"
        :title="'工程师'"
        :cardData="engineerList"
        @delete="deletePersonnel"
        @add="appendPersonnel"></app-role-card>
    </div>

    <!--<div>-->
      <!--<app-role-card-->
        <!--roleCode="4"-->
        <!--:title="'游客'"-->
        <!--:cardData="touristList"-->
        <!--@delete="deletePersonnel"-->
        <!--@add="appendPersonnel"></app-role-card>-->
    <!--</div>-->

    <app-personnel-dialog
      :selectedId="selectedId"
      :roleCode="roleCode"
      :dialogVisible="dialogVisible"
      :actionType="actionType"
      :dialogTitle="dialogTitle"
      @ok="onOkClick($event)"
      @cancel="onCancelClick">
    </app-personnel-dialog>
  </div>
</template>

<script>
  import { addPersonnel, deletePersonnelById, getPersonnelList } from '../../api/auth'

  const ADD = 2

  import RoleCard from './role-card'
  import PersonnelDialog from './add-personnel-dialog'

  export default {
    name: 'personnel-list',
    components: {
      'app-role-card': RoleCard,
      'app-personnel-dialog': PersonnelDialog
    },
    data() {
      return {
        dialogVisible: false,
        dialogTitle: '',
        roleCode: '',
        actionType: -1,
        selectedId: 1,

        globalAdminList: [], // 0
        appAdminList: [], // 1
        interfacePersonList: [], // 2
        engineerList: [], // 3
        touristList: [] // 4
      }
    },
    created() {
      console.log('currentUserRole$: ', this.currentUserRole$)
      this.fetchAdminData()
    },
    methods: {
      fetchAdminData() {
        getPersonnelList().then(res => {
          // this.personnelData = res.data.recoreds
          // this.total = res.data.total
          console.log('res: ', res)
          this.globalAdminList = res.data[0]
          this.appAdminList = res.data[1]
          this.interfacePersonList = res.data[2]
          this.engineerList = res.data[3]
          this.touristList = res.data[4]
        }).catch(err => {
          console.log('获取管理员列表出错: ', err)
        })
      },

      appendPersonnel(val) {
        this.dialogTitle = `添加${val.title}`
        this.roleCode = val.roleCode
        this.actionType = ADD
        this.dialogVisible = true
      },

      deletePersonnel(id) {
        console.log(id)
        this.$confirm('确实要删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePersonnelById(id).then(res => {
            this.$message.success(res.message)
            this.fetchAdminData()
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

      onOkClick(val) {
        console.log('onOkClick: ', val)
        addPersonnel(val).then(res => {
          this.$message.success(res.message)
          // this.fetchPersonnelData(this.currentPage)
          this.fetchAdminData()
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
  div + div {
    margin-top: 16px;
  }
</style>