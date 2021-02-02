import { detail } from '@/api/user'

export default {
  state: {
    is_admin: 0,
    username: ""
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      Object.assign(state, payload)
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      const { data } = await detail()
      console.log(data)
      commit('SET_USER_INFO', data)
    }
  },
  namespaced: true
}