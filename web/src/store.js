import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    id: '',
    menu: []
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    },

  },
  actions: {}
})
