<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="countryCode">
            <el-input v-model="form.countryCode" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="stateCode">
            <el-input v-model="form.stateCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
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
      <el-form-item label="translations">
        <vue-json-editor
          v-model="form.translationJson"
          :mode="'code'"
          class="vue-json-editor"
        />
      </el-form-item>
      <el-button type="danger" @click="update">
        保存
      </el-button>
    </el-form>
  </div>
</template>
<script>
import { citySave } from '@/api/address'
export default {
  name: 'CountryDetail',
  data() {
    return {
      form: {}
    }
  },
  created() {
    if (this.$route.params.city) {
      this.form = this.$route.params.city
      if (this.$route.params.city.translations) {
        this.form.translationJson = JSON.parse(this.$route.params.city.translations)
      }
    }
  },
  methods: {
    update() {
      this.form.translations = JSON.stringify(this.form.translationJson)
      citySave(this.form).then(response => {
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
