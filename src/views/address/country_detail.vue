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
          <el-form-item label="nativeName">
            <el-input v-model="form.nativeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="phonecode">
            <el-input v-model="form.phonecode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="numericCode">
            <el-input v-model="form.numericCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="iso2">
            <el-input v-model="form.iso2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="iso2">
            <el-input v-model="form.iso3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="capital">
            <el-input v-model="form.capital"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="currency">
            <el-input v-model="form.currency"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
        <el-col :span="6">
          <el-form-item label="emoji">
            <el-input v-model="form.emoji"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="emojiu">
            <el-input v-model="form.emojiu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="currencySymbol">
            <el-input v-model="form.currencySymbol"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="region">
            <el-input v-model="form.region"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="subregion">
            <el-input v-model="form.subregion"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="tld">
            <el-input v-model="form.tld"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="timezones">
        <vue-json-editor
          v-model="form.timezoneJson"
          :mode="'code'"
          class="vue-json-editor"/>
      </el-form-item>
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
import { countrySave } from '@/api/address'
export default {
  name: 'CountryDetail',
  data() {
    return {
      form: {}
    }
  },
  created() {
    if (this.$route.params.country) {
      this.form = this.$route.params.country
      this.form.timezoneJson = JSON.parse(this.$route.params.country.timezones)
      this.form.translationJson = JSON.parse(this.$route.params.country.translations)
    }
  },
  methods: {
    update() {
      this.form.timezones = JSON.stringify(this.form.timezoneJson)
      this.form.translations = JSON.stringify(this.form.translationJson)
      countrySave(this.form).then(response => {
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
