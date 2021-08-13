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
      <el-form-item label="父类">
        <el-select v-model="form.merchantCategoryPid" placeholder="请选择" clearable>
          <el-option
            v-for="item in categoryList"
            :key="item.merchantCategoryId"
            :label="item.categoryName"
            :value="item.merchantCategoryId"
          />
        </el-select>
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
import { merchantCategoryAdd, merchantCategoryList } from '@/api/category'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      form: {
        disable: true
      },
      fullscreenLoading: false,
      headerObj: {
        Authorization: 'Bearer ' + getToken()
      },
      categoryList: []
    }
  },
  created() {
    if (this.$route.query.category) {
      this.form = JSON.parse(decodeURIComponent(this.$route.query.category))
    }
    merchantCategoryList({ categoryPid: 0 }).then(response => {
      this.categoryList = response.data
    })
  },
  mounted() {},
  methods: {
    save() {
      merchantCategoryAdd(this.form).then(response => {
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
    }
  }
}
</script>

<style scoped>

</style>
