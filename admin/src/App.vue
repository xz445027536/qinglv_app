<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created() {
      this.init()
    },
    methods: {
      init() {
        console.log(this.currentUserRole$)
        // 当前角色为 接口人(2) 或者 工程师(3) 时默认跳转到 需求管理 页面
        if (this.currentUserRole$ === '2' || this.currentUserRole$ === '3') {
          this.$router.push({ name: 'demandManagement' })
        } else { // 其他有权限的角色默认跳转到 首页配置 页面
          this.$router.push({ name: 'homeConfiguration' })
        }
        // todo: 接入 SAP 后需要更改
        this.$store.commit('SET_NAME', sessionStorage.username)
        this.$store.commit('SET_ID', sessionStorage.userid)
        console.log(`
          ╭──────────────────────────────────────────────────────────────╮
          │ ◎ ○ ○ ░░░░░░░░░░░░░░░░░░░░${sessionStorage.userid} ░░░░░░░░░░░░░░░░░░░░░░░░░░│
          ├──────────────────────────────────────────────────────────────┤
          │                                                              │
          │                                                              │
          │                                                              │
          │   #####  #    #  ####         ####  #####   ####  #####      │
          │   #    # #   #  #    #       #      #    # #      #    #     │
          │   #    # ####   #      #####  ####  #    #  ####  #    #     │
          │   #####  #  #   #  ###            # #####       # #####      │
          │   #      #   #  #    #       #    # #      #    # #          │
          │   #      #    #  ####         ####  #       ####  #          │
          │                                                              │
          │                                                              │
          │                  ##   #####  #    # # #    #                 │
          │                 #  #  #    # ##  ## # ##   #                 │
          │                #    # #    # # ## # # # #  #                 │
          │                ###### #    # #    # # #  # #                 │
          │                #    # #    # #    # # #   ##                 │
          │                #    # #####  #    # # #    #                 │
          │                                                              │
          │                                                              │
          │                                                              │
          └──────────────────────────────────────────────────────────────┘
      `)
      }
    }
  }
</script>
