import request from '@/utils/request'

export function mediaList(data) {
  return request({
    url: '/media/resource/list/user',
    method: 'get',
    params: data
  })
}

export function mediaUpload(data) {
  return request({
    url: '/media/resource/upload',
    method: 'post',
    data: data
  })
}
