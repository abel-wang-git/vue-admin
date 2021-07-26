import request from '@/utils/request'

const DeptApi = {
  getList: function getList(params) {
    return request({
      url: '/department/list',
      method: 'get'
    })
  },
  add: function(params) {
    return request({
      url: '/department/add',
      method: 'put',
      data: params
    })
  },
  delete: function(params) {
    return request({
      url: '/department/delete',
      method: 'delete',
      params: params
    })
  }
}
export default DeptApi
