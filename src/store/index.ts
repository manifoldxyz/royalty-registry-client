import Vue from 'vue'
import Vuex from 'vuex'
// import ModuleStore from './modules/{}'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV === "production" ? false : true,
  modules: {
    // "Module": ModuleStore
  }
})
export default store
