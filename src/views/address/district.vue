<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="名称">
        <el-input v-model="query.districtName" placeholder="名称" clearable />
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
          <router-link :to="{ path: '/address/district', query: { stateId: scope.row.id }}">
            {{ scope.row.districtName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100px">
        <template slot-scope="scope">
          <router-link :to="{ name: '修改行政区', params: { district: scope.row }}">
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
import { districtList } from '@/api/address'

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
    this.query.cityId = this.$route.query.cityId
    this.fetchData()
  },
  mounted() {},
  methods: {
    fetchData() {
      this.listLoading = true
      districtList(this.query).then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
