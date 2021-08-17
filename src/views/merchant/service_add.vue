<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px" label-position="top">
      <el-row>
        <el-form-item label="服务标题">
          <el-input v-model="form.serviceTitle" />
        </el-form-item>
        <el-form-item label="服务介绍">
          <el-input v-model="form.serviceDetail" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.available" />
        </el-form-item>
      </el-row>
      <el-form-item>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="danger" @click="update">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { merchantServiceAdd } from '@/api/merchant'

export default {
  data() {
    return {
      form: {
        available: true
      },
      fullscreenLoading: false
    }
  },
  created() {
    if (this.$route.query.merchantId) {
      this.form.merchantId = this.$route.query.merchantId
    }
    if (this.$route.query.service) {
      this.form = JSON.parse(decodeURIComponent(this.$route.query.service))
    }
  },
  methods: {
    update() {
      this.fullscreenLoading = true
      merchantServiceAdd(this.form).then(response => {
        if (response.code === 200) {
          this.form.serviceId = response.data
          this.$router.back()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      }).catch((e) => {
        this.fullscreenLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
