import request from '@/utils/request'

export function countryList(data) {
  return request({
    url: '/countries',
    method: 'get',
    params: data
  })
}

export function countrySave(data) {
  return request({
    url: '/country/save',
    method: 'put',
    data: data
  })
}

export function stateList(data) {
  return request({
    url: '/states',
    method: 'get',
    params: data
  })
}

export function stateSave(data) {
  return request({
    url: '/state/save',
    method: 'put',
    data: data
  })
}

export function cityList(data) {
  return request({
    url: '/cities',
    method: 'get',
    params: data
  })
}

export function citySave(data) {
  return request({
    url: '/city/save',
    method: 'put',
    data: data
  })
}

export function districtList(data) {
  return request({
    url: '/district',
    method: 'get',
    params: data
  })
}

export function districtSave(data) {
  return request({
    url: '/district/save',
    method: 'put',
    data: data
  })
}

