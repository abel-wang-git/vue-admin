import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import user from './modules/user'
import { getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    user: {
      token: getToken(),
      name: '',
      avatar: '',
      roles: []
    },
    permission: {
      isInit: false,
      routes: [],
      addRoutes: []
    }
  }
}

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    user
  },
  getters,
  mutations: {
    RESET_STATE: (state) => {
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      })
    }
  }
})

export default store
