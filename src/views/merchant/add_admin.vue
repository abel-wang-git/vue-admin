<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="imgUpload"
              :headers="headerObj"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.avatar" :src="imgPrefix + form.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="管理员名称">
            <el-input v-model="form.nickName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登陆账号">
            <el-input v-model="form.loginName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码">
            <el-input v-model="form.password" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="岗位">
            <el-cascader
              ref="roleCascade"
              v-model="roleIds"
              :options="options"
              :props="{ emitPath: false, multiple: true, value: 'id', label: 'name' ,checkStrictly: true }"
              :show-all-levels="false"
              collapse-tags
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="danger" @click="update">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import DeptApi from '@/api/dept'
import { adminAdd } from '@/api/merchant'

export default {
  data() {
    return {
      form: {},
      headerObj: {
        Authorization: 'Bearer ' + getToken()
      },
      fullscreenLoading: false,
      options: [],
      roleIds: []
    }
  },
  created() {
    this.form.merchantId = this.$route.query.merchantId
    if (this.$route.query.admin) {
      this.form = JSON.parse(decodeURIComponent(this.$route.query.admin))
      this.roleIds = this.form.roles.map(e => e.id)
    }
    DeptApi.getList().then(response => {
      this.treeForeach(response.data)
      this.options = response.data
      this.listLoading = false
    })
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.$set(this.form, 'avatar', res.data)
    },
    treeForeach(tree, func) {
      tree.forEach(data => {
        data.disabled = data.type === 1
        data.children && this.treeForeach(data.children, func) // 遍历子树
      })
    },
    update() {
      this.fullscreenLoading = true
      this.form.roles = this.$refs['roleCascade'].getCheckedNodes(true).map(o => o.data)
      console.log(this.form)
      adminAdd(this.form).then(response => {
        if (response.code === 200) {
          this.$router.back()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      }).catch((e) => {
        this.fullscreenLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
