<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="名称">
        <el-input v-model="query.name" placeholder="名称" clearable />
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
      <el-table-column label="name">
        <template slot-scope="scope">
          <router-link :to="{ path: '/address/district', query: { cityId: scope.row.id }}">
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="countryCode">
        <template slot-scope="scope">
          {{ scope.row.countryCode }}
        </template>
      </el-table-column>
      <el-table-column label="stateCode">
        <template slot-scope="scope">
          {{ scope.row.stateCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100px">
        <template slot-scope="scope">
          <router-link :to="{ name: '修改城市', params: { city: scope.row }}">
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
import { cityList } from '@/api/address'

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
    this.query.stateId = this.$route.query.stateId
    this.fetchData()
  },
  mounted() {},
  methods: {
    fetchData() {
      this.listLoading = true
      cityList(this.query).then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
