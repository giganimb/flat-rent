import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialog: false
  },
  getters: {
  },
  mutations: {
    setDialog(state, bool){
      state.dialog = bool;
    }
  },
  actions: {
  },
  modules: {
  }
})
