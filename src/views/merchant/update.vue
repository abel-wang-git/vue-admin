<template>
  <div class="app-container">
    <el-divider>店铺信息</el-divider>
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="logo">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :headers="headerObj"
              :show-file-list="false"
              :on-success="handleLogoSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.logo" :src="imgPrefix + form.logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="店铺名称">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否营业">
            <el-switch v-model="form.business" active-value="1" inactive-value="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式">
            <el-input v-model="form.merchantContact" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址">
            <el-input v-model="form.address" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="danger" @click="update">
          保存
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider>店铺服务</el-divider>
    <Service :merchant-id="form.merchantId" />
    <el-divider>管理员</el-divider>
    <Admin :merchant-id="form.merchantId" />
  </div>
</template>
<script>
import { updateMerchant, detailMerchant, detailMyMerchant } from '@/api/merchant'
import { getToken } from '@/utils/auth'
import Admin from './admin'
import { Loading } from 'element-ui'
import Service from './service'
export default {
  components: { Service, Admin },
  data() {
    return {
      form: {},
      headerObj: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  created() {
    const loadingInstance1 = Loading.service({ fullscreen: true })
    if (this.$route.query.merchantId) {
      this.form.merchantId = this.$route.query.merchantId
      detailMerchant({ merchantId: this.$route.query.merchantId }).then(response => {
        this.form = response.data
      })
    }
    if (this.$route.path === '/merchant/center') {
      detailMyMerchant().then(response => {
        this.form = response.data
      })
    }
    loadingInstance1.close()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.$set(this.form, 'avatar', res.data)
    },
    handleLogoSuccess(res, file) {
      this.$set(this.form, 'logo', res.data)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    update() {
      updateMerchant(this.form).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
