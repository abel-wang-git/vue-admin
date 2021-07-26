<template>
  <div class="app-container">
    <el-tree
      :data="list"
      show-checkbox
      node-key="id"
      default-expand-all
      :props="props"
      :expand-on-click-node="false"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}   </span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => openAdd(data)"
          >
            添加
            <i class="el-icon-plus" />
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => openUpdate(data)"
          >
            修改
            <i class="el-icon-edit" />
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => deleteMenu(data)"
          >
            删除
            <i class="el-icon-delete" />
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog title="添加菜单" :visible.sync="dialogVisible" width="50%">
      <el-form label-position="right" :inline="true" label-width="80px" :model="menu">
        <el-form-item label="名称">
          <el-input v-model="menu.name"></el-input>
        </el-form-item>
        <el-form-item label="Icon">
          <el-input v-model="menu.menuIcon"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="menu.path"></el-input>
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="menu.component"></el-input>
        </el-form-item>
        <el-form-item label="meta信息">
          <el-input v-model="menu.meta"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="menu.priority"></el-input>
        </el-form-item>
        <el-form-item label="重定向路径">
          <el-input v-model="menu.redirect"></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏">
          <el-input v-model="menu.hidden"></el-input>
        </el-form-item>
        <el-form-item label="alwaysshow">
          <el-input v-model="menu.alwaysshow"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { menuList, addMenu, deleteMenu } from '@/api/user'

export default {
  components: { },
  data() {
    return {
      list: null,
      dialogVisible: false,
      props: {
        label: 'name',
        children: 'children'
      },
      listLoading: true,
      menu: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      menuList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    openAdd(m) {
      this.menu = {}
      this.menu.pid = m.id
      this.dialogVisible = true
    },
    openUpdate(m) {
      this.menu = m
      this.dialogVisible = true
    },
    addMenu() {
      addMenu(this.menu).then(response => {
        this.fetchData()
        this.dialogVisible = false
        this.menu.id = response.data
        this.$message({
          message: '操作Success',
          type: 'success'
        })
      })
    },
    deleteMenu(m) {
      this.$confirm('此操删除菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenu({ 'id': m.id }).then(response => {
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
