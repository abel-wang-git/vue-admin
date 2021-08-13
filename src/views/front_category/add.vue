<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="分类图标">
        <el-upload
          class="avatar-uploader"
          :action="imgUpload"
          :headers="headerObj"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeImageUpload"
        >
          <img v-if="form.categoryIcon" :src="imgPrefix + form.categoryIcon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="form.categoryName" />
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.categoryType">
          <el-radio :label="1">搜索词</el-radio>
          <el-radio :label="2">h5地址</el-radio>
          <el-radio :label="3">后台分类</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父类">
        <el-cascader
          ref="frontCascade"
          v-model="pid"
          :show-all-levels="false"
          :options="frontCategoryList"
          :props="{ value: 'categoryId', label: 'categoryName' ,checkStrictly: true }"
        />
      </el-form-item>
      <el-form-item label="关联后台分类">
        <el-cascader
          ref="categoryCascade"
          v-model="categories"
          collapse-tags
          :options="categoryList"
          :props="{ multiple: true, value: 'categoryId', label: 'categoryName' }"
        />
      </el-form-item>
      <el-form-item label="连接地址">
        <el-input v-model="form.h5Url" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="form.disable" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.priority" />
      </el-form-item>
      <el-form-item>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="danger" @click="save">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { frontCategoryAdd, categoryList, frontCategoryList, frontCategoryDetail } from '@/api/category'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      form: {
        disable: true,
        categoryType: 3
      },
      fullscreenLoading: false,
      headerObj: {
        Authorization: 'Bearer ' + getToken()
      },
      categoryList: [],
      frontCategoryList: [],
      categories: [],
      pid: []
    }
  },
  created() {
  },
  mounted() {
    this.initData()
  },
  methods: {
    save() {
      this.form.categories = this.$refs['categoryCascade'].getCheckedNodes(true).map(o => o.data)
      this.form.categoryPid = this.$refs['frontCascade'].getCheckedNodes(true).map(o => o.data.categoryId)[0]
      frontCategoryAdd(this.form).then(response => {
        if (response.code === 200) {
          this.form.categoryId = response.data
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$router.back()
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.$set(this.form, 'categoryIcon', res.data)
    },
    threePath(list, id) {
      var ids = []
      list.forEach(category => {
        if (category.categoryId === id) {
          ids.push(category.categoryId)
        }
        if (category.children != null) {
          var rids = this.threePath(category.children, id)
          if (rids.length > 0) {
            ids.push(category.categoryId)
            ids = ids.concat(rids)
          }
        }
      })
      return ids
    },
    initData() {
      categoryList().then(response => {
        this.categoryList = response.data
      })
      frontCategoryList().then(response => {
        this.frontCategoryList = response.data
      })
      if (this.$route.query.categoryId) {
        frontCategoryDetail({ 'categoryId': this.$route.query.categoryId }).then(response => {
          this.form = response.data
          const categories = []
          response.data.categories.forEach(cate => {
            categories.push(this.threePath(this.categoryList, cate.categoryId))
          })
          this.categories = categories
          this.pid = this.threePath(this.frontCategoryList, response.data.categoryPid)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
