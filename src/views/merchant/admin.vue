<template>
  <div class="app-container">
    <el-header>
      <el-row>
        <el-col :span="2">
          <router-link :to="{ path: '/merchant/admin/add',query:{ merchantId: merchantId} }">
            <el-button size="mini" type="success" @click="postDialogVisible = true">添加管理员</el-button>
          </router-link>
        </el-col>
        <el-form :inline="true" :model="query" size="mini">
          <el-form-item label="名称" label-width="80px">
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
      <el-table-column label="" width="50">
        <template slot-scope="scope">
          <el-avatar v-if="scope.row.avatar" size="small" :src="imgPrefix+scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100px">
        <template slot-scope="scope">
          <router-link :to="{ name: '修改商铺管理员', query: { admin: encodeURIComponent(JSON.stringify(scope.row)) }}">
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
import { adminList } from '@/api/merchant'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  props: {
    merchantId: Number(0)
  },
  data() {
    return {
      list: null,
      query: {},
      listLoading: false,
      page: { total: 0, size: 10, pageNum: 0 }
    }
  },
  created() {
    this.query.merchantId = this.merchantId
    this.fetchData()
  },
  mounted() {},
  methods: {
    fetchData() {
      this.listLoading = true
      this.query.page = this.page.pageNum
      this.query.size = this.page.size
      adminList(this.query).then(response => {
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
