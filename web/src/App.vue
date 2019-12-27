<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
    },
    created() {
      console.log('currentUserRole$: ', this.currentUserRole$)
      this.$store.commit('SET_NAME', sessionStorage.username)
      this.$store.commit('SET_ID', sessionStorage.userid)
      console.log(`
        ╭──────────────────────────────────────────────────────────────╮
        │ ◎ ○ ○ ░░░░░░░░░░░░░░░░░ welcome ${this.currentRoleName$} ░░░░░░░░░░░░░░░░░░░░│
        ├──────────────────────────────────────────────────────────────┤
        │                                                              │
        │                                                              │
        │                                                              │
        │    #####  #    #  ####         ####  #####   ####  #####     │
        │    #    # #   #  #    #       #      #    # #      #    #    │
        │    #    # ####   #      #####  ####  #    #  ####  #    #    │
        │    #####  #  #   #  ###            # #####       # #####     │
        │    #      #   #  #    #       #    # #      #    # #         │
        │    #      #    #  ####         ####  #       ####  #         │
        │                                                              │
        │                                                              │
        │                  ####   ####  #####  ######                  │
        │                 #    # #    # #    # #                       │
        │                 #      #    # #    # #####                   │
        │                 #      #    # #####  #                       │
        │                 #    # #    # #   #  #                       │
        │                  ####   ####  #    # ######                  │
        │                                                              │
        │                                                              │
        │                                                              │
        └──────────────────────────────────────────────────────────────┘
      `)
    },
    methods: {}
  }
</script>

<style lang="less">
  #app {
    font-family: "Microsoft YaHei", "微软雅黑", "STXihei", "华文细黑", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
