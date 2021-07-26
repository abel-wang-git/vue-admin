<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-tree ref="tree" :data="departments" :show-checkbox="false" node-key="ekey" highlight-current :props="eltreeProps" @node-click="handleNodeClick" @node-expand="handleNodeClick" @node-collapse="handleNodeClick">
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <div style="display: flex">
              <svg-icon v-if="data.type === 1" icon-class="organization" style="color: #5d9d45" />
              <svg-icon v-if="data.type === 2" icon-class="post" style="height: 20px;color: #ec8121" />
              <div style="width:80px">{{ node.label }}</div>
              <el-button v-if="!data.children || data.children.length === 0" type="danger" icon="el-icon-delete" size="mini" circle style="font-size: 2px;padding: 3px" @click="deleteDept(data)"></el-button>
            </div>
          </span>e
        </el-tree>
      </el-col>
      <el-col :span="18">
        <el-col :span="24">
          <el-header>
            <el-button v-if="choseDept.type === 1" size="mini" type="primary" @click="openAddDept(1)">添加岗位</el-button>
            <el-button v-if="choseDept.type === 1" size="mini" type="success" @click="openAddDept(2)">添加子部门</el-button>
            <el-button v-if="choseDept.type === 2" size="mini" type="warning" @click="openAddDept(4)">修改权限</el-button>
            <el-button v-if="choseDept.type === 2" size="mini" @click="openMenuDialog(choseDept)">编辑菜单</el-button>
          </el-header>
        </el-col>
        <el-col v-if="choseDept.type === 1">
          <el-form ref="app" :model="choseDept" label-width="120px">
            <el-form-item label="部门名称">
              <el-input v-model="choseDept.name" />
            </el-form-item>
            <el-input v-model="choseDept.id" type="hidden" />
            <el-form-item>
              <el-button size="mini" type="primary" @click="update(choseDept)">修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col v-if="choseDept.type === 2">
          <div class="app-container">
            <el-table
              v-loading="listLoading"
              :data="list"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
            >
              <el-table-column label="ID">
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
                  {{ scope.row.locked }}
                </template>
              </el-table-column>
              <el-table-column label="是否禁用">
                <template slot-scope="scope">
                  {{ scope.row.enable }}
                </template>
              </el-table-column>
              <el-table-column label="过期时间">
                <template slot-scope="scope">
                  {{ scope.row.expiredTime }}
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :total="page.total"
              :page.sync="page.pageNum"
              :limit.sync="page.size"
              @pagination="userFetchData()"
            />
          </div>
        </el-col>
      </el-col>
      <el-dialog title="添加部门" :visible.sync="dialogVisible" width="30%">
        <el-form ref="app" :model="choseDept" label-width="120px">
          <el-form-item label="上级部门">
            <el-input v-model="choseDept.name" />
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="addDept.name" />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="saveDept(addDept)">添加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="添加岗位" :visible.sync="postDialogVisible" width="30%">
        <el-form ref="app" :model="addPost" label-width="120px">
          <el-form-item label="所属部门">
            <el-input v-model="choseDept.name" />
          </el-form-item>
          <el-form-item label="岗位名称">
            <el-input v-model="addPost.name" />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="savePost(addPost)">添加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="" :visible.sync="powerDialogVisible" width="30%">
        <span slot="title"  class="header-title">
          asdf
        </span>
        <el-tree ref="tree" :data="powers" show-checkbox node-key="id" highlight-current :props="powerProps" />
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="powerDialogVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="addPower">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
    <el-dialog title="添加菜单" :visible.sync="menuDialogVisible" width="30%">
      <el-tree ref="roleMenu" :data="menus" show-checkbox node-key="id" highlight-current :props="eltreeProps" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="menuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { powerList, rolePowerList, roleAddPower, roleAdd, getList, menuList, roleMenu, roleAddMenu, deleteRole } from '@/api/user'
