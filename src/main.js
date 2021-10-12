import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss'
import VueJsonEditor from 'vue-json-editor'
import App from './App'
import store from './store'
import router from './router'
import checkPermission from './utils/permission'

import '@/icons' // icon
import '@/permission'
import * as custom from '@/utils/filters'

Object.keys(custom).forEach(key => { Vue.filter(key, custom[key]) })
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.component('vue-json-editor', VueJsonEditor)
Vue.use(VueJsonEditor)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.imgUpload = process.env.VUE_APP_BASE_API.replace(/\/+$/, '') + '/img/upload'
Vue.prototype.imgPrefix = process.env.VUE_APP_BASE_API.replace(/\/+$/, '') + '/'
Vue.prototype.mediaUrl = process.env.VUE_APP_MEDIA_URL.replace(/\/+$/, '') + '/'

function beforeImageUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    this.$message.error('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt2M) {
    this.$message.error('上传头像图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}

Vue.prototype.beforeImageUpload = beforeImageUpload
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.prototype.checkPermission = checkPermission
