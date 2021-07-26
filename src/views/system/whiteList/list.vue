<template>
  <div class="app-container">
    <el-header>
      <el-row>
        <el-col :span="2">
          <el-button size="mini" type="success" @click="openAddDialog">添加白名单</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-table
      v-loading="listLoading"
      class="tb-edit"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="路径">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="openUpdateDialog(row)">
            修改
          </el-button>
          <el-button v-if="checkPermission(['admin'])" type="danger" size="mini" @click="deleteWhite(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加白名单" :visible.sync="dialogVisible" width="30%">
      <el-row>
        <el-input v-model="whiteList.url" />
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWhiteList">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import Whitelist from '@/api/whitelist'
import checkPermission from '@/utils/permission'

export default {
  components: { },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      whiteList: {
        url: null
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
      Whitelist.getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    deleteWhite(row) {
      Whitelist.del({ id: row.url }).then(response => {
        if (response.code === 200) {
          this.fetchData()
        }
      })
      this.$message({
        message: '操作Success',
        type: 'success'
      })
    },
    openAddDialog(row) {
      this.whiteList = {}
      this.dialogVisible = true
    },
    openUpdateDialog(row) {
      this.whiteList.url = row.url
      this.whiteList.id = row.id
      this.dialogVisible = true
    },
    addWhiteList() {
      Whitelist.add(this.whiteList).then(response => {
        if (response.code === 200) {
          this.dialogVisible = false
          this.fetchData()
        }
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
    }
  }

}
</script>
