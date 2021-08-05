<template>
  <div class="app-container">
    <el-header>
      <el-row>
        <el-col :span="2">
          <router-link :to="{ path: '/merchant/add' }">
            <el-button size="mini" type="success" @click="postDialogVisible = true">添加商户</el-button>
          </router-link>
        </el-col>
        <el-form :inline="true" :model="query" size="mini">
          <el-form-item label="名称">
            <el-input v-model="query.name" placeholder="名称" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchData">查询</el-button>
          </el-form-item>
        </el-form>
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
      <el-table-column label="logo">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="imgPrefix+scope.row.logo"
            fit="fill">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="商户ID">
        <template slot-scope="scope">
          {{ scope.row.merchantId }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式">
        <template slot-scope="scope">
          {{ scope.row.merchantContact }}
        </template>
      </el-table-column>
      <el-table-column label="是否营业">
        <template slot-scope="scope">
          {{ scope.row.business }}
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100px">
        <template slot-scope="scope">
          <router-link :to="{ name: '商户修改', params: { merchant: scope.row }}">
            <el-button type="danger" size="mini">
              编辑
            </el-button>
          </router-link>
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
import { merchantList } from '@/api/merchant'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  props: {},
  data() {
    return {
      list: null,
      query: {},
      listLoading: false,
      page: { total: 0, size: 10, pageNum: 0 }
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
      merchantList(this.query).then(response => {
        this.list = response.data.list
        this.page.total = response.data.total
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
