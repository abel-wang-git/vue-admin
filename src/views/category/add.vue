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
        <el-cascader
          ref="categoryPid"
          :value="categories"
          :props="{ value: 'categoryId', label: 'categoryName' ,checkStrictly: true }"
          :options="categoryList"
        />
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
import { categoryAdd, categoryList } from '@/api/category'
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
      categoryList: [],
      categories: []
    }
  },
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    async initData() {
      await categoryList().then(response => {
        this.categoryList = response.data
        this.setDisable(1, this.categoryList, 2)
      })
      if (this.$route.query.category) {
        this.form = JSON.parse(decodeURIComponent(this.$route.query.category))
        console.log(this.categoryList)
        this.categories = this.threePath(this.categoryList, this.form.categoryPid)
      }
    },
    save() {
      this.form.categoryPid = this.$refs['categoryPid'].getCheckedNodes(true).map(o => o.data.categoryId)[0]
      categoryAdd(this.form).then(response => {
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
    setDisable(count, data, maxNum) {
      if (count > maxNum) { // 最多几级就写几
        data.forEach(v => {
          v.disabled = true // 超过设定的最大级数,给这一集的数据添加disabled属性
        })
      } else {
        data.forEach(v => {
          v.count = count // 设置最外层数据的初始count

          if (v.children && v.children.length) {
            v.count++
            this.setDisable(v.count, v.children, maxNum) // 子级循环时把这一层数据的count传入
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
