<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" label-width="120px" size="mini">
      <el-form-item label="昵称">
        <el-input v-model="query.name" placeholder="昵称" clearable />
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="query.id" placeholder="ID" clearable />
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="query.loginName" placeholder="账号" clearable />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="query.roleId" placeholder="角色ID" clearable>
          <el-option
            v-for="item in roleOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
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
      <el-table-column label="ID" width="60px">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.avatar"
            fit="fill">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">
          {{ scope.row.loginName }}
        </template>
      </el-table-column>
      <el-table-column label="是否锁定">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.locked"
            @change="updateUser(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            @change="updateUser(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="过期时间">
        <template slot-scope="scope">
          {{ scope.row.expiredTime | dateFilter }}
        </template>
      </el-table-column>
      <el-table-column label="登陆过期时间">
        <template slot-scope="scope">
          {{ scope.row.credentialsExpiredTime | dateFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <el-button size="mini" @click="openPowerDialog(row)">
            修改角色
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
    <el-dialog title="角色编辑" :visible.sync="dialogVisible" width="30%">
      <el-tree ref="tree" :data="roles" show-checkbox node-key="id" highlight-current :props="props" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { getList, updateRole, getRole, roleList, updateUser } from '@/api/user'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      dialogVisible: false,
      props: {
        label: 'name',
        children: ''
      },
      roles: [],
      listLoading: true,
      page: { total: 0, size: 10, pageNum: 0 },
      editorId: null,
      query: {},
      roleOptions: []
    }
  },
  created() {
    this.fetchData()
    roleList().then(respones => {
      this.roleOptions = respones.data
    })
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.query.page = this.page.pageNum
      this.query.size = this.page.size
      getList(this.query).then(response => {
        this.list = response.data.list
        this.page.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    openPowerDialog(row) {
      getRole({ userId: row.id }).then(response => {
        const ids = []
        response.data.forEach(function(role, index) {
          ids.push(role.id)
        })
        this.$refs.tree.setCheckedKeys(ids)
      })
      this.editorId = row.id
      roleList().then(respones => {
        this.roles = respones.data
      })
      this.dialogVisible = true
    },
    updateRole() {
      const check = this.$refs.tree.getCheckedKeys()
      updateRole({ roles: check, userId: this.editorId }).then(response => {
        if (response.code === 200) {
          this.dialogVisible = false
        }
      })
    },
    updateUser(u) {
      updateUser(u)
    }
  }

}
</script>
