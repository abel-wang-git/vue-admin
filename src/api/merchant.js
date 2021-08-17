import request from '@/utils/request'

export function addMerchant(data) {
  return request({
    url: '/manager/add',
    method: 'post',
    data: data
  })
}

export function updateMerchant(data) {
  return request({
    url: '/manager/save',
    method: 'put',
    data: data
  })
}

export function detailMerchant(data) {
  return request({
    url: '/manager/detail',
    method: 'get',
    params: data
  })
}

export function detailMyMerchant() {
  return request({
    url: '/manager/detail/my',
    method: 'get'
  })
}

export function merchantList(data) {
  return request({
    url: '/manager/list',
    method: 'get',
    params: data
  })
}

export function adminList(data) {
  return request({
    url: '/manager/merchant/admins',
    method: 'get',
    params: data
  })
}

export function adminAdd(data) {
  return request({
    url: '/manager/add/admin',
    method: 'post',
    data: data
  })
}

export function merchantServiceAdd(data) {
  return request({
    url: '/manager/merchant/service',
    method: 'put',
    data: data
  })
}

export function merchantServiceList(data) {
  return request({
    url: '/manager/merchant/service',
    method: 'get',
    params: data
  })
}
