<template>
  <div class="app-container">
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
              :before-upload="beforeAvatarUpload">
              <img v-if="form.logo" :src="imgPrefix + form.logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
            <el-switch active-value="1" inactive-value="0" v-model="form.business"></el-switch>
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
      <el-divider/>
      <el-row>
        <el-col :span="6">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :headers="headerObj"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.avatar" :src="imgPrefix + form.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="管理员名称">
            <el-input v-model="form.nickName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登陆账号">
            <el-input v-model="form.loginName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码">
            <el-input v-model="form.password" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="danger" @click="update">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addMerchant } from '@/api/merchant'
import store from '../../store'
export default {
  data() {
    return {
      form: {},
      headerObj: {
        Authorization: 'Bearer ' + store.getters.token
      }
    }
  },
  created() {
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
      addMerchant(this.form).then(response => {
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
