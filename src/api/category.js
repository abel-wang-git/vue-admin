import request from '@/utils/request'

export function categoryList(data) {
  return request({
    url: '/category/list',
    method: 'get',
    params: data
  })
}

export function categoryAdd(data) {
  return request({
    url: '/category/add',
    method: 'put',
    data: data
  })
}

export function deleteCategory(data) {
  return request({
    url: '/category/delete',
    method: 'delete',
    params: data
  })
}

export function merchantCategoryList(data) {
  return request({
    url: '/category/merchant/list',
    method: 'get',
    params: data
  })
}

export function merchantCategoryAdd(data) {
  return request({
    url: '/category/merchant/add',
    method: 'put',
    data: data
  })
}

export function deleteMerchantCategory(data) {
  return request({
    url: '/category/merchant/delete',
    method: 'delete',
    params: data
  })
}

export function frontCategoryList(data) {
  return request({
    url: '/category/front/list',
    method: 'get',
    params: data
  })
}

export function frontCategoryAdd(data) {
  return request({
    url: '/category/front/add',
    method: 'put',
    data: data
  })
}

export function frontCategoryDetail(data) {
  return request({
    url: '/category/front/detail',
    method: 'get',
    params: data
  })
}

export function deleteFrontCategory(data) {
  return request({
    url: '/category/front/delete',
    method: 'delete',
    params: data
  })
}
