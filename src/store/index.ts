import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV === "production" ? false : true,
  state: {
    network: undefined,
  },
  mutations: {
    setNetwork(state, network) {
      state.network = network
    }
  }
})
export default store
