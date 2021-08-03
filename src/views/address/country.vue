<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="名称">
        <el-input v-model="query.nativeName" placeholder="名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="nativeName">
        <template slot-scope="scope">
          <router-link :to="{ path: '/address/state', query: { countryCode: scope.row.iso2 }}">
            {{ scope.row.nativeName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="iso2">
        <template slot-scope="scope">
          {{ scope.row.iso2 }}
        </template>
      </el-table-column>
      <el-table-column label="iso3">
        <template slot-scope="scope">
          {{ scope.row.iso3 }}
        </template>
      </el-table-column>
      <el-table-column label="phoneCode">
        <template slot-scope="scope">
          {{ scope.row.phonecode }}
        </template>
      </el-table-column>
      <el-table-column label="region">
        <template slot-scope="scope">
          {{ scope.row.region }}
        </template>
      </el-table-column>
      <el-table-column label="subregion">
        <template slot-scope="scope">
          {{ scope.row.subregion }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100px">
        <template slot-scope="scope">
          <router-link :to="{ name: '修改国家', params: { country: scope.row }}">
            <el-button type="danger" size="mini">
              编辑
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { countryList } from '@/api/address'

export default {
  components: { },
  props: {},
  data() {
    return {
      list: null,
      query: {},
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  methods: {
    fetchData() {
      this.listLoading = true
      countryList(this.query).then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
