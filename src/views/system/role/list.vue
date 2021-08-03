<template>
  <div class="app-container">
    <el-header>
      <el-row>
        <el-col :span="2">
          <el-button size="mini" type="success" @click="postDialogVisible = true">添加角色</el-button>
        </el-col>
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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <el-button size="mini" @click="openPowerDialog(row)">
            编辑权限
          </el-button>
          <el-button size="mini" @click="openMenuDialog(row)">
            编辑菜单
          </el-button>
          <el-button type="danger" size="mini" @click="deleteRole(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加权限" :visible.sync="dialogVisible" width="30%">
      <el-tree ref="tree" :data="powers" show-checkbox node-key="id" highlight-current :props="etreeProps" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPower">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加菜单" :visible.sync="menuDialogVisible" width="30%">
      <el-tree ref="roleMenu" :data="menus" show-checkbox node-key="id" highlight-current :props="etreeProps" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="menuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMenu">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加角色" :visible.sync="postDialogVisible" width="30%">
      <el-form ref="app" :model="role" label-width="120px">
        <el-form-item label="角色名称">
          <el-input v-model="role.name" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="saveRole(role)">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import { roleList, powerList, rolePowerList, roleAddPower, menuList, roleMenu, roleAddMenu, roleAdd, deleteRole } from '@/api/user'
import checkPermission from '@/utils/permission'

export default {
  components: { },
  data() {
    return {
      list: null,
      powers: null,
      listLoading: true,
      dialogVisible: false,
      dialogId: null,
      etreeProps: {
        children: 'children',
        label: 'name'
      },
      menuDialogVisible: false,
      menus: [],
      postDialogVisible: false,
      role: {
        deptId: 1
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    checkPermission,
    fetchData() {
      this.listLoading = true
      roleList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    openPowerDialog(row) {
      powerList().then(response => {
        this.powers = response.data
        rolePowerList({ roleId: row.id }).then(
          response => {
            const ids = []
            response.data.forEach(function(power, index) {
              ids.push(power.id)
            })
            this.$refs['tree'].setCheckedKeys(ids)
          }
        )
      })
      this.dialogId = row.id
      this.dialogVisible = true
    },
    openMenuDialog(row) {
      this.dialogId = row.id
      menuList().then(response => {
        this.menus = response.data
        roleMenu({ roleId: row.id }).then(
          response => {
            const ids = []
            response.data.forEach(function(power, index) {
              if (power.pid !== 0) {
                ids.push(power.id)
              }
            })
            this.$refs['roleMenu'].setCheckedKeys(ids)
          }
        )
        this.menuDialogVisible = true
      })
    },
    addPower() {
      let check = this.$refs.tree.getCheckedKeys()
      check = check.filter(c => typeof (c) === 'number')
      roleAddPower({ api: check, roleId: this.dialogId }).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
    },
    addMenu() {
      const check = this.$refs['roleMenu'].getCheckedKeys()
      const hafCheckedKeys = this.$refs['roleMenu'].getHalfCheckedKeys()
      roleAddMenu({ api: check.concat(hafCheckedKeys), roleId: this.dialogId }).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
    },
    saveRole() {
      roleAdd(this.role).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '操作Success',
            type: 'success'
          })
          this.fetchData()
          this.postDialogVisible = false
        }
      })
    },
    deleteRole(r) {
      this.$confirm('此操删除角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole({ 'id': r.id }).then(response => {
          this.fetchData()
          this.dialogVisible = false
          this.menu.id = response.data
          this.$message({
            message: '操作Success',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

}
</script>
