import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    researchList: []
  },
  mutations: {
    listAdd (state, item) {
      state.researchList.push(item)
    }
  }
})

export default store
