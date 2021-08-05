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

