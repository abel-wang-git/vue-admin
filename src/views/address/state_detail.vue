<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="countryCode">
            <el-input v-model="form.countryCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="fipsCode">
            <el-input v-model="form.fipsCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="iso2">
            <el-input v-model="form.iso2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="latitude">
            <el-input v-model="form.latitude"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="longitude">
            <el-input v-model="form.longitude"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="translations">
        <vue-json-editor
          v-model="form.translationJson"
          :mode="'code'"
          class="vue-json-editor"/>
      </el-form-item>
      <el-button type="danger" @click="update">
        保存
      </el-button>
    </el-form>
  </div>
</template>
<script>
import { stateSave } from '@/api/address'
export default {
  name: 'CountryDetail',
  data() {
    return {
      form: {}
    }
  },
  created() {
    if (this.$route.params.state) {
      this.form = this.$route.params.state
      if (this.$route.params.state.translations) {
        this.form.translationJson = JSON.parse(this.$route.params.state.translations)
      }
    }
  },
  methods: {
    update() {
      this.form.translations = JSON.stringify(this.form.translationJson)
      console.log(this.form.translations)
      stateSave(this.form).then(response => {
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
