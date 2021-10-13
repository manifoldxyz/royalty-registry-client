import Vue from 'vue'
import typesCreator from '../../lib/vuex-mutation-types-creator'

const types = typesCreator([
  'FETCH_LIST_REQUEST',
  'FETCH_LIST_SUCCESS',
  'FETCH_LIST_FAILURE',

  'FETCH_ITEM_REQUEST',
  'FETCH_ITEM_SUCCESS',
  'FETCH_ITEM_FAILURE',
])

const initialState = () => ({
  isFetching: false,
  items: [],
  itemsById: {},
})

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    [types.FETCH_LIST_POET_LIST_REQUEST](state, data) {
      state.isFetching = true
      // TODO
    },
    [types.FETCH_LIST_POET_LIST_SUCCESS](state, data) {
      state.isFetching = false
      // TODO
    },
    [types.FETCH_LIST_POET_LIST_FAILURE](state, data) {
      state.isFetching = false
      // TODO
    },

    [types.FETCH_LIST_POET_REQUEST](state, data) {
      state.isFetching = true
      // TODO
    },
    [types.FETCH_LIST_POET_SUCCESS](state, data) {
      state.isFetching = false
      // TODO
    },
    [types.FETCH_LIST_POET_FAILURE](state, data) {
      state.isFetching = false
      // TODO
    }
  },
  actions: {
    async loadItems({state, dispatch}) {
      if (!state.isFetching) {
        dispatch('fetchList')
      }
    },
    async fetchList({ commit }) {
      try {
        commit(types.FETCH_LIST_REQUEST)
        // TODO
        commit(types.FETCH_LIST_SUCCESS, {})
      } catch (e) {
        commit(types.FETCH_LIST_FAILURE)
      }
    },
    async fetchItem({ commit }, payload) {
      const tokenId = payload.tokenId
      try {
        commit(types.FETCH_ITEM_REQUEST)
        // TODO
        commit(types.FETCH_ITEM_SUCCESS, {})
      } catch (e) {
        commit(types.FETCH_ITEM_FAILURE)
      }
    },
  },
  getters: {
    getItemList: (state, getters) => {
      return state.items
    },
    getItemById: (state) => (tokenId) => {
      return state.itemsById[tokenId]
    }
  }
}
