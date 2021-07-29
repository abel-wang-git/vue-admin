import request from '@/utils/request'
import qs from 'qs'

const LogApi = {
  getList: function getList(data) {
    return request({
      url: '/log/list',
      method: 'get',
      params: data
    })
  },
  add: function(params) {
    return request({
      url: 'white/list/add',
      method: 'put',
      data: params
    })
  },
  del: function(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/sys/whitelist/delete',
      method: 'post',
      data: qs.stringify(params)
    })
  }
}
export default LogApi
