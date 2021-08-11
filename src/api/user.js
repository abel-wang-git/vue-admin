import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    params: data
  })
}

export function refresh() {
  return request({
    url: '/refresh/token',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getMenu() {
  return request({
    url: '/user/generate/routes',
    method: 'get'
  })
}

export function getList(data) {
  return request({
    url: '/user/list',
    method: 'get',
    params: data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data: data
  })
}

export function getRole(data) {
  return request({
    url: '/user/role',
    method: 'get',
    params: data
  })
}

export function deleteRole(data) {
  return request({
    url: '/role/delete',
    method: 'delete',
    params: data
  })
}

export function roleList() {
  return request({
    url: '/role/list',
    method: 'get'
  })
}

export function updateRole(data) {
  return request({
    url: '/user/role',
    method: 'put',
    data: data
  })
}

export function powerList(data) {
  return request({
    url: '/api/list',
    method: 'get',
    data: data
  })
}

export function roleAdd(data) {
  return request({
    url: 'role/add',
    method: 'put',
    data: data
  })
}

export function rolePowerList(data) {
  return request({
    url: 'role/api',
    method: 'get',
    params: data
  })
}

export function roleAddPower(data) {
  return request({
    url: 'role/api',
    method: 'put',
    data: data
  })
}

export function menuList() {
  return request({
    url: 'menu/list',
    method: 'get'
  })
}

export function addMenu(data) {
  return request({
    url: 'menu/add',
    method: 'post',
    data: data
  })
}

export function deleteMenu(data) {
  return request({
    url: 'menu/delete',
    method: 'delete',
    params: data
  })
}

export function roleMenu(data) {
  return request({
    url: 'role/menu',
    method: 'get',
    params: data
  })
}

export function roleAddMenu(data) {
  return request({
    url: 'role/menu',
    method: 'put',
    data: data
  })
}

export function departmentUses(data) {
  return request({
    url: 'department/uses',
    method: 'get',
    params: data
  })
}

