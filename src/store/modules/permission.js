import { constantRoutes } from '@/router'
import { getMenu } from '@/api/user'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
  const res = []

  routes.forEach(route => {
    const tmp = caseToRoute(route)
    if (route.children) {
      tmp.children = filterAsyncRoutes(route.children)
    }
    res.push(tmp)
  })

  return res
}

export function caseToRoute(r) {
  const route = {}
  route.path = r.path
  route.component = loadView(r.component)
  route.name = r.name
  route.meta = JSON.parse(r.meta)
  return route
}

export const loadView = (view) => {
  return (resolve) => require([`@/${view}.vue`], resolve)
}

const state = {
  routes: [],
  addRoutes: [],
  isInit: false
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    state.isInit = true
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getMenu().then(
        response => {
          const accessedRoutes = filterAsyncRoutes(response.data)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
