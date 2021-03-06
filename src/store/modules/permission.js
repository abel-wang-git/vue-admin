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
  route.hidden = r.hidden
  route.redirect = r.redirect
  route.meta = JSON.parse(r.meta)
  return route
}

export const loadView = (view) => {
  return (resolve) => require([`@/${view}.vue`], resolve)
}

const state = {
  routes: [],
  buttons: [],
  addRoutes: [],
  isInit: false
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    state.isInit = true
  },
  SET_BUTTON: (state, buttons) => {
    state.buttons = buttons
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getMenu().then(
        response => {
          const accessedRoutes = filterAsyncRoutes(response.data.menu)
          accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTES', accessedRoutes)
          commit('SET_BUTTON', response.data.button)
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
