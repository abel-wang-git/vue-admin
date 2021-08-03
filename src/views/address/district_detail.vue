<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="name">
            <el-input v-model="form.districtName" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="latitude">
            <el-input v-model="form.latitude" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="longitude">
            <el-input v-model="form.longitude" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="danger" @click="update">
        保存
      </el-button>
    </el-form>
  </div>
</template>
<script>
import { districtSave } from '@/api/address'
export default {
  name: 'CountryDetail',
  data() {
    return {
      form: {}
    }
  },
  created() {
    if (this.$route.params.district) {
      this.form = this.$route.params.district
    }
  },
  methods: {
    update() {
      districtSave(this.form).then(response => {
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
