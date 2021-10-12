<template>
  <div class="app-container">
    <el-header>
      <el-row>
        <el-col :span="2">
          <router-link :to="{ path: '/merchant/service/save', query: { merchantId: merchantId } }">
            <el-button size="mini" type="success">添加服务</el-button>
          </router-link>
        </el-col>
      </el-row>
    </el-header>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="服务标题">
        <template slot-scope="scope">
          {{ scope.row.serviceTitle }}
        </template>
      </el-table-column>
      <el-table-column label="服务介绍">
        <template slot-scope="scope">
          {{ scope.row.serviceDetail }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100px">
        <template slot-scope="scope">
          <router-link :to="{ name: '商户添加服务', query: { service: encodeURIComponent(JSON.stringify(scope.row)) }}">
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
import { merchantServiceList } from '@/api/merchant'
export default {
  props: {
    merchantId: Number(0)
  },
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  watch: {
    merchantId: function(v) {
      this.merchantId = v
      this.fetchData()
    }
  },
  created() {},
  mounted() {},
  methods: {
    fetchData() {
      this.listLoading = true
      merchantServiceList({ 'merchantId': this.merchantId }).then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      })
    }
  }
}
</script>

<style scoped>

</style>
