<template>
  <div class="app-container">
    <el-row>
      <router-link :to="{ path: '/carriage/add' }">
        <el-button size="mini" type="success">添加物流模版</el-button>
      </router-link>
    </el-row>
    <el-divider />
    <el-row>
      <el-form :inline="true" :model="query" size="mini">
        <el-form-item label="名称">
          <el-input v-model="query.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-divider />
    <el-table
      v-loading="listLoading"
      class="tb-edit"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="路径">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="openUpdateDialog(row)">
            修改
          </el-button>
          <el-button type="danger" size="mini" @click="deleteWhite(row)">
            删除
          </el-button>
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
import { commodityList } from '@/api/commodity'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      listLoading: true,
      page: { total: 0, size: 10, pageNum: 0 },
      query: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      commodityList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }

}
</script>
