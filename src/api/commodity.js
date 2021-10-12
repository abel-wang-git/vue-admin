import request from '@/utils/request'

export function commodityList(data) {
  return request({
    url: '/commodity/list',
    method: 'get',
    params: data
  })
}

export function commoditySave(data) {
  return request({
    url: '/commodity/save',
    method: 'post',
    data: data
  })
}

export function commodityDelete(data) {
  return request({
    url: '/commodity/list',
    method: 'get',
    params: data
  })
}

export function commoditySkuSave(data) {
  return request({
    url: '/commodity/sku/save',
    method: 'post',
    data: data
  })
}
