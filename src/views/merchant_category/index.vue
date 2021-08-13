<template>
  <div class="app-container">
    <el-header>
      <el-row>
        <el-col :span="2">
          <router-link :to="{ path: '/merchant_category/add' }">
            <el-button size="mini" type="success" @click="postDialogVisible = true">添加分类</el-button>
          </router-link>
        </el-col>
      </el-row>
    </el-header>
    <el-table
      :data="categoryList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      row-key="merchantCategoryId"
      :tree-props="{children: 'children'}"
    >
      <el-table-column label="ID" width="100px" align="center">
        <template slot-scope="scope">
          {{ scope.row.merchantCategoryId }}
        </template>
      </el-table-column>
      <el-table-column label="icon" width="80px" align="center">
        <template slot-scope="scope">
          <el-avatar v-if="scope.row.categoryIcon" size="small" :src="imgPrefix+scope.row.categoryIcon" />
        </template>
      </el-table-column>
      <el-table-column label="分类名称">
        <template slot-scope="scope">
          {{ scope.row.categoryName }}
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          {{ scope.row.disable }}
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template slot-scope="scope">
          {{ scope.row.priority }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220px">
        <template slot-scope="scope">
          <router-link :to="{ name: '商户分类保存', query: { category: encodeURIComponent(JSON.stringify(scope.row)) }}">
            <el-button type="danger" size="mini">
              编辑
            </el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="deleteCategory(scope.row.merchantCategoryId, scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { merchantCategoryList, deleteMerchantCategory } from '@/api/category'

export default {
  name: 'Category',
  data() {
    return {
      categoryList: []
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  methods: {
    deleteCategory(id, index) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMerchantCategory({ categoryId: id }).then(response => {
          if (response.code === 200) {
            this.fetchData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    fetchData() {
      merchantCategoryList().then(response => {
        this.categoryList = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
