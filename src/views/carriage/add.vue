<template>
  <div class="app-container">
    <el-form label-width="100px">
      <el-form-item label="模版名称">
        <el-input v-model="form.templateName" />
      </el-form-item>
      <el-form-item label="是否包邮">
        <el-radio v-model="form.freeAll" label="1">自定义</el-radio>
        <el-radio v-model="form.freeAll" label="0">包邮</el-radio>
      </el-form-item>
      <el-form-item label="计费方式">
        <el-radio v-model="form.carriageMethod" label="1">重量</el-radio>
        <el-radio v-model="form.carriageMethod" label="2">数量</el-radio>
      </el-form-item>
      <el-form-item label="默认运费">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-input>
              <template slot="append">件内</template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input>
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input>
              <template slot="prepend">每增加</template>
              <template slot="append">件</template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input>
              <template slot="prepend">增加运费</template>
              <template slot="append">元</template>
            </el-input>
          </el-col>
        </el-row>
        <el-button type="text" @click="addRule">为指定地区设置运费</el-button>
      </el-form-item>
      <el-form-item
        v-for="(carriageRule, index) in form.carriageRules"
        :key="carriageRule.key"
        label-width="20px"
        :rules="{
          required: true, message: '域名不能为空', trigger: 'blur'
        }"
      >
        <el-row :gutter="10">
          <el-col :span="4">
            <el-button type="text" @click="settingCity(carriageRule)">选择城市</el-button>
          </el-col>
          <el-col :span="4">
            <el-input>
              <template slot="append">件内</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input>
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input>
              <template slot="prepend">每增加</template>
              <template slot="append">件</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input>
              <template slot="prepend">增加运费</template>
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="text" @click.prevent="removeRule(index)">删除</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-dialog :visible="statesVisible" width="50%" :show-close="false">
      <div style="height: 60Vh;overflow: auto">
        <el-tree show-checkbox :data="states" :props="{ children: 'cities',label: 'name'}" ref="states"></el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="statesVisible = false">取 消</el-button>
        <el-button type="primary" @click="chooseCity">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { statesAll } from '@/api/address'
export default {
  name: 'Add',
  data() {
    return {
      form: {
        carriageRules: []
      },
      states: [],
      statesVisible: false,
      currentSettingRule: {}
    }
  },
  mounted() {
    statesAll().then(response => {
      this.states = response.data
    })
  },
  methods: {
    addRule() {
      this.form.carriageRules.push({})
    },
    removeRule(index) {
      this.form.carriageRules.splice(index, 1)
    },
    settingCity(rule) {
      this.currentSettingRule = rule
      this.statesVisible = true
    },
    chooseCity() {
      this.statesVisible = false
      var checkCity = this.$refs.states.getCheckedNodes()
      console.log(checkCity)
      this.currentSettingRule.citys = checkCity
    }
  }
}
</script>

<style scoped>

</style>