import DeptApi from '@/api/dept'
import checkPermission from '@/utils/permission'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      departments: null,
      list: null,
      powers: null,
      choseDept: {},
      addDept: {},
      addPost: {},
      addUser: {},
      roleId: null,
      listLoading: true,
      dialogVisible: false,
      postDialogVisible: false,
      userDialogVisible: false,
      powerDialogVisible: false,
      page: { total: 0, size: 0, pageNum: 0 },
      eltreeProps: {
        children: 'children',
        label: 'name'
      },
      powerProps: {
        children: 'children',
        label: 'name'
      },
      menuDialogVisible: false,
      menus: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    checkPermission,
    fetchData() {
      this.listLoading = true
      DeptApi.getList().then(response => {
        this.departments = response.data
        this.listLoading = false
      })
    },
    handleNodeClick(data, node, e) {
      this.choseDept = data
      if (data.type === 2) {
        this.page.pageNum = 0
        this.userFetchData()
      }
    },
    update(row) {
      delete row.children
      DeptApi.add(row).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '操作Success',
            type: 'success'
          })
        }
      })
    },
    openAddDept(v) {
      if (v === 2) {
        this.addDept.pid = this.choseDept.id
        this.dialogVisible = true
      }
      if (v === 1) {
        this.addPost.deptId = this.choseDept.id
        this.postDialogVisible = true
      }
      if (v === 4) {
        this.roleId = this.choseDept.id
        powerList().then(response => {
          this.powers = response.data
          rolePowerList({ roleId: this.roleId }).then(
            response => {
              var ids = []
              response.data.forEach(function(power, index) {
                ids.push(power.id)
              })
              this.$refs.tree.setCheckedKeys(ids)
            }
          )
          if (response.code === 200) {
            this.powerDialogVisible = true
          }
        })
      }
    },
    saveDept() {
      DeptApi.add(this.addDept).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '操作Success',
            type: 'success'
          })

          const currData = this.$refs.tree.getNode(this.choseDept.ekey).data
          console.log(currData)
          this.addDept.id = response.data
          this.addDept.type = 1
          this.addDept.ekey = this.addDept.type.toString() + this.addDept.id
          if (!currData.children) {
            this.$set(currData, 'children', [])
          }
          currData.children.push(this.addDept)
          this.addDept = {}
          this.dialogVisible = false
        }
      })
    },
    savePost() {
      roleAdd(this.addPost).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '操作Success',
            type: 'success'
          })
          const currData = this.$refs.tree.getNode(this.choseDept.ekey).data
          this.addPost.id = response.data
          this.addPost.type = 2
          this.addPost.ekey = this.addPost.id + this.addPost.type
          console.log(this.addPost)
          currData.children.push(this.addPost)
          this.addPost = {}
          this.postDialogVisible = false
        }
      })
    },
    addPower() {
      let check = this.$refs.tree.getCheckedKeys()
      check = check.filter(c => typeof (c) === 'number')
      roleAddPower({ api: check, roleId: this.roleId }).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
    },
    userFetchData() {
      this.listLoading = true
      getList({ roleId: this.choseDept.id, page: this.page.pageNum }).then(response => {
        this.list = response.data.list
        this.page = response.data
        this.listLoading = false
      })
    },
    deleteDept(d) {
      if (d.type === 1) {
        DeptApi.delete({ id: d.id }).then(response => {
          this.$refs.tree.remove(d.ekey)
        })
      } else {
        deleteRole({ id: d.id }).then(response => {
          this.$refs.tree.remove(d.ekey)
        })
      }
    },
    openMenuDialog(row) {
      console.log(row)
      this.roleId = row.id
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
            console.log(ids)
            this.$refs['roleMenu'].setCheckedKeys(ids)
          }
        )
        this.menuDialogVisible = true
      })
    },
    addMenu() {
      const check = this.$refs['roleMenu'].getCheckedKeys()
      const hafCheckedKeys = this.$refs['roleMenu'].getHalfCheckedKeys()
      roleAddMenu({ api: check.concat(hafCheckedKeys), roleId: this.roleId }).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
    }
  }

}
</script>

<style>
  .custom-tree-node{
  }
</style>
