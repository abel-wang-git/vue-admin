<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-header>
          <el-row>
            <el-col :span="2">
              <el-button size="mini" type="success" @click="() => openAdd({})">添加一级菜单</el-button>
            </el-col>
          </el-row>
        </el-header>
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
      </el-col>
      <el-col :span="12">
        <el-header>
          <el-row>
            <el-col :span="2">
              <el-button size="mini" type="success" @click="() => openButton({})">添加按钮</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-tree
          :data="buttonList"
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
                @click.stop="() => openButton(data)"
              >
                添加
                <i class="el-icon-plus" />
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => openButtonUpdate(data)"
              >
                修改
                <i class="el-icon-edit" />
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => deleteButton(data)"
              >
                删除
                <i class="el-icon-delete" />
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
    </el-row>
    <el-dialog title="添加菜单" :visible.sync="dialogVisible" width="50%">
      <el-form label-position="right" :inline="true" label-width="80px" :model="menu">
        <el-form-item label="名称">
          <el-input v-model="menu.name" />
        </el-form-item>
        <el-form-item label="Icon">
          <el-input v-model="menu.menuIcon" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="menu.path" />
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="menu.component" />
        </el-form-item>
        <el-form-item label="meta信息">
          <el-input v-model="menu.meta" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="menu.priority" />
        </el-form-item>
        <el-form-item label="重定向路径">
          <el-input v-model="menu.redirect" />
        </el-form-item>
        <el-form-item label="是否隐藏">
          <el-input v-model="menu.hidden" />
        </el-form-item>
        <el-form-item label="alwaysshow">
          <el-input v-model="menu.alwaysshow" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMenu">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加按钮权限" :visible.sync="buttonDialogVisible" width="50%">
      <el-form label-position="right" :inline="true" label-width="80px" :model="button">
        <el-form-item label="模块名称">
          <el-input v-model="button.modeName" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="button.name" />
        </el-form-item>
        <el-form-item label="权限路径">
          <el-input v-model="button.buttonCode" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addButton">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { menuList, addMenu, deleteMenu, buttonList, buttonSave, buttonDelete } from '@/api/user'

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
      menu: {},
      buttonList: [],
      button: {},
      buttonDialogVisible: false
    }
  },
  created() {
    this.fetchData()
    buttonList().then(response => {
      this.buttonList = response.data
      this.listLoading = false
    })
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
    openButton(m) {
      console.log(m)
      this.button = {}
      this.button.modeName = m.name
      this.buttonDialogVisible = true
    },
    openButtonUpdate(m) {
      this.button = m
      this.buttonDialogVisible = true
    },
    deleteButton(b) {
      buttonDelete({ id: b.buttonId }).then(response => {
        if (response.code === 200) {
          buttonList().then(response => {
            this.buttonList = response.data
          })
          this.buttonDialogVisible = false
        }
      })
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
    },
    addButton() {
      buttonSave(this.button).then(response => {
        this.button.buttonId = response.data
        this.$message({
          message: '操作Success',
          type: 'success'
        })
        buttonList().then(response => {
          this.buttonList = response.data
          this.listLoading = false
        })
      })
    }
  }

}
</script>
