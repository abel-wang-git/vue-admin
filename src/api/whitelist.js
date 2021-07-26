import request from '@/utils/request'
import qs from 'qs'

const Whitelist = {
  getList: function getList() {
    return request({
      url: '/white/list',
      method: 'get'
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
export default Whitelist
