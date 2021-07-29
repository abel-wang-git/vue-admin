<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" label-width="120px" size="mini">
      <el-form-item label="方法">
        <el-input v-model="query.method" placeholder="方法" clearable />
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="date_range"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="query.loginName" placeholder="账号" clearable />
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
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="请求参数">
              {{ scope.row.requestParams}}
            </el-form-item>
            <el-form-item label="调用方法">
              {{ scope.row.method }}
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" width="60px">
        <template slot-scope="scope">
          {{ scope.row.logId }}
        </template>
      </el-table-column>
      <el-table-column label="用户" width="80px">
        <template slot-scope="scope">
          {{ scope.row.loginName }}
        </template>
      </el-table-column>
      <el-table-column label="请求IP" width="100px">
        <template slot-scope="scope">
          {{ scope.row.requestIp }}
        </template>
      </el-table-column>
      <el-table-column label="请求路径">
        <template slot-scope="scope">
          {{ scope.row.requestPath }}
        </template>
      </el-table-column>
      <el-table-column label="请求方式" width="80px">
        <template slot-scope="scope">
          {{ scope.row.requestMethod }}
        </template>
      </el-table-column>
      <el-table-column label="模块" width="80px">
        <template slot-scope="scope">
          {{ scope.row.modular }}
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.pageNum"
      :limit.sync="page.size"
      @pagination="fetchData"
    />

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import LogApi from '@/api/log'

export default {
  components: { Pagination },
  props: {},
  data() {
    return {
      list: null,
      listLoading: true,
      page: { total: 0, size: 10, pageNum: 0 },
      query: {},
      date_range: null
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  methods: {
    fetchData() {
      this.listLoading = true
      this.query.page = this.page.pageNum
      this.query.size = this.page.size
      if (this.date_range) {
        this.query.startDate = this.date_range[0]
        this.query.endDate = this.date_range[1]
      } else {
        this.query.startDate = null
        this.query.endDate = null
      }
      LogApi.getList(this.query).then(response => {
        this.list = response.data.list
        this.page.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    }
  }
}
</script>
<style lang="css">
  .el-tooltip__popper{font-size: 14px; max-width: 500px}
</style>

<style lang="css" scoped>
</style>
